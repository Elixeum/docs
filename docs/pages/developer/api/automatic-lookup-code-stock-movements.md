# ELXP-11957 – automatické pohyby podle LookupCodes

## Nastavení a význam

Na definici DL nastavte právě dva automatické pohyby, například:

```json
[
  { "stockCode": "BRNO", "movementCode": "OUT", "onlyLookupCodes": true, "customerStock": false },
  { "stockCode": "", "movementCode": "IN", "onlyLookupCodes": true, "customerStock": true }
]
```

Kódy skladů/pohybů jsou příklady. Výdej musí mít směr -1, příjem +1, centrála musí být aktivní fyzický nezákaznický sklad. Zákaznický sklad se určí podle OM, poté zákazníka. Nejednoznačný nebo chybějící sklad zápis zastaví. Pevný stockCode u customerStock je prázdný; editor jej vymaže a zamkne i po aplikaci tenant úprav formuláře.

`OnlyLookupCodes` počítá skutečné konkrétní identifikátory uložené ve StockItem.LookupCodeList řádků dokladu. Nepoužívá všechny kódy artiklu z katalogu. Podporuje všechny platné LookupCodeType: EAN, SKU, párovací kód, RFID i sériové číslo. Každý zařazený kód zde představuje jeden samostatně sledovaný kus. Jeden společný EAN pro více kusů se nerozmnožuje na fiktivní identity.

Typ a přesná hodnota kódu se ověřují proti tenantovému katalogu, zapisují do polohy, historie a vazeb deníku. Obecný mechanismus nemění velikost písmen ani neořezává hodnotu. Případnou čtecí normalizaci provádí konkrétní klient/adaptér. Neznámá identita nebo její výchozí poloha se neodhaduje.

Při potvrzených/fakturovaných 10 kusech a 9 kódech se přesune 9 dohledatelných kusů. Desátý nevznikne, obchodní množství se nemění. Nulový počet kódů uloží prázdný fyzický výsledek. Neúplná dvojice, jiné přidružené pohyby a současný běžný skladový vliv jsou odmítnuty. Detekce řízeného dokladu je záměrně širší než platná dvojice: chybná konfigurace nesmí spadnout do souhrnného pohybu fakturovaného množství.

Legacy `OnlyRfid` zůstává v původním protobuf poli 3 pouze pro kompatibilitu konfigurací; při uložení se převádí na `OnlyLookupCodes`, nové payloady zapisují obecnou volbu. `CustomerStock` zůstává v poli 4, nová volba byla **připojena jako pole 5**. Zdrojová YAML a oba páry modelů byly regenerovány přes repozitářový Schematix skript. Změna nastavení nemění zpětně embedded snímek dříve vytvořeného DL; jeho nastavení před pilotem ověřit.

## Společný skladový mechanismus

`LookupCodeStockManager`, `LookupCodeStockPlan` a příslušné databázové služby/DTO jsou společné všem typům kódů. Není samostatný sériový nebo RFID skladový algoritmus.

- `LookupCodeStockPostingContext` výslovně určuje otisk dávky, vlastnictví dokladu, validaci a pravidlo pro další výdej témuž zákazníkovi. Režim se neodvozuje od nullable DocumentDto.
- Přímý výdej ponechává přísné pravidlo shody OM. Pouze automatický kontext dovoluje resolverem určený zákaznický sklad bez OM.
- Pokud je kus již u cílového zákazníka, automatický kontext provede **explicitní** zákazník → centrála → zákazník. Přímá dávka to odmítne. Chybějící návrat z jiného skladu rovněž vytvoří skutečnou mezilehlou historii.
- Posting policy získá skutečný durable claim dávky a vydá oprávnění svázané s tenantem, dávkou, dokumentem a přesnou transakcí. Jen s ním lze zapsat vlastní řízené deníky. Běžné AddAsync i AddRangeAsync sdílejí úplné vyloučení řízených dokladů; zkopírované BatchId nestačí. Identita dokladu se zamyká vždy, ještě před zjišťováním obsazenosti skladů, takže i prázdná fyzická dávka vylučuje souběžné souhrnné účtování. Parametr owningRfidBatchId byl odstraněn.
- Deník vzniká rovnou s identitou dokladu; není dodatečně mutovaný v manageru. Obě strany pohybu, polohy, historie, vazby a výsledek se uloží v jedné PostgreSQL transakci.
- Opakování vrátí původní výsledek. Jiný typ/hodnota kódu, řádek nebo sklad pod stejným ID se odmítne. Automatické opakování ignoruje jen nově vzniklý čas požadavku. Zachován původní deterministický namespace ID dokumentové dávky.

## API a kompatibilita

Obecné endpointy pod `/api/v1.1/item-inventory-journal-entry`:

- POST `lookup-code-batch`, `lookup-code-initialize`, `lookup-code-reinstate`;
- POST `lookup-code-positions`, GET `lookup-code-history`;
- GET `lookup-code-batch/{batchId}`;
- POST `lookup-code-dispatch-target/{documentId}`;
- GET `automatic-lookup-code-dispatch/{documentId}`.

Obecná dávka používá `codes: [{ "code": "Serial-Abc", "codeType": 5, ... }]` místo RFID pole. Typ je povinně platný, kód musí odpovídat katalogu. Oprávnění jsou stejná jako u odpovídajících stávajících operací; inicializace a obnovení navíc vyžadují Create.

Automatický readback vrací ContractVersion=1, DocumentId, BatchId, StockId, SourceStockId, konkrétní **Codes včetně CodeType**, nullable Result a IsBooked. Před zaknihováním je Result null. Po zaknihování musí klient ověřit IsBooked, výsledek i skutečné polohy; samotná odpověď změny stavu nestačí. Mongo zaknihování a PostgreSQL sklad nejsou jedna distribuovaná transakce, opakování proto musí používat původní identitu dávky.

Čtecí validace, limity a tenantové dotazy mají společný LookupCodeStockQueryManager; controllery pouze delegují a RFID adaptér výslovně normalizuje/projektuje data. DTO nemají implicitní konverze mezi kompatibilním a obecným kontraktem.

Původní `rfid-*`, `dispatch-target` a `automatic-rfid-dispatch` zůstávají jako adaptéry pro existující Store Server. Zachovávají jeho RFID payload, normalizaci, uložené otisky a tvar Rfids. Používají **stejný** obecný engine. RFID readback odmítne doklad s jinými typy kódů; obecní klienti použijí nový endpoint. Nezavádí se nekompatibilní změna publikovaných RFID endpointů.

Přímá dávka nesmí expedovat DL řízený automatickým zaknihováním. Souhrnné storno takového dokladu zůstává zablokované, protože by neopravilo skutečné kusové polohy. Řízené vrácení konkrétních kusů je samostatný proces.

## Migrace, balíčky a nasazení

Aplikovat EF migraci **TrackLookupCodeTypes**, vygenerovanou pomocí dotnet ef. Přidává CodeType do již existujících tabulek poloh a historie, staré záznamy doplní typem RFID (4), zachová ID/verze/historii. Názvy existujících tabulek `RfidPositions`/`RfidMovements` a batch sloupců se záměrně nemění kvůli datové kompatibilitě. Nevyjadřují omezení nového zpracování.

Vydat aktualizovaný CommercialDocuments.Domain a CommercialDocuments.Schemas z této větve (původně připravené verze 3.171.0 / 1.111.0), navazující ItemMaintenance.Domain (původně 5.45.0), nasadit CommercialDocuments/ItemMaintenance a companion app-web PR. Použít standardní release proces, například `elx dotnet package update -p CommercialDocuments.Domain -r github -a -c`, potom `elx dotnet package update -p ItemMaintenance.Domain -r github -a -c`. Release příkazy nebyly automaticky provedeny. Produkční csproj se tímto refaktorem nemění.

Katalog tenant konfigurací zachovává obecnou volbu a customerStock, jeho verze byla zvýšena. Mapování skladů a zákazníků zůstává věcí cílového tenanta.

Store Server používající pouze RFID může nadále používat existující kompatibilní endpointy. PlatformAutomatic zapnout až po nasazení odpovídající platformy/workflow. Rozpracované staré dávky před přepnutím dořešit. Navazující nesloučené platformní větve ELXP-11967 a oprav přiřazení je nutné při rebasi přizpůsobit obecným názvům společného enginu/modelů; jejich lokální build na starém základu nepotvrzuje integraci s tímto refaktorem.

## Ověření

Lokální PostgreSQL testy zahrnují všechny platné typy kódů od registrace přes automatické zaknihování a opakování až po další oběh stejného kusu. Kontrolují přesný typ/hodnotu, sklad, historii a deníkové vazby, rozdíl obchodního a skutečného množství, odmítnutí změny case/typu, přísnou identitu přímého výdeje, sdílené vyloučení deníků i migraci historických dat. Obě API sady mají odlišné routy.

Testy používají izolovaný PostgreSQL a lokálně sestavený nepublikovaný CD balíček plus již dostupné prerelease dependency overrides. Tyto lokální úpravy nejsou součástí csproj ani commitů; CI musí ověřit vydaný graf závislostí. Frontend má testy skutečné normalizace a pravidel formuláře a produkční build. Cílený ESLint změněných komponent a sdíleného helperu prochází bez chyb i varování. HW a nasazené end-to-end ověření zůstávají součástí pilotu.

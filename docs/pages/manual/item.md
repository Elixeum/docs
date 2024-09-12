# Item

## Item imports

Items can be imported via a CSV file (UTF-8). This file should follow the following structure:

File header definition:
<code>type;itemNumber;name;alternateName;isActive;groupNumber;description;isComposite;taxCode;measurementUnit;secondMeasurementUnit;measurementUnitRatio;sizeMeasurementUnit;width;height;</code>
<code>depth;diameter;weightMeasurementUnit;netWeight;grossWeight;density;defaultPurchasePrice;defaultPurchasePriceWithVat;defaultSalePrice;defaultSalePriceWithVat;defaultPriceMargin</code>

Detailed information about each column can be found in the following table:

| Column                      | Description                             | Value type     | Mandatory | Example                        | Note                                                                                                              |
| --------------------------- | --------------------------------------- | -------------- | --------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| type                        | Item type                               | Enum (Integer) | Yes       | 1                              | 1 - Goods and materials, 2 - Services and activities                                                              |
| itemNumber                  | Article code                            | Text           | Yes       | test-import                    |                                                                                                                   |
| name                        | Aricle name                             | Text           | Yes       | Test Import                    |                                                                                                                   |
| alternateName               | Alternative name                        | Text           | No        | Article for testing            |                                                                                                                   |
| isActive                    | Whether article is active or not        | True / False   | No        | true                           | Default value is false                                                                                            |
| groupNumber                 | Number of group this article belongs to | Integer        | Yes       | 123                            |                                                                                                                   |
| description                 | Description of the article              | Text           | No        | This is an example description |                                                                                                                   |
| isComposite                 | Whether article is a composite or not   | True / False   | No        | false                          | Default value is false                                                                                            |
| taxCode                     | Code of a tax to be used in prices      | Text           | No        | 21                             | If tax with this code doesn't exist it's not assigned, but article is still imported.                             |
| measurementUnit             | Main measurement unit                   | Text           | Yes       | Pcs                            | The unit of measurement must match exactly (including letter size). If it's not found, article won't be imported. |
| secondMeasurementUnit       | Secondary measurement unit              | Text           | No        | L                              | If not found, article is still imported.                                                                          |
| measurementUnitRatio        | Ratio of measurement units              | Number         | No        | 1.123456                       |                                                                                                                   |
| sizeMeasurementUnit         | Measurement unit of sizes               | Text           | No        | M                              |                                                                                                                   |
| width                       | Width                                   | Number         | No        | 4.5                            |                                                                                                                   |
| height                      | Height                                  | Number         | No        | 1.3                            |                                                                                                                   |
| depth                       | Depth                                   | Number         | No        | 4.9                            |                                                                                                                   |
| diameter                    | Diameter                                | Number         | No        | 5.9                            |                                                                                                                   |
| weightMeasurementUnit       | Measurement unit of weight              | Text           | No        | Kg                             |                                                                                                                   |
| netWeight                   | Net weight                              | Number         | No        | 12.92                          |                                                                                                                   |
| grossWeight                 | Gross weight                            | Number         | No        | 1.978                          |                                                                                                                   |
| density                     | Density                                 | Number         | No        | 1.841                          |                                                                                                                   |
| defaultPurchasePrice        | Default purchase price                  | Number         | No        | 100.0                          |                                                                                                                   |
| defaultPurchasePriceWithVat | Default purchase price with VAT         | Number         | No        | 110.0                          |                                                                                                                   |
| defaultSalePrice            | Default sale price                      | Number         | No        | 150.0                          |                                                                                                                   |
| defaultSalePriceWithVat     | Default sale price with VAT             | Number         | No        | 175.0                          |                                                                                                                   |
| defaultPriceMargin          | Default price Margin                    | Number         | No        | 50.0                           |                                                                                                                   |

File example: [Download](/assets/items_import_example.csv ":ignore")

### Item composition imports

It is also possible to import item composition info. That is, binding of certain items to a parent composite. The CSV file should follow the following structure:

File header definition:
<code>itemNumber;parentItemNumber;quantity;order;note</code>

Detailed information about each column can be found in the following table:

| Column           | Description                     | Value type | Mandatory | Example        | Note |
| ---------------- | ------------------------------- | ---------- | --------- | -------------- | ---- |
| itemNumber       | Article code                    | Text       | Yes       | test-import-1  |      |
| parentItemNumber | Parent article (composite) code | Text       | Yes       | test-import-3  |      |
| quantity         | Quantity                        | Integer    | Yes       | 10             |      |
| order            | Order                           | Integer    | Yes       | 1              |      |
| note             | Note                            | Text       | No        | This is a note |      |

File example: [Download](/assets/compositions_import_example.csv ":ignore")

### Lookup code imports

Lookup codes can be imported as well. The CSV file should follow the following structure:

File header definition:
<code>itemNumber;type;value;isMain</code>

Detailed information about each column can be found in the following table:

| Column     | Description               | Value type     | Mandatory | Example             | Note                        |
| ---------- | ------------------------- | -------------- | --------- | ------------------- | --------------------------- |
| itemNumber | Article code              | Text           | Yes       | test-import-1       |                             |
| type       | Code type                 | Enum (Integer) | Yes       | 1                   | 1 - EAN, 2 - SKU, 3 - MATCH |
| value      | Value                     | Text           | Yes       | EAN Value 123456789 |                             |
| isMain     | Whether this code is main | True / False   | No        | true                | Default value is false      |

File example: [Download](/assets/lookup_codes_import_example.csv ":ignore")

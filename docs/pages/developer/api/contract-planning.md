# Contract Planning

## Authentication

All endpoints on **Contract Planning** require authentication using valid JWT token.

Token must be filled in `Authorization` request header, for example `Authorization: Bearer {token}`.

### Supported Tokens

- **User Token** :heavy_check_mark:
- **Application Token** :heavy_check_mark: (recommended)

?> See more about authentication [here](/developer/api/README?id=authentication).

## Contract

### Create

Creates new contract.

|              |                                                       |
| ------------ | ----------------------------------------------------- |
| Endpoint:    | `POST /contract-planning-service/api/Contract`        |
| Permissions: | `com.elixeum.contract-planning.create` (required)     |
| Parameters:  | `contract.typeNumber` (required)                      |
|              | `contract.document.documentDefinition.code` (required)|

#### contract.contractTypeId + contract.typeNumber

To get contractTypeId and typeNumber use endpoint [ContractType/List](#ContractType)

#### contract.contractFields

To get customFieldId use endpoint [ContractTypeCustomField/List](#ContractTypeCustomField)

#### contract.document

Document contains all informations about contact, addresses, contact person and items.

Base structure:
```json
"document": {
  "documentDefinition": {}, // documentDefinition.Code can get from ContractType.DocumentDefinitionCode
  "headerList": [],
  "recordList": [] // items
}
```

System supports 2 types of contact [`Person`, `Organization`].

**Contact header filled like `Person`:**
```json
{
  "isPerson": true,
  "email": "nova@osoba.com",
  "firstName": "Nová",
  "lastName": "Osoba",
  "prefix": "Ing.",
  "suffix": "Ph.D.",
  "middleName": "Alias",
  "cin": "11112222",
  "telephone": "+420420464646",
  "headerType": 2
}
```

**Contact header filled like `Organization`:**
```json
{
  "isPerson": false,
  "cin": "12345678",
  "tin": "987654321",
  "displayName": "Nová organizace",
  "email": "nova@org.cz",
  "phone": "+420131316515",
  "email": "nova@osoba.com",
  "telephone": "+420420464646",
  "headerType": 2
}
// Contact person. Can be set only for organization
{
  "email": "kontaktni@osoba.cz",
  "firstName": "Kontaktní",
  "lastName": "Osoba",
  "telephone": "+420161561651",
  "headerType": 4
}
```

### Examples

Example request body for contract with customer as person:

```json
{
  "contract": {
    "name": "Testovací zakázka",
    "typeNumber": 1,
    "startDate": "2023-11-14T23:00:42.604Z",
    "requiredDeliveryDate": "2024-07-31T09:53:00.000Z",
    "note": "test",
    "latitude": 49.27190110341535,
    "longitude": 16.687297634751694,
    "totalPrice": 100,
    "totalPriceWithVat": 121,
    "totalPurchasePrice": 50,
    "discountValue": 10,
    "currencyCode": "CZK",
    "duration": "60",
    "externalId": "My_custom_number_55",
    "parentId": null,
    "contractFields": [
      {
        "customFieldId": "8beaa1c1-8e36-4712-a452-847ef24f67c8",
        "value": "15",
        "selectedValue": null,
        "codeName": "Test",
        "order": 1
      }
    ]
  },
  "document": {
    "documentDefinition": {
      "code": "20"
    },
    "headerList": [
      {
        "date": "2024-06-20",
        "documentCurrencyCode": "CZK",
        "mainCurrencyCode": "CZK",
        "headerType": 1
      },
      {
        "isPerson": true,
        "email": "nova@osoba.com",
        "firstName": "Nová",
        "lastName": "Osoba",
        "prefix": "Ing.",
        "suffix": "Ph.D.",
        "middleName": "Alias",
        "cin": "11112222",
        "telephone": "+420420464646",
        "headerType": 2
      },
      {
        "countryCode": "CZ",
        "postalCode": "12345",
        "addressLine1": "Fakturační",
        "city": "Adresa",
        "headerType": 5
      },
      {
        "countryCode": "CZ",
        "addressLine1": "Dodací",
        "postalCode": "12345",
        "city": "Adresa",
        "headerType": 6
      }
    ],
    // items
    "recordList": [
      {
        "position": 0,
        "entryList": [
          {
            "displayName": "Test_artikl_1",
            "quantity": 5,
            "note": "note_test",
            "secondUnitQuantity": 20,
            "entryType": 1
          },
          {
            "item": {
              "id": "8cb0f6ba-84a8-410e-ab34-bdc7627a26cb",
              "itemNumber": "60025",
              "name": "Test_artikl_1",
              "description": "",
              "groupId": "9e176565-9804-409c-a4dd-46dcf9d2fe00",
              "groupNumber": 1,
              "groupName": "Skupina 1",
              "taxCode": "21"
            },
            "itemFieldList": [
              {
                "customField": {
                  "id": "de61d907-28eb-4960-b3ae-fb21025b3965",
                  "name": "Barva",
                  "codeName": "barva",
                  "fieldType": 1,
                  "dataType": 8,
                  "order": 5
                },
                "value": "c5dced09-8740-4d48-b269-4dec1e3f2c97",
                "selectedValue": "Modrá"
              }
            ],
            "entryType": 2
          },
          {
            "unit": {
              "id": "8a89c27a-e9df-4edb-aa44-6605c0928a36",
              "unit": "ks",
              "decimalPlaces": 0
            },
            "entryType": 3
          },
          {
            "unit": {
              "id": "1cb88c21-fe6a-4160-b4a7-b79cc090adda",
              "unit": "kg",
              "decimalPlaces": 2
            },
            "measurementUnitRatio": 4,
            "entryType": 4
          },
          {
            "price": 3000,
            "priceTotal": 15000,
            "entryType": 7
          },
          {
            "code": "21",
            "taxRate": 21,
            "taxableValue": 3000,
            "taxValue": 630,
            "valueWithTax": 3630,
            "entryType": 8
          },
          {
            "price": 4500,
            "priceTotal": 22500,
            "entryType": 5
          },
          {
            "code": "21",
            "taxRate": 21,
            "taxableValue": 4500,
            "taxValue": 945,
            "valueWithTax": 5445,
            "entryType": 6
          }
        ]
      }
    ]
  }
}
```

### Update

Updates specific contract.

|              |                                                 |
| ------------ | ----------------------------------------------- |
| Endpoint:    | `PUT /contract-planning-service/api/Contract`   |
| Permissions: | `com.elixeum.contract-planning.edit` (required) |
| Parameters:  | `contract.id` (required)                        |
|              | `contract.typeNumber` (required)                |

### Examples

Example request body:

```json
{
  "contract": {
    "id": "72af879c-4618-4ac6-ad80-bcaf71d2eb92",
    "name": "Testovací zakázka",
    "typeNumber": 1,
    "startDate": "2023-11-14T23:00:42.604Z",
    "requiredDeliveryDate": "2024-07-31T09:53:00.000Z",
    "statusId": "3724a57c-f0af-4317-b8ee-a05ea380bc14",
    "note": "update",
    "latitude": 49.27190110341535,
    "longitude": 16.687297634751694,
    "totalPrice": 200,
    "totalPriceWithVat": 242,
    "totalPurchasePrice": 100,
    "discountValue": 20,
    "currencyCode": "CZK",
    "duration": "60",
    "externalId": "My_custom_number_55",
    "parentId": null,
    "contractFields": [
      {
        "customFieldId": "8beaa1c1-8e36-4712-a452-847ef24f67c8",
        "value": "19",
        "selectedValue": null,
        "codeName": "Test",
        "order": 1
      }
    ]
  },
  "document": {
    "id": "f8d3225d-2742-480a-bff6-a85c546ff5ea",
    "documentDefinition": {
      "code": "20"
    },
    "headerList": [
      {
        "date": "2024-06-20",
        "documentCurrencyCode": "CZK",
        "mainCurrencyCode": "CZK",
        "headerType": 1
      },
      {
        "isPerson": true,
        "email": "nova@osoba.com",
        "firstName": "Nová",
        "lastName": "Osoba",
        "prefix": "Ing.",
        "suffix": "Ph.D.",
        "middleName": "Alias",
        "cin": "11112222",
        "telephone": "+420420464646",
        "headerType": 2
      },
      {
        "countryCode": "CZ",
        "postalCode": "12345",
        "addressLine1": "Fakturační",
        "city": "Adresa",
        "headerType": 5
      },
      {
        "countryCode": "CZ",
        "addressLine1": "Dodací",
        "postalCode": "12345",
        "city": "Adresa",
        "headerType": 6
      }
    ],
    "recordList": [
      {
        "position": 0,
        "entryList": [
          {
            "displayName": "Test_artikl_1",
            "quantity": 5,
            "note": "note_test",
            "secondUnitQuantity": 20,
            "entryType": 1
          },
          {
            "item": {
              "id": "8cb0f6ba-84a8-410e-ab34-bdc7627a26cb",
              "itemNumber": "60025",
              "name": "Test_artikl_1",
              "description": "",
              "groupId": "9e176565-9804-409c-a4dd-46dcf9d2fe00",
              "groupNumber": 1,
              "groupName": "Skupina 1",
              "taxCode": "21"
            },
            "itemFieldList": [
              {
                "customField": {
                  "id": "de61d907-28eb-4960-b3ae-fb21025b3965",
                  "name": "Barva",
                  "codeName": "barva",
                  "fieldType": 1,
                  "dataType": 8,
                  "order": 5
                },
                "value": "c5dced09-8740-4d48-b269-4dec1e3f2c97",
                "selectedValue": "Modrá"
              }
            ],
            "entryType": 2
          },
          {
            "unit": {
              "id": "8a89c27a-e9df-4edb-aa44-6605c0928a36",
              "unit": "ks",
              "decimalPlaces": 0
            },
            "entryType": 3
          },
          {
            "unit": {
              "id": "1cb88c21-fe6a-4160-b4a7-b79cc090adda",
              "unit": "kg",
              "decimalPlaces": 2
            },
            "measurementUnitRatio": 4,
            "entryType": 4
          },
          {
            "price": 3000,
            "priceTotal": 15000,
            "entryType": 7
          },
          {
            "code": "21",
            "taxRate": 21,
            "taxableValue": 3000,
            "taxValue": 630,
            "valueWithTax": 3630,
            "entryType": 8
          },
          {
            "price": 4500,
            "priceTotal": 22500,
            "entryType": 5
          },
          {
            "code": "21",
            "taxRate": 21,
            "taxableValue": 4500,
            "taxValue": 945,
            "valueWithTax": 5445,
            "entryType": 6
          }
        ]
      }
    ]
  }
}
```

### Delete

Marks specific contract as deleted - soft delete, contract is not removed, but is not visible in the application.

|              |                                                            |
| ------------ | ---------------------------------------------------------- |
| Endpoint:    | `DELETE /contract-planning-service/api/Contract/{id:uuid}` |
| Permissions: | `com.elixeum.contract-planning.delete` (required)          |
| Parameters:  | `id:uuid` (required) Contract identification               |

### Examples

<!-- tabs:start -->

#### **Request**

```log
DELETE /contract-planning-service/api/Contract/f75a5d05-41f0-4176-990b-7f81447be521
```

#### **cURL**

```shell
curl -X DELETE \
     "$API/contract-planning-service/api/Contract/f75a5d05-41f0-4176-990b-7f81447be521"
```

<!-- tabs:end -->

### Status change

Updates status to specific contract.

|              |                                                                                   |
| ------------ | --------------------------------------------------------------------------------- |
| Endpoint:    | `PUT /contract-planning-service/api/Contract/{id:uuid}/status/{statusId:uuid}`    |
| Permissions: | `com.elixeum.contract-planning.edit` (required)                                   |
| Parameters:  | `id:uuid` (required) Contract identification                                      |
|              | `statusId:uuid` (required) Status identification                                  |
| Note:        | To list all statuses use [ContractTypeCustomField/List](#ContractTypeCustomField) |

### Examples

<!-- tabs:start -->

#### **Request**

```log
PUT /contract-planning-service/api/Contract/f75a5d05-41f0-4176-990b-7f81447be521/status/0121d2ba-7b35-4c81-9560-256b3013df36
```

#### **cURL**

```shell
curl -X PUT \
     "$API/contract-planning-service/api/Contract/f75a5d05-41f0-4176-990b-7f81447be521/status/0121d2ba-7b35-4c81-9560-256b3013df36"
```

<!-- tabs:end -->

### Get

Gets specific contract by its **id**.

|              |                                                         |
| ------------ | ------------------------------------------------------- |
| Endpoint:    | `GET /contract-planning-service/api/Contract/{id:uuid}` |
| Permissions: | `com.elixeum.contract-planning.can-use` (required)      |
| Parameters:  | `id:uuid` (required) Contract identification            |

### Examples

<!-- tabs:start -->

#### **Request**

```log
GET /contract-planning-service/api/Contract/f75a5d05-41f0-4176-990b-7f81447be521/status/0121d2ba-7b35-4c81-9560-256b3013df36
```

#### **cURL**

```shell
curl -X GET \
     "$API/contract-planning-service/api/Contract/f75a5d05-41f0-4176-990b-7f81447be521"
```

<!-- tabs:end -->

### List

Gets a list of contracts.

|              |                                                                                 |
| ------------ | ------------------------------------------------------------------------------- |
| Endpoint:    | `GET /contract-planning-service/api/Contract/{id:uuid}`                         |
| Permissions: | `com.elixeum.contract-planning.list` (required)                                 |
| Parameters:  | `offset:int` The number of records that is skipped                              |
|              | `count:int` The maximum number of records to return                             |
|              | `showDeleted:bool (default = false)` Set `true` to include deleted records      |
|              | `includeResolved:bool (default = true)` Set `true` to include resolved records  |
|              | `unscheduled:bool (default = false)` Set `true` to include unscheduled records  |
|              | `includeCustomFields:bool (default = true)` Set `true` to include custom fields |
|              | `contractTypeId:uuid` Set for list contracts with specific **ContractType**     |

### Examples

<!-- tabs:start -->

#### **Request**

```log
GET /contract-planning-service/api/Contract/list?offset=0&count=50&showDeleted=false&includeResolved=true&unscheduled=false&unscheduled=true
```

#### **cURL**

```shell
curl -X GET \
     "$API/contract-planning-service/api/Contract/list?offset=0&count=50&showDeleted=false&includeResolved=true&unscheduled=false&unscheduled=true"
```

<!-- tabs:end -->

### General enums

```json
PaymentType
{
    Cash = 0,
    PaymentCard = 1,
    MoneyTransfer = 2
}

PaymentStatus
{
    Unpaid = 0,
    Paid = 1
}
```

## ContractType

ContractType is necessary to existence of Contract.

### List

Gets a list of contract types.

|              |                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint:    | `GET /contract-planning-service/api/ContractType/list`                                                                                                      |
| Permissions: | `com.elixeum.contract-planning.list` (required)                                                                                                             |
| Parameters:  | `offset:int` The number of records that is skipped                                                                                                          |
|              | `count:int` The maximum number of records to return                                                                                                         |
| Note:        | For listing the first top 50 records, use the endpoint without parameters. For accessing another page or more records, use `offset` and `count` parameters. |

### Examples

<!-- tabs:start -->

#### **Request**

```log
GET /contract-planning-service/api/ContractType/list?offset=0&count=200
```

#### **cURL**

```shell
curl -X GET \
     "$API/contract-planning-service/api/ContractType/list?offset=0&count=200"
```

<!-- tabs:end -->

## ContractTypeCustomField

Optional custom fields for contract

### List

Gets a list of contract type custom fields.

|              |                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint:    | `GET /contract-planning-service/api/contractTypeCustomField/list/{contractTypeId:uuid}`                                                                     |
| Permissions: | `com.elixeum.contract-planning.list` (required)                                                                                                             |
| Parameters:  | `contractTypeId:uuid` Contract type identification                                                                                                          |
|              | `offset:int` The number of records that is skipped                                                                                                          |
|              | `count:int` The maximum number of records to return                                                                                                         |
| Note:        | For listing the first top 50 records, use the endpoint without parameters. For accessing another page or more records, use `offset` and `count` parameters. |

### Examples

<!-- tabs:start -->

#### **Request**

```log
GET /contract-planning-service/api/contractTypeCustomField/list/7b2c7daf-d691-41d6-ad2c-b3f51ba90cc6?offset=0&count=200
```

#### **cURL**

```shell
curl -X GET \
     "$API/contract-planning-service/api/contractTypeCustomField/list/7b2c7daf-d691-41d6-ad2c-b3f51ba90cc6?offset=0&count=200"
```

<!-- tabs:end -->

## WorkflowStatus

Required for create contract. Need to be set all workflow first and assign it to the ContractType.

### List

Gets a list of workflows.

|             |                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint:   | `GET /contract-planning-service/api/workflow/status/list/{workflowId:uuid}`                                                                                 |
| Permissions | `com.elixeum.contract-planning.list` (required)                                                                                                             |
| Parameters: | `workflowId:uuid` Workflow identification. It's set to `ContractType.WorkflowId`                                                                            |
|             | `offset:int` The number of records that is skipped                                                                                                          |
|             | `count:int` The maximum number of records to return                                                                                                         |
| Note        | For listing the first top 50 records, use the endpoint without parameters. For accessing another page or more records, use `offset` and `count` parameters. |

### Examples

<!-- tabs:start -->

#### **Request**

```log
GET /contract-planning-service/api/workflow/status/list/7b2c7daf-d691-41d6-ad2c-b3f51ba90cc6?offset=0&count=200
```

#### **cURL**

```shell
curl -X GET \
     "$API/contract-planning-service/api/workflow/status/list/7b2c7daf-d691-41d6-ad2c-b3f51ba90cc6?offset=0&count=200"
```

<!-- tabs:end -->

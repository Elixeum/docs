# Contract Planning

## Authentication

All endpoints on **Contract Planning** requires authentication using valid JWT token.

Token must be filled in `Authorization` request header, for example `Authorization: Bearer {token}`.

### Supported Tokens

- **User Token** :heavy_check_mark:
- **Application Token** :heavy_check_mark: (recommended)

?> See more about authentication [here](/developer/api/README?id=authentication).

## Contract

### Create

Creates new contract.

|              |                                                   |
| ------------ | ------------------------------------------------- |
| Endpoint:    | `POST /contract-planning-service/api/Contract`    |
| Permissions: | `com.elixeum.contract-planning.create` (required) |
| Parameters:  | `contract.contractTypeId` (required)              |
|              | `contract.typeNumber` (required)                  |

#### contract.contractTypeId + contract.typeNumber

To get contractTypeId and typeNumber use endpoint [ContractType/List](#ContractType)

#### contract.contractFields

To get customFieldId use endpoint [ContractTypeCustomField/List](#ContractTypeCustomField)

#### document.contact

System supports 2 types of contact [Person, Organization].
Person object:

```json
"person": {
    "pin": "nova@osoba.com",
    "firstName": "Nová",
    "lastName": "Osoba",
    "phone": "+420464646462"
}
```

Organization object:

```json
"organization": {
    "name": "Nová organizace",
    "email": "nova@org.cz",
    "phone": "+420131316515",
    "cin": "12345678"
}

//optional part
"agent": {
    "person": {
        "pin": "kontaktni@osoba.cz",
        "firstName": "Kontaktní",
        "lastName": "Osoba"
    },
    "phone": "+420161561651",
    "isDeleted": false,
    "email": "kontaktni@osoba.cz",
    "agentType": {
        "name": "Kontakt"
    }
}
```

### Examples

Example request body for contract with customer as person:

```json
{
  "contract": {
    "name": "Testovací zakázka",
    "contractTypeId": "7b2c7daf-d691-41d6-ad2c-b3f51ba90cc6",
    "typeNumber": 1,
    "startDate": "2023-11-14T23:00:42.604Z",
    "deliveryType": 0,
    "paymentType": 0,
    "paymentStatus": 1,
    "requiredDeliveryDate": "2023-11-20T09:53:00.000Z",
    "note": "test",
    "latitude": 49.27190110341535,
    "longitude": 16.687297634751694,
    "totalPrice": 500,
    "currencyCode": "CZK",
    "totalPriceAfterDiscount": 500,
    "profit": 500,
    "contractFields": [
      {
        "customFieldId": "d3ee8130-edaf-48eb-868c-b3e1982854e6",
        "value": "true",
        "selectedValue": null,
        "codeName": "Test",
        "order": 1
      }
    ]
  },

  //optional part
  "document": {
    "date": "2023-11-15T08:55:03.860Z",
    "currencyCode": "CZK",
    "contact": {
      "roleType": 0, //customer
      "email": "nova@osoba.com",
      "person": {
        "pin": "nova@osoba.com",
        "firstName": "Nová",
        "lastName": "Osoba",
        "phone": "+420464646462"
      },
      "phone": "+420464646462",
      "displayName": "Nová Osoba",
      "identifier": "nova@osoba.com",
      "addresses": [
        {
          "contactPurposeType": {
            "code": "BILLING"
          },
          "addressLine1": "Fakturační",
          "postalCode": "12345",
          "countryCode": "CZ",
          "city": "Adresa"
        },
        {
          "contactPurposeType": {
            "code": "DELIVERY"
          },
          "addressLine1": "Dodací",
          "postalCode": "12345",
          "countryCode": "CZ",
          "city": "Adresa"
        }
      ]
    },
    "items": [
      {
        "itemNumber": "1",
        "name": "Testovací artikl",
        "quantity": 5,
        "measurementUnit": "Ks",
        "measurementUnitId": "6d69d6d5-4208-46b2-8572-0c55fac54353",
        "price": 100,
        "priceWithVat": 100,
        "priceTotal": 500,
        "priceTotalWithVat": 500,
        "position": 1,
        "currencyCode": "CZK",
        "currencySymbol": "Kč",
        "itemFields": []
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
|              | `contract.contractTypeId` (required)            |
|              | `contract.typeNumber` (required)                |

### Examples

Example request body:

```json
{
  "contract": {
    "id": "f75a5d05-41f0-4176-990b-7f81447be521",
    "externalId": null,
    "typeNumber": 1,
    "contractTypeId": "7b2c7daf-d691-41d6-ad2c-b3f51ba90cc6",
    "contractNumber": "Z230000254",
    "name": "Testovací zakázka",
    "statusId": "0121d2ba-7b35-4c81-9560-256b3013df36",
    "contactRoleId": "12d2d1ab-287e-43ed-87eb-30ece061e69a",
    "contactDisplayName": "Nová Osoba",
    "deliveryType": 0,
    "paymentType": 0,
    "paymentStatus": 1,
    "requiredDeliveryDate": "2023-11-20T10:53:00+01:00",
    "startDate": "2023-11-15T00:00:42.604+01:00",
    "completionDate": null,
    "note": "test (update)",
    "latitude": 49.22651691750713,
    "longitude": 17.666979661367296,
    "parentId": null,
    "contractFields": [
      {
        "customFieldId": "d3ee8130-edaf-48eb-868c-b3e1982854e6",
        "value": "true",
        "selectedValue": null,
        "codeName": "Test",
        "order": 1
      }
    ],
    "totalPrice": 500,
    "totalPriceWithVat": 500,
    "currencyCode": "CZK",
    "totalPurchasePrice": 0,
    "discountValue": 0,
    "totalPriceAfterDiscount": 500,
    "profit": 500,
    "duration": null,
    "endDate": null
  },

  //optional part
  "document": {
    "date": "2023-11-15T08:55:03.860Z",
    "currencyCode": "CZK",
    "contact": {
      "roleType": 0, //customer
      "email": "nova@osoba.com",
      "person": {
        "pin": "nova@osoba.com",
        "firstName": "Nová",
        "lastName": "Osoba",
        "phone": "+420464646462"
      },
      "phone": "+420464646462",
      "displayName": "Nová Osoba",
      "identifier": "nova@osoba.com",
      "addresses": [
        {
          "contactPurposeType": {
            "code": "BILLING"
          },
          "addressLine1": "Fakturační",
          "postalCode": "12345",
          "countryCode": "CZ",
          "city": "Adresa"
        },
        {
          "contactPurposeType": {
            "code": "DELIVERY"
          },
          "addressLine1": "Dodací",
          "postalCode": "12345",
          "countryCode": "CZ",
          "city": "Adresa"
        }
      ]
    },
    "items": [
      {
        "itemNumber": "1",
        "name": "Testovací artikl",
        "quantity": 5,
        "measurementUnit": "Ks",
        "measurementUnitId": "6d69d6d5-4208-46b2-8572-0c55fac54353",
        "price": 100,
        "priceWithVat": 100,
        "priceTotal": 500,
        "priceTotalWithVat": 500,
        "position": 1,
        "currencyCode": "CZK",
        "currencySymbol": "Kč",
        "itemFields": []
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

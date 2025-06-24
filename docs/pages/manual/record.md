# Record

## Record imports

Records can be imported via a CSV file (UTF-8). This file should follow the following structure:

File header definition:

```text
itemType;itemNumber;name;note;quantity;price;discount;parentNumber
```

Detailed information about each column can be found in the following table:

| Column       | Description                                       | Value type     | Mandatory | Example     | Note                                                       |
| ------------ | ------------------------------------------------- | -------------- | --------- | ----------- | ---------------------------------------------------------- |
| itemType     | Item type                                         | Enum (Integer) | Yes       | 1           | 1 - Goods and materials, 2 - Services and activities       |
| itemNumber   | Article code                                      | Text           | Yes       | test-import |                                                            |
| name         | Aricle name                                       | Text           | Yes       | Test Import |                                                            |
| note         | Note to add to the record                         | Text           | No        | Test Record |                                                            |
| quantity     | Quantity of item in the record                    | Number         | Yes       | 2           |                                                            |
| price        | Price of the item in the record                   | Number         | Yes       | 500         |                                                            |
| discount     | Discount of the item in the record                | Number         | Yes       | 10.5        |                                                            |
| parentNumber | `itemNumber` of a parent bill of materials to use | Text           | No        | false       | Only virtual item or item marked as composite can be used! |

File example: [Download](/assets/records_import_example.csv ":ignore")

Additional notes:

- If Item with provided `itemNumber` exists in Item Maintenance, it will be used to create the record and its **name** and **type** will be used instead of the provided values
- If Item with provided `parentNumber` exists in Item Maintenance, it has to be marked as a **Composite**. If it's not, the import will fail. Items that don't exist in Item Maintenance can always be composites.

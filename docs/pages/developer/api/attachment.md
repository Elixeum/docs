# Attachment

## Authentication

All endpoints on **Contract Planning** requires authentication using valid JWT token.

Token must be filled in `Authorization` request header, for example `Authorization: Bearer {token}`.

### Supported Tokens

- **User Token** :heavy_check_mark:
- **Application Token** :heavy_check_mark: (recommended)

?> See more about authentication [here](/developer/api/README?id=authentication).

### Add

Upload file as attachment linked to specific context (Contract, Contact, ... ).
**Content-Type: multipart/form-data**

|              |                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Endpoint:    | `POST /{SERVICE-NAME}/api/attachment`                                                           |
| Permissions: | `com.elixeum.{SERVICE-NAME-PERMISSION}.manage-attachment` (required)                            |
| Parameters:  | `file` (required) File by TenantSetting - **AllowedAttachments**                                |
|              | `addAttachmentDto` (required) Object with additional info required to upload file as attachment |

#### SERVICE-NAME

- contract-planning-service (Contract planning module)
- party (CRM module)

#### SERVICE-NAME-PERMISSION

- contract-planning (Contract planning module)
- party (CRM module)

#### addAttachmentDto

- `contextId` (required) - ID of context like contract or contact.
- `attachmentType` (required) - Default (1) or Poster (2). Mostly is used Default(1) to upload attachment to list. To see image on main page of contract use Poster(2).
- `roleIdList` (optional) - Attachment visible only to roles from this list. Default is empty list to see for all users.
- `description` (optional) - Text description.
- `attachmentDictionaryId` (optional) - ID of dictionary. Default is NULL for not using dictionary.

### Examples

```json
------WebKitFormBoundaryIlQ9FJM6iEp15vDH
Content-Disposition: form-data; name="file"; filename="sample.jpg"
Content-Type: image/jpeg


------WebKitFormBoundaryIlQ9FJM6iEp15vDH
Content-Disposition: form-data; name="addAttachmentDto"

{
  "contextId":"f29d9156-e840-4da8-9fec-8db3662be91e",
  "attachmentType":1,
  "roleIdList":[],
  "description":null,
  "attachmentDictionaryId":null
}
------WebKitFormBoundaryIlQ9FJM6iEp15vDH--
```

#### **cURL**

```shell
curl -L -X POST '$API/contract-planning-service/api/attachment' \
-F '=@"/C:/Samples/sample.jpg"' \
-F 'addAttachmentDto="{\"contextId\":\"f29d9156-e840-4da8-9fec-8db3662be91e\",\"attachmentType\":1,\"roleIdList\":[],\"description\":null,\"attachmentDictionaryId\":null}"'
```

# Elixeum API

The Elixeum Platform and its API is built on a standard **REST API** using the HTTPS protocol and **JSON** or **ProtoBuffer** (preview version) data formats. JSON is more suitable for general access but if your application is traffic aware and needs to cut-down overhead with JSON parsing and smaller data transfers.

!> Currently ProtoBuffer schemes are distributed after whitelisting the partner

## Authentication

The **JSON Web Tokens** format or JWT is used for authentication. There are two types of JWT tokens - user and application.

### User Token

The user token is valid for 24 hours and it is useful when you need to interact with API as the user itself, for example mobile application UI.
Keep in mind the user can revoke the token/session and token became blacklisted/invalid after that.

?> Every action using this token will be recorded in audit log as user's action

User token issued by **POST** request to `/auth-service/api/auth/login` with simple JSON payload

```json
{
    "tenantId": "tenant-UUID",
    "username": "user@company.org",
    "password": "user-passowrd"
}
```

### Application Token

The app token is valid for expiration time set by user when manually issued - by default it never expires. It is useful when pernament communication is needed like application to application.

Token is issued manually by user using Platform's web interface. Application token has also baked-in all permissions selected during issuing.

?> Not all endpoints may accept application token, especially where user ID is needed

## JSON Web Key Sets

There are two **JSON Web Key Sets** (JWKS) endpoints to verify both token types.

|Type|URL|Comment|
|--|--|--|
|**User**|`/.well-known/jwks`|Certificated based. Used across all tenants.|
|**Application**|`/apps/.well-known/jwks`|Private key based. Tenant and token specific.|

> The **User JWKS is subject-to-change**, they will be changed to be tenant specific and private key based.

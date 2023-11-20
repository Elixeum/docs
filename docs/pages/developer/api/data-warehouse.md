# Data Warehouse

In the Data Warehouse system, you can store various types of data and use our comprehensive pipeline and scripting system to work with your data, visualize it and use even advanced features like Machine Learning.

!> This page is work-in-progress, advanced features may be missing

# Writing Data

Writing a data into data lake is possible in three ways:

- Single item - just a single instance of information
- Multiple items - "array" of information (limited to overal size)
- Streaming - real-time API for extreme high-volume and high-frequence data

?> Only **Single item** is currently exposed for users and public, if you want to test and help us shape the **Multiple** or **Streaming** APIs - get in touch with us

## Authentication

To write your data into a data lake, you must use **application token** (user tokens are forbidden and not accepted) with at least one permission `com.elixeum.data-warehouse.item-write` to enable writing with this token. Try to minimize the number of permissions for this token, as it should be used only for writing, avoid making tokens with many permissions.

When you have created an application token for your tenant - add this token as usual to `Authorization: Bearer` HTTP header.

Please **do not share** the token outside as with this token - anyone can write to your data lake and sinks any data.

## Sinks

Sinks are essentially the incoming API for your data, think about them as "named shelves" for your data. For example, if you want to create temperature measurements for the city of Prague, you will create a sink named `temperature-prague` and store all data about temperatures in there, you can also create sinks based on years etc. It is really up to you how to categorize the data.

?> The only current limitation is the pipelines support only one sink as input, but you can create a few pipelines with various sinks and store them in the same output mount

These sinks must be created beforehand to use sinks API for writing - if you try to write into non-existing sink, the error will occure. Sinks are tenant-scoped, so you can you whatever names you want to and it will not collide with others.

### Compression

Sinks also support compression, so if you know your data will be a good fit for compression to lower disk requirements, you can set compression for the sink.

!> You can change the compression type after the sink is created, but already written data will stay in the previously selected compression

| Compression     | Usage                                                           |
| --------------- | --------------------------------------------------------------- |
| Brotli Optimal  | Brotli compression with good balance between size and speed     |
| Brotli Smallest | Brotli compression with maximum focus on smallest size possible |
| Gzip Optimal    | Gzip compression with good balance between size and speed       |
| Gzip Smallest   | Gzip compression with maximum focus on smallest size possible   |
| Zstd            | Planned, not supported yet                                      |
| L4Z             | Planned, not supported yet                                      |

#### Why should I select different compression types?

If you want to lower your requirements for storage (e.g. your tenant limits), it's a good idea to select compression in **Optimal** configuration. Using **Smallest** compression configuration will lower size more, but it will increase decompression time during pipeline processing and increase compute time required to process your pipelines.

It really depends on your data, some data will get compressed but the benefit will not be significant, but some will and can benefit from compression heavily. We use standardized compression algorithms, so feel free to offline test your data before making a decision.

From our testing using **Brotli Optimal** is generally good for any smaller text-based payloads like JSON or XML.

### Data Type

Sinks can contain various data types, but the type must be defined beforehand to make assumptions down the line in processing pipelines.

| Format   | Content Type               | Comment                                                             |
| -------- | -------------------------- | ------------------------------------------------------------------- |
| JSON     | `application/json`         | Generic JSON format, structure is not enforced. JSON must be valid. |
| XML      | `application/xml`          | Planned, not supported yet                                          |
| ProtoBuf | `application/x-protobuf`   | Planned, not supported yet                                          |
| Binary   | `application/octet-stream` | Planned, not supported yet                                          |

### Deletion

If you decide to delete a sink - keep in mind this is one-way operation and your data are lost and its impossible to recover them!

## API

When you have created a token and a sink, you can now write your data into it using REST API.

?> The API is using a URL-based versioning scheme, please use the latest `/vX/` prefix to get the latest features

Use `POST` HTTP method and the `/data-warehouse/api/v1/sink/{sink-name}` endpoint to write your data into selected sink.
Do not forget to add tokens and proper content-type headers for successful writing.

When a write is successful the API returns `200 OK` status code.

## Browser

You can use a simple data lake browser in our web application interface to confirm the data are properly stored. Keep in mind this UI is only meant for confirmation and some basic checks, no advanced filtering or any complex operations are not possible and not planned.

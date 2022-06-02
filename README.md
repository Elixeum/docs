# Elixeum Documentation

Work-in-progress documentation system which aims to replace Confluence with technical documentation.
Please write all new documentation into this system instead of Confluence.

## How to write documentation
Currently the documenation system is divided into two parts:
 - **public**
   - Documentation suitable for everyone hosted publicaly on `docs.elixeum.cloud`
 - **private**
   - Our internal documentation which should not be shared publicaly including any keys or secrets

At the begining just select in which part of documentation your text should be and create sub-folder or just `.md` file and write your text.

> In the future the documenation will be physically divided - once the public part becomes really public.

### Markdown

All documentation is using Markdown for formatting your text, this documenation system has few extensions like Mermaid for diagrams or tabs for - obviously - tabs which can be used for code examples in various languages.

Some of these are used in `rules.md` so go and have a look at it :smile:

## How to start

Due browsers security limitations you can not open directly `index.html` as it will block loading external resources due `file://` protocol.
You need to setup simple local server to serve assets, for example you can use Node and pre-existing `serve.js` to start simple HTTP server.

```shell
node serve.js --port <port> # Default is 8080
```

You may enable verbose output by passing `--verbose` flag - this will enable additional logs.

*Note that at least Node **version 15+** is required.*

## Docker support

The primary way how to run this is to use Docker and behind reverse proxy. Because of this the `Dockerile` and `compose.yml` does not expose any ports, as the container is meant to be behind reverse proxy on same network which will route requests to it.

If you want to test Docker version locally, just expose internal port **80** to something like **8085** on your local network.

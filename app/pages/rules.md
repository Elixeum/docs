# Rules and Tips for Writing Documentation

First of all - **K**eep **I**t **S**imple **S**tupid - I know, I know that's obvious but really - try to image you are describing the problematic to yourself before you gain that knowledge.

?> Keeping things simple and easy makes great documentation for future readers.

## Private Documentation

As the private documentation will be used only inside our company, you can sometimes relax few obivous things, but still keep in mind - people with fresh minds will read your text and you don't want to be bother thru Slack to give them more information as your text doesn't cover everything - right?

## Public Documentation

Important thing is - do not leak any private information in public documention including API keys and others. Another crucial things is to test, keep updated and make sure your text is still applicable and in working state.

# Formatting

There are several ways how to formate your text including diagrams and code samples - go ahead and inspect code of this page to see it in action!

## Flowchart

[Mermaid](https://mermaid-js.github.io/mermaid/#/) powered flowchart demo.

```mermaid
flowchart LR
    A o--o B
    B <--> C
    C x--x D
```

## Code Samples

Code samples using tabs as well to show samples using different languages.

<!-- tabs:start -->
#### **C#**

Hello C#!

```csharp
ILogger log = this.ServiceByType<ILogger>();
```

#### **JavaScript**

Bonjour JavaScript!

```javascript
let log = this.ServiceByType("ILogger");
```
<!-- tabs:end -->

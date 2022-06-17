# Elixeum Code Style

In Elixeum we use code styles based on which language is being used, if you working on extension or application which will use our services - you may use our code style as inspiration to have cleaner and unified style.

## REST Guidelines

1. Route is lower-cased

2. Route does not ends with `/`

3. Multiple words are separated using dash `-`

### Example

```
GET /crm-service/customers/list-all
```

## C# Code Style

The general rule we follow is "use Visual Studio defaults".

1.  We use [Allman style](http://en.wikipedia.org/wiki/Indent_style#Allman_style) braces, where each brace begins on a new line.

2.  We use four spaces of indentation (no tabs).

3.  We use `_camelCase` for internal and private fields and use `readonly` where possible. Prefix instance fields with `_`, static fields with `s_` and thread static fields with `t_`. When used on static fields, `readonly` should come after `static` (i.e. `static readonly` not `readonly static`).

4.  We avoid `this.` unless absolutely necessary.

5.  We always specify the visibility, even if it's the default (i.e. `private string _foo` not `string _foo`). Visibility should be the first modifier (i.e. `public abstract` not `abstract public`).

6.  Namespace imports should be specified at the top of the file, _outside_ of `namespace` declarations and should be sorted alphabetically.

7.  Avoid more than one empty line at any time. For example, do not have two blank lines between members of a type.

8.  Avoid spurious free spaces. For example avoid `if (someVar == 0)...`, where the dots mark the spurious free spaces. Consider enabling "View White Space (Ctrl+E, S)" if using Visual Studio, to aid detection.

9.  If a file happens to differ in style from these guidelines (e.g. private members are named `m_member` rather than `_member`), the existing style in that file takes precedence.

10.  We only use `var` when it's obvious what the variable type is (i.e. `var stream = new FileStream(...)` not `var stream = OpenStandardInput()`).

11.  We use language keywords instead of BCL types (i.e. `int, string, float` instead of `Int32, String, Single`, etc) for both type references as well as method calls (i.e. `int.Parse` instead of `Int32.Parse`). See issue [391](https://github.com/dotnet/corefx/issues/391) for examples.

12.  We use PascalCasing to name all our constant local variables and fields. The only exception is for interop code where the constant value should exactly match the name and value of the code you are calling via interop.

13.  We use `nameof(...)` instead of `"..."` whenever possible and relevant.

14.  In class implementation constructors are places at top above properties (by [SA1201.md](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/SA1201.md))

15.  For database table and column names we use Upper-CamelCase name convention.
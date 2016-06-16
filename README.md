# gulp-typescript-cs-poco

## Overview

See https://github.com/Evertras/typescript-cs-poco for actual implementation.  This is just a ~~tribute~~ wrapper.

Gulp-typescript-cs-poco is a Gulp plugin that translates basic C# POCO classes like this:

```C#
public class MyPoco
{
	public string Name { get; set; }
	public int Id { get; set; }
	public long Value { get; set; }
	public bool IsValid { get; set; }
	public SomeOtherPoco RelatedObject { get; set; }
}
```

Into this Typescript file:

```typescript
interface MyPoco {
	Name: string;
	Id: number;
	Value: number;
	IsValid: boolean;
	RelatedObject: SomeOtherPoco;
}
```

## Installation

Install with NPM:

```shell
npm install --save-dev gulp-typescript-cs-poco
```

## Use

```javascript
var pocoGen = require('gulp-typescript-cs-poco');

gulp.task('poco', function () {
  return gulp.src('Models/*.cs')
              .pipe(pocoGen())
              .pipe(gulp.dest('Scripts/myPocoTsFolder'));
})
```

This will create a single .ts file for every .cs file it finds.  You can combine this with tools like gulp-concat to turn this into one file if desired.

## Options

Options can be passed into the function to alter behavior.  You can pass in only the options you need, or none at all for default behavior.

```javascript
var pocoGen = require('gulp-typescript-cs-poco');

gulp.task('poco', function () {
  return gulp.src('Models/*.cs')
              .pipe(pocoGen({
                prefixWithI: true,
                baseNamespace: 'MyNamespace',
                dateTimeToDate: true,
                propertyNameResolver: function camelCaseResolver(propName) { return propName[0].toLowerCase() + propName.substring(1); }
			  }))
              .pipe(gulp.dest('Scripts/myPocoTsFolder'));
})
```

Or:

```javascript
var pocoGen = require('gulp-typescript-cs-poco');

gulp.task('poco', function () {
  var pocoGenOptions = {
    prefixWithI: true,
    baseNamespace: 'MyNamespace',
    dateTimeToDate: true,
    propertyNameResolver: function camelCaseResolver(propName) { return propName[0].toLowerCase() + propName.substring(1); }
  };

  return gulp.src('Models/*.cs')
              .pipe(pocoGen(pocoGenOptions))
              .pipe(gulp.dest('Scripts/myPocoTsFolder'));
})
```

##### prefixWithI

Defaults to false.  If set to true, all interfaces (but not enums) will be prefixed with I.  The conversion will now look like this:

```C#
public class MyPoco
{
	public string Name { get; set; }
	public int Id { get; set; }
}
```

To:

```typescript
interface IMyPoco {
	Name: string;
	Id: number;
}
```

##### baseNamespace

If supplied, wraps all classes into a module with the same name.  Example:

```C#
public class MyPoco
{
	public string Name { get; set; }
	public int Id { get; set; }
}
```

```typescript
module MyNamespace {
	export interface IMyPoco {
		Name: string;
		Id: number;
	}
}
```

Note that using this option with gulp concat() will create many individual module/interface declarations.  This is technically valid, but if you want a nice, clean version run concat() first on all your .cs files and then run this plugin with the baseNamespace option to wrap EVERYthing in a single module namespace.

##### dateTimeToDate

Defaults to false.  Due to serialization/deserialization complications, the default implementation is to transform DateTime fields to strings, as that's what they naturally turn into in most .NET APIs.  If you want to treat the type as a Date, *first make sure your API is handling the serialization properly*!  Then provide the dateTimeToDate option set to true to turn this:

```C#
public class MyPoco
{
  public DateTime Timestamp { get; set; }
  public double Value { get; set; }
}
```

Into this:

```typescript
interface IMyPoco {
  Timestamp: Date;
  Value: number;
}
```

##### definitionFile

Defaults to true.  If explicitly set to false, the output file will not be of type d.ts and any baseNamespace being used will not have declare before the module name.

##### propertyNameResolver

If supplied, this function will be called every time a property is resolved.  The function takes a single parameter of the name of the property and should return the transformed name as a string.  For example, the function might turn the property name into camelCase, or prepend it with a prefix of some sort to help match an API-side transformation.

##### ignoreVirtual

If set to true, virtual properties will be ignored.  This is useful for things like EF-created POCOs that may have virtual reference fields that shouldn't be included.

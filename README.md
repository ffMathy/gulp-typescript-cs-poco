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
				baseNamespace: 'MyNamespace'
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
	baseNamespace: 'MyNamespace'
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
# gulp-typescript-cs-poco

## Overview

See https://github.com/ffMathy/typescript-cs-poco for actual implementation.  This is just a wrapper.

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

For a full list of options available, see: https://github.com/ffMathy/typescript-cs-poco

Options can be passed into the function to alter behavior.  You can pass in only the options you need, or none at all for default behavior.

```javascript
var pocoGen = require('gulp-typescript-cs-poco');

gulp.task('poco', function () {
  return gulp.src('Models/*.cs')
              .pipe(pocoGen({
                //options go here
	      }))
              .pipe(gulp.dest('Scripts/myPocoTsFolder'));
})
```

Or:

```javascript
var pocoGen = require('gulp-typescript-cs-poco');

gulp.task('poco', function () {
  var pocoGenOptions = {
     //options go here
  };

  return gulp.src('Models/*.cs')
              .pipe(pocoGen(pocoGenOptions))
              .pipe(gulp.dest('Scripts/myPocoTsFolder'));
})
```

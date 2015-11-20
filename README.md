# gulp-typescript-cs-poco

## Overview

See https://github.com/Evertras/typescript-cs-poco for actual implementation.  This is just a wrapper.

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
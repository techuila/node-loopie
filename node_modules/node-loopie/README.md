# node-loopie [![NPM version](https://img.shields.io/npm/v/node-loopie.svg?style=flat)](https://www.npmjs.com/package/node-loopie) [![NPM monthly downloads](https://img.shields.io/npm/dm/node-loopie.svg?style=flat)](https://www.npmjs.com/package/node-loopiel) [![NPM total downloads](https://img.shields.io/npm/dt/node-loopie.svg?style=flat)](https://www.npmjs.com/package/node-loopie)

Reduce your code with node-loopie. Routes declaration, models, and etc... node-loopie will shorten it for you.
Converts your nodejs files in a folder to an object.

- **Declarative:** node-loopie helps you shorten your code, you don't have to declare multiple properties to export your object or even initialize function(s). It makes recognition of objects easier with just looking at your file names.

## Installation

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save node-loopie
```

### Usage

**Arguments**

`nl(folder_path, callback, ignore_file_names, extension_name)`

- `folder_path (required)` : [String] folder path of the files you want to loop.
- `callback` : [Function] function to be executed. passes 3 arguments: `file` [String], `filename` [String], `file` [File].
- `ignore_file_names` : [Array (String)] array of file names to be ignored in a folder.
- `extension_name` extension name of the files you want to loop from.

## Examples

### Sequelize (index.js)

```js
const Loopie = require('node-loopie');
const path = require('path');
const Sequelize = require('sequelize');
const env = NODE_ENV || 'localhost';
const config = require('/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

// Get all the filename inside the models folder
Loopie(__dirname, (file) => {
	const model = require(path.join(__dirname, file))(
		sequelize,
		Sequelize.DataTypes
	);
	db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

### Express Routes (index.js)

```js
const express = require('express');
const Loopie = require('node-loopie');
const app = express();

Loopie(__dirname, (file, fileName) => {
	app.use(`/api/${fileName}`, require(path.join(__dirname, file)));
});
```

### Author

**Axl Cuyugan**

- [github/techuila](https://github.com/jonschlinkert)
- [twitter/Techuila\_\_](https://twitter.com/Techuila__)

### License

Released under the [ISC License](LICENSE).

---

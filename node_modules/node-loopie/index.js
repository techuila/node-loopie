const fs = require('fs');
const path = require('path');

module.exports = (location = null, cb, basename = [], ext = '.js') => {
	if (!basename) basename = [];

	if (location === null) throw new Error('Path is not');

	fs.readdirSync(location)
		.filter((file) => {
			const file_split = file.split('.');
			const file_ext = '.' + file_split[file_split.length - 1];

			return (
				file.indexOf('.') !== 0 &&
				basename.concat([`index${ext}`]).every((name) => name !== file) &&
				file_ext === ext
			);
		})
		.forEach((file) => {
			const r_file = fs.readFileSync(path.join(location, file), 'utf8');

			cb(file, file.split('.')[0], r_file);
		});
};

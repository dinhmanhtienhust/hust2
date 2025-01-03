const fs = require('fs');
const filename = './dataStudent.json';

const data = fs.readFileSync(filename, 'utf8');
const arrSV = JSON.parse(data);

console.log('Origin');
console.log(arrSV);


import variable from "./export.js"
import { subtract, multiply, divide } from "./another_export.js"

console.log(variable(2, 4));
console.log(subtract(2, 4));
console.log(multiply(2, 4));

//package.json file is essential as otherwise the import and export files are not able to
//communicate with one another. Furthermore, in package.json you need to set the type to module.
//package.json is like the commander of all your javascript files.

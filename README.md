# currency-conversion-algo
find the best &amp; short path for currency conversion rate


##### DATA ARRAY
```javascript
// Currency Object
var data = {
  "USD": {
      "EURO": 1,
      "YEN": 0.8,
      "AUD": 0.1
  },
  "EURO": {
      "USD": 0.3,
      "ALL": 2,
  },
  "YEN": {
    "USD": 1.0
  },
  "TEST": {
    "PKR": 4
  },
  "ALL": {
      "EURO": 0.1,
      "TEST": 3
  },
  "AUD": {
      "PKR": 0.2
  }
};
```
##### INPUT DATA
```javascript
// Input Data
const currency = "USD";
const target = "PKR";
const amount = 10;
```
##### OUT DATA
```javascript
// Compile all possible path with dependency in depth
const compiled = compilePaths(amount, currency, target, data);

// output data
const bestPath = compiled.shortest;
const paths = compiled.paths;

// calculate rate using shortest path
const rate = rateCalculator(compiled.shortest);
console.log("Using best path");
console.log(`Rate from ${currency} > ${target} : ${rate}`);

console.log("// shortest path");
console.log(`Shortest path: ${bestPath}`);

console.log("--------------------------");

console.log(`All possible paths: `);
for(let p of paths ){
  console.log(`${p}`);
}
```
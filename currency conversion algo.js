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

// store visited currency
const checkedQueue = [];
let path = [];
// recursive function to go in depth on nodes
const recursiveFinder = (target, current, currencies) => {
// if currency not exists in main root skip that
if(typeof currencies[current] == undefined)
  return false;


let finder = false;
// store path that already visited
if(path.indexOf(current) == -1)
  path.push(current);
for( c in currencies[current]){  
  // if current currency matched to target return the rate
  if(c == target){
    path.push(target);
    return currencies[current][c];
  }
  // check if currency exits in main root and haven't visited yet
  if(typeof currencies[c] !== "undefined" && checkedQueue.indexOf(c) == -1){
    // mark as visited
    checkedQueue.push(c);
    // do recursion in depth based on dependancy on other currencies
    let v = recursiveFinder(target, c, currencies);
    if(v)
      finder = v;
  }
}
// return if recursion found target currency in depth
// it will return false if we didn't found target currency
return finder;
}

// Compile all possible paths
const compilePaths = (current, target, currencies) => {
  checkedQueue.push(current);
  if(typeof currencies[current] !== "undefined"){

      // check if sub-array contain target currency
      if(typeof currencies[current][target] !== "undefined"){
        return {
          shortest: [current, target],
          paths: [[current, target]]
        };
      }else{
        // variable to store best shortest path
        let shortest = [];
        let paths = [];
        for(curr in currencies[current]){

          // do the recursion to go in the dept
          path = [current];
          let v = recursiveFinder(target, curr, currencies);
          
          // store the most shortest path
          if((path.length < shortest.length) || shortest.length == 0){
            if(v !== false)
              shortest = path;
          }

          // record all possible paths
          if(v !== false)
            paths.push(path);
        }
        // return data
        return {
          shortest: shortest,
          paths: paths
        }
     }
  }
  return "ERROR";
}

// Calculate rate based on given path
const rateCalculator = (amount, source) => {
let path = [...source];
let currentCurrency = path.shift();
let finalRate = null;
for(let p of path){
  if(finalRate)
    finalRate += (data[currentCurrency][p] * amount);
  else
    finalRate = (data[currentCurrency][p] * amount);
  currentCurrency = p;
}
return finalRate;
}

// Input Data
const currency = "USD";
const target = "PKR";
const amount = 50;

// Compile all possible path with dependency in depth
const compiled = compilePaths(currency, target, data);

// output data
const bestPath = compiled.shortest;
const paths = compiled.paths;

// calculate rate using shortest path
const rate = rateCalculator(amount, compiled.shortest);
console.log("Using best path");
console.log(`Rate from ${currency} > ${target} : ${rate}`);

console.log("// shortest path");
console.log(`Shortest path: ${bestPath}`);

console.log("--------------------------");

console.log(`All possible paths: `);
for(let p of paths ){
  console.log(`${p}`);
}
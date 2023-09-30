// transfer all items : 
function transferAllItems(source, target) {
  // set all data from source to target :
  target.push([...source]);

  // empty the source array :
  source.length = 0;
}


// transfer one item : 
function transferItem(source, target, v) {
  const sourceIndex = source.indexOf(v);

  if (sourceIndex !== -1) {
    target.push(v);
    source.splice(sourceIndex, 1);
  }
}


// transfer mutiple values :
function transferItems(source, target, values) {
  const valuesToTransfer = [];


  for (const value of values) {
    const index = source.indexOf(value);

    if (index !== -1) {
      valuesToTransfer.push(value);
      source.splice(index, 1);
    }
  }

  target.push(...valuesToTransfer);
}


const source = ["foo", "bar", "prop"];
const target = [];

console.log(`BEFORE [SOURCE] : ${source}`);
console.log(`BEFORE [TARGET] : ${target}`);

transferItems(source, target, ["bar", "foo"]);

console.log(`AFTER [SOURCE] : ${source}`);
console.log(`AFTER [TARGET] : ${target}`);

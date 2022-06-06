Array.prototype.myMap = function (callback) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callback(this[i], i, this));
  }
  return output;
};

Array.prototype.myFilter = function (callback) {
  const output = [];
  console.log('filter');

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) {
      output.push(this[i]);
    }
  }
  return output;
};

Array.prototype.myReducer = function (callback, initialvalue) {
  let accumulator = initialvalue;
  for (let i = 0; i < this.length; i++) {
    if (i === 0 && initialvalue === undefined) {
      accumulator = this[i];
    } else {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

const testArray = [3, 4, -56, 1, 77, -365, 300036, 76, 786, 2346, 567, 7];

const filteredArr = testArray.myFilter(function (a) {
  return a < 76;
});
const mappedArr = testArray.myMap(function (a, b) {
  return a + b;
}, 10);
const reducedArr = testArray.myReducer(function (a) {
  return a * 2;
});

console.log('filteredArr', filteredArr);
console.log('mappedArr', mappedArr);
console.log('reducedArr', reducedArr);

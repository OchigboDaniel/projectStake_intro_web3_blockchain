function every(array, test) {
  // Your code here.
  let checker = true;
  let n = 0;
  while(array.length > n){
    if (test(array[n]) === false){
        checker = false;
    }
    n++;
  }
  return checker
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
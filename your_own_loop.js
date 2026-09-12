<<<<<<< HEAD
function loop(value, testFunc, updateFunc, bodyFunc){
    while (testFunc(value)) {
        bodyFunc(value);
        value = updateFunc(value);        
    }    
}

loop(3, n => n > 0, n => n - 1, console.log);
=======
function loop(value, test, update, body) {
  for (let current = value; test(current); current = update(current)) {
    body(current);
  }
}

loop(3, n => n > 0, n => n - 1, console.log);
>>>>>>> 5a58babf47ddbbf6e8cad3edc80bfd10a46d65fc

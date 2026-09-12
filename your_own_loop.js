function loop(value, testFunc, updateFunc, bodyFunc){
    while (testFunc(value)) {
        bodyFunc(value);
        value = updateFunc(value);        
    }    
}

loop(3, n => n > 0, n => n - 1, console.log);
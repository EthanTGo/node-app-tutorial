//When creating a new promise, we need to create a function with two arguments
const p = new Promise(function(resolve, reject){
    //Do something Asynchronous...
    //... either resolve or reject
    setTimeout(() => {
        // resolve(1);
        reject(new Error('message'));
    }, 2000);

});

p.then(result => console.log('Result',result))
.catch(err => console.log('Error', err.message));
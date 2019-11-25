
//return a promise that has already resooved
const p = Promise.resolve({id:1});
p.then(result => console.log(result));

const k = Promise.reject(new Error('reson for rejection'));
k.catch(error => console.log(error))
//Asynchronous program
//After two second, the function in the setTimeout block will be executed
// Callbacks, a callback is a function executed after another function is finished executing

// console.log('Before');
// getUser(1, getUsera); //will get undefined since getUser will be undefuned until it returns
// console.log('After');

function getUsera(user){
   getRepositories(user.gitHubUsername, dislayRepo);
}

function dislayRepo(repos){
    console.log(repos);
}

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'ethan'});
    }, 2000);
    }
    
    function getRepositories(username, callback) {
        setTimeout(() => {
            console.log('Repositories')
            callback(['repo1', 'repo2', 'repo3']);
        }, 2000);
    }
/* Promises: A javascript object that holds the eventual results of an asynchronous operation
//Either a result or Error
 in 3 States: Pending (async operation), Fulfilled (success), Rejected (Error)*/
 function getAnt(id){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        resolve({id: id, gitHubUsername: 'ethan'});
    }, 2000);
    })

    }

    function getBlue(username){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                console.log('Repositories')
                resolve(['repo1', 'repo2', 'repo3']);
            }, 2000);
        })
    }


getAnt(1)
    .then(user => getBlue(user.gitHubUsername))
    .then(repos => console.log(repos))
    .catch(err => console.log('Error', err.message));


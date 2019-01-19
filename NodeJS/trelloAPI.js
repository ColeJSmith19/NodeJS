var APIKey = "";
var Token = "";
const axios = require('axios');
const readline = require('readline');
// const prompt = require('prompt');
const rl1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("1. Create a board.");
console.log("2. Create a list on a board.");
console.log("3. Delete a board.");
console.log("4. View all boards.")
rl1.question('Select an option by entering the cooresponding number. ', (answer) => {
  rl1.close();
  switch(answer){
    case '1':
      createBoard();
      break;
    case '2':
      createListOnBoard();
      break;
    case '3':
      deleteBoard();
      break;
    case '4':
      viewAllBoards();
      break;
    default:
      console.log("Sorry, that's not an option.");
  }
})


// console.log("1. Create a board.");
// console.log("2. Create a list on a board.");
// console.log("3. Delete a board.");
// console.log("4. View all boards.")
// rl1.question('Choose an option by number. ',(answer)=>{
//   rl1.close();
//   if(answer == 1)
//     createBoard();
//   else if(answer == 2)
//     createListOnBoard();
//   else if(answer == 3)
//     deleteBoard();
//   else if(answer == 4)
//     viewAllBoards();
//   else
//     console.log("Sorry, that's not an option.")
// })

//createBoard();
//viewAllBoards();
//deleteBoard();
//createListOnBoard();


function viewAllBoards(){
axios.get('https://api.trello.com/1/members/me/boards?key=' + APIKey + '&token=' + Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Select a board to view its lists. ', (answer) => {
    rl.close();
    axios.get('https://api.trello.com/1/boards/' + response.data[(answer-1)].id + '/lists?key=' + APIKey + '&token=' + Token).then(response => {
      for(var i = 0; i < response.data.length; i++){
        console.log((i+1)+'. ' + response.data[i].name);
      }
      console.log(response.data[answer].id)
    })
  });
}).catch(error => {
  console.log(error);
});
};

function createBoard(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Let's make a new board. What should it be called? ", (answer) => {
    rl.close();
    axios.post('https://api.trello.com/1/boards/?name=' + answer + 
    '&defaultLabels=true&defaultLists=true&keepFromSource=none&prefs_permissionLevel=private&prefs_voting=disabled&prefs_comments=members&prefs_invitations=members&prefs_selfJoin=true&prefs_cardCovers=true&prefs_background=blue&prefs_cardAging=regular&key='
     + APIKey + '&token=' + Token);
  })
};

function deleteBoard(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + APIKey + '&token=' + Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log(i+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Select a board to delete. ', (answer) => {
    rl.close();
    axios.delete('https://api.trello.com/1/boards/' + response.data[answer].id + '?key=' + APIKey + '&token=' + Token);
  });
}).catch(error => {
  console.log(error);
});
};

function createListOnBoard(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + APIKey + '&token=' + Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl2.question('Select a board to add a list to. ', (answer) => {
    var boardID = response.data[(answer-1)].id;
    rl2.close();
    //var boardID = "5c4264f558431a105d1ccd4d"; 
    const rl3 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl3.question('What do you want to name the list? ', (name)=> {
      rl3.close();
      console.log('https://api.trello.com/1/lists?name=' + name + '&idBoard=' + boardID + '&key=' + APIKey + '&token=' + Token)
    axios.post('https://api.trello.com/1/lists?name=' + name + '&idBoard=' + boardID + '&key=' + APIKey + '&token=' + Token);
    //try adding a list named (name) to the board with the id (answer)
  })
    

   });
// }).catch(error => {
//   console.log(error);
// });
});


// const https = require('https');

// console.log('https://api.trello.com/1/members/me/boards?key=' + APIKey + '&token=' + Token);

// https.get('https://api.trello.com/1/members/me/boards?key=' + APIKey + '&token=' + Token, (resp) => {
//   let data = '';

//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

}
//var APIKey = '';
//var Token = '';
const axios = require('axios');
const readline = require('readline');
const readlinesync = require('readline-sync');
global.APIKey;
global.Token;

// const prompt = require('prompt');

// getKeyAndToken();
main();

// function getKeyAndToken(){
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Enter your API Key', (api)=>{
//     rl.close();
//     global.APIKey = api;
//   })  
// };

function main(){

global.APIKey = readlinesync.question('Enter your API key - ');
global.Token = readlinesync.question('Enter your token - ');

console.log("1. Create a board.");
console.log("2. Create a list on a board.");
console.log("3. Delete a board.");
console.log("4. View all boards.");
console.log("5. Create card on list.");
console.log("6. Remove card from list.");
console.log("7. Rename a list.");
console.log("8. Rename a card on a list.");
const rl1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
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
    case '5':
      createCardOnList();
      break;
    case '6':
      removeCardFromList();
      break;
    case '7':
      renameList();
      break;
    case '8':
      renameCardOnList();
      break;
    default:
      console.log("Sorry, that's not an option.");
  }
});
}


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
axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
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
    axios.get('https://api.trello.com/1/boards/' + response.data[(answer-1)].id + '/lists?key=' + global.APIKey + '&token=' + global.Token).then(response => {
      for(var i = 0; i < response.data.length; i++){
        console.log((i+1)+'. ' + response.data[i].name);
      }
      //console.log(response.data[answer].id)
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
  axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Select a board to delete. ', (answer) => {
    rl.close();
    //var canDelete = readlinesync.question('Are you sure you wish to delete this board? Y/N ');
    //if(canDelete == 'Y'){
      axios.delete('https://api.trello.com/1/boards/' + response.data[(answer-1)].id + '?key=' + global.APIKey + '&token=' + global.Token);
    //}
    
  });
}).catch(error => {
  console.log(error);
});
};

function createListOnBoard(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
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
      //console.log('https://api.trello.com/1/lists?name=' + name + '&idBoard=' + boardID + '&key=' + APIKey + '&token=' + Token)
    axios.post('https://api.trello.com/1/lists?name=' + name + '&idBoard=' + boardID + '&key=' + global.APIKey + '&token=' + global.Token);
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

function createCardOnList(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select a board to view its lists. ', (board) => {
    rl.close();
    axios.get('https://api.trello.com/1/boards/' + response.data[(board-1)].id + '/lists?key=' + global.APIKey + '&token=' + global.Token).then(response => {
      for(var i = 0; i < response.data.length; i++){
        console.log((i+1)+'. ' + response.data[i].name);
      }
      const rl1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl1.question('Select a list to add a card to. ', (list) =>{
        rl1.close();
        var listID = response.data[(list-1)].id;
        
        const rl2 = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl2.question('What would you like to name the card? ', (cardName)=>{
          rl2.close();
          axios.post('https://api.trello.com/1/cards?name=' + cardName + '&idList=' + listID + '&keepFromSource=all&key=' + global.APIKey + '&token=' + global.Token);
        })

      })
    })
  })

})
}

function removeCardFromList(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select a board to view its lists. ', (board) => {
    rl.close();
    axios.get('https://api.trello.com/1/boards/' + response.data[(board-1)].id + '/lists?key=' + global.APIKey + '&token=' + global.Token).then(response => {
      for(var i = 0; i < response.data.length; i++){
        console.log((i+1)+'. ' + response.data[i].name);
      }
      const rl1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl1.question('Select a list to view its cards. ', (list) =>{
        rl1.close();
        var listID = response.data[(list-1)].id;
        
        axios.get('https://api.trello.com/1/lists/' + listID + '/cards?key=' + global.APIKey + '&token=' + global.Token).then(response =>{
          for(var j = 0; j < response.data.length; j++){
            console.log((j+1)+ '. ' + response.data[j].name);
          }
          const rl2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl2.question('Select a card to remove. ', (card) =>{
            rl2.close();
            var cardID = response.data[(card-1)].id;
            axios.delete('https://api.trello.com/1/cards/' + cardID + '?key=' + global.APIKey + '&token=' + global.Token);
          })
        })

      })
    })
  })

})
}

function renameList(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select a board to view its lists. ', (board) => {
    rl.close();
    axios.get('https://api.trello.com/1/boards/' + response.data[(board-1)].id + '/lists?key=' + global.APIKey + '&token=' + global.Token).then(response => {
      for(var i = 0; i < response.data.length; i++){
        console.log((i+1)+'. ' + response.data[i].name);
      }
      const rl1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl1.question('Select a list to rename. ', (list) =>{
        rl1.close();
        var listID = response.data[(list-1)].id;
        const rl2 = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl2.question('What would you like to name the list? ', (listName)=>{
          rl2.close();
          axios.put('https://api.trello.com/1/lists/' + listID + '/name?value=' + listName + '&key=' + global.APIKey + '&token=' + global.Token)
        })
      })
    })
  })
})
}

function renameCardOnList(){
  axios.get('https://api.trello.com/1/members/me/boards?key=' + global.APIKey + '&token=' + global.Token).then(response => {
  console.log("Here are all your boards.");
  for(var i = 0; i < response.data.length; i++){
    console.log((i+1)+'. ' + response.data[i].name);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select a board to view its lists. ', (board) => {
    rl.close();
    axios.get('https://api.trello.com/1/boards/' + response.data[(board-1)].id + '/lists?key=' + global.APIKey + '&token=' + global.Token).then(response => {
      for(var i = 0; i < response.data.length; i++){
        console.log((i+1)+'. ' + response.data[i].name);
      }
      const rl1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl1.question('Select a list to view its cards. ', (list) =>{
        rl1.close();
        // if(response.data.length <= 0){
        //   return;
        // }
        var listID = response.data[(list-1)].id;
        
        axios.get('https://api.trello.com/1/lists/' + listID + '/cards?key=' + global.APIKey + '&token=' + global.Token).then(response =>{
          for(var j = 0; j < response.data.length; j++){
            console.log((j+1)+ '. ' + response.data[j].name);
          }
          const rl2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl2.question('Select a card to rename. ', (card) =>{
            rl2.close();
            var cardID = response.data[(card-1)].id;
            
            const rl3 = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });
            rl3.question('What would you like to name it? ', (name) =>{
              rl3.close();
              axios.put('https://api.trello.com/1/cards/' + cardID + '?name=' + name + '&key=' + global.APIKey + '&token=' + global.Token)
            })
          })
        })

      })
    })
  })

})
}
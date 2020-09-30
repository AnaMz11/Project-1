// console.log("hey")
//4 squares (maybe add more later)
//color of buttons will be black
//color change of buttons will be yellow
//game starts with computer turn - after that it will be rotating (computer > user)
//round 1 computer will randomly change color for one of the buttons at random
//then it will be the player's turn to "click" that same button and it will also light up
//once the player makes the choice it will go back to computers turn 
//round 2 computer will randmly change color for 2 buttons
//then it will be the player's turn to "click" those same buttons and they will also light up
//this will go on until the player makes a mistake - at then the game will restart
//ADD ONS ========
//the player will be able to restart the game at any point with the restart buttom 

//game starts when the computer changes color for one rando

//oneset timeout function



//Change message on who's turn it is
function handlePlayerChange(){
    // currentPlayer = currentPlayer === "Your" ? "Mine" : "Your";
    statusDisplay.innerHTML = currentPlayerTurn();
  }
  
  
  //GLOBAL Variable to keep track of rounds
  let round = 1;
  ////GLOBAL Variable - computer choice starts as empty array and random selections are pushed to array
  let computerChoice = [];
  
  
  //store status elements to use later
  const statusDisplay = document.querySelector('.game-status');
  // //display message after a condition is met
  // const correctRound = () => {`It's ${currentPlayer} turn!`};
  
// function messageDisplay () {
//   if (exptectedButton === computerChoice)
// }
const arrayOfMessages = ["On to the next round!","Wow! Great Job!"]
const wrongChoiceMessage = ["Wrong choice! You have to start over!"]

//fucntion to change color of buttons
const colorChange = (event) => {
  //event target to target all the buttons
  event.target.style.backgroundColor = 'yellow'
}

//array of buttons
const buttonsArray = document.querySelectorAll('.button')
buttonsArray.forEach((button => {
  button.addEventListener('click', (event) => {
    //TELLS ME WHICH BUTTONS ARE CLICKED
    console.log(event.target)

    event.target.style.backgroundColor = 'yellow'
    setTimeout(() => {
      event.target.style.backgroundColor = 'black'
      //shift removes the first element array to check selection
      let exptectedButton = computerChoice.shift()
      if (exptectedButton === event.target.id){
        //user selected correct button
        //if no more choices left then increment round.
        if(computerChoice.length === 0){
          statusDisplay.innerHTML = Math.floor(Math.random() * arrayOfMessages.length);
          round++;
          colorButton(0);
        }ß
      } else{
        //user selected wrong, reset the game.
        statusDisplay.innerHTML = `${wrongChoiceMessage[0]}`;
        setTimeout(() => {
        },2000);
        round=1;
        computerChoice = [];
        colorButton(0);
      }
    }, 1000);
    // colorChange(event)
    // buttonTimer(event)
    // alert(event.target)
  })
}))


//empty event - the event is defined in the buttons array function
const buttonTimer = (event) => {
  // console.log(event)
  setTimeout(() => {
    event.target.style.backgroundColor = 'black'
  }, 1000);
}


//LOOP through array of buttons and change color of 1 button
for (let i = 0; i <buttonsArray.length; i++) {
  // console.log(i)
 let randomButton = Math.floor(Math.random()* 4)
 buttonsArray[0].style.order = randomButton
 console.log(randomButton)
}



function colorButton (currentIndex) {
    // statusDisplay.innerHTML = ""
  if(currentIndex<round){
    let randomButton = Math.floor(Math.random()* 4)
    //pushing ID of button to
    computerChoice.push(buttonsArray[randomButton].id)
    buttonsArray[randomButton].style.backgroundColor = 'yellow'
    setTimeout(() => {
      buttonsArray[randomButton].style.backgroundColor = 'black'
      setTimeout(() => {
        colorButton(++currentIndex);
      },1000);
    }, 1000);
  }
}



//Restart Game
function handleStartGame () {
  statusDisplay.innerHTML = "Starting Game"
  //calls colorButton Function
  colorButton(0)

}


//EVENT LISTENERS

//START BUTTON
document.querySelector('.game-reset').addEventListener("click",handleStartGame);
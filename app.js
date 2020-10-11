//Pseudo Code === Ideas
//4 squares (maybe add more later)
//color of buttons will be black
//color change of buttons will be yellow
//game starts with computer turn - after that it will be rotating (computer to user)
//round 1 computer will randomly change color for one of the buttons at random
//then it will be the player's turn to "click" that same button and it will also light up
//once the player makes the choice it will go back to computers turn 
//round 2 computer will randmly change color for 2 buttons
//then it will be the player's turn to "click" those same buttons and they will also light up
//this will go on until the player makes a mistake - at then the game will restart

//Get modal element
const modal = document.getElementById('simpleModal');
//Get open modal button 
const modalBtn = document.getElementById('modalBtn');
//Get close button
const closeBtn = document.getElementsByClassName('closeBtn')[0];

//listen for click
modalBtn.addEventListener('click', openModal);
//liste for close click
closeBtn.addEventListener('click', closeModal);
//listen for outside click
window.addEventListener('click', clickOutside);


//function to open modal
function openModal(){
  modal.style.display = 'block';
}

//function to close modal
function closeModal(){
  modal.style.display = 'none';
}

//function to close modal if click is outsude modal box
function clickOutside(e){
  if(e.targe === modal){
    modal.style.display = 'none';
  }
}


//GLOBAL Variable to keep track of rounds
let round = 1;
////GLOBAL Variable - computer choice starts as empty array and random selections are pushed to array
let computerChoice = [];

//store status elements to use later
const statusDisplay = document.querySelector('.game-status');

//status display
const arrayOfMessages = ["On to the next round!","Wow! Next Round!","You Rock! Next Round!", "Woohoo! Next Round", "Incredible! Next Round!", "Great! Next Round!", "Spectacular! Next Round!","Awesome! Next round!"]

//fucntion to change color of buttons
const colorChange = (event) => {
  //event target to target all the buttons
  event.target.style.backgroundColor = '#FFD700'
}

//array of buttons
const buttonsArray = document.querySelectorAll('.button')
buttonsArray.forEach((button => {
  button.addEventListener('click', (event) => {
    //TELLS ME WHICH BUTTONS ARE CLICKED
    // console.log(event.target)
    event.target.style.backgroundColor = '#FFD700'
    setTimeout(() => {
      event.target.style.backgroundColor = 'black'
      //shift removes the first element array to check selection
      let exptectedButton = computerChoice.shift()
      //user selected correct button go it the loop to meet conditions
      if (exptectedButton === event.target.id){
        //if no more choices left then increment round.
        if(computerChoice.length === 0){
          const randomNum = Math.floor(Math.random() * arrayOfMessages.length);
          //displays a winning message from the winning array
          statusDisplay.innerHTML = arrayOfMessages[randomNum] 
          //checks for win - can be changed to any number and will go up to that round
          if(round === 10){
            statusDisplay.innerHTML = "Congratulations! You won the game!" 
            document.querySelector('.game-reset').style.visibility = "visible";
            //exit the condition and have to restart the game
            return 
          } else {
            colorButton(0);
          }
          //increments round if user choice is correct
          round++;
        }
      } else{
        //user selected incorrect choice - game ends
        statusDisplay.innerHTML = "Wrong choice! Press Start and try again!";
        setTimeout(() => {
          document.querySelector('.game-reset').style.visibility = "visible";
        },500);
      }
    }, 500);
  })
}))



function colorButton (currentIndex) {
  if(currentIndex<round){
    // console.log(currentIndex)
    let randomButton = Math.floor(Math.random()* 4)
    //pushing ID of button to empty array for computer choice
    computerChoice.push(buttonsArray[randomButton].id)
    buttonsArray[randomButton].style.backgroundColor = '#FFD700'
    setTimeout(() => {
      buttonsArray[randomButton].style.backgroundColor = 'black'
      setTimeout(() => {
        colorButton(++currentIndex);
      },500);
    }, 500);
  }
}


//Restart Game
function handleStartGame () {
  statusDisplay.innerHTML = "Starting Game! Good Luck!"
  round=1;
  // document.querySelector('.game-reset').disabled = true;
  document.querySelector('.game-reset').style.visibility = "hidden";
  colorButton(0)
}


//START BUTTON
document.querySelector('.game-reset').addEventListener("click",handleStartGame);


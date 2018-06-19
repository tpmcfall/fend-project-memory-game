let allCards = ["fa fa-diamond", "fa fa-diamond",
                  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                  "fa fa-anchor", "fa fa-anchor",
                  "fa fa-bolt", "fa fa-bolt",
                  "fa fa-cube", "fa fa-cube",
                  "fa fa-leaf", "fa fa-leaf",
                  "fa fa-bicycle", "fa fa-bicycle",
                  "fa fa-bomb", "fa fa-bomb"]


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(allCards) {
    var currentIndex = allCards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = allCards[currentIndex];
        allCards[currentIndex] = allCards[randomIndex];
        allCards[randomIndex] = temporaryValue;
    }

    return allCards;
}


 const deck = document.querySelector('.deck');
 let openCards = [];
 let matchedCards = [];
 let timerOn = false;
 let timer = null;
 //make cards shuffle even when reset using browser instead of button
 newGame();

 //remove cards and symbols
function newGame(){
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }

  shuffle(allCards);

  allCards.forEach (function createCard(element){
    //create card
    const cardClass = document.createElement('li');
    cardClass.classList.add('card');
    //create symbol
    const card = document.createElement('i');
    let classArray = element.split(' ');
    let class1 = classArray[0];
    let class2 = classArray[1];
    card.classList.add(class1);
    card.classList.add(class2);
    //add card and symbol together
    deck.appendChild(cardClass);
    cardClass.appendChild(card);
  })
}

deck.addEventListener('click', function(event)  {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    //starRating();
    if (!timerOn) {
      timer = setInterval(startTimer, 1000);
      timerOn = true;
    }
    if (openCards.length === 2) {
      addMoves();
      starRating();
      cardMatch();
    }
  }
});
//check if card is already a matched
function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    openCards.length < 2 &&
    !openCards.includes(clickTarget)
  )
}
//flip cards
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}
//add clicked cards to an array
function addToggleCard(clickTarget){
  openCards.push(clickTarget);
}
//check if cards are matched if 2 cards are flipped
function cardMatch() {
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  )
//lock flipped cards if matched & add to matched array
  {
    let firstCard = openCards[0].children[0].classList.value;
    let secondCard = openCards[1].children[0].classList.value;
    matchedCards.push(firstCard, secondCard);
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
    winGame(matchedCards);
  }
  //reset flipped cards if not a match
  else {
    setTimeout(function () {
      toggleCard(openCards[0]);
      toggleCard(openCards[1]);
      openCards = [];
    }, 1000);
  }
}
//check if all cards are matched
function winGame(matchedCards) {
  if (matchedCards.length === 2) {
    //stop timer
    clearInterval(timer);
    timer = null;
    showWin();
  }
}
//show win screen and stats if all cards are matched
function showWin() {
  popUp();
  winStars();
  winScreenStats();
}

function popUp() {
  const win = document.querySelector('.win-background');
  win.classList.toggle('hide');
}

function winScreenStats() {
  const winTimeStat = document.querySelector('.win-time');
  const winTimeMinutes = document.querySelector('#minutes').innerHTML;
  const winTimeSeconds = document.querySelector('#seconds').innerHTML;
  const winMoves = document.querySelector('.win-moves');
  const winStarsStat = document.querySelector('.win-stars');

  winTimeStat.innerHTML = 'Time = ' + winTimeMinutes + ':' + winTimeSeconds;
  winMoves.innerHTML = 'Moves = ' + moves;
  winStarsStat.innerHTML = 'Stars = ' + starCount;
}

let starCount = 0;

function winStars() {
  if (moves < 16) {
    starCount = 3;
  }
  if (moves > 15 && moves < 25) {
    starCount = 2;
  }
  if (moves > 24 && moves < 31) {
    starCount = 1;
  }
  else {
    starcount = 0;
  }
}

document.querySelector('.win-replay').addEventListener('click', function () {
  resetGame();
  popUp();
});

document.querySelector('.win-close').addEventListener('click', function () {
  popUp();
})

//start timer on first click(doesnt work yet)
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function startTimer() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
//moves counter
var movesCounter = document.getElementById("moves");
var moves = 0

function addMoves(){
  moves += 1;
  movesCounter.innerHTML = moves;
}
//star rating
const stars = document.querySelector('.stars');

function starRating() {
  if (moves === 16) {
    stars.removeChild(stars.firstElementChild);
  }
  if (moves === 25) {
    stars.removeChild(stars.firstElementChild);
  }
  if (moves === 30) {
    stars.removeChild(stars.firstElementChild);
  }
}
//reset game
const restart = document.querySelector('.restart');

restart.addEventListener('click', function (){
  resetGame();
});

  function resetGame() {
    //reset stars
    resetStars();
    //stop timer
    clearInterval(timer);
    //reset timer to 0
    secondsLabel.innerHTML = '00'
    minutesLabel.innerHTML = '00'
    timerOn = false;
    timer = null;
    totalSeconds = 0;
    //reset moves counter
    moves = 0;
    movesCounter.innerHTML = moves;
    //shuffle cards
    newGame();
  }
//add correct number of stars back
function resetStars() {
  if (moves >= 12) {
    let li = document.createElement('li');
    li.classList.add('fa');
    li.classList.add('fa-star');
    stars.appendChild(li);
  }
  if (moves >= 20) {
    let li = document.createElement('li');
    li.classList.add('fa');
    li.classList.add('fa-star');
    stars.appendChild(li);
  }
  if (moves >= 30) {
    let li = document.createElement('li');
    li.classList.add('fa');
    li.classList.add('fa-star');
    stars.appendChild(li);
  }
}

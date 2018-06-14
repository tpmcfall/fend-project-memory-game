/*
 * Create a list that holds all of your cards
 */
let allCards = ["fa fa-diamond", "fa fa-diamond",
                  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                  "fa fa-anchor", "fa fa-anchor",
                  "fa fa-bolt", "fa fa-bolt",
                  "fa fa-cube", "fa fa-cube",
                  "fa fa-leaf", "fa fa-leaf",
                  "fa fa-bicycle", "fa fa-bicycle",
                  "fa fa-bomb", "fa fa-bomb"]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 //make cards flip
 const deck = document.querySelector ('.deck');
 let openCards = [];
 let matchedCards = [];
 let timerOn = false;

deck.addEventListener('click', function(event)  {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (!timerOn) {
      setInterval(startTimer, 1000);
      timerOn = true;
    }
    if (openCards.length === 2) {
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
  if (matchedCards.length === 16) {
    console.log('all cards matched!!!');
  }
}
//show win screen and stats if all cards are matched

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
//stop timer on last click

//moves counter

//star rating

//reset game










// make the cards flip over and show their symbol
// does not reset after 2 cards are flipped
// does not check if cards match
//var card = document.getElementsByClassName("card");

//for (var i = 0; i < card.length; i++) {
  //card[i].addEventListener("click", function() {
    //this.className += " open show";
//  });
//}

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
//make cards flip (not working....yet!!!)
var card = document.getElementsByClassName('.card');
var openCard = [];
var everyCard = document.querySelectorAll('.card');

function click(){
  everyCard.forEach(function(card){
    card.addEventListener('click', function(e){
      openCard.push(card);
      card.classList.add('open', 'show');
      //this.className += " open show";
      //console.log(openCard);
    })
  })
}
//for (var i = 0; i < card.length; i++) {
  //card[i].addEventListener("click", function() {
    //this.className += " open show";
    //var cardSymbol = card.firstChild.classname;
    //flippedCards();
//  });
//}
//add flipped cards to array
//function flippedCards(){
  //var currentFlippedCards = [];
  //var addCards = currentFlippedCards.push(cardSymbol);
  //console.log(currentFlippedCards);
//}
//check if cards are matched if 2 cards are flipped

//reset flipped cards if not a matched

//lock flipped cards if matched

//add matched cards to an array

//check if all cards are matched

//show win screen and stats if all cards are matched

//start timer on first click

//stop timer on last click

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

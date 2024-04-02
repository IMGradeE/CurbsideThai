"use strict"

/*ID's
div: game
div: startForm
input: numSymbols
button: startButton
 */
//
window.addEventListener("load", init);

function init (){
    const startForm = document.getElementById("startForm");
    const game = document.getElementById("game");
    const head = document.head;

    // add class to startform div and game div
    game.setAttribute("class","outerFieldset");
    startForm.setAttribute("class","grid");

    //Track wins/losses, cards flipped.
    let sessionWins = 0;
    let sessionLosses = 0;
    let sessionFlipped = 0;

    // TODO if any of these const's are defined, "welcome back", else nothing
    const previousWins = localStorage.getItem("wins")
    sessionWins += parseInt(previousWins);
    const previousLosses = localStorage.getItem("losses");
    sessionLosses += parseInt(previousLosses);
    const previousFlipped = localStorage.getItem("flipped")
    sessionFlipped += parseInt(previousFlipped);
    let symbolPairs = 0;

    // set max symbols to 8, min to 3,
    let numSymbols = document.getElementById("numSymbols");
    numSymbols.setAttribute("max", "8");
    numSymbols.setAttribute("min", "3"); // Otherwise what's the point?
    numSymbols.setAttribute("value", "3");

    // add stylesheet
    let globalSheet = document.createElement("link");
    globalSheet.setAttribute("rel", "stylesheet");
    globalSheet.setAttribute("href", "styles/global.css");
    head.appendChild(globalSheet);

    // add style element?
    let sheet = document.createElement("style");
    sheet.setAttribute("type", "css");
    sheet.setAttribute("id", "initStyle");

    //add styles
    head.appendChild(sheet);
    sheet.innerHTML += ("div{} "/*TODO*/);

    /* IDEAS FOR STYLES
    * CSS animation transitions from one color to another by using a linear gradient*/

    // add event listener that saves wins/losses
    window.addEventListener("beforeunload", beforeUnload(sessionWins,sessionLosses,sessionFlipped))

    document.getElementById("startButton").addEventListener("click", function(){
        symbolPairs = parseInt(numSymbols.value)*2;
        // TODO generate symbols dynamically
        //Hide everything in div#startform
        startForm.style.display = "none";
        // run Game (returns a list of [bool, cardsFlipped]
        // TODO pass aray as argument instead of number of cards
        let resultJSON = gameFunc(symbolPairs, game);
        if ( resultJSON.win === true){
            ++sessionWins
        }else{
            ++sessionLosses
        }
        sessionFlipped += resultJSON.flipped;
    });


}

// returns win:bool, flipped:int(number), flipped and win are counted in init.
function gameFunc(/*pairs, */nCards,game){
    /*let nCards = pairs.length;*/
    let pSquares = [4,9,16];
    let nRows=0, nCols=0;
    let colClass;
    // Insert (pairs) divs
    // Math.sqrt(nPairs).toFixed(0) === Math.sqrt(nPairs)
    // This condition is overpowered given the range of inputs only contains 3 perfect squares but I still like it
    if(pSquares.includes(nCards)){
        nRows = Math.sqrt(nCards);
        nCols = nRows;
        colClass = "col_"+(100/nCols);
    }else{
        nRows = 4;
        nCols = nCards/4;
        colClass = "col_25";
    }
    /*TODO add alt behavior*/

    // should probably move this to a helper

    for (let i = 0; i < nRows; ++i){
        let rowDiv = document.createElement("div");
        for (let j = 0; j < nCols; ++j){
            let cardID = i+j;
            let cardIDString = "card_"+cardID;
            //This is a container for the symbol cards,
            // I still need to insert the actual cards.
            /*TODO insert symbols*/
            let colDiv = document.createElement("div");
            let cardDiv = document.createElement("div");
            cardDiv.setAttribute("class", "gridEntry");
            colDiv.setAttribute("class", colClass);
            cardDiv.setAttribute("id", cardIDString);
            cardDiv.addEventListener("click", function (){
                cardDiv.style.display = "none";
            });
            cardDiv.innerHTML = "@";
            colDiv.appendChild(cardDiv);
            rowDiv.appendChild(colDiv);
        }
        document.getElementById("game").appendChild(rowDiv);
    }
    return {win: true, flipped: 5};
}

// function sets all localstorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
function beforeUnload( wins, losses, flips) {
    localStorage.getItem("wins", wins);
    localStorage.getItem("losses", losses);
    localStorage.getItem("flips", flips);
}


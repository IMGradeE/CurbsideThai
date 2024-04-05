"use strict"

/*ID's
div: game
div: startForm
input: numSymbols
button: startButton
 */
//
window.addEventListener("load", init);

let gameFlipped = 0;
let gameCount = 0;
let lifetimeFlipped = 0;
let flippedCardPair = [];
let pairs;

function init (){
    const startForm = document.getElementById("startForm");
    const game = document.getElementById("game");
    const head = document.head;
    const startButton =  document.getElementById("startButton");
    head.getElementsByTagName("title")[0].innerHTML = "Match Game";
    document.body.children[0].setAttribute("id", "titleH1");
    let titleH1 = document.getElementById("titleH1");
    titleH1.style.float = "left";
    titleH1.style.marginLeft = "10%";
    // add row displaying stats (got lazy)
    let statsRow = document.createElement("header");
    statsRow.setAttribute("id", "stats");

    statsRow.innerHTML ='<div class="gridNoDecor"><div class="col_1-1" id="colheader"><fieldset class="outerFieldset"><div class="col_1-10"><a href="#"><img src="/Final/images/logo.png"></a></div><div class="col_9-10" id="colheaderinner"><h1 id = "titleH1Here"></h1><a class="headerAnchor" href="#"><h1 id = "gamesCount"></h1></a><a class="headerAnchor" href="#"><h1 id ="lifetimeFlipped"></h1></a></div></div></fieldset></div>';
    document.body.insertBefore(statsRow,game);

    document.getElementById("titleH1Here").replaceWith(titleH1);
    titleH1.style.fontStyle = "italic";
    titleH1.style.textAlign = "left";
    titleH1.style.margin = "0";
    titleH1.style.fontSize = "xxx-large";
    let localHistoryFlipped = localStorage.getItem("flips");
    let localHistoryGames = localStorage.getItem("wins");
    const storedFlips = parseInt(localHistoryFlipped);
    const storedGames = parseInt(localHistoryGames);

    if (!isNaN(storedFlips)){
        lifetimeFlipped += storedFlips;
    }
    if (!isNaN(storedGames)) {
        gameCount += storedGames;
    }

    document.getElementById("lifetimeFlipped").innerHTML = "Lifetime Guesses: " + Math.floor(lifetimeFlipped/2);

    document.getElementById("gamesCount").innerHTML = "Games Played: " + gameCount;

    // add class to startform div and game div

    game.setAttribute("class","outerFieldset");
    startForm.setAttribute("class","row");
    startForm.style.fontSize = "x-large";
    startForm.style.textAlign = "center";

    startButton.insertAdjacentHTML("beforebegin", "<br>");
    startButton.style.backgroundColor = "transparent";
    startButton.style.fontSize = "medium";
    startButton.style.border = "2px aliceblue ridge";
    startButton.style.borderRadius = "8px";
    startButton.style.color = "darkslategray";
    startButton.style.width = "100%";
    startButton.style.boxShadow = "inset 0 0 5px 10px rgba(243, 251, 255, 0.5)";
    startForm.style.padding = ".5em 0 0 0";


    let symbolPairs = 0;

    // set max symbols to 8, min to 3,
    let numSymbols = document.getElementById("numSymbols");
    numSymbols.nextSibling.replaceWith(document.createTextNode("Symbols."));
    numSymbols.setAttribute("max", "8");
    numSymbols.setAttribute("min", "2"); // Otherwise what's the point?
    numSymbols.setAttribute("value", "2");

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
    * CSS animation transitions from one color to another by using a linear gradient (didn't do this, but it's a nice thought)*/
   startButton.addEventListener("click", function(e){
        startForm.style.display = "none";
        e.preventDefault();
        pairs = parseInt(numSymbols.value);
        symbolPairs = pairs*2;
        let symbolArr = [];
        symbolArr = getSymbols(symbolArr);
        displayCards(symbolArr, game);
    });
}

function getSymbols(symbolArr){
    while (symbolArr.length < pairs) {
        let symbolString = String.fromCharCode(33+(Math.floor(Math.random()*100)%33));

        if(!symbolArr.includes(symbolString)){
            symbolArr.push(symbolString);
        }
    }
    //duplicate every item
    const preLen = symbolArr.length;
    for (let i = 0; i < preLen; ++i) {
        symbolArr.push(symbolArr[i]);
    }
    return shuffle(symbolArr, pairs*2);
}

function shuffle(symbolArr, symbolPairs){
    let temp;
    for (let i = 0; i < 16; ++i){
        let index1 = Math.floor(Math.random()*100)%symbolPairs;
        let index2 = i%symbolPairs;
        temp = symbolArr[index1];
        symbolArr[index1] = symbolArr[index2];
        symbolArr[index2] = temp;
    }
    return symbolArr;
}

function gameFunc(){
    let game = document.getElementById("game");
    if (pairs === 0){
        while(game.children.length > 1)  {
            let element = game.children[1];
            element.remove();
        }
        ++gameCount;
        lifetimeFlipped += gameFlipped;
        gameFlipped = 0;

        storeLocally(gameCount, lifetimeFlipped);
        // this should be part of the other function that updates stats but I don't have time to refactor every redundant piece of code.
        document.getElementById("lifetimeFlipped").innerHTML = "Lifetime Guesses: " + Math.floor(lifetimeFlipped/2);
        document.getElementById("gamesCount").innerHTML = "Games Played: " + gameCount;
        document.getElementById("startForm").style.display = "block";
        document.getElementById("stats").style.display = "block";
    }// mock return value
}

function changeGuesses(gameFlipped) {
    let flippedCount = document.getElementById("flippedDisplay");
    flippedCount.innerHTML = "Guesses: "+ Math.floor(gameFlipped/2);
}

function displayCards(symbolArr, game){
    document.getElementById("stats").style.display = "none";
    let nCards = symbolArr.length;
    let flipped;
    let pSquares = [4,16];
    let nRows, nCols, colClass;
    let flippedCardsDiv = document.createElement("div");

    flippedCardsDiv.setAttribute("class", "row");
    flippedCardsDiv.setAttribute("id", "flippedDisplay");
    flippedCardsDiv.style.fontSize ="xx-large";
    game.appendChild(flippedCardsDiv);
    changeGuesses(gameFlipped);
    // Math.sqrt(nPairs).toFixed(0) === Math.sqrt(nPairs) This condition is unnecessary given the range of inputs only contains 3 perfect squares, and one of them is unattainable, but I think it's cool.
    if(pSquares.includes(nCards)){
        nRows = Math.sqrt(nCards);
        nCols = nRows;
        colClass = "col_"+(100/nCols);
    }else{
        nRows = Math.ceil(nCards/3);
        nCols = 3;
        colClass = "col_33";
    }

    const root = document.getElementsByTagName("html")[0];
    console.log(root)
    console.log(parseInt(root.clientHeight))
    const height = parseInt(root.clientHeight)/nRows - 50;

    let count = 0;
    for (let i = 0; i < nRows; ++i){
        let rowDiv = document.createElement("div");
        for (let j = 0; j < nCols && nCards !== 0; ++j){
            let cardID = count;
            let cardIDString = "card_"+cardID;

            let colDiv = document.createElement("div");
            let currentSymbol = symbolArr[cardID]; // TODO add chars
            let cardSymbol = document.createTextNode(currentSymbol);

            let attributeArray = [
                {name: "id", value: cardIDString},
                {name: "class", value:"gridEntry"},
                {name: "value", value: currentSymbol}];

            let backOfCardDiv = getDivWithAttributes(attributeArray, cardSymbol, height);
            // add ID suffix
            attributeArray[0].value = attributeArray[0].value +"f";
            let faceOfCardDiv = getDivWithAttributes(attributeArray, cardSymbol, height);

            colDiv.setAttribute("class", colClass);
            // append cards; back, then face.
            colDiv.appendChild(backOfCardDiv);
            colDiv.appendChild(faceOfCardDiv);
            //append row of cards
            rowDiv.appendChild(colDiv);
            // decrement control variable
            --nCards;
            ++count;
        }
        game.appendChild(rowDiv);
    }
    for (let div of document.querySelectorAll("div.gridEntry")){

    }
}

function getDivWithAttributes(attributes, cardSymbol, height) {
    let funcDiv = document.createElement("div");
    for (let attribute of attributes) {
        funcDiv.setAttribute(attribute.name, attribute.value);
        if (attribute.name === 'id' && attribute.value.endsWith('f')){
            funcDiv.style.display = "none";
        }else if (attribute.name === 'id' && !attribute.value.endsWith('f')){
            funcDiv.style.display = "block";
            funcDiv.addEventListener("click", flipCard);
        }
    }
    funcDiv.style.fontSize = "xxx-large";
    console.log(height);
    funcDiv.style.minHeight = height.toString()+"px";
    funcDiv.appendChild(cardSymbol);
    return funcDiv;
}

function flipCard(e){
    let cardBack = e.target;
    let cardFace = cardBack.nextSibling;
    ++gameFlipped;

    changeGuesses(gameFlipped);
    cardBack.style.display = "none";
    cardFace.style.display = "block";
    flippedCardPair.push(({back: cardBack, face:cardFace})) // not ideal solution but I don't want to refactor...
    if (gameFlipped % 2 === 0){
        // don't allow any more clicks
        let allCards = document.querySelectorAll("div[id^='card_']");
        for (let card of allCards) {
            if (!card.id.endsWith('f')) {
                card.removeEventListener("click", flipCard);
            }
        }
        setTimeout(function (){
            if(flippedCardPair[0].back.getAttribute("value") === flippedCardPair[1].back.getAttribute("value")){
                cardFace.style.boxShadow = "inset 0 0 20px 10px lightgreen";
                flippedCardPair[0].face.style.boxShadow ="inset 0 0 20px 10px lightgreen";
                --pairs;
            }else{
                cardBack.style.display = "block";
                cardFace.style.display = "none";
                flippedCardPair[0].back.style.display = "block";
                flippedCardPair[0].face.style.display = "none";
            }
            flippedCardPair = [];
            // allow more clicks
            for (let card of allCards) {
                if (!card.id.endsWith('f')) {
                    card.addEventListener("click", flipCard);
                }
            }
            // checks if the player has won
            gameFunc();
        }, 500);

    }

}


// function sets all localstorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
function storeLocally( wins, flips) {
    localStorage.setItem("wins", wins);
    localStorage.setItem("flips", flips);
}


"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Payton
   Date:   Wilkes

   Global variables
   ===============
   allCells
      References the TD cells within the Hitori table grid.
*/
let allCells;

/*This is used in enough places that being a global immutable reference makes sense*/
const puzzleFigure = document.getElementById("puzzle");

/*Quality of life improvement, bypasses confirmation.*/
let solved;

startUp();

function startUp(){
/*Run when the web page is loaded; displays puzzle 1
and loads the event handlers for the web page buttons.*/
   const puzzleFigure = document.getElementById("puzzle");
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   puzzleFigure.innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
   let puzzleButtons = document.getElementById("topButtons").querySelectorAll("input.puzzles");

   for (let puzzleButton of puzzleButtons) {
      puzzleButton.addEventListener("click", switchPuzzle);
   }
   document.getElementById("check").addEventListener("click", findErrors);
   document.getElementById("solve").addEventListener("click", showSolution);
   setupPuzzle();

}

function setupPuzzle(){
   /*
   Sets up a new puzzle, adding the event handlers for
   every puzzle cell.
   */
   allCells = puzzleFigure.querySelectorAll("table#hitoriGrid td");
   for (let cell of allCells) {
      const cell_ = cell.style;
      let cursor;
      cell_.backgroundColor = "white";
      cell_.color = "black";
      cell_.borderRadius = 0;
      console.log(cell.style.backgroundColor, " setup")
      cell.addEventListener("mousedown", e => {
         if (e.shiftKey){
            cell_.backgroundColor = "white";
            cell_.color = "black";
            cell_.borderRadius = 0;
         }else if(e.altKey){
            cell_.color = "white";
            cell_.backgroundColor = "black";
            cell_.borderRadius = 0;
         }else{
            cell_.backgroundColor = "rgb(101, 101, 100)";
            cell_.color = "white";
            cell_.borderRadius = "50%";
         }
         e.preventDefault();
      });
      cell.addEventListener("mouseover", e => {
         e.preventDefault();
         if (e.shiftKey){
            cursor = "url(/JPF_Hitori/images/jpf_eraser.png), alias";
         }else if(e.altKey){
            cursor = "url(/JPF_Hitori/images/jpf_block.png) 16 16, cell";
         }else{
            cursor = "url(/JPF_Hitori/images/jpf_circle.png) 16 16, pointer";
         }
         for (let allCell of allCells) {
            allCell.style.cursor= cursor;
         }
      });
      cell.addEventListener("mouseup", checkSolution);
   }
}

function switchPuzzle(e){
   /*Swaps one puzzle for another based on the button being clicked
   by the user. Confirms the change before swapping in the
   new puzzle.*/
   /*
   added an or proposition that skips the confirmation if the puzzle is solved.
   */
   if(solved === true || confirm("Your progress will be lost. Continue anyway?")){
      let target = e.target;
      let puzzleID = target.id;
      document.getElementById("puzzleTitle").innerHTML = target.value;
      switch (puzzleID) {
         case "puzzle1":
            puzzleFigure.innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
            break;
         case "puzzle2":
            puzzleFigure.innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
            break;
         case "puzzle3":
            puzzleFigure.innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
            break;
      }
      setupPuzzle();
   }
}

function findErrors(){
   /*Highlights the errors in the Hitori puzzle in a red font.*/
   let circles = puzzleFigure.querySelectorAll("table#hitoriGrid td.circles");
   let blocks = puzzleFigure.querySelectorAll("table#hitoriGrid td.blocks");
   for (let circle of circles) {
      let circle_ = circle.style
      let backgroundColor = circle_.backgroundColor;
      console.log(backgroundColor)
      if (backgroundColor === "black"){
         circle_.color ="red";
      }
   }
   for (let block of blocks) {
      let block_ = block.style;
      let backgroundColor = block_.backgroundColor;
      if (backgroundColor === "rgb(101, 101, 100)"){
         block_.color = "red";
      }
   }
   setTimeout(function () {
      for (let cell of allCells) {
         let cell_ = cell.style
         if (cell_.color === "red"){
            cell_.color = "white";
         }
      }
   }, 1000);
}
/* ================================================================= */
function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (let i = 0; i < allCells.length; i++) {
      let cellColor = allCells[i].style.backgroundColor;
      let cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ( (cellClass === "blocks" && cellColor !== "black") ||
           (cellClass === "circles" && cellColor !== "rgb(101, 101, 100)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (let i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}

function drawHitori(numbers, blocks, rating) {
   /*Puzzle's initial state is unsolved*/
   solved = false;

   /* Initial HTML String for the Hitori Puzzle */
   let htmlString;

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   let totalRows = numbers.length;
   let totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (let i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (let j = 0; j < totalCols; j++) {
         if (blocks[i][j] === "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
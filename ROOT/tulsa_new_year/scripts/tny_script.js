"use strict";
/*
   Countdown Clock
   Author: Payton Wilkes
   Date:   3/15/2024

*/
var daysLeftEle = document.getElementById("days");
var hoursLeftEle = document.getElementById("hrs");
var minutesLeftEle = document.getElementById("mins");
var dateNow = document.getElementById("dateNow");
var secondsLeftEle = document.getElementById("secs");
runClock();
setInterval("runClock()",1000);
function runClock(){
    var currentDay = new Date();
    var dateStr = currentDay.toLocaleDateString();
    var timeStr = currentDay.toLocaleTimeString();
    var newYear = new Date("January 1, 1970 00:00:00");
    newYear = newYear.setFullYear(currentDay.getFullYear()+1);

    var daysLeft = (newYear - currentDay)/(1000*60*60*24);

    var hrsLeft = (daysLeft - Math.floor(daysLeft))*24;

    var minsLeft = (hrsLeft - Math.floor(hrsLeft))*60;
    var secsLeft = (minsLeft - Math.floor(minsLeft))*60;

   dateNow.innerHTML = dateStr + "<br/>" + timeStr;

    daysLeftEle.textContent = Math.floor(daysLeft);
    hoursLeftEle.textContent = Math.floor(hrsLeft);
    minutesLeftEle.textContent = Math.floor(minsLeft);
    secondsLeftEle.textContent = Math.floor(secsLeft);
}


"use strict";

/*

   Author: Payton Wilkes
   Date:  03/15/2024

   Filename:   lht_calendar.js
*/
let thisDay = new Date("August 24, 2018");
var calendar = document.getElementById("calendar");
calendar.innerHTML = createCalendar(thisDay);

function createCalendar(calDate){
    return ("<table id='calendar_table'>" + calCaption(calDate) + calWeekdayRow() + calDays(calDate) + "</table>");
}
function calCaption(calDate){
    let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    let thisMonth = calDate.getMonth();
    let thisYear = calDate.getFullYear();
    return ("<caption>" + monthName[thisMonth]+ " " + thisYear + "</caption>");
}
function calWeekdayRow(){
    let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let rowHTML = "<tr>";
    for (var i = 0; i < dayName.length; i++){
        rowHTML+= "<th class='calendar_weekdays'>"+dayName[i] + "</th>";
    }
    rowHTML+= "</tr>";
    return rowHTML;
}
function daysInMonth(calDate){
    let dayCount = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

    let thisYear = calDate.getFullYear();
    let thisMonth = calDate.getMonth();
    if (thisYear % 4 === 0){
        if ((thisYear % 100 != 0) || (thisYear % 400 === 0)){
            dayCount[1]=29;
        }
    }

    return dayCount[thisMonth];

}
function calDays(calDate){
    let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    let weekDay = day.getDay();
    let htmlCode = "<tr>";
    for (let i = 0; i < weekDay; i++){
        htmlCode += "<td></td>";
    }

    var totalDays = daysInMonth(calDate);
    var highlightDay = calDate.getDate();
    for (let i = 1; i <= totalDays; i++){
        day.setDate(i);
        weekDay = day.getDay();

        if(weekDay === 0){
            htmlCode += "<tr>";
        }
        if (i === highlightDay){
            htmlCode += "<td class='calendar_today' id='calendar_today'>" + i + dayEvent[i] + "</td>";
        }else{
            htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
        }
        if (weekDay === 6) {
            htmlCode += "</tr>";
        }
    }
    return htmlCode;
}
/*Writes the daily rows in the calendar table, highlighting calDate*/

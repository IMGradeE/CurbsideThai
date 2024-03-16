"use strict";

/*
   Author: Payton Wilkes
   Date:   03/16/2024
*/

let thisDay = new Date("August 1, 2022");
let endDay = new Date(thisDay.getTime() + (14*60*60*24*1000));
var doc = document.getElementById("eventList");
let tableHTML = "<table id='eventTable'><caption>Upcoming Events</caption><tr><th>Date</th><th>Event</th><th>Price</th></tr>";

for (let i = 0; i < eventDates.length; i++) {
    let eventDate = new Date(eventDates[i]),
        eventDay = eventDate.toDateString(),
        eventTime = eventDate.toLocaleTimeString();
    if ((thisDay <= eventDate) && (eventDate <= endDay)){
        console.log(tableHTML);
        tableHTML += ("<tr><td>" + eventDay + "@" + eventTime + "</td><td>" + eventDescriptions[i] + "</td><td>" + eventPrices[i] + "</td></tr>");
    }
}
tableHTML += "</table>";

doc.innerHTML = tableHTML;

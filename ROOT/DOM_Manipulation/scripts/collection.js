"use strict"
window.addEventListener("load", init)
var books = [
     ['The Design of EveryDay Things',
         'Don Norman',
         false]
    ,
     ['The Most Human Human',
         'Brian Christian',
         true]
    ];
let count = 1;
function init(){
    let table = document.createElement("table");
    let objarr = [document.createElement("th"),
        document.createElement("th"),
        document.createElement("th")]
    let objarr2 = [document.createTextNode("Title"),
        document.createTextNode("Author"),
        document.createTextNode("Read?")];

    for (let i = 0; i < objarr.length; i++) {
        objarr[i].appendChild(objarr2[i]);
    }
    let tr1 = document.createElement("tr");
    for (let node of objarr) {
        tr1.appendChild(node);
    }
    table.appendChild(tr1);
    for (let book of books) {
        let tr = document.createElement("tr");
        for (let bookElement of book) {
            let bookimg = document.createElement("a");
            let bookimgChild = document.createElement("img")
            let td = document.createElement("td");
            switch (bookElement){
                case true:
                    td.setAttribute("class", "true");
                    bookimgChild.setAttribute("class", "true");
                    bookimgChild.setAttribute("src", "images/material"+true+".png")
                    td.appendChild(bookimg);
                    break;
                case false:
                    td.setAttribute("class", "false");
                    bookimgChild.setAttribute("class", "false");
                    bookimgChild.setAttribute("src", "images/material"+false+".png")
                    td.appendChild(bookimg);
                    break;
                default:
                    td.innerHTML = (bookElement);
            }
            bookimg.appendChild(bookimgChild);
            bookimg.addEventListener("click", function (){
               if(bookimgChild.className === "false"){
                   td.setAttribute("class", "true");
                    bookimgChild.setAttribute("class", "true");
                   bookimgChild.setAttribute("src", "images/material"+true+".png")
               }else if(bookimgChild.className === "true"){
                   td.setAttribute("class", "false");
                    bookimgChild.setAttribute("class", "false");
                   bookimgChild.setAttribute("src", "images/material"+false+".png")
               }
            })
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    for (let child of document.body.children) {
        if (child.nodeName === "H1"){
            child.insertAdjacentElement("afterend", table);
        }
    }
    let style = document.createElement("style");
    style.innerHTML = ".true {background-color: LightGreen;} .false {background-color: LightPink;} td {text-align: center; border: 1px solid gray; padding: 12px 12px 12px 12px;} table {border-collapse: collapse;}";

    document.head.appendChild(style);
    let linkHeading =  document.createElement("h2");
    let link = document.createElement("a");
    let linkText = document.createTextNode("About me");
    link.appendChild(linkText);
    link.setAttribute("href","aboutme.html")
    linkHeading.appendChild(link);
    document.body.insertAdjacentElement("afterend", linkHeading);
}
"use strict";

/*

   Author: 
   Date:   

   Filename: bc_keys.js
*/

window.addEventListener("load", findKeyWords)

function findKeyWords() {
   /*   Locate the keywords in the article indicated by the < dfn >
    tag and add those keywords in alphabetical order to a keyword box.*/
   let array = [];
   let source = document.getElementById("doc");
   let aside = document.createElement("aside");
   let ol = document.createElement("ol");
   let heading = document.createElement("h1");
   heading.innerHTML = "Keyword List";

   aside.setAttribute("id","keywords");
   aside.appendChild(heading);
   aside.appendChild(ol);
   /*This is more intuitive for me than using builtins to get the
   nodes and then get their values and then sort them*/
   for (let sourceElement of source.children) {
      if (sourceElement.hasChildNodes()){
         for (let sourceElementChild of sourceElement.children) {
            if (sourceElementChild.nodeName === "DFN"){
               sourceElementChild.setAttribute("id","keyword_"+replaceWS(sourceElementChild.firstChild.nodeValue));
               array.push(sourceElementChild.firstChild.nodeValue);
            }
         }
      }
   }
   array.sort();
   for (let arrayElement of array) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.setAttribute("href", "#keyword_" +replaceWS(arrayElement));
      a.innerHTML = arrayElement;
      li.appendChild(a);
      ol.appendChild(li);
   }
   source.insertBefore(aside, source.firstChild);
   makeKeyStyles();
}

function makeKeyStyles() {
   /*  Create an embedded style sheet for the keyword box.*/
   let link = document.createElement("link");
   link.setAttribute("href", "styles/bc_keys.css");
   link.setAttribute("rel","stylesheet");
   document.head.appendChild(link);

   let style = document.styleSheets[document.styleSheets.length-1];
   style.insertRule("aside#keywords {border: 3px solid rgb(101, 101, 101);float: right;margin: 20px 0 20px 20px;padding: 10px;width: 320px;}")
   style.insertRule("aside#keywords h1 {font-size: 2em;margin: 5px;text-align: center;}")
   style.insertRule("aside#keywords ol{font-size: 1.2em;margin-left: 20px;}")
   style.insertRule("aside#keywords ol li {line-height: 1.5em;}")
   style.insertRule("aside#keywords ol li a{color:rgb(101, 101, 101);text-decoration: none;}")
}

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}

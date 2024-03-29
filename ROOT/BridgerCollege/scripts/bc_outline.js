"use strict";

/*

   Author: Payton Wilkes
   Date:   28/03/2024

   Filename: bc_outline.js
*/
window.addEventListener("load", makeOutline);

let elementArray;

function makeOutline() {
    /*
        Generates the text of the table of contents
        as a nested list
    */
    const outline = document.getElementById("outline");
    const source = document.getElementById("doc");
    let mainHeading = document.createElement("h1");
    let outlineList = document.createElement("ol");
    let headingText = document.createTextNode("Outline");
    const headings = ["H1","H2","H3","H4","H5","H6"];
    mainHeading.appendChild(headingText);
    outline.appendChild(mainHeading);
    outline.appendChild(outlineList);
    createList(source, outlineList, headings);
}

function createList(source, outlineList, headings) {
    /*
        Creates an outline based on the source document,
        list items are appended to TOCList,
        the items list are based on the element names
        specified in the headings array
    */
    let lagLevel = 0;
    let count = 0;
    for (let sourceElement of source.childNodes) {
        let nodeLevel = headings.indexOf(sourceElement.nodeName);
        if (nodeLevel !== -1) {
            let outlineNode = sourceElement.cloneNode(true);
            sourceElement.setAttribute("id", ("head"+count));
            if (nodeLevel > lagLevel) {
                let ol = document.createElement("ol");
                outlineList.lastChild.appendChild(ol);
                outlineList = outlineList.lastChild.lastChild;
            } else if (nodeLevel < lagLevel) {
                let diff = lagLevel - nodeLevel;
                for (let i = 0; i < diff; i++) {
                    outlineList = outlineList.parentNode.parentNode;
                }
            }
            let li = document.createElement("li");
            let a = document.createElement("a");
            li.appendChild(a)
            a.appendChild(outlineNode.firstChild);
            a.setAttribute("href", ("#head" + count));
            outlineList.appendChild(li);
            lagLevel = nodeLevel;
            ++count;
        }
    }

}

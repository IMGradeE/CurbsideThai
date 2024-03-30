"use strict"

window.addEventListener("load", init)

function init(){
    document.body.style.fontFamily = "Arial, sans-serif";
    let arr = ["Favorite food: Umpqua Chocolate Ice Cream", "Nickname: Payton", "Hometown: Ogden"]
    let ul = document.getElementsByTagName("li");
    let count = 0;
    for (let li of ul) {
        li.className = "listitem";
        li.textContent = arr[count];
        ++count;
    }
    let liStyle = document.createElement("style");
    liStyle.appendChild(document.createTextNode("li.listitem {color:red;}"))
    document.head.appendChild(liStyle);
    let img = document.createElement("img");
    img.setAttribute("src", "images/me"+1+".jpg")
    img.setAttribute("style", "width: 100%; max-width: 800px;")
    img.addEventListener("click", function (){
        let number = (Math.floor(Math.random()*10)%3)+1
        img.setAttribute("src", "images/me"+number+".jpg")
    })
    for (let child of document.body.children) {
        if (child.nodeName === "H1"){
            child.insertAdjacentElement("afterend", img);
        }
    }
    let linkHeading =  document.createElement("h2");
    let link = document.createElement("a");
    let linkText = document.createTextNode("Collection");
    link.appendChild(linkText);
    link.setAttribute("href","collection.html")
    linkHeading.appendChild(link);
    document.body.insertAdjacentElement("afterend", linkHeading);

}
let nodes = [];

class Node {
    constructor(name, parentID, method) {
        this.name = name;
        this.parentID = parentID;
        this.method = method;
        this.id = nodes.length;
        nodes.push(this);
    }

    rename(name) {
        this.name = name;
    }

    html() {
        return `<div id="${this.id}" class="node">${this.name}</div>`
    }
}

let first = new Node("fuck", 0, "by fucking");
document.getElementById('tree').appendChild(document.createRange().createContextualFragment(first.html()));


/**
 * 
 * okay kids so here's where the normal stuff goes
 * 
 */


document.addEventListener("click",(e)=> {
    e.preventDefault();
    if(e.target.classList.contains("node")) {
        e.target.innerHTML = `<input type="text" id="${e.target.getAttribute("id")}" class="node-textbox" value="${nodes[e.target.getAttribute("id")].name}"></input>`
    }
})

document.addEventListener("keydown", (e)=> {
    if(e.key == 'Enter' && e.target.classList.contains("node-textbox")) {
        console.log(e.target);
        e.target.outerHTML = e.target.value;
        console.log(e.target.getAttribute("id"));
        nodes[e.target.getAttribute("id")].rename(e.target.value);
    }
})
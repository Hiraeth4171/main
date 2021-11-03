let nodes = [];
let selectedNodeID = -1;

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

    html(br) {
        return `<div id="${br ? 'n' + this.id : this.id}" class="node">${this.name}</div>`
    }
}

let first = new Node("boom", -1, "by fucking");
for (let i = 0; i < 10; i++) {
    new Node(Math.random(), i, i.toString());
    new Node(Math.random(), i, i.toString());
    new Node(Math.random(), i, i.toString());
}

let render = () => {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let dest = 'tree';
        if (node.parentID != -1) {
            dest = ('row' + node.parentID).toString();
            console.log(dest);
        }
        if (document.getElementById(dest) == null) {
            let d = document.createElement("div");
            d.setAttribute("id", dest)
            d.setAttribute("class", "node-row")
            document.getElementById('tree').appendChild(d);
        }
        document.getElementById(dest).appendChild(document.createRange().createContextualFragment(node.html(dest == 'tree' ? true : false)));
    }
}


/**
 * 
 * okay kids so here's where the normal stuff goes
 * 
 */

let getNodeObjById = (id) => {
    return document.getElementById(id);
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("node")) {
        e.target.innerHTML = `<input type="text" id="${e.target.getAttribute("id")}" class="node-textbox" value="${nodes[e.target.getAttribute("id")].name}"></input>`
        selectedNodeID = e.target.getAttribute("id");
    }
    else {
        if (e.target.classList.contains("node-textbox") || selectedNodeID == -1) return;
        let node = getNodeObjById(selectedNodeID.toString());
        console.log(node);
        nodes[selectedNodeID].rename(node.firstChild.value);
        node.innerHTML = node.firstChild.value;
        selectedNodeID = -1;
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key == 'Enter' && e.target.classList.contains("node-textbox")) {
        console.log(e.target);
        e.target.outerHTML = e.target.value;
        console.log(e.target.getAttribute("id"));
        nodes[e.target.getAttribute("id")].rename(e.target.value);
    }
})

render();
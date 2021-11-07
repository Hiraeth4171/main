let selectedNodeID = -1;
let cId = 0;
let mainNode = 0;

class Node {
    constructor(name, parent, method, children) {
        this.name = name;
        this.parent = parent ? parent : mainNode;
        this.method = method;
        this.id = parent ? this.parent.children.length : -1;
        this.children = children;
        console.log({ t: this, pId: parent});
        if(parent) parent.addChild(this)
    }

    addChild(node) {
        this.children.push(node);
    }

    removeChild(node) {
        this.children.map(child => child.id != node.id);
    }

    rename(name) {
        this.name = name;
    }

    html(br) {
        return `<div id="${br ? 'n' + this.id : this.id}" class="node">${this.name}</div>`
    }
}

mainNode =  new Node("main", null, "brrr", []);

for(let i = 0; i < 3; i++) {
    let x = new Node(Math.random(), mainNode, i.toString(), []);
    for(let j = 0; j < 3; j++) {
        new Node (Math.random(), x, j.toString(), []);
    }
}


let render = (node) => {
    document.getElementById('tree').appendChild(document.createRange().createContextualFragment(node.html(true)));

    node.children.forEach(child => {
        let dest = 'tree';
        if(child.parent.id != -1){
            dest = ('row'+child.parent.id).toString();
            console.log(dest);
        }
        if (document.getElementById(dest) == null) {
            let d = document.createElement("div");
            d.setAttribute("id", dest)
            d.setAttribute("class", "node-row")
            document.getElementById('tree').appendChild(d);
        }
        document.getElementById(dest).appendChild(document.createRange().createContextualFragment(child.html(dest == 'tree' ? true : false)));
        if(child.children) render(child);
    })
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

render(mainNode);
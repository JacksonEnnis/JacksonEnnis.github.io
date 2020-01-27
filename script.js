'use-strict';

var cl = document.getElementById("commandline");
//cl.style.display = "none";
let cb = document.getElementById("commandbox");
let ss = document.getElementById("showside");
let align = ['left', 'center', 'right'];


function addToSS(directory){
  colors = ['#00ff00', '#ff0000', '#00ccff','#ffff00', '#ff00ff','#6666ff','#ffffff'];
  fetch(directory)
    .then((response) => {
      return response.text();
    })
    .then((txt) => {
      var k = txt;
      var text = document.createElement("p1");
      text.style.color = colors[getRandomInt(colors.length)];
      
      text.classList.add("temporary");
      text.innerHTML = txt;
      text.style.cssFloat = align[getRandomInt(3)];
      ss.appendChild(text);
      console.log("done")
  });
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function gnl(node){
  items = []
  for(let child of node.nodes){
    items.push(child.identity)
  }
  console.log(items)
  return items
}

class Node {
  constructor(name, nodes, data) {
    this.identity = name;
    this.nodes = nodes;
    this.data = data
    }
  
  linkTo(pnIdentity, childNode){
    if(this.identity === pnIdentity){
      this.nodes.push(childNode)
    }
    else{
      for(var node of this.nodes){
        if(node.identity === pnIdentity){
          node.nodes.push(childNode);
          break;
        }
        else{
          node.linkTo(pnIdentity, childNode);
        }
      }
    }
  }

  printNodes(){
    for(let node of this.nodes){
      console.log(this.identity + " <- " + node.identity)
      node.printNodes()
    }
  }

  goTo(desired_id){
    for(var i of this.nodes){
      if(i.identity === desired_id){
        return i;
      }
    }
    return;
  }
}

class terminalManger{

  constructor(){
  this.itemsLength = 0;
  this.maxLength = 10;
  this.history = [];
  }

  addMessage(message){
    if(this.itemsLength < this.maxLength){
      this.itemsLength += 1;
    }
    else{
      this.history = this.history.slice(1, this.itemsLength);
    }
    this.history.push(message);
    this.print();
  }

  print(){
    let message = "";
    for(let line of this.history){
      message += line;
      message += '\n';
    }
    cb.value = message;
  }

  addNodeMessages(node){
    //Needs fixed to accomodate the >15 rule;
    let counter = 1;
    for(let item of node.nodes){
      this.history.push(counter + ") " + item.identity);
      counter += 1;
    }
    for(let item of node.data){
      this.addMessage(counter + ") " + item);
      counter += 1;
    }
    this.print();
  }
}

let tm = new terminalManger();

let PassionProjects = new Node("Passion-Projects", [
  new Node("Ambient-Keyboard", [],['about.txt','user-interface.txt']),
  new Node("Mr-Beast-Selenium", [],['about.txt', 'results.txt']),
  new Node("Predictive-Stock-Analyst", [],['about.txt', 'hub.txt', 'stocks.jpg']),
  new Node("Autonomous-Stock-Trader", [],['alpaca-trade.png', 'trading.txt']),
  new Node("Safety-Net", [],['first.txt', 'safety-net.jpg', 'dmt.txt', 'design.txt', 'downloads.png']),
  new Node("My-Website", [],['this.txt'])
], []);

let AboutMe = new Node("About-Me", [

], ['about.txt','animal-behavior.txt','cs.txt','intel.txt']);

let WorkExperience = new Node("Work-Experience", [
  new Node("Technical-Experience", [], ["Genesys.txt"]),
  new Node("Non-Technical-Experience", [],['Notre-Dame.txt', 'Corn-Detassling.txt', 'Groceries-By-Joe.txt'])
], []);

let base = new Node("BASE", [],[]);
base.linkTo("BASE", AboutMe);
base.linkTo("BASE", PassionProjects);
base.linkTo("BASE", WorkExperience);

tm.addMessage("Welcome to my website!");
tm.addMessage("Type 'help' to learn what commands you can use.");





window.setTimeout(function(){
  var element = document.getElementById("commandbox");
  element.classList.remove("flicker");
  
  document.getElementById("commandline").style.display = "block";
}, 3000);

document.getElementById("commandline").style.display = "none";
document.getElementById("commandline").defaultValue = "help";
tm.addNodeMessages(base);

let records = [];

// Execute a function when the user releases a key on the keyboard
cl.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    try{
      command = cl.value;
      tm.addMessage('>>>'+command);
      cl.value = "";
      if(command.includes("'")){
        tm.addMessage("Noooo! Try the command without the quotations!");
      }
      else if(command.includes("nav") && gnl(base).includes(command.split(" ")[1])){
        records.push(base);
        base = base.goTo(command.split(" ")[1]);
        console.log(base.identity);

        let counter = 1;
        for(let node of base.nodes){
          tm.addMessage(counter + ") " + node.identity);
          counter += 1;
        }
      }
      else if(command.includes("open") && base.data.indexOf(command.split(" ")[1]) > -1){
        //This is the HARD PART
        if(command.includes(".png") || command.includes(".jpg")){
          var image = new Image();
          image.width = image.width *(1/3);
          image.height = image.height *(1/3);
          image.classList.add("temporary");
          image.src = base.identity + "/" + command.split(" ")[1];
          image.style.cssFloat = align[getRandomInt(3)];
          ss.appendChild(image)
        }
        else if(command.includes(".txt")){
          addToSS(base.identity + "/" + command.split(" ")[1]);
        }

      }
      else if(command.includes("ls")){
        tm.addNodeMessages(base);
      }
      else if(command.includes("help")){
        tm.addMessage("This terminal has a few helpful commands.\n");
        tm.addMessage("'nav ITEM' navigates to that location within the terminal.\n");
        tm.addMessage("'open ITEM' opens the file into the right portion of the screen for you to look at. You can open things that end in .txt or .png\n");
        tm.addMessage("'ls' shows you all the things that you can navigate/interact with at this position\n");
        tm.addMessage("'help' prints this information out, obviously ;)\n");
        tm.addMessage("'back' takes you back to your last location and wipes the show box\n");
      }
      else if(command.includes("back")){
        base = records.pop();
        temp = document.getElementsByClassName("temporary");

        while(temp.length != 0){
          ss.removeChild(temp[0]);
          console.log("ONE DELETED!")
        }
        tm.addNodeMessages(base);
      }
      else{
        console.log("User defined error - wrong command");
        tm.addMessage("Sorry, what was that? Type 'help' if you're stuck.");
      }
    }
    catch(err){
      console.log("OOF _ AN ERROR WAS TRIGGERED")
    }
  }
});

/*
var fs = require('fs');
var files = fs.readdirSync('Safety-Net');*/
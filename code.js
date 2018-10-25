var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var xOffset = 10;
var yOffset = 10;
var w = 30;
var current = 0;

var grid = Array(81).fill(0);

//print puzzle in console
function printGrid() {
  var output = "";
  for(var i = 0; i < grid.length; i++) {
      if(i % 9 === 0) output += "\n"
      output += grid[i] + " ";
    }
   console.log(output);
}

function clearGrid() {
  grid = Array(81).fill(0);
  draw();
}

function isValid(value, index) {
  
  //check if value exists in index's row
  var rowBegin = Math.floor(index / 9)*9;
  for(var i = rowBegin; i < rowBegin + 9; i++) {
    if(grid[i] == value) return false;
  }
  
  //check if value exists in index's column
  var colBegin = index % 9;
  for(i = colBegin; i < colBegin + 72; i+=9) {
    if(grid[i] == value) return false;
  }
  
  //check if value exists in index's 3x3 box
  var row = (rowBegin/9) - ((rowBegin/9)%3);
  var col = colBegin - (colBegin%3);
  for(i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (grid[(row+i)*9 + (col+j)] == value) return false;
    }
  }
  return true;
}

function findEmpty() {
  for(var i = 0; i < 81; i++) {
    if(grid[i] === 0) return i;
  }
}

function isComplete() {
  for(var i = 0; i < 81; i++) {
    if(grid[i] === 0) return false;
  }
  return true;
}

function solveGrid() {
  if(isComplete()) return true;
  var index = findEmpty();
  for(var i = 1; i < 10; i++) {
    if(isValid(i, index)) {
      grid[index] = i;
      if(solveGrid()) {
        draw();
        return true;
      }
      grid[index] = 0;
    }
  }
  return false;
}

function draw() {
  //clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //highlight current
  ctx.beginPath();
  ctx.rect(xOffset + ((current % 9) * w), yOffset + (Math.floor(current/9) * w), w, w);
  ctx.fillStyle = '#80BFFF';
  ctx.fill();
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  
  //draw columns
  for(var x = xOffset; x < (w * 10) + xOffset; x+=w) {
    ctx.moveTo(x, yOffset);
    ctx.lineTo(x, (w * 9) + yOffset);
    ctx.stroke();
  }
		
  //draw rows
  for(var y = yOffset; y < (w * 10) + yOffset; y+=w) {
    ctx.moveTo(xOffset, y);
	ctx.lineTo((w * 9) + xOffset, y);
	ctx.stroke();
  }
  
  //draw values
  for(var i = 0; i < 81; i++) {
    var s = "box" + i;
    if(grid[i] !== 0) document.getElementById(s).innerHTML = grid[i];
    else document.getElementById(s).innerHTML = "";
  }
  
}

function main() {
  draw();
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            if(current > 0) current--;
            break;
        case 38:
            if(current > 8) current-=9;
            break;
        case 39:
            if(current < 80) current++;
            break;
        case 40:
            if(current < 72) current+=9;
            break;
        case 48:
            grid[current] = 0;
            if(current < 80) current++;
            break;
        case 49:
            grid[current] = 1;
            if(current < 80) current++;
            break;
        case 50:
            grid[current] = 2;
            if(current < 80) current++;
            break;
        case 51:
            grid[current] = 3;
            if(current < 80) current++;
            break;
        case 52:
            grid[current] = 4;
            if(current < 80) current++;
            break;
        case 53:
            grid[current] = 5;
            if(current < 80) current++;
            break;
        case 54:
            grid[current] = 6;
            if(current < 80) current++;
            break;
        case 55:
            grid[current] = 7;
            if(current < 80) current++;
            break;
        case 56:
            grid[current] = 8;
            if(current < 80) current++;
            break;
        case 57:
            grid[current] = 9;
            if(current < 80) current++;
            break;
        case 8:
            grid[current] = 0;
            if(current > 0) current--;
            break;
        case 127:
            alert(1);
            break;
    }
    draw();
};

main();

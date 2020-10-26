function Cell(x, y, w, state) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.state = state;
}



Cell.prototype.ghost = function(generations) {
  switch(generations) {
    case "gen1":
      fill(231, 111, 81, 150);
      rect(this.x, this.y, this.w, this.w);
      break;
    case "gen2":
      fill(231, 111, 81, 100);
      rect(this.x, this.y, this.w, this.w);
      break;
    case "gen3":
      fill(231, 111, 81, 50);
      rect(this.x, this.y, this.w, this.w);
  }
}

Cell.prototype.show = function() {
  if (this.state == ALIVE) {
    fill(231, 111, 81, 255);
    rect(this.x, this.y, this.w, this.w);
  }
  else {
    stroke(255);
  }
}
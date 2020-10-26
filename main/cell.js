function Cell(x, y, w, state) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.state = state;
}
Cell.prototype.show = function() {
  if (this.state == ALIVE) {
    fill(255, 255, 255);
    rect(this.x, this.y, this.w, this.w);
  }
  else {
    fill(0);
    rect(this.x, this.y, this.w, this.w);
  }
}
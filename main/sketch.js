const ALIVE = 1;
const DEAD = 0;

let state;
let rows;
let cols;
let resolution = 10;

function make2DArray(rows, cols) {
	var arr = new Array(rows);
	for (var i = 0; i < arr.length; i++) {
	  arr[i] = new Array(cols);
	}
	return arr;
  }

function setup() {
	var golCanvas = createCanvas(windowWidth + 1, windowHeight + 1);
	golCanvas.parent("gol");

	background(0);
	rows = floor(width / 10);
	cols = floor(height / 10);
	universe = make2DArray(rows, cols);
	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < cols; y++) {
			let rnd = floor(random(2));
			if (rnd == 1) state = ALIVE;
			if (rnd == 0) state = DEAD;
			universe[x][y] = new Cell(x * resolution, y * resolution, resolution, state);
		}
	}
}

function draw() {
	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < cols; y++) {
		  universe[x][y].show();
		}
	}
	nextGeneration();
}
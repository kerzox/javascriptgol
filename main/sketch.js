const ALIVE = 1;
const DEAD = 0;

let center = false;
let order = 1;
let state;
let rows;
let cols;
let resolution = 10;

let runMoore = false;
let runVon = false;

function make2DArray(rows, cols) {
	var arr = new Array(rows);
	for (var i = 0; i < arr.length; i++) {
	  arr[i] = new Array(cols);
	}
	return arr;
  }

function resetCanvas() {
	clear();
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

function setup() {
	var golCanvas = createCanvas(701, 501);
	golCanvas.parent("gol");

	let type_moore_test = select("#moore");
	type_moore_test.mousePressed(moore);

	let type_von_test = select("#von");
	type_von_test.mousePressed(vonneumann);

	let center_checkbox = select("#centerCheck");
	center_checkbox.mousePressed(enablecenter)

	order_slider = createSlider(1, 10, 1);
	order_slider.parent(orderslider);
	order_slider.style('width', '100%');

	var checkboxes = document.getElementsByTagName('input');

	for (var i=0; i<checkboxes.length; i++)  {
	if (checkboxes[i].type == 'checkbox')   {
		checkboxes[i].checked = false;
		}
	}

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

function enablecenter() {
	if (this.checked()) {
		center = false;
	  } else {
		center = true;
	  }
}

function moore() {
	resetCanvas();
	runVon = false;
	runMoore = true;
}

function vonneumann() {
	resetCanvas();
	runMoore = false;
	runVon = true;
}


function draw() {

	order = order_slider.value();
	document.getElementById("ordernum").innerHTML = order;

	if (runMoore) {
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				universe[x][y].show();
			}
		}
		nextGeneration("moore");
	}
	if(runVon) {
		//do this
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				universe[x][y].show();
			}
		}
		nextGeneration("von");
	}
}
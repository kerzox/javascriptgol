function make2DArray(rows, cols) {
	var arr = new Array(rows);
	for (var i = 0; i < arr.length; i++) {
	  arr[i] = new Array(cols);
	}
	return arr;
  }

function resetCanvas() {
	clear();
	rows = floor(width / resolution);
	cols = floor(height / resolution);
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
	background(255);
    var canvasDiv = document.getElementById('gol');
	var width = canvasDiv.offsetWidth;

    var sketchCanvas = createCanvas(width, width);
    sketchCanvas.parent("gol");

	let type_moore_test = select("#moore");
	type_moore_test.mousePressed(moore);

	let type_von_test = select("#von");
	type_von_test.mousePressed(vonneumann);

	let center_checkbox = select("#centerCheck");
	center_checkbox.mousePressed(enablecenter)

	let ghost_checkbox = select("#ghostCheck");
	ghost_checkbox.mousePressed(enableghost)

	survival_input = createInput();
	survival_input.changed(survivalParse);
	survival_input.parent("survivalInput");
	survival_input.class("form-control");
	
	birth_input = createInput('', 'int');
	birth_input.changed(birthParse);
	birth_input.parent("birthInput");
	birth_input.class("form-control");

	order_slider = createSlider(1, 10, 1);
	order_slider.parent(orderslider);
	order_slider.style('width', '100%');

	res_slider = createSlider(5, 35, 25);
	res_slider.parent("resolutionSlider");
	res_slider.style('width', '100%');

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

	stored[0] = make2DArray(rows, cols);

	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < cols; y++) {
			let rnd = floor(random(2));
			if (rnd == 1) state = ALIVE;
			if (rnd == 0) state = DEAD;
			universe[x][y] = new Cell(x * resolution, y * resolution, resolution, state);
		}
	}
}

function enableghost() {
	if (this.checked()) {
		ghost = false;
	  } else {
		ghost = true;
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
	frameRate(15);
	background('#f5f5f5');
	order = order_slider.value();
	document.getElementById("ordernum").innerHTML = order;
	resolution = res_slider.value();
	document.getElementById("resorder").innerHTML = resolution

	if (runMoore) {
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				universe[x][y].show();
				if (ghost) {
					if (stored[0][x][y].state == 1 && universe[x][y].state != 1) {
					stored[0][x][y].ghost("gen1");
					}
					if (stored[1][x][y].state == 1 && stored[0][x][y].state != 1 && universe[x][y].state != 1) {
						stored[1][x][y].ghost("gen2");
					}
					if (stored[2][x][y].state == 1 && stored[1][x][y].state != 1 && stored[0][x][y].state != 1 && universe[x][y].state != 1) {
						stored[2][x][y].ghost("gen3");
					}
				}
			}
		}
		nextGeneration("moore", universe);
	}
	if(runVon) {
		//do this
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				universe[x][y].show();
			}
		}
		nextGeneration("von", universe);
	}
}
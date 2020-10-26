function nextGeneration() {
    buffer = make2DArray(rows, cols);
	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < cols; y++) {
            var cell = universe[x][y];
            var PREV_STATE = cell.state;
            var neighbours = getNeighbours(universe, x, y);
            //console.log(PREV_STATE)
            buffer[x][y] = new Cell(x * resolution, y * resolution, resolution, cellState(neighbours, PREV_STATE));
        }
    }
    universe = buffer;
    return universe;
}

function cellState(neighbours, PREV_STATE) {
    var STATE = DEAD;
    if (PREV_STATE == ALIVE && (neighbours == 2 || neighbours == 3)) {
        STATE = ALIVE;
    }
    else if (PREV_STATE == DEAD && neighbours == 3) {
        STATE = ALIVE;
    }
    return STATE;
}

function getNeighbours(universe, pX, pY) {
    let sum = 0;
	for (let x = pX - 1; x <= pX + 1; x++) {
		for (let y = pY - 1; y <= pY + 1; y++) {
            var nI = (x % rows + rows) % rows;
            var nJ = (y % cols + cols) % cols;
            var cell = universe[nI][nJ];

            if (x != pX || y != pY ) {
                sum += cell.state;
            }
            // BOUNDS ((x != pX || y != pY) && x >= 0 && x < rows && y >= 0 && y < rows) {
        }
    }
    //console.log(sum);
    return sum;
}
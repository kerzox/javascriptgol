

function nextGeneration(type) {
    buffer = make2DArray(rows, cols);
	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < cols; y++) {
            var cell = universe[x][y];
            var PREV_STATE = cell.state;
            var neighbours = getNeighbours(type,universe, x, y);
            buffer[x][y] = new Cell(x * resolution, y * resolution, resolution, cellState(neighbours, PREV_STATE));
        }
    }
    universe = buffer;
    return universe;
}

function cellState(neighbours, PREV_STATE) {
    var STATE = DEAD;
    for (let i = 0; i <= Survival.length; i++) {
        if (PREV_STATE == ALIVE && neighbours == Survival[i]) {
            STATE = ALIVE;
        }
    }
    for (let i = 0; i <= Birth.length; i++) {
        if (PREV_STATE == DEAD && neighbours == Birth[i]) {
            STATE = ALIVE;
        }
    }
    return STATE;
}

function getNeighbours(type, universe, pX, pY) {
    let sum = 0;
    if (type == "moore") {
        for (let x = pX - order; x <= pX + order; x++) {
            for (let y = pY - order; y <= pY + order; y++) {
                var nI = (x % rows + rows) % rows;
                var nJ = (y % cols + cols) % cols;
                var cell = universe[nI][nJ];
                if (x != pX || y != pY ) {
                    sum += cell.state;
                }
                // BOUNDS ((x != pX || y != pY) && x >= 0 && x < rows && y >= 0 && y < rows) {
            }
        }
    }
    else {
        for (let x = pX - order; x <= pX + order; x++) {
            for (let y = pY - order; y <= pY + order; y++) {
                mh_distance = abs(pX - x) + abs(pY - y)
                if (mh_distance <= order) {
                    var nI = (x % rows + rows) % rows;
                    var nJ = (y % cols + cols) % cols;
                    var cell = universe[nI][nJ];
                    if (x != pX || y != pY ) {
                        sum += cell.state;
                    }
                    // BOUNDS ((x != pX || y != pY) && x >= 0 && x < rows && y >= 0 && y < rows) {
                }
            }
        }
    }
    if (center == true) {
        var centerState = universe[pX][pY];
        sum += centerState.state;
    }
    return sum;
}
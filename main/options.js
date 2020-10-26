const ALIVE = 1;
const DEAD = 0;

let center = false;
let order = 1;
let state;
let rows;
let cols;
let resolution = 25;

let Survival = [2, 3];
let Birth = [3];

let runMoore = false;
let runVon = false;

function survivalParse() {
    const numbers = this.value();
    if (numbers.includes("...")) {
        var split = numbers.split("...");

        var minimum;
        var maximum;

        if ((minimum = parseInt(split[0])) && (maximum = parseInt(split[1]))) {
            console.log(minimum, maximum);
            Survival = [];
            if (minimum < maximum) {
                for (var num = minimum; num < maximum + 1; num++)
                {
                    Survival.push(num);
                }
            }
        }
    }
}
function birthParse() {
    const numbers = this.value();
    if (numbers.includes("...")) {
        var split = numbers.split("...");

        var minimum;
        var maximum;

        if ((minimum = parseInt(split[0])) && (maximum = parseInt(split[1]))) {
            console.log(minimum, maximum);
            Birth = [];
            if (minimum < maximum) {
                for (var num = minimum; num < maximum + 1; num++)
                {
                    Birth.push(num);
                }
            }
        }
    }
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const x_cells_count = 6;
const y_cells_count = 10;

const size = 60;
const distance = Math.round(size / 15);

const WIDTH = x_cells_count * size + (distance * x_cells_count) + distance;
const HEIGHT = y_cells_count * size + (distance * y_cells_count) + distance;

canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.fillStyle = '#00cccc';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

class Pixel {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;

        this.colors_list = {
            "act": "#e0ffff",
            "dft": "#004953",
            "bg": "#465945"
        };
    };

    draw(color) {
        ctx.fillStyle = this.colors_list[color];
        ctx.fillRect(this.x, this.y, size, size);
    };
};


let screen = function draw_gird() {
    let canvas_array = [];
    let canvas_pixels = [];

    let y = distance;
    
    for (let i = 0; i < y_cells_count; i++) {
        let x = distance;
        let row_pixels = [];
        let row_array = [];
        for (let j = 0; j < x_cells_count; j++) {
            row_pixels.push(new Pixel(x, y));
            row_array.push([x, y]);
            x += (distance + size);
        };
        y += (distance + size);
        canvas_array.push(row_array);
        canvas_pixels.push(row_pixels);
    };

    return {
        "pixels": canvas_pixels,
        "table": canvas_array
    };
};

console.log(screen());

for (let row of screen()['pixels']) {
    for (let pixel of row) {
        pixel.draw("bg");
    }
};

class Figures {
    constructor(screen_array, screen_pixels) {
        this.figures = {
            "wh": [[0, 1], [1, 0], [1, 1], [1, 2]],
            "zv": [[0, 0], [1, 0], [1, 1], [2, 1]],
            "rzv": [[0, 1], [1, 1], [1, 0], [2, 0]],
            "o": [[0, 0], [0, 1], [1, 0], [1, 1]]
        };
        this.screen_array = screen_array;
        this.screen_pixels = screen_pixels;
    };

    place_figure(figure) {
        // TODO: place figure in screen, check for collisions
        for (let i = 0; i < this.figures[figure].length; i++) {
            let x = this.figures[figure][i][0];
            let y = this.figures[figure][i][1];
            this.screen_pixels[y][x].draw("act");
        };
    };
};

let figures = new Figures(screen()['table'], screen()['pixels']);
figures.place_figure("wh");

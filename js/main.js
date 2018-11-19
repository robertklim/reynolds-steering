let font
let vehicles = [];
let frames = 1;
let targetTextPoints = [];
let change = false;

function preload() {
    font = loadFont('assets/RobotoMono-Bold.ttf');
}

function setup() {
    createCanvas(1200, 500);
    background(0);
    textFont(font);
    // textSize(128);
    // fill(255);
    // noStroke();
    // text('Pie is a lie!', 35, 280);

    targetTextPoints = font.textToPoints('Pie is a lie!', 35, 280, 128);

    for (let i = 0; i < targetTextPoints.length; i++) {
        let p = targetTextPoints[i];
        let vehicle = new Vehicle(p.x, p.y);
        vehicles.push(vehicle);
        // stroke(255);
        // strokeWeight(4);
        // point(p.x, p.y);
    }

}

function draw() {
    background(0);
    
    for (let i = 0; i < vehicles.length; i++) {
        let vehicle = vehicles[i];
        vehicle.behaviors();
        vehicle.update();
        vehicle.show();
    }

    if (frames % 300 === 0) {
        targetTextPoints = font.textToPoints('!!eil a si eiP', 35, 280, 128);
        change = true;
    } else if (frames % 700 === 0) {
        targetTextPoints = font.textToPoints('Pie is a lie!', 35, 280, 128);
        change = true;
    }

    if (change) {
        if (targetTextPoints.length >= vehicles.length) {
            for (let i = 0; i < targetTextPoints.length; i++) {
                if (i < vehicles.length) {
                    let p = targetTextPoints[i];
                    vehicles[i].target.set(p.x, p.y);
                } else {
                    let p = targetTextPoints[i];
                    let index = floor(random(vehicles.length));
                    vehicles[i] = new Vehicle(p.x, p.y);
                    vehicles[i].pos.set(vehicles[index].pos.x, vehicles[index].pos.y)
                }
            }
        } else {
            for (let i = 0; i < vehicles.length; i++) {
                if (i < targetTextPoints.length) {
                    let p = targetTextPoints[i];
                    vehicles[i].target.set(p.x, p.y);
                } else {
                    vehicles.splice(i, vehicles.length);
                }
            }
        }
        change = false;
    }

    frames++;
}
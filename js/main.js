let font
let vehicles = [];

function preload() {
    font = loadFont('assets/RobotoMono-Bold.ttf');
}

class Vehicle {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.target = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
    }

    show() {
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

}

function setup() {
    createCanvas(1200, 500);
    background(0);
    textFont(font);
    // textSize(128);
    // fill(255);
    // noStroke();
    // text('Pie is a lie!', 35, 280);

    let textPoints = font.textToPoints('Pie is a lie!', 35, 280, 128);

    for (let i = 0; i < textPoints.length; i++) {
        let p = textPoints[i];
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
        vehicle.update();
        vehicle.show();
    }
}
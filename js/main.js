let font
let vehicles = [];

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
        vehicle.behaviors();
        vehicle.update();
        vehicle.show();
    }
}
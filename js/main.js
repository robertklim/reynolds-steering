let font

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
        stroke(255);
        strokeWeight(4);
        point(p.x, p.y);
    }

}

function draw() {

}
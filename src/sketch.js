import Element from "./Element";

const probabilityToFork = 0.02;
let elements = [];
let images;
let image;
let imageIndex = 0;
let maxElements;

function preload() {
    images = [
        sk.loadImage('assets/van1.jpg'),
        sk.loadImage('assets/van2.jpg'),
        sk.loadImage('assets/van3.jpg')
    ];
    image = images[imageIndex];
}

function setup() {
    sk.createCanvas(image.width, image.height);
    sk.background(0);
    elements.push(new Element());
    maxElements = sk.round(image.width * image.height / 500);
    console.log(maxElements);
}

function draw() {
    elements.forEach(element => element.draw(image));

    elements = elements.map(element => element.resetIfOutside());

    if (elements.length <= maxElements) {
        elements.forEach(element => fork(element));
    }
}

function mousePressed() {
    imageIndex++;
    imageIndex %= images.length;
    image = images[imageIndex];
    console.log("changing image to n°" + imageIndex);
}

function fork(element) {
    if (sk.random() <= probabilityToFork && !element.hasForked) {
        elements.push(element.fork());
    }
}

export {preload, setup, draw, mousePressed};
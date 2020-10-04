import Transformer from "./Transformer";

export default class Element {
    constructor(vector, minRadius, maxRadius) {
        this.vector = vector ? vector : sk.createVector(sk.width / 2, sk.height / 2);
        this.previousVector = this.vector.copy();
        this.isReversed = sk.random() > 0.5;
        this.minRadius = minRadius ? minRadius : 3;
        this.maxRadius = maxRadius ? maxRadius : 17;
        this.radius = this.generateRadius();
        this.angle = 0;
        this.hasForked = false;
        this.timesOutside = 0;
        this.transformer = new Transformer();
    }

    draw(image) {
        this.update(image);
        sk.stroke(this.getPixel(image));
        sk.line(this.previousVector.x, this.previousVector.y, this.vector.x, this.vector.y);
        this.previousVector = this.vector.copy();
    }

    update(image) {
        this.angle = this.transformer.transformAngle(this.vector, this.angle, this.radius, this.isReversed);
        this.vector = this.transformer.transformVector(this.vector, this.angle, this.radius, this.isReversed);

        let pixel = this.getPixel(image);
        if (this.shouldSwitchOnPixel(pixel)) {
            this.angle -= sk.PI;
            this.radius = this.generateRadius();
        }

        if(!isInCanvas(this.vector)){
            this.timesOutside++;
        }
    }

    fork() {
        this.hasForked = true;
        return new Element(this.vector);
    }

    resetIfOutside(){
        if(this.timesOutside >= 200){
            let randomVector = sk.createVector(sk.random(sk.width), sk.random(sk.height));
            return new Element(randomVector, 2, 10);
        }
        return this;
    }

    getPixel(image) {
        return image.get(sk.round(this.vector.x), sk.round(this.vector.y));
    }

    generateRadius() {
        return sk.random(this.minRadius, this.maxRadius);
    }

    shouldSwitchOnPixel(pixel){
        return sk.lightness(pixel) > 30;
    }

};

function isInCanvas(vector) {
    return vector.x >= 0 && vector.x <= sk.width
        && vector.y >= 0 && vector.y <= sk.height
}



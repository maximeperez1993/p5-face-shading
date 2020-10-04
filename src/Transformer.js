export default class Transformer {
    constructor() {
        this.reverseX = sk.random() > 0.5;
        this.reverseY = sk.random() > 0.5;
    }

    transformAngle(vector, angle, radius, isReversed) {
        let div = 1 / radius;
        return isReversed ? angle - div : angle + div;
    }

    transformVector(vector, angle, radius, isReversed) {
        let cos = sk.cos(angle) * radius;
        let sin = sk.sin(angle) * radius;
        cos = this.reverseX ? -cos : cos;
        sin = this.reverseY ? -sin : sin;
        return sk.createVector(vector.x + cos, vector.y + sin);
    }
};
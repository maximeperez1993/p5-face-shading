import * as p5 from 'p5/lib/p5';
import {draw, preload, setup, mousePressed} from './sketch';

function sketch(sk) {
    window.sk = sk;
    sk.preload = preload;
    sk.setup = setup;
    sk.draw = draw;
    sk.mousePressed = mousePressed;
    console.log(sk);
}

const P5 = new p5(sketch);
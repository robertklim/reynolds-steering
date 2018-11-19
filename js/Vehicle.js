class Vehicle {

    constructor(x, y) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.maxSpeed = 5;
        this.maxForce = 0.3;
    }

    behaviors() {
        // let seek = this.seek(this.target);
        // this.applyForce(seek);

        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

        // make flee force stronger than arrvive
        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);

    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0); // clear acceleration
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let dist = desired.mag();
        let speed = this.maxSpeed;
        // move vehicle slower until full stop if it is closer to its target
        if (dist < 100) {
            speed = map(dist, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let dist = desired.mag();
        // apply only when hostile agent is closer than 50px
        if (dist < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    show() {
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

}
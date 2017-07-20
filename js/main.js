function Particle(x, y, hu, firework) {

  this.pos = createVector(x,y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;

  if (this.firework) {
    this.vel = createVector(0, random(-17, -8));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 6));
  }

  this.acc = createVector(0,0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function () {
    if (!this.firework) {
      this.vel.mult(0.95);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function () {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(hu, 255, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(hu, 255, 255);
    }
    point(this.pos.x, this.pos.y)
  }

}
function Firework() {

  this.hu= random(255);
  this.firework = new Particle(random(width), height, this.hu, true);
  this.ecploded = false;
  this.particles = [];

  this.done = function () {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >=0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (var i = this.particles.length-1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.explode = function () {
    // let amount = random(50, 300);
    for (var i = 0; i < 77; i++) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}


let fireworks = [];
let gravity;
// var mic;

var img;
function preload() {
  img = loadImage("img/logo.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);


  // mic = new p5.AudioIn()
  // mic.start();
  // console.log(mic);

  colorMode(HSB);
  gravity = createVector(0, 0.2)
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  // 212x92
  image(img, windowWidth/2-106, windowHeight/2-46);


  // micLevel = mic.getLevel();
  // console.log(micLevel);

  if (random(1) < 0.1) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i,1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFBhcnRpY2xlKHgsIHksIGh1LCBmaXJld29yaykge1xuXG4gIHRoaXMucG9zID0gY3JlYXRlVmVjdG9yKHgseSk7XG4gIHRoaXMuZmlyZXdvcmsgPSBmaXJld29yaztcbiAgdGhpcy5saWZlc3BhbiA9IDI1NTtcbiAgdGhpcy5odSA9IGh1O1xuXG4gIGlmICh0aGlzLmZpcmV3b3JrKSB7XG4gICAgdGhpcy52ZWwgPSBjcmVhdGVWZWN0b3IoMCwgcmFuZG9tKC0xNywgLTgpKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnZlbCA9IHA1LlZlY3Rvci5yYW5kb20yRCgpO1xuICAgIHRoaXMudmVsLm11bHQocmFuZG9tKDEsIDYpKTtcbiAgfVxuXG4gIHRoaXMuYWNjID0gY3JlYXRlVmVjdG9yKDAsMCk7XG5cbiAgdGhpcy5hcHBseUZvcmNlID0gZnVuY3Rpb24oZm9yY2UpIHtcbiAgICB0aGlzLmFjYy5hZGQoZm9yY2UpO1xuICB9XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmZpcmV3b3JrKSB7XG4gICAgICB0aGlzLnZlbC5tdWx0KDAuOTUpO1xuICAgICAgdGhpcy5saWZlc3BhbiAtPSA0O1xuICAgIH1cbiAgICB0aGlzLnZlbC5hZGQodGhpcy5hY2MpO1xuICAgIHRoaXMucG9zLmFkZCh0aGlzLnZlbCk7XG4gICAgdGhpcy5hY2MubXVsdCgwKTtcbiAgfVxuXG4gIHRoaXMuZG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5saWZlc3BhbiA8IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgY29sb3JNb2RlKEhTQik7XG4gICAgaWYgKCF0aGlzLmZpcmV3b3JrKSB7XG4gICAgICBzdHJva2VXZWlnaHQoMik7XG4gICAgICBzdHJva2UoaHUsIDI1NSwgMjU1LCAyNTUsIHRoaXMubGlmZXNwYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJva2VXZWlnaHQoNCk7XG4gICAgICBzdHJva2UoaHUsIDI1NSwgMjU1KTtcbiAgICB9XG4gICAgcG9pbnQodGhpcy5wb3MueCwgdGhpcy5wb3MueSlcbiAgfVxuXG59XG5mdW5jdGlvbiBGaXJld29yaygpIHtcblxuICB0aGlzLmh1PSByYW5kb20oMjU1KTtcbiAgdGhpcy5maXJld29yayA9IG5ldyBQYXJ0aWNsZShyYW5kb20od2lkdGgpLCBoZWlnaHQsIHRoaXMuaHUsIHRydWUpO1xuICB0aGlzLmVjcGxvZGVkID0gZmFsc2U7XG4gIHRoaXMucGFydGljbGVzID0gW107XG5cbiAgdGhpcy5kb25lID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmV4cGxvZGVkICYmIHRoaXMucGFydGljbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5leHBsb2RlZCkge1xuICAgICAgdGhpcy5maXJld29yay5hcHBseUZvcmNlKGdyYXZpdHkpO1xuICAgICAgdGhpcy5maXJld29yay51cGRhdGUoKTtcblxuICAgICAgaWYgKHRoaXMuZmlyZXdvcmsudmVsLnkgPj0wKSB7XG4gICAgICAgIHRoaXMuZXhwbG9kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmV4cGxvZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aC0xOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uYXBwbHlGb3JjZShncmF2aXR5KTtcbiAgICAgIHRoaXMucGFydGljbGVzW2ldLnVwZGF0ZSgpO1xuICAgICAgaWYgKHRoaXMucGFydGljbGVzW2ldLmRvbmUoKSkge1xuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5leHBsb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIGxldCBhbW91bnQgPSByYW5kb20oNTAsIDMwMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3NzsgaSsrKSB7XG4gICAgICB2YXIgcCA9IG5ldyBQYXJ0aWNsZSh0aGlzLmZpcmV3b3JrLnBvcy54LCB0aGlzLmZpcmV3b3JrLnBvcy55LCB0aGlzLmh1LCBmYWxzZSk7XG4gICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHApO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5leHBsb2RlZCkge1xuICAgICAgdGhpcy5maXJld29yay5zaG93KCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucGFydGljbGVzW2ldLnNob3coKTtcbiAgICB9XG4gIH1cbn1cblxuXG5sZXQgZmlyZXdvcmtzID0gW107XG5sZXQgZ3Jhdml0eTtcbi8vIHZhciBtaWM7XG5cbnZhciBpbWc7XG5mdW5jdGlvbiBwcmVsb2FkKCkge1xuICBpbWcgPSBsb2FkSW1hZ2UoXCJpbWcvbG9nby5wbmdcIik7XG59XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICBjcmVhdGVDYW52YXMod2luZG93V2lkdGgsd2luZG93SGVpZ2h0KTtcblxuXG4gIC8vIG1pYyA9IG5ldyBwNS5BdWRpb0luKClcbiAgLy8gbWljLnN0YXJ0KCk7XG4gIC8vIGNvbnNvbGUubG9nKG1pYyk7XG5cbiAgY29sb3JNb2RlKEhTQik7XG4gIGdyYXZpdHkgPSBjcmVhdGVWZWN0b3IoMCwgMC4yKVxuICBzdHJva2UoMjU1KTtcbiAgc3Ryb2tlV2VpZ2h0KDQpO1xuICBiYWNrZ3JvdW5kKDApO1xufVxuXG5mdW5jdGlvbiBkcmF3KCkge1xuICBjb2xvck1vZGUoUkdCKTtcbiAgYmFja2dyb3VuZCgwLCAwLCAwLCAyNSk7XG4gIC8vIDIxMng5MlxuICBpbWFnZShpbWcsIHdpbmRvd1dpZHRoLzItMTA2LCB3aW5kb3dIZWlnaHQvMi00Nik7XG5cblxuICAvLyBtaWNMZXZlbCA9IG1pYy5nZXRMZXZlbCgpO1xuICAvLyBjb25zb2xlLmxvZyhtaWNMZXZlbCk7XG5cbiAgaWYgKHJhbmRvbSgxKSA8IDAuMSkge1xuICAgIGZpcmV3b3Jrcy5wdXNoKG5ldyBGaXJld29yaygpKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSBmaXJld29ya3MubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgZmlyZXdvcmtzW2ldLnVwZGF0ZSgpO1xuICAgIGZpcmV3b3Jrc1tpXS5zaG93KCk7XG4gICAgaWYgKGZpcmV3b3Jrc1tpXS5kb25lKCkpIHtcbiAgICAgIGZpcmV3b3Jrcy5zcGxpY2UoaSwxKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gd2luZG93UmVzaXplZCgpIHtcbiAgcmVzaXplQ2FudmFzKHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xufSJdLCJmaWxlIjoibWFpbi5qcyJ9

class Countdown {
  constructor() {
  this.duration = 0;
  this.elapsed = 0;
  this.isActive = false;
  this.lastFrameTime = Date.now();
  
  this.onTick = () => {};
  this.onCompleted = () => {};
  
  this.tick();
  
}





getTimeLeft() {

  

  const t = this.duration - this.elapsed;

  return Math.max(0, t);
}

pause() {
    this.isActive = false;
  
  return this;
}

reset() {
  this.elapsed = 0;
}

setDuration(seconds) {
  this.lastFrameTime = Date.now();
  this.duration = seconds;
  
  return this;
}

start() {
    this.isActive = true;
  
  return this;
}

tick() {
  const currentFrameTime = Date.now();
  const deltaTime = currentFrameTime - this.lastFrameTime;
  this.lastFrameTime = currentFrameTime;

  if (this.isActive) {
    this.elapsed += deltaTime / 1000;
    this.onTick(this.getTimeLeft());
    
    if(this.getTimeLeft() <= 0) {
      this.pause();
      this.onCompleted();
    }
  }
  
  window.requestAnimationFrame(this.tick.bind(this));
}
};

// TODO: Convert in to propert Typescript
/* tslint-disable curly, no-new, no-warning-comments */

export default function Animation(option: any) {
  this.animate = this.animate.bind(this);
  this.start = this.start.bind(this);
  this.option = option;
}

Animation.prototype.animate = function (now: any) {
  const {
    start,
    end,
    duration,
    onAnimationFrame,
    onAnimationEnd,
    easingFunc = this.defaultEasing
  } = this.option;

  const currentDuration = now - this.startTime;
  if (currentDuration >= duration) {
    onAnimationFrame(end);
    onAnimationEnd();
    return;
  }
  let value;
  if (start > end) {
    value = start - (start - end) * easingFunc(currentDuration / duration);
  } else {
    value = (end - start) * easingFunc(currentDuration / duration) + start;
  }
  onAnimationFrame(value);
  requestAnimationFrame(this.animate);
};

Animation.prototype.start = function (time: Date) {
  this.startTime = new Date();
  this.animate(time || this.startTime);
};

Animation.prototype.defaultEasing = (t: any) => t;

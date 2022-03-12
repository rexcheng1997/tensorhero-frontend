/* eslint-disable require-jsdoc */

class Howl {
  constructor(options) {
    this.src = options.src || [];
    this.isPlaying = options.autoplay || false;
    this._volume = options.volume || 1;
    this._duration = 120;
    this.timestamp = 0;
    this.listeners = {};
    this.eventID = -1;
  }

  on(event, handler) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  once(event, handler) {
    if (event === 'load') setTimeout(handler);
  }

  unload() {
    this.stop();
    this.src = [];
    this.listeners = {};
  }

  play() {
    this.isPlaying = true;
    this.eventID = setInterval(() => {
      this.timestamp++;

      if (this.timestamp > this.duration) {
        this.stop();
      }
    }, 1e3);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.eventID);
  }

  stop() {
    this.isPlaying = false;
    this.timestamp = 0;
    clearInterval(this.eventID);
  }

  playing() {
    return this.isPlaying;
  }

  volume(value) {
    if (value !== undefined) this.volume = value;
    return this.volume;
  }

  duration() {
    return this.duration;
  }

  seek(position) {
    if (position !== undefined) this.timestamp = position;
    return this.timestamp;
  }
}

exports.Howl = Howl;

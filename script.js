const App = {
  MILLISECONDS_IN_CENTISECOND: 10,
  MILLISECONDS_IN_SECOND: 1000,
  MILLISECONDS_IN_MINUTE: 60000,
  MILIISECONDS_IN_HOUR: 3600000,
  INITIAL: 0,
  init() {
    this.DOMTime = document.querySelector(".time");
    this.timeElapsed = this.INITIAL;
    this.pause = 0;

    this.renderTime();

    this.bindEvents();

    return this;
  },

  bindEvents() {
    document
      .querySelector(".initiate")
      .addEventListener("click", this.handleStartStop.bind(this));

    document
      .querySelector(".reset")
      .addEventListener("click", this.handleReset.bind(this));
  },

  centisecondsElapsed() {
    return (
      Math.floor(this.timeElapsed / this.MILLISECONDS_IN_CENTISECOND) % 100
    );
  },

  secondsElapsed() {
    return Math.floor(this.timeElapsed / this.MILLISECONDS_IN_SECOND) % 60;
  },

  minutesElapsed() {
    return Math.floor(this.timeElapsed / this.MILLISECONDS_IN_MINUTE) % 60;
  },

  hoursElapsed() {
    return Math.floor(this.timeElapsed / this.MILIISECONDS_IN_HOUR) % 100;
  },

  formatTime(time) {
    return String(time).padStart(2, "0");
  },

  renderTime() {
    this.DOMTime.textContent = `${this.formatTime(
      this.hoursElapsed()
    )}:${this.formatTime(this.minutesElapsed())}:${this.formatTime(
      this.secondsElapsed()
    )}:${this.formatTime(this.centisecondsElapsed())}`;
  },

  handleStartStop(event) {
    let startStopButton = event.currentTarget;

    if (startStopButton.classList.contains("start")) {
      startStopButton.classList.replace("start", "stop");
      startStopButton.textContent = "Stop";
      this.startTimer();
    } else {
      startStopButton.classList.replace("stop", "start");
      startStopButton.textContent = "Start";
      this.stopTimer();
    }
  },

  handleReset() {
    document.querySelector(".initiate").textContent = "Start";
    document.querySelector(".initiate").classList.replace("stop", "start");
    this.resetTimer();
  },

  startTimer() {
    let start = Date.now() - this.timeElapsed;

    const updateTimer = () => {
      this.timeElapsed = Date.now() - start;

      this.renderTime();

      this.interval = requestAnimationFrame(updateTimer);
    };

    updateTimer();
  },

  stopTimer() {
    this.interval = cancelAnimationFrame(this.interval);
  },

  resetTimer() {
    this.stopTimer();
    this.timeElapsed = this.INITIAL;
    this.renderTime();
  },

  padToTwoDigits(count) {
    return count.padStart(2, "0");
  },
};

App.init();

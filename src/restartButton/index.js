export class RestartButton {
  button;

  constructor() {
      this.button = document.getElementById('restart__btn');
  }

  get() {
      return this.button;
  }
}

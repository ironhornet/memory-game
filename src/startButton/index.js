export class StartButton {
    button;

    constructor() {
        this.button = document.getElementById('start__btn');
    }

    get() {
        return this.button;
    }

    disable() {
        this.button.setAttribute('disabled', 'true');
    }
}

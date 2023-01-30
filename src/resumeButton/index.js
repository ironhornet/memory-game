export class ResumeButton {
    button;

    constructor() {
        this.button = document.createElement('button');
    }

    create() {
        this.button.className = 'continue__Btn btn';
        this.button.id = 'continue__Btn';
        this.button.innerText = 'Continue';
    }

    getButtonHtml() {
        this.create();

        return this.button.outerHTML;
    }
}

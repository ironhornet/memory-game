export class Cell {
    #newDiv;

    constructor(subject, index) {
        this.subject = subject;
        this.index = index;

        this.#newDiv = document.createElement('div');
    }

    static flip(element, back) {
        if (back) {
            element.classList.remove('is-flipped');
        } else {
            element.classList.toggle('is-flipped');
        }
    }

    create() {
        this.#newDiv.classList.add('cardContainer');

        const html = `<div id="${this.index}" meta="${this.subject}" class="cardContainer__inner">
            <div class="card card__front"></div>
            <div class="card card__back">${this.subject}</div>
        </div>`;

        this.#newDiv.innerHTML = html;

        return this.#newDiv.outerHTML;
    }
}

export class MatchNumber {
    constructor(number) {
        this.number = number;
    }

    renderMatchNumber() {
        return  `<li class="matchesList__number">${this.number}</li>`;
    }
}

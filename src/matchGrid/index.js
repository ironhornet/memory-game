import { Cell } from "../cell"
import { MatchNumber } from "../matchNumber";
import { Popup } from "../popup";
import { RestartButton } from "../restartButton";
import { ResumeButton } from "../resumeButton";
import { StartButton } from "../startButton";
import { Timer } from "../timer";

export class MatchGrid {
    #grid;
    #matches;
    #cellData = [];
    #timer;
    #popup;
    #timeIsOverTimeoutId;
    #openedCellsNumber = 0;

    constructor(matchesLimit, width, height, columns, rows, timeLimit) {
        this.matchesLimit = matchesLimit;
        this.width = width;
        this.height = height;
        this.columns = columns;
        this.rows = rows;
        this.timeLimit = timeLimit;

        this.#grid = document.getElementById('gridGame');
        this.#matches = document.getElementById('matches');
        this.#popup = new Popup(this.#grid);
        this.#timer = new Timer(timeLimit);

        this.#onStartButtonClick();
        this.#onClick();
        this.#onMouseLeave();
        this.#restartGame();
    }

    create() {
        this.#addCellsToGrid();
        this.#setStyles();
    }

    #onStartButtonClick() {
        const startButton = new StartButton();
        const buttonElement = startButton.get();

        const startGame = () => {
            this.#timer.start();
            startButton.disable();
            this.#grid.style.pointerEvents = 'all';

            this.#timeIsOut();
        };

        buttonElement.addEventListener('click', startGame);
    }

    #addCellsToGrid() {
        const shuffled = this.#randomizer();

        shuffled.forEach((el, index) => {
            const cell = new Cell(el, index);

            this.#grid.insertAdjacentHTML('afterbegin', cell.create());
        });
    }

    #randomizer() {
        const numbers = Array.from(Array(this.matchesLimit).keys());

        return [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    }

    #setStyles() {
        this.#grid.style.cssText = `
            width: ${this.width}px;
            height: ${this.height}px;
            grid-template-columns: repeat(${this.columns}, auto);
            grid-template-rows: repeat(${this.rows}, auto);
        `;
    }

    #showMatchNumbers(value) {
        const matchNumber = new MatchNumber(value);
        const matchElement = matchNumber.renderMatchNumber(); -

            this.#matches.insertAdjacentHTML('beforeend', matchElement);
    }

    #resetCardData() {
        this.#cellData = [];
    }

    #checkMatched() {
        const [cell1, cell2] = this.#cellData;

        if (cell1.cellValue === cell2.cellValue) {
            this.#countMatchedCard();
            this.#cellData.forEach((item) => {
                document.getElementById(item.cellId).style.pointerEvents = 'none';
            })
            this.#showMatchNumbers(cell1.cellValue);
            this.#resetCardData();

            return
        }

        setTimeout(() => {
            this.#cellData.forEach((item) => {
                Cell.flip(document.getElementById(item.cellId), true);
            })
            this.#resetCardData();
        }, 600)
    }

    #manageCells(e) {
        if (!e.target.offsetParent || !e.target.offsetParent.attributes.meta) return;

        const { offsetParent } = e.target;
        const cellValue = offsetParent.attributes.meta.value;
        const cellId = offsetParent.id;
        const cellElement = offsetParent;

        Cell.flip(cellElement, false);
        if (this.#cellData[0] && this.#cellData[0].cellId === cellId) return

        this.#cellData.push({ cellValue, cellId, cellElement });

        if (this.#cellData.length === 2) this.#checkMatched();
    }

    #onClick() {
        this.#grid.addEventListener('click', this.#manageCells.bind(this));
    }

    #addResumeButton() {
        const resumeButton = new ResumeButton();
        const markup = resumeButton.getButtonHtml();
        this.#grid.insertAdjacentHTML('afterbegin', markup);
        const button = document.getElementById('continue__Btn');

        const resumeGame = () => {
            this.#timer.resume();

            button.remove();
            this.#grid.style.pointerEvents = 'all';
            this.#timeIsOut();
        };

        button.addEventListener('click', resumeGame);
    }

    #onMouseLeave() {
        this.#grid.addEventListener('mouseleave', (e) => {
            const paused = this.#timer.getTimePaused();
            if (e && !paused) {
                this.#timer.pause();
                this.#addResumeButton();

                this.#grid.style.pointerEvents = 'none';
            }
        });
    }

    #restartGame() {
        const restartButton = new RestartButton().get();

        const newGrid = () => {
            while (this.#grid.lastElementChild) {
                this.#grid.removeChild(this.#grid.lastElementChild);
            }

            while (this.#matches.lastElementChild) {
                this.#matches.removeChild(this.#matches.lastElementChild);
            }
            clearInterval(this.#timer.timeInterval);

            this.create();
            
            const startButton = new StartButton();
            this.#timer.start();
            startButton.disable();
            this.#grid.style.pointerEvents = 'all';      

            this.#timeIsOut();      
        }
        restartButton.addEventListener('click', newGrid);
    }

    #countMatchedCard() {
        this.#openedCellsNumber = ++this.#openedCellsNumber
        if(this.#openedCellsNumber === this.matchesLimit) {
            this.#gameWin()
        }
    }

    #gameWin() {
        this.#timer.pause();
        this.#grid.style.pointerEvents = 'none';
        this.#popup.createPopup('Good job, you opened all the cards');
        clearTimeout(this.#timeIsOverTimeoutId);
    }

    #timeIsOut() {
        const timerDeadline = this.#timer.getDeadline();

        clearTimeout(this.#timeIsOverTimeoutId);

        this.#timeIsOverTimeoutId = setTimeout(() => {
            this.#popup.createPopup('Time is up try again');
        }, timerDeadline);
    }
}
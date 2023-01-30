export class Popup {
  popup;

  constructor(gridElement) {
    this.gridElement = gridElement;
  }

  createPopup(text) {
    const html = `<div class="popup" id="popup">${text}</div>`;

    this.gridElement.insertAdjacentHTML('beforeend', html);
  }
}

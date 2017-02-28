export default class View {
    constructor() {
        this._view = document.createElement("div");
        this._parent = null;
    }

    appendTo(container) {
        this._parent = container;
        this._parent.appendChild(this._view);
    }

    detach() {
        if (this._parent != null) {
            this._parent.removeChild(this._view);
            this._parent = null;
        }
    }
}

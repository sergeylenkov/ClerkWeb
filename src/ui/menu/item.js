import styles from "./item.css";

export default class MenuItem {
    constructor(name) {
        this._view = document.createElement("div");
        this._view.className = styles.container;

        this._text = document.createElement("div");
        this._text.className = styles.text;

        this._view.appendChild(this._text);

        this.setText(name);
        this.setSelected(false);
        this.setIndex(0);

        let self = this;

        this._view.addEventListener("click", function() {
            if (self._delegate && self._delegate.didClick) {
                self._delegate.didClick(self);
            }
        });
    }

    appendTo(container) {
        container.appendChild(this._view);
    }

    setSelected(selected) {
        this._selected = selected;

        if (selected) {
            this._view.setAttribute("selected", true);
        } else {
            this._view.removeAttribute("selected");
        }
    }

    setText(text) {
        this._text.innerText = text;
    }

    setIndex(index) {
        this._index = index;
    }

    getIndex() {
        return this._index;
    }

    setDelegate(delegate) {
        this._delegate = delegate;
    }
}

import View from "../base/view.js";
import styles from "./menuItem.css";

export default class DashboardMenuItem extends View {
    constructor(icon, name) {
        super();

        this._view.className = styles.container;

        this._icon = document.createElement("div");
        this._icon.className = styles.icon;

        this._view.appendChild(this._icon);

        this._icon.style.backgroundImage = "url('/static/img/" + icon + ".svg')";
        this._title = document.createElement("div");
        this._title.className = styles.title;
        this._title.innerText = name;

        this._view.appendChild(this._title);

        this.setIndex(0);

        let self = this;

        this._view.addEventListener("click", function() {
            if (self._delegate && self._delegate.didClick) {
                self._delegate.didClick(self);
            }
        });
    }

    setSelected(selected) {
        this._selected = selected;

        if (selected) {
            this._view.setAttribute("selected", true);
        } else {
            this._view.removeAttribute("selected");
        }
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

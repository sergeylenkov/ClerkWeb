import MenuItem from "./item.js";
import styles from "./index.css";

export class Menu {
    constructor() {
        this._view = document.createElement("div");
        this._view.className = styles.container;

        this._items = [];

        let self = this;
        let itemDelegate = {
            didClick: this.didSelectItem.bind(this)
        }

        let menuItem = new MenuItem("Мои счета");
        menuItem.setIndex(0);
        menuItem.appendTo(this._view);

        menuItem.setDelegate(itemDelegate);

        this._items.push(menuItem);

        menuItem = new MenuItem("Переводы");
        menuItem.setIndex(1);
        menuItem.appendTo(this._view);

        menuItem.setDelegate(itemDelegate);

        this._items.push(menuItem);

        menuItem = new MenuItem("Отчеты");
        menuItem.setIndex(2);
        menuItem.appendTo(this._view);

        menuItem.setDelegate(itemDelegate);

        this._items.push(menuItem);
    }

    appendTo(container) {
        container.appendChild(this._view);
    }

    setSelectedItem(index, selected) {
        for (let i = 0; i < this._items.length; i++) {
            this._items[i].setSelected(false);
        }

        if (index < this._items.length) {
            this._items[index].setSelected(selected);
        }
    }

    setDelegate(delegate) {
        this._delegate = delegate;
    }

    didSelectItem(sender) {
        let index = sender.getIndex();
        this.setSelectedItem(index, true);

        if (this._delegate && this._delegate.didSelectItem) {
            this._delegate.didSelectItem(index);
        }
    }
}

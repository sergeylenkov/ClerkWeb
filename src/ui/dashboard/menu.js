import DashboardMenuItem from "./menuItem.js";
import styles from "./menu.css";

export default class DashboardMenu {
    constructor() {
        this._view = document.createElement("div");
        this._view.className = styles.container;

        this._items = [];

        let itemDelegate = {
            didClick: this.didSelectItem.bind(this)
        }

        let menuItem = new DashboardMenuItem('favorite', 'Сводка и расход');
        menuItem.setIndex(0);
        menuItem.setDelegate(itemDelegate);

        menuItem.appendTo(this._view);

        this._items.push(menuItem);

        menuItem = new DashboardMenuItem('card', 'Счета и карты');
        menuItem.setIndex(1);
        menuItem.setDelegate(itemDelegate);

        menuItem.appendTo(this._view);

        this._items.push(menuItem);

        menuItem = new DashboardMenuItem('safe', 'Бюджет и сбережения');
        menuItem.setIndex(2);
        menuItem.setDelegate(itemDelegate);

        menuItem.appendTo(this._view);

        this._items.push(menuItem);

        menuItem = new DashboardMenuItem('percent', 'Кредиты');
        menuItem.setIndex(3);
        menuItem.setDelegate(itemDelegate);

        menuItem.appendTo(this._view);

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

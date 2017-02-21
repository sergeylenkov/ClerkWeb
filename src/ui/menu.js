export class Menu {
	constructor(accounts) {
		this.view = document.createElement('div');
		this.view.className = 'menu';

		let header = this.header('', 'Dashboard', false);
		this.view.appendChild(header);

		header = this.header('', 'Deposits', true);
		this.view.appendChild(header);

		header = this.header('', 'Receipts', true);
		this.view.appendChild(header);

		header = this.header('', 'Expenses', true);
		this.view.appendChild(header);

		header = this.header('', 'Credits', true);
		this.view.appendChild(header);

		header = this.header('', 'Report', false);
		this.view.appendChild(header);

		header = this.header('', 'Budget', false);
		this.view.appendChild(header);
	}

	show(container) {
		container.appendChild(this.view);
	}

	header(icon, text, expandable) {
		let item = document.createElement('div');
		item.className = 'menu-item';

		let iconElement = document.createElement('div');
		iconElement.className = 'menu-item-icon';
		item.appendChild(iconElement);

		let titleElement = document.createElement('div');
		titleElement.className = 'menu-item-title';
		let node = document.createTextNode(text);
    	titleElement.appendChild(node);

		item.appendChild(titleElement);

		if (expandable) {
			let expandButton = document.createElement('div');
			expandButton.className = 'menu-item-button';
			item.appendChild(expandButton);
		}

		return item;
	}
}

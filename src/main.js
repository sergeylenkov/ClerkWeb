import { Date } from './lib/date.js';
import { Utils } from './utils.js';
import { DataHelper } from './data/helper.js';
import { Menu } from './ui/menu/index.js';
import { Dashboard } from './ui/dashboard/index.js';
import styles from "../css/ui.css";

function main() {
    window.data = new DataHelper('api.php');

    window.menu = new Menu();
    menu.appendTo(document.getElementById('menu'));
    menu.setSelectedItem(0, true);

    window.dashboard = new Dashboard();
    dashboard.appendTo(document.getElementById('content'));
    //dashboard.update();
}

window.onload = function() {
    main();
}

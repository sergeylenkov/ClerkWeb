import { Date } from './lib/date.js';
import { Utils } from './utils.js';
import { DataHelper } from './data/helper.js';
import { Menu } from './ui/menu.js';
import { Dashboard } from './ui/dashboard.js';

function main() {    
    window.data = new DataHelper('api.php');
    window.dashboard = new Dashboard();

    dashboard.show(document.getElementById('content'));
    dashboard.update();
}

window.onload = function() {
    main();
}

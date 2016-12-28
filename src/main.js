import { DataHelper } from './data/helper.js';
import { Menu } from './ui/menu.js';

var data = new DataHelper('api.php');
var menu;

data.accounts(function(response) {
    console.log('data:accounts');
    console.log(response);
    menu = new Menu(response);
    menu.show(document.getElementById('main'));
});

var data = new Data("api.php");
var dashboard = new Dashboard();
var transactions = new Transactions();
var reports = new Reports();
var budgets = new Budgets();
var accounts = new Accounts();

$(document).ready(function() {
    var selectMenu = function(sender) {
        if (sender.hasClass("active")) {
            return;
        }

        $("#menu").find("li").removeClass("active");
        sender.addClass("active");

        $("#content").html("");
    }

    $("#menu_dashboard").click(function() {
        selectMenu($(this));
        dashboard.load($("#content"));
    });

    $("#menu_transactions").click(function() {
        selectMenu($(this));
        transactions.load($("#content"));
    });

    $("#menu_reports").click(function() {
        selectMenu($(this));
        reports.load($("#content"));
    });

    $("#menu_budgets").click(function() {
        selectMenu($(this));
        budgets.load($("#content"));
    });

    $("#menu_accounts").click(function() {
        selectMenu($(this));
        accounts.load($("#content"));
    });

    $("#menu_dashboard").click();
});

var data = new Data("api.php");
var dashboard = new Dashboard();
var transactions = new Transactions();
var reports = new Reports();
var budgets = new Budgets();
var accounts = new Accounts();

$(document).ready(function() {
    var selectMenu = function(sender) {
        if (sender.hasClass("active")) {
            return false;
        }

        $("#menu").find("li").removeClass("active");
        sender.addClass("active");

        return true;
    }

    $("#menu_dashboard").click(function() {
        if (selectMenu($(this))) {
            $("#content").html("");
            dashboard.load($("#content"));
        }
    });

    $("#menu_transactions").click(function() {
        if (selectMenu($(this))) {
            $("#content").html("");
            transactions.load($("#content"));
        }
    });

    $("#menu_reports").click(function() {
        if (selectMenu($(this))) {
            $("#content").html("");
            reports.load($("#content"));
        }
    });

    $("#menu_budgets").click(function() {
        if (selectMenu($(this))) {
            $("#content").html("");
            budgets.load($("#content"));
        }
    });

    $("#menu_accounts").click(function() {
        if (selectMenu($(this))) {
            $("#content").html("");
            accounts.load($("#content"));
        }
    });

    $("#menu_dashboard").click();
});

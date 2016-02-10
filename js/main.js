var data = new Data("api.php");
var dashboard = new Dashboard();
var transactions = new Transactions();
var reports = new Reports();

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
        if ($(this).hasClass("active")) {
            return;
        }

        $("#menu").find("li").removeClass("active");
        $(this).addClass("active");

        $("#content").html("");
        dashboard.load($("#content"));
    });

    $("#menu_transactions").click(function() {
        if ($(this).hasClass("active")) {
            return;
        }

        $("#menu").find("li").removeClass("active");
        $(this).addClass("active");

        $("#content").html("");
        transactions.load($("#content"));
    });

    $("#menu_reports").click(function() {
        selectMenu($(this));
        reports.load($("#content"));
    });

    $("#menu_dashboard").click();
});

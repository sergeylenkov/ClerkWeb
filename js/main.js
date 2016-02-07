var data = new Data("api.php");
var dashboard = new Dashboard();
var transactions = new Transactions();

$(document).ready(function() {
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

    $("#menu_dashboard").click();
});

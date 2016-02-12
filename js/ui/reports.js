function Reports() {
    var self = this;
    var type = 0;

    this.load = function(container) {
        $.get("templates/reports.html", function(html) {
            var report = $(html);
            container.append(report);

            $("#reports_filter_expenses").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#reports_filter").find(".button").removeClass("active");
                $(this).addClass("active");

                self.type = data.accountType.expense;
                self.selectReport(type, -1);
                self.updateAccountsList();
            });

            $("#reports_filter_receipts").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#reports_filter").find(".button").removeClass("active");
                $(this).addClass("active");

                self.type = data.accountType.receipt;
                self.selectReport(type, -1);
                self.updateAccountsList();
            });

            $("#reports_account").change(function () {
                self.selectReport(self.type, $("#reports_account").val());
            });

            $("#reports_filter_expenses").click();
        });
    }

    this.selectReport = function(type, account) {
        data.expensesByMonth(account, function(data) {
            console.log(data);
            self.fillChart(data);
        });
    }

    this.fillChart = function(data) {
        var width = $("#reports_canvas").outerWidth(true);
        var height = $("#reports_canvas").outerHeight(true);
        var barPadding = 1;
        var max = d3.max(data, function(d) { return d.value; });
        var scale = d3.scale.linear().domain([0, max]).range([0, height]);
        var svg = d3.select("#reports_canvas").attr("width", width).attr("height", height);
        var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

        svg.selectAll("*").remove();
        svg.selectAll("rect").data(data).enter().append("rect")
        .attr("x", function(d, i) {
            return i * (width / data.length);
        })
        .attr("y", function(d) {
            //return height - (d.value / 1000.0);
            return height - scale(d.value);
        })
        .attr("width", width / data.length - barPadding)
        .attr("height", function(d) {
            return scale(d.value); //(d.value / 1000.0);
        })
        .on("mouseover", function() {
            tooltip.style("opacity", 1);
        })
        .on("mousemove", function(d) {
            var date = Date.parse(d.date);
            var dateStr = monthNames[date.getMonth()] + " " + date.getFullYear();

            tooltip.html(dateStr + "<br>" + d.value).style("left", (d3.event.pageX - 34) + "px").style("top", (d3.event.pageY - 40) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });
    }

    this.updateAccountsList = function() {
        $('#reports_account').html("");
        $('#reports_account').append($('<option>', {value: -1, text: "Все" }));

        if (self.type == data.accountType.expense) {
            data.accounts(data.accountType.expense, true, function(accounts) {
                for (var i = 0; i < accounts.length; i++) {
                    $('#reports_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
                }
            });
        } else if (self.type == data.accountType.receipt) {
            data.accounts(data.accountType.receipt, true, function(accounts) {
                for (var i = 0; i < accounts.length; i++) {
                    $('#reports_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
                }
            });
        }
    }
}

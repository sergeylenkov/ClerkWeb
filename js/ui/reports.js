function Reports() {
    var self = this;
    this.type = 0;
    var lastDate = null;
    this.selectedAccount = -1;
    this.selectReportType = -1;
    this.reportType = {receipt: 0, deposit: 1, expense: 2 };
    this.accounts = [];
    this.reportData = null;

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

                self.type = self.reportType.expense;
                self.selectReport(self.type, null);
                self.updateAccountsList();
            });

            $("#reports_filter_receipts").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#reports_filter").find(".button").removeClass("active");
                $(this).addClass("active");

                self.type = self.reportType.receipt;
                self.selectReport(self.type, null);
                self.updateAccountsList();
            });

            $("#reports_filter_balance").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#reports_filter").find(".button").removeClass("active");
                $(this).addClass("active");

                self.type = self.reportType.deposit;
                self.selectReport(self.type, null);
                self.updateAccountsList();
            });            

            $("#reports_account").change(function () {
                var account = self.accounts[$("#reports_account").val()];
                self.selectReport(self.type, account);
            });

            $("#reports_filter_expenses").click();
        });
    }

    this.selectReport = function(type, account) {
        self.selectedAccount = account;

        var fromDate = Date.today().addMonths(-6);
        var toDate = Date.today().moveToLastDayOfMonth();

        var accountId = -1;

        if (account) {
            accountId = account.id;
        }

        if (type == self.reportType.deposit) {
            data.balanceByMonth(accountId, fromDate.toString("yyyy-MM-dd"), toDate.toString("yyyy-MM-dd"), function(data) {
                console.log(data);
                var receipts = data.receipts;
                var expenses = data.expenses;
                var dates = {};

                for (var i = 0; i < receipts.length; i++) {
                    dates[receipts[i].date] = { receipt: 0, expense: 0 };
                    dates[receipts[i].date].receipt = receipts[i].value;
                }

                for (var i = 0; i < expenses.length; i++) {
                    if (!dates[expenses[i].date]) {
                        dates[expenses[i].date] = { receipt: 0, expense: 0 };
                    }

                    dates[expenses[i].date].expense = expenses[i].value;
                }

                self.reportData = dates;
                var datesSorted = [];

                Object.keys(dates).forEach(function(key) {
                    datesSorted.push({ date: key, receipt: dates[key].receipt, expense: dates[key].expense });
                });

                datesSorted.sort(function(a, b) {
                    return d3.ascending(a.date, b.date);
                });

                var reportData = [];
                var balance = 0;

                datesSorted.forEach(function(data) {
                    if (account && account.credit_limit > 0) {
                        balance = balance + data.receipt - data.expense;
                        reportData.push({ date: data.date, value: account.credit_limit + balance });
                    } else {
                        balance = balance + data.receipt - data.expense;
                        reportData.push({ date: data.date, value: balance });
                    }
                });

                console.log(reportData);
                self.fillChart(reportData);
            });
        } else {
            data.expensesByMonth(accountId, fromDate.toString("yyyy-MM-dd"), toDate.toString("yyyy-MM-dd"), function(data) {
                self.fillChart(data);
            });
        }        
    }

    this.fillChart = function(chartData) {
        var width = $("#reports_canvas").outerWidth(true);
        var height = $("#reports_canvas").outerHeight(true);
        var margin = {top: 20, right: 80, bottom: 30, left: 80};
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

        d3.select("#reports_canvas").selectAll("*").remove();

        var svg = d3.select("#reports_canvas")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var parseDate = d3.time.format("%Y %m").parse;
        var bisectDate = d3.bisector(function(d) { return d.date; }).left;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
        var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });

        chartData.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        // Scale the range of the data
        x.domain(d3.extent(chartData, function(d) { return d.date; }));
        y.domain([0, d3.max(chartData, function(d) { return d.value; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(chartData));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var tooltip = $("#report_tooltip");
        tooltip.hide();

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(chartData, x0, 1),
            d0 = chartData[i - 1],
            d1 = chartData[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            if (d.date == lastDate) {
                return;
            }

            lastDate = d.date;

            tooltip.css("top", y(d.value) + margin.top + 90);
            tooltip.css("left", x(d.date) + margin.left + 20);

            var fromDate = Date.parse(d.date.toString("yyyy-MM-dd")).moveToFirstDayOfMonth();
            var toDate = Date.parse(d.date.toString("yyyy-MM-dd")).moveToLastDayOfMonth();

            var year = "";

            if (fromDate.getFullYear() != Date.today().getFullYear()) {
                year = " " + fromDate.getFullYear();
            }
            console.log(self.reportData, d.date);
            if (self.type == self.reportType.deposit) {
                var html = "<div class='tooltip_line'>" + monthNames[fromDate.getMonth()].capitalizeFirstLetter() + year + "</div>";
                html = html + "<div class='tooltip_line'>Баланс: <span class='amount'>" + d.value.formatAmount() + "</span></div>";

                tooltip.find("#report_tooltip_top").html(html);

                var data = self.reportData[d.date.toString("yyyy MM")];

                html = "<div class='tooltip_line'><span class='name'>Приход</span> <span class='amount'>" + data.receipt.formatAmount() + "</span></div>";
                html = html + "<div class='tooltip_line'><span class='name'>Расход</span> <span class='amount'>" + data.expense.formatAmount() + "</span></div>";

                tooltip.find("#report_tooltip_content").html(html);
                tooltip.show();
            } else {
                var html = "<div class='tooltip_line'>" + monthNames[fromDate.getMonth()].capitalizeFirstLetter() + year + "</div>";
                html = html + "<div class='tooltip_line'>Расход: <span class='amount'>" + d.value.formatAmount() + "</span></div>";

                tooltip.find("#report_tooltip_top").html(html);
                tooltip.find("#report_tooltip_content").html("Загрузка транзакций...");
                tooltip.show();

                data.expensesByDate(self.selectedAccount.id, fromDate.toString("yyyy-MM-dd"), toDate.toString("yyyy-MM-dd"), function(result) {
                    html = "";

                    result.forEach(function(expense) {
                        html = html + "<div class='tooltip_line'><span class='name'>" + expense.name + "</span> <span class='amount'>" + expense.sum.formatAmount() + "</span></div>";
                    });

                    tooltip.find("#report_tooltip_content").html(html);
                });
            }
        }

        svg.append("rect")
           .attr("class", "overlay")
           .attr("width", width)
           .attr("height", height)
           .on("mouseover", function() { /*tooltip.show();*/ })
           .on("mouseout", function() { /*tooltip.hide();*/ })
           .on("mousemove", mousemove);
    }

    this.updateAccountsList = function() {
        $('#reports_account').html("");
        $('#reports_account').append($('<option>', { value: -1, text: "Все" }));

        self.accounts = [];

        if (self.type == self.reportType.expense) {
            data.accounts(data.accountType.expense, true, function(accounts) {
                self.accounts = accounts;

                for (var i = 0; i < accounts.length; i++) {
                    $('#reports_account').append($('<option>', { value: i, text: accounts[i].name }));
                }
            });
        } else if (self.type == self.reportType.receipt) {
            data.accounts(data.accountType.receipt, true, function(accounts) {
                self.accounts = accounts;

                for (var i = 0; i < accounts.length; i++) {
                    $('#reports_account').append($('<option>', { value: i, text: accounts[i].name }));
                }
            });
        } else if (self.type == self.reportType.deposit) {
            data.accounts(data.accountType.deposit, true, function(accounts) {
                self.accounts = accounts;

                for (var i = 0; i < accounts.length; i++) {
                    $('#reports_account').append($('<option>', { value: i, text: accounts[i].name }));
                }
            });
        }
    }
}

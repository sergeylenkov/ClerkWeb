function Reports() {
    var self = this;
    var type = 0;
    var lastDate = null;

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
        var fromDate = Date.today().addMonths(-6);
        var toDate = Date.today().moveToLastDayOfMonth();

        data.expensesByMonth(account, fromDate.toString("yyyy-MM-dd"), toDate.toString("yyyy-MM-dd"), function(data) {
            //console.log(data);
            self.fillChart(data);
        });
    }

    this.fillChart = function(chartData) {
        var width = $("#reports_canvas").outerWidth(true);
        var height = $("#reports_canvas").outerHeight(true);
        //var barPadding = 1;
        //var max = d3.max(data, function(d) { return d.value; });
        var margin = {top: 20, right: 80, bottom: 30, left: 80};
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;
        //var scale = d3.scale.linear().domain([0, max]).range([0, height]);
        d3.select("#reports_canvas").selectAll("*").remove();

        var svg = d3.select("#reports_canvas")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

        //svg.selectAll("*").remove();

        //var path = svg.append("g").attr("transform", "translate(" + 60 + "," + -30 + ")");
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
            //d.value = +d.value;
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

        /*var focus = svg.append("g")
                       .attr("class", "focus")
                       .style("display", "none");

        focus.append("circle").attr("r", 4.5);
        focus.append("text").attr("x", 9).attr("dy", ".35em");*/

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

            tooltip.css("top", y(d.value) + 100);
            tooltip.css("left", x(d.date) + 50);

            var fromDate = Date.parse(d.date.toString("yyyy-MM-dd")).moveToFirstDayOfMonth();
            var toDate = Date.parse(d.date.toString("yyyy-MM-dd")).moveToLastDayOfMonth();

            var year = "";

            if (fromDate.getFullYear() != Date.today().getFullYear()) {
                year = " " + fromDate.getFullYear();
            }
            var html = monthNames[fromDate.getMonth()].capitalizeFirstLetter() + year + "</br>";
            html = html + "Расход: <span class='sum'>" + d.value.formatAmount() + "</span>";

            tooltip.find("#report_tooltip_top").html(html);
            tooltip.find("#report_tooltip_content").html("Загрузка транзакций...");
            tooltip.show();

            data.expensesByDate(fromDate.toString("yyyy-MM-dd"), toDate.toString("yyyy-MM-dd"), function(result) {
                console.log(result);
                html = "";

                result.forEach(function(expense) {
                    html = html + "<div class='tooltip_line'><span class='name'>" + expense.name + "</span> <span class='amount'>" + expense.sum.formatAmount() + "</span></div>";
                });

                tooltip.find("#report_tooltip_content").html(html);
            });
        }

        svg.append("rect")
           .attr("class", "overlay")
           .attr("width", width)
           .attr("height", height)
           .on("mouseover", function() { tooltip.show(); })
           .on("mouseout", function() { tooltip.hide(); })
           .on("mousemove", mousemove);
        /*svg.selectAll("rect").data(data).enter().append("rect")
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
        });*/
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

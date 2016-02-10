function Reports() {
    var self = this;

    this.load = function(container) {
        $.get("templates/reports.html", function(html) {
            var report = $(html);
            container.append(report);

            self.selectReport(0);
        });
    }

    this.selectReport = function (type) {
        data.expensesByMonth(function(data) {
            console.log(data);

            var width = $("#reports-canvas").outerWidth(true);
    	    var height = $("#reports-canvas").outerHeight(true);
    		var barPadding = 1;

    		var svg = d3.select("#reports-canvas").attr("width", width).attr("height", height);
    		var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    		svg.selectAll("rect").data(data).enter().append("rect")
    		.attr("x", function(d, i) {
    		   	return i * (width / data.length);
    		})
    		.attr("y", function(d) {
    		    return height - (d.value / 1000.0);
    		})
    	    .attr("width", width / data.length - barPadding)
    		.attr("height", function(d) {
    		    return (d.value / 1000.0);
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
        });
    }
}

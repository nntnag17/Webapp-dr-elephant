import Ember from 'ember';
import d3 from 'd3';

export default Ember.Route.extend({
  data: null,
  plotGraph: function(graphData, jobDefList) {
    graphData.forEach(function(d) {
      console.log(d.flowtime);
      d.flowtime = new Date(d.flowtime);
    });

    console.log("1");
    var graphContainer = d3.select("#visualisation");
    console.log(graphContainer);

    /////////// DEFINE THE GRAPH ATTRIBUTES /////////////

    console.log("2");
    // Define the Margins for the GRAPH Dimensions
    var MARGINS = {top: 50, right: 50, bottom: 50, left: 50},
      WIDTH = graphContainer.style("width").replace("px", ""),
      HEIGHT = graphContainer.style("height").replace("px", ""),
      GRAPH_WIDTH = WIDTH - MARGINS.left - MARGINS.right,
      GRAPH_HEIGHT = HEIGHT - MARGINS.top - MARGINS.bottom;

    console.log("3");
    // Set the domain of x
    var millisDay = 86400000; // Offset to the domain. Also makes a single execution to be at the center.
    var xRange = d3.time.scale().range([MARGINS.left, MARGINS.left + GRAPH_WIDTH])
      .domain([
        d3.min(graphData, function (d) { return Math.min(d.flowtime) - millisDay/2}),
        d3.max(graphData, function (d) { return Math.max(d.flowtime) + millisDay/2})
      ]);

    console.log("4");
    // Set the domain of y
    var yRange = d3.scale.linear().range([MARGINS.top + GRAPH_HEIGHT, MARGINS.top])
      .domain([0, d3.max(graphData, function (d) { return d.score + d.score/5; })])
      .nice(5);                                                    // Ensures a nice round value at the end of y axis

    // The graph function
    var lineFunc = d3.svg.line()
      .x(function (d) { return xRange(d.flowtime); })
      .y(function (d) { return yRange(d.score); })
      .interpolate('linear');

    /*
     var customTimeFormat = d3.time.format.multi([
     [".%L", function(d) { return d.getMilliseconds(); }],
     [":%S", function(d) { return d.getSeconds(); }],
     ["%I:%M", function(d) { return d.getMinutes(); }],
     ["%I %p", function(d) { return d.getHours(); }],
     ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
     ["%b %d", function(d) { return d.getDate() != 1; }],
     ["%B", function(d) { return d.getMonth(); }],
     ["%Y", function() { return true; }]
     ]);
     */

    var customTimeFormat = d3.time.format("%Y-%b-%d");

    // x-axis definition
    var xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(0)
      .orient("bottom")
      .ticks(9)
      .tickFormat(customTimeFormat);

    // y-axis definition
    var yAxis = d3.svg.axis()
      .scale(yRange)
      //.tickSize(-1 * (GRAPH_WIDTH))                              // Adds horizontal lines in the graph
      .ticks(5)                                                    // Set 5 levels (5 horizontal lines)
      .tickFormat(d3.format("s"))
      .orient("left");

    /////////// ADD CONTENTS TO THE GRAPH CONTAINER /////////////

    // Add the x-axis
    graphContainer.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", "10px");                                          // Space between axis line and tick names

    // Add the y-axis
    graphContainer.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ", 0)")
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "rgb(0, 119, 181)");

    // Add label for the y axis
    graphContainer.append("svg:text")
      .style("font-size", "16px")
      .style("fill", "#606060")
      .attr("transform", "translate(" + (MARGINS.left/10) + ", " + MARGINS.top/2 + ")")
      .text("Performance Score (Lower the better)");

    // Add the graph function
    graphContainer.append("svg:path")
      .attr("d", lineFunc(graphData))
      .attr("stroke", "#0077b5")
      .attr("stroke-width", 1.5)
      .attr("fill", "none");

    // Add the small bubble dots on the graph line
    graphContainer.append("svg:g")
      .selectAll("scatter-dots")
      .data(graphData)
      .enter().append("svg:circle")
      .style({stroke: 'white', fill: '#0077b5'})
      .attr("cx", function (d) { return xRange(d.flowtime); } )
      .attr("cy", function (d) { return yRange(d.score); } )
      .attr("r", 4);


    /////////// THE TOOLTIPS FOR THE GRAPH /////////////

    // Add a transparent rectangle on top of the graph area to compute x-value mouse over
    graphContainer.append("svg:rect")
      .attr("class", "overlay")
      .attr("width", GRAPH_WIDTH)
      .attr("height", GRAPH_HEIGHT)
      .attr("transform", "translate(" + (MARGINS.left) + ", " + (MARGINS.top) + ")")
      .attr("opacity", 0)
      .on("mouseover", function() { tooltip.style("display", null); })    // Reset tooltip display (default value)
      .on("mousemove", mousemove);                                        // Compute position and show the tooltip

    // The tooltip container (Top of the stack)
    var tooltip = graphContainer.append("svg:g");

    // Add the highlight bubble
    var highlightCircleRad = 7;
    tooltip.append("svg:circle")
      .attr("stroke", "white")
      .attr("fill", "#0077b5")
      .attr("r", highlightCircleRad)
      .style("display", "none");

    // Add the tooltip
    var tooltipWidth = 260;
    tooltip.append("foreignObject")
      .attr("width", tooltipWidth + "px")
      .append("xhtml:body")
      .attr("id", "graph_tooltip")
      .style("background", "rgba(30, 30, 30, 0.9)")
      .style("font-size", "12px")
      .style("color", "rgb(204, 204, 204)")
      .style("text-align", "center")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("border", "1.5px solid black");

    var bisectExec = d3.bisector(function(d) { return d.flowtime; }).left;

    function mousemove(d) {

      // Compute tooltip to be shown depending on mouse position
      var record;
      if (graphData.length == 1) {
        record = graphData[0];
      } else {
        var xValueMouse = xRange.invert(MARGINS.left + d3.mouse(this)[0]),
          index = bisectExec(graphData, xValueMouse, 1),
          dleft = graphData[index - 1],
          dright = graphData[index];
        record = xValueMouse - dleft.flowtime > dright.flowtime - xValueMouse ? dright : dleft;
      }

      // Add content to tooltip
      var graphTooltip = document.getElementById("graph_tooltip");
      graphTooltip.innerHTML = '';
      graphTooltip.appendChild(getGraphTooltipContent(record, jobDefList));

      // Set position of highlighted circle
      tooltip.select("circle")
        .style("display", "inline")
        .attr("transform", "translate(" + xRange(record.flowtime) + "," + yRange(record.score) +")");

      // Set position of tooltip.
      var x = xRange(record.flowtime) - (tooltipWidth) - 10;
      var y = yRange(record.score) - tooltip.select("body").style("height").replace("px", "")/2;

      // Don't let the tooltip cross the left margin
      if (x < MARGINS.left) {
        x = xRange(record.flowtime) + 10;
      }

      // Don't let the tooltip cross the bottom margin
      if ((yRange(record.score) + tooltip.select("body").style("height").replace("px", "")/2) >= yRange(0)) {
        y = yRange(record.score) - tooltip.select("body").style("height").replace("px", "") - 10;
      }

      tooltip.select("foreignObject")
        .attr("height", tooltip.select("body").style("height"));
      tooltip.select("foreignObject")
        .transition()
        .duration(75)
        .attr("transform", "translate(" + x + "," + y + ")");
    }
  },
  model() {
    var _this = this;
    return
  },
  afterModel() {
    Ember.$.getJSON('http://annag-ld1:8090/rest/jobgraphdata?id=https%3A%2F%2Fltx1-holdemaz03.grid.linkedin.com%3A8443%2Fmanager%3Fproject%3DmetricsV1%26flow%3Dvalidate_treasury_dim%26job%3Dmetric_treasury_dim',function(data){
      _this.data = data;
      _this.plotGraph(_this.data, []);
    });
  }
});

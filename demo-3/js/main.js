/* Create a scatter plot of 1960 life expectancy (gdp) versus 2013 life expectancy (life_expectancy).*/

$(function() {
    // Variables to show
    var xVar = 'gdp';
    var yVar = 'life_expectancy';
    var chartData;

    // Load data in using d3's csv function.
    d3.csv('data/prepped_data.csv', function(error, data) {
        // Put data into generic terms
        var prepData = function() {
            chartData = data.map(function(d) {
                return {
                    x: d[xVar],
                    y: d[yVar],
                    id: d.country,
                    region: d.region
                };
            });
        };

        prepData();

        // Define function to draw ScatterPlot
        var scatter = ScatterPlot();

        // Initialize materialize style
        $('select').material_select()

        // Set change event to the select menu
        $('select').on('change', function(d) {
            xVar = $(this).val();
            prepData();
            chart.datum(chartData)
                .call(scatter);
        });

        // Create chart
        var chart = d3.select("#vis")
            .datum(chartData)
            .call(scatter);

            // Nest data by region
            // var nestedData = d3.nest()
            //     .key(function(d) {
            //         return d.region
            //     })
            //     .entries(chartData);
            // console.log(nestedData)
            // // Do a data join to make small multiples
            // var charts = d3.select('#vis').selectAll('.chart')
            //     .data(nestedData);

    // charts.enter()
    //     .append('div')
    //     .call(scatter)
    });
});
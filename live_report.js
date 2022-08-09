function onclickReport ( event )
{
    event.preventDefault();
    modalSpinner.show()
    chartContainer.style.display = "block";
    aboutElement.classList = "nav-link"
    homeElement.classList = "nav-link"
    reportElement.classList = "nav-link active"
    coinsElement.innerHTML = ""
    modalSpinner.hide()
    var arrTrackSymbols = [];
    arrTrackCoins.forEach( e =>
    {
        arrTrackSymbols.push( e.symbol.toUpperCase() );
    } )
    let s = arrTrackSymbols
    let coinId = s.join( "," )

    const URL_API_REPORT = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${ coinId }&tsyms=USD`
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];

    var options = {
        title: {
            text: "Real Time Reports"
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            suffix: "$",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [ {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: s[ 0 ],
            dataPoints: dataPoints1
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: s[ 1 ],
            dataPoints: dataPoints2
        }, {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: s[ 2 ],
            dataPoints: dataPoints3
        }, {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: s[ 3 ],
            dataPoints: dataPoints4
        }, {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            showInLegend: true,
            name: s[ 4 ],
            dataPoints: dataPoints5
        } ]
    };

    var chart = $( "#chartContainer" ).CanvasJSChart( options );

    function toggleDataSeries ( e )
    {
        if ( typeof ( e.dataSeries.visible ) === "undefined" || e.dataSeries.visible )
        {
            e.dataSeries.visible = false;
        }
        else
        {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    var updateInterval = 2000;
    var values = {
        yValue1: [],
        yValue2: [],
        yValue3: [],
        yValue4: [],
        yValue5: []
    }


    async function bringData ()
    {


        console.log( URL_API_REPORT )
        fetch( URL_API_REPORT )
            .then( res => res.json() )
            .then( res => s.forEach( ( d, i ) => { console.log( res[ d ] ); values[ "yValue" + ( i + 1 ) ] = res[ d ].USD } ) )

    }

    var time = new Date;

    function updateChart ( count )
    {
        count = count || 1;
        var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
        for ( var i = 0; i < count; i++ )
        {
            time.setTime( time.getTime() + updateInterval );
            if ( s[ 0 ] != undefined )
            {
                deltaY1 = -1 + Math.random() * ( 1 + 1 );
            }
            if ( s[ 1 ] != undefined )
            {
                deltaY2 = -1 + Math.random() * ( 1 + 1 );
            }
            if ( s[ 2 ] != undefined )
            {
                deltaY3 = -1 + Math.random() * ( 1 + 1 );
            }
            if ( s[ 3 ] != undefined )
            {
                deltaY4 = -1 + Math.random() * ( 1 + 1 );
            }
            if ( s[ 4 ] != undefined )
            {
                deltaY5 = -1 + Math.random() * ( 1 + 1 );
            }


            bringData();

            // pushing the new values
            if ( s[ 0 ] != undefined )
            {
                dataPoints1.push( {
                    x: time.getTime(),
                    y: values.yValue1
                } );
            }
            if ( s[ 1 ] != undefined )
            {
                dataPoints2.push( {
                    x: time.getTime(),
                    y: values.yValue2
                } );
            }
            if ( s[ 2 ] != undefined )
            {
                dataPoints3.push( {
                    x: time.getTime(),
                    y: values.yValue3
                } );
            }
            if ( s[ 3 ] != undefined )
            {
                dataPoints4.push( {
                    x: time.getTime(),
                    y: values.yValue4
                } );
            }
            if ( s[ 4 ] != undefined )
            {
                dataPoints5.push( {
                    x: time.getTime(),
                    y: values.yValue5
                } );
            }
        }


        // updating legend text with  updated with y Value 
        if ( s[ 0 ] != undefined )
        {
            options.data[ 0 ].legendText = s[ 0 ] + " : " + values.yValue1 + "$";
        } if ( s[ 1 ] != undefined )
        {
            options.data[ 1 ].legendText = s[ 1 ] + " : " + values.yValue2 + "$";
        } if ( s[ 2 ] != undefined )
        {
            options.data[ 2 ].legendText = s[ 2 ] + " : " + values.yValue3 + "$";
        } if ( s[ 3 ] != undefined )
        {
            options.data[ 3 ].legendText = s[ 3 ] + " : " + values.yValue4 + "$";
        } if ( s[ 4 ] != undefined )
        {
            options.data[ 4 ].legendText = s[ 4 ] + " : " + values.yValue5 + "$";
        }


        $( "#chartContainer" ).CanvasJSChart().render();
    }
    // generates first set of dataPoints 
    updateChart( 1 );
    setInterval( function () { updateChart() }, updateInterval );

}

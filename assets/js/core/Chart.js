/**
* Armando Gonzalez
 * @class MyNamespace.Chart
 * @extends Ext.chart.Chart
 * The chart objetct used for showing the tweets info in a more fancy way
 * @manduks
 */
Ext.define('MyNamespace.Chart', {
    extend: 'Ext.chart.Chart',
    xtype:'timelinechart',
    config: {
        animate: true,
		flex:1,
	    axes: [
	        {
				title: 'Tweets',
	            type: 'Time',
	            position: 'left',
	            fields: ['time'],
	            label: {
	                renderer: Ext.util.Format.numberRenderer('0,0')
	            },
	            grid: true
				
	        },
	        {
				title: 'Time',
	            type: 'Numeric',
	            position: 'bottom',
	            fields: ['conteo'],
				groupBy: 'hour',
			    dateFormat: 'ga'
                //aggregateOp: 'sum'
				//fromDate: new Date(),
				//toDate: new Date().add(1)
	        }
	    ],
	    series: [
	        {
	            type: 'line',
	            highlight: {
	                size: 7,
	                radius: 7
	            },
	            axis: 'left',
	            xField: 'conteo',
	            yField: 'time'
	            /*markerConfig: {
	                type: 'cross',
	                size: 4,
	                radius: 4,
	                'stroke-width': 0
	            }*/
	        }/*,
	        {
	            type: 'line',
	            highlight: {
	                size: 7,
	                radius: 7
	            },
	            axis: 'left',
	            //fill: true,
	            xField: 'name',
	            yField: 'data2',
	            markerConfig: {
	                type: 'circle',
	                size: 4,
	                radius: 4,
	                'stroke-width': 0
	            }
	        }*/
	    ]
    }
});
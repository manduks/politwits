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
				title: 'Menciones',
	            type: 'Numeric',
	            position: 'left',
	            fields: ['negative'],
	            label: {
	                renderer: Ext.util.Format.numberRenderer('0,0')
	            },	           
	            grid: true,			
				minimum: 0,
				maximum: 1
				
	        },
	        {
				title: 'Tiempo',
	            type: 'Time',
	            position: 'bottom',
	            fields: ['time'],	            
				groupBy: 'minutes'
			    //dateFormat: 'ga',
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
	            //axis: 'left',
	            xField: 'time',
	            yField: 'negative',
	            markerConfig: {
	                type: 'cross',
	                size: 4,
	                radius: 4,
	                'stroke-width': 0
	            }
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
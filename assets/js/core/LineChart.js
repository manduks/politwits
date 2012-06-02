/**
* Eduardo Caracas
 * @class MyNamespace.PieChart
 * @extends Ext.view.View
 * The BarCharts
 * @hellreuter_
 */
Ext.define('MyNamespace.LineChart', {
    extend: 'Ext.chart.Chart',
    xtype:'linechart',
    width: 500,
    highlight: true,
    showMarkers: true,
    height: 300,
    animate: true,
    axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data1', 'data2', 'data3', 'data4'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Tweets',
            grid: true,
            minimum: 0
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: ['time'],
            label: {
                renderer: function(v){
                    var a = v/100 + ':00';
                    return a;
                }
            },
            title: 'Hora'
        }
    ],
    series: [
        {
            type: 'line',
            highlight: {
                size: 5,
                radius: 3
            },
            axis: 'left',
            style: {
                stroke: '#00ff00',
                'stroke-width': 10,
                fill: '#80A080',
                opacity: 0.2
            },
            tips: {
                trackMouse: true,
                width: 140,
                renderer: function(storeItem, item) {
                    var horaint = storeItem.get('time')/100;
                    this.setTitle(storeItem.get('data1') + ' Tweets mencionando: @JosefinaVM' + ' a las ' + horaint + ':00hrs' );
                }
            },
            fill: false,
            xField: 'time',
            yField: 'data1',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        },
        {
            type: 'line',
            highlight: {
                size: 5,
                radius: 3
            },
            axis: 'left',
            tips: {
                trackMouse: true,
                width: 140,
                renderer: function(storeItem, item) {
                    var horaint = storeItem.get('time')/100;
                    this.setTitle(storeItem.get('data2') + ' Tweets mencionando: @G_quadri' + ' a las ' + horaint + ':00hrs' );
                }
            },
            fill: false,
            xField: 'time',
            yField: 'data2',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        },
        {
            type: 'line',
            highlight: {
                size: 5,
                radius: 3
            },
            axis: 'left',
            fill: false,
            tips: {
                trackMouse: true,
                width: 140,
                renderer: function(storeItem, item) {
                    var horaint = storeItem.get('time')/100;
                    this.setTitle(storeItem.get('data3') + ' Tweets mencionando: @EPN' + ' a las ' + horaint + ':00hrs' );
                }
            },
            xField: 'time',
            yField: 'data3',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        },
        {
            type: 'line',
            highlight: {
                size: 5,
                radius: 3
            },
            axis: 'left',
            fill: false,
            tips: {
                trackMouse: true,
                width: 140,
                renderer: function(storeItem, item) {
                    var horaint = storeItem.get('time')/100;
                    this.setTitle(storeItem.get('data4') + ' Tweets mencionando: @lopezobrador_' + ' a las ' + horaint + ':00hrs' );
                }
            },
            xField: 'time',
            yField: 'data4',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }
    ]
});
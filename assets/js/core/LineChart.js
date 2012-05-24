/**
* Eduardo Caracas
 * @class MyNamespace.PieChart
 * @extends Ext.view.View
 * The BarCharts
 * @hellreuter_
 */
var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4'],
    data: [
        { 'name': '0011',   'data1': 5, 'data2': 12, 'data3': 1, 'data4': 7 },   //data1 = azul, data2 = verde, data3 = rojo, data4 = amarillo
        { 'name': 'metric two',   'data1': 5,  'data2': 12,  'data3': 1, 'data4': 7 },
        { 'name': 'metric three', 'data1': 5,  'data2': 12,  'data3': 1, 'data4': 7 },
        { 'name': 'metric four',  'data1': 5,  'data2': 12, 'data3': 1,  'data4': 7 },
        { 'name': 'metric five',  'data1': 5,  'data2': 12,  'data3': 1, 'data4': 7 }
    ]
});
Ext.define('MyNamespace.LineChart', {
    extend: 'Ext.chart.Chart',
    xtype:'linechart',
    width: 500,
    height: 300,
    animate: true,
    store: store,
    axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data1', 'data2', 'data3', 'data4'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Sample Values',
            grid: true,
            minimum: 0
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Sample Metrics'
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
            xField: 'name',
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
                size: 7,
                radius: 7
            },
            axis: 'left',
            fill: false,
            xField: 'name',
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
                size: 7,
                radius: 7
            },
            axis: 'left',
            fill: false,
            xField: 'name',
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
                size: 7,
                radius: 7
            },
            axis: 'left',
            fill: false,
            xField: 'name',
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
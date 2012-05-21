/**
* Eduardo Caracas
 * @class MyNamespace.PieChart
 * @extends Ext.view.View
 * The BarCharts
 * @hellreuter_
 */
Ext.define('MyNamespace.BarChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'barchart',
    animate: true,
    axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
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
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
                trackMouse: true,
                width: 140,
                height: 28,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data'));
                }
            },
            label: {
                display: 'insideEnd',
                'text-anchor': 'middle',
                field: 'data',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },
            xField: 'name',
            yField: 'data'
        }
    ]
});
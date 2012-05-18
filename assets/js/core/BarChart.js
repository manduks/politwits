/*
 * User: hellreuter_
 * Date: 5/17/12
 * Time: 11:14 PM
 */
Ext.define('MyNamespace.BarChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'barchart',
    renderTo: Ext.getBody(),
    width: 500,
    height: 300,
    animate: true,
   // store: store,
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['data'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Sample Values',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['name'],
        title: 'Tweets'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' views');
            }
        },
        label: {
            display: 'insideEnd',
            field: 'data',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#444',
            'text-anchor': 'middle'
        },
        xField: 'name',
        yField: 'data'
    }]
});
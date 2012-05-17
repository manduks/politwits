/**
 * User: hellreuter_
 * Date: 5/15/12
 * Time: 9:23 PM
 */
/*var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],
    data: [
        { 'name': 'Negativos',   'data': 10 },
        { 'name': 'Tweets',   'data':  7 }
    ]
});
*/
Ext.define('MyNamespace.PieChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'piechart',
    renderTo: Ext.getBody(),
    width: 200,
    height: 150,
   // animate: true,
   // store: store,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        angleField: 'data',
        showInLegend: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                // calculate and display percentage on hover
                var total = 0;
                store.each(function(rec) {
                    total += rec.get('data');
                });
                this.setTitle(storeItem.get('data') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'data',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});
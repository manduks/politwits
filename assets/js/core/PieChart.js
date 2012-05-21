/**
* Eduardo Caracas
 * @class MyNamespace.PieChart
 * @extends Ext.view.View
 * The PieChart
 * @hellreuter_
 */
    /*
var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],
    data: [
        { 'name': 'metric one',   'data': Math.random() },
        { 'name': 'metric two',   'data': Math.random() },
        { 'name': 'metric three', 'data': Math.random() },
        { 'name': 'metric four',  'data': Math.random() },
        { 'name': 'metric five',  'data': Math.random() },
        { 'name': 'metric five',  'data': Math.random() },
        { 'name': 'metric five',  'data': Math.random() },
        { 'name': 'metric five',  'data': Math.random() },
        { 'name': 'metric five',  'data': Math.random() },
        { 'name': 'metric five',  'data': Math.random() }
    ]
});
*/
Ext.define('MyNamespace.PieChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'piechart',
    renderTo: Ext.getBody(),
    //width: 500,
    //height: 350,
    animate: true,
    //store: store,
    theme: this.theme,
    series: [{
        type: 'pie',
        angleField: 'data',
        showInLegend: false,
        tips: {
            trackMouse: true,
            width: 160,
            //height: 60,
            renderer: function(storeItem, item) {
                // calculate and display percentage on hover
                var total = 0;
                var gato = (storeItem.store.model.getName() == "TopHashtag" ) ? "#": "";
                storeItem.store.each(function(rec) {
                    total += rec.get('data');
                });
                this.setTitle(gato + storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        }/*,
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }*/
    }]
});
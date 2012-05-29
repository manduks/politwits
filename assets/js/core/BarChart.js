/**
* Eduardo Caracas
 * @class MyNamespace.BarChart
 * @extends Ext.view.View
 * The BarCharts
 * @hellreuter_
 */
/*var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'sinclasificar', 'negativos'],
    data: [
        {name: 'blah', sinclasificar: 3400, negativos: 500},{name: 'blah2', sinclasificar: 3600, negativos: 600}
    ]
});*/
Ext.define('MyNamespace.BarChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'barchart',
    animate: true,
    shadow: true,
    //store: store,
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['sinclasificar', 'negativos'],
        title: false,
        grid: true
        //roundToDecimal: false
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Total Tweets: Sin Clasificar y Ofensivos'
    }
    ],
    series: [
        {
            type: 'column',
            axis: 'left',
            gutter: 80,
            xField: 'name',
            yField: ['sinclasificar', 'negativos'],
            stacked: true,
            tips: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    this.setWidth(100);
                    this.setHeight(50);
                    var label = item.value[1] == storeItem.data.sinclasificar ? 'Sinclasificar' : 'Negativos';
                    this.setTitle(label + '<br />' + item.value[1]);
                }
            }
        }
    ]
});

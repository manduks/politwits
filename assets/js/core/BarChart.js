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
var colors = ['url(#v-1)',
    'url(#v-2)',
    'url(#v-3)',
    'url(#v-4)',
    'url(#v-5)',
    'url(#v-6)',
    'url(#v-7)',
    'url(#v-8)'];

Ext.define('MyNamespace.BarChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'barchart',
    animate: true,
    shadow: true,
   // theme: 'Fancy',
    //theme: 'Category2',
    //store: store,
    gradients: [
        {
            'id': 'v-1',
            angle:90,
            stops: {
                0:{ color: 'rgb(30,87,153)'},
                100: {color: 'rgb(30,87,153)'}
            }
        },{
            'id': 'v-2',
            angle:90,
            stops: {
                0:{ color: 'rgb(0,0,0)'},
                100: {color: 'rgb(0,0,0)'}
            }
        },{
            'id': 'v-3',
            angle:90,
            stops: {
                0:{ color: 'rgb(249,148,6)'},
                100: {color: 'rgb(249,148,6)'}
            }
        },{
            'id': 'v-4',
            angle:90,
            stops: {
                0:{ color: 'rgb(0,0,0)'},
                100: {color: 'rgb(0,0,0)'}
            }
        },{
            'id': 'v-5',
            angle:90,
            stops: {
                0:{ color: 'rgb(181,9,0)'},
                100: {color: 'rgb(181,9,0)'}
            }
        },{
            'id': 'v-6',
            angle:90,
            stops: {
                0:{ color: 'rgb(0,0,0)'},
                100: {color: 'rgb(0,0,0)'}
            }
        },{
            'id': 'v-7',
            angle:90,
            stops: {
                0:{ color: 'rgb(64,168,197)'},
                100: {color: 'rgb(64,168,197)'}
            }
        },{
            'id': 'v-8',
            angle:90,
            stops: {
                0:{ color: 'rgb(0,0,0)'},
                100: {color: 'rgb(0,0,0)'}
            }
        }
    ],
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['sinclasificar', 'negativos'],
        title: true,
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
            //axis: 'left',
            gutter: 80,
            xField: 'name',
            yField: ['sinclasificar', 'negativos'],
            //displayname: 'sinclasificar',
            stacked: true,
            renderer: function(sprite, storeItem, barAttr, i, store) {
                console.log(i);
                barAttr.fill = colors[i];
                return barAttr;
            },
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

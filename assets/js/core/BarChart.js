/**
* Eduardo Caracas
 * @class MyNamespace.BarChart
 * @extends Ext.view.View
 * The BarCharts
 * @hellreuter_
 */
var colors = ['url(#@EPN)',
    'url(#v-2)',
    'url(#@lopezobrador_)',
    'url(#v-4)',
    'url(#@JosefinaVM)',
    'url(#v-6)',
    'url(#@G_quadri)',
    'url(#v-8)'];

Ext.define('MyNamespace.BarChart', {
    extend: 'Ext.chart.Chart',
    xtype: 'barchart',
    animate: true,
    shadow: true,
    gradients: [
        {
            'id': '@EPN',
            angle:90,
            stops: {
                0:{ color: 'rgb(59,130,62)'},
                100: {color: 'rgb(59,130,62)'}
            }
        },{
            'id': 'v-2',
            angle:90,
            stops: {
                0:{ color: 'rgb(210,73,67)'},
                100: {color: 'rgb(210,73,67)'}
            }
        },{
            'id': '@G_quadri',
            angle:90,
            stops: {
                0:{ color: 'rgb(249,148,6)'},
                100: {color: 'rgb(249,148,6)'}
            }
        },{
            'id': 'v-4',
            angle:90,
            stops: {
                0:{ color: 'rgb(210,73,67)'},
                100: {color: 'rgb(210,73,67)'}
            }
        },{
            'id': '@JosefinaVM',
            angle:90,
            stops: {
                0:{ color: 'rgb(30,87,153)'},
                100: {color: 'rgb(30,87,153)'}
            }
        },{
            'id': 'v-6',
            angle:90,
            stops: {
                0:{ color: 'rgb(210,73,67)'},
                100: {color: 'rgb(210,73,67)'}
            }
        },{
            'id': '@lopezobrador_',
            angle:90,
            stops: {
                0:{ color: 'rgb(64,168,197)'},
                100: {color: 'rgb(64,168,197)'}
            }
        },{
            'id': 'v-8',
            angle:90,
            stops: {
                0:{ color: 'rgb(210,73,67)'},
                100: {color: 'rgb(210,73,67)'}
            }
        }
    ],
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['sinclasificar', 'negativos'],
        title: true,
        grid: true
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
            gutter: 80,
            xField: 'name',
            yField: ['sinclasificar', 'negativos'],
            stacked: true,
            renderer: function(sprite, storeItem, barAttr, i, store) {
                //valor = storeItem.data.name;
                //console.log(valor);
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

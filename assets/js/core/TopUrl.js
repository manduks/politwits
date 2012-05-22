/**
* Eduardo Caracas
 * @class MyNamespace.TopUrl
 * @extends Ext.view.View
 * The Top Urls of all analized twitter accounts
 * @hellreuter_
 */
Ext.define('MyNamespace.TopUrl', {
    extend: 'Ext.view.View',
	xtype:'topurl',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
            '<table class="table table-striped">',
                '<thead>',
                    '<tr>',
                        '<th>#</th>',
                        '<th>Urls</th>',
                        '<th>Total</th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tpl for=".">',
                        '<tr>',
                            '<td>{#}</td>',
                            '<td><a href="{name}" target="_blank">{name}</a></td>',
                            '<td>{data}</td>',
                        '</tr>',
                    '</tpl>',
                '</tbody>',
            '</table>'
		),	
		trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
		emptyText: 'No images available'
    }
});
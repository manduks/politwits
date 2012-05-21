/**
* Eduardo Caracas
 * @class MyNamespace.TopHashtag
 * @extends Ext.view.View
 * The Top Hashtags of all analized twitter accounts
 * @hellreuter_
 */
Ext.define('Core.TopHashtag', {
    extend: 'Ext.view.View',

	xtype:'tophashtag',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
            '<table class="table table-striped">',
                '<thead>',
                    '<tr>',
                        '<th>#</th>',
                        '<th>Hashtags</th>',
                        '<th>Total</th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tpl for=".">',
                        '<tr>',
                            '<td>{#}</td>',
                            '<td><a href="http://twitter.com/#!/search/%23{name}" target="_blank">#{name}</a></td>',
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
/**
* Eduardo Caracas
 * @class MyNamespace.TopRetweet
 * @extends Ext.view.View
 * The Top Retweets of all analized twitter accounts
 * @hellreuter_
 */
Ext.define('Core.TopRetweet', {
    extend: 'Ext.view.View',

	xtype:'topretweet',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
            '<table class="table table-striped">',
                '<thead>',
                    '<tr>',
                        '<th>#</th>',
                        '<th>Retweets</th>',
                        '<th>Total</th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tpl for=".">',
                        '<tr>',
                            '<td>{#}</td>',
                            '<td>{name}</td>',
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
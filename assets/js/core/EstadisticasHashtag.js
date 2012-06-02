/**
* Eduardo Caracas
 * @class MyNamespace.TopHashtag
 * @extends Ext.view.View
 * The Top Hashtags of all analized twitter accounts
 * @hellreuter_
 */
Ext.define('Core.EstadisticasHashtag', {
    extend: 'Ext.view.View',

	xtype:'estadisticashashtag',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
            '<table class="table table-striped">',
                '<thead>',
                    '<tr>',
                        '<th>#</th>',
                        '<th>Hashtags</th>',
                        '<th><div style="text-align: center; text-decoration: underline;" title="Usuarios que han twiteado este Hashtag">Usuarios</div></th>',
                        '<th><div style="text-align: center;" title="Total de tweets mencionando este Hashtag">Tweets</div></th>',
                        '<th><div style="text-align: center;" title="Porcentaje de relacion entre usuarios unicos y total de menciones">%</div></th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tpl for=".">',
                        '<tr>',
                            '<td>{#}</td>',
                            '<td><a href="http://twitter.com/#!/search/%23{name}" target="_blank">#{name}</a></td>',
                            '<td><div style="text-align: center;" title="{users} usuarios unicos han twiteado este Hashtag : #{name}"><a href="#">{users}</a></div></td>',
                            '<td><div style="text-align: center;" title="{data} veces se ha mencionado este Hashtag : #{name}">{data}</div></td>',
                            '<td><div style="text-align: center;" title="Porcentaje de relacion entre usuarios unicos y total de menciones">',
                            '<span style="color:black; font-weight: bold;">',
                            '<tpl if="porcentaje &lt; 70"><span style="color:#804f50;"></tpl>',
                            '<tpl if="porcentaje &lt; 50"><span style="color:red;"></tpl>',
                                '{porcentaje}%</span></div></td>',
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
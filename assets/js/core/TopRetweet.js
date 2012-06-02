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
                        '<th><div style="text-align: center;" title="Total de tweets mencionando este Retweet">Tweets</div></th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tpl for=".">',
                        '<tr>',
                            '<td>{#}</td>',
                            '<td>',
                            	'{name}',
                            	'<div class = "reply top-retweet">',
                            	    '<a href="#"  onClick="{[this.getReply(values)]}" ><i class="icon-share-alt"></i> Reply</a>',
                            	'</div>',
                            	'<div class = "retweet top-retweet">',
                            	    '<a href="#"  onClick="{[this.getRetweet(values)]}" ><i class="icon-retweet"></i> Retweet</a>',
                            	'</div>',
                            '</td>',
                            '<td><div style="text-align: center;" title="{data} veces se ha mencionado este Retweet : {name}">{data}</div></td>',
                        '</tr>',
                    '</tpl>',
                '</tbody>',
            '</table>',
            {
                getRetweet : function (values) {
                    return "window.open('https://twitter.com/intent/retweet?tweet_id=" + values.id_str + "', '', 'width=500, height=350');";
                },
                getReply : function (values) {
                    return "window.open('https://twitter.com/intent/tweet?in_reply_to=" + values.id_str + "', '', 'width=500, height=350');";
                }
            }
		),	
		trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
		emptyText: 'No images available'
    }
});//onClick="{[this.getReply(values)]}
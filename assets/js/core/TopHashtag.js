/**
* Armando Gonzalez
 * @class MyNamespace.TimeLine
 * @extends Ext.view.View
 * The Top Hashtags of each twitter acount
 * @manduks
 */
Ext.define('Core.TopHashtag', {
    extend: 'Ext.view.View',

	xtype:'tophashtag',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
		    '<tpl for=".">',
            '<div class="{[xindex % 2 == 0 ? " " : "pan"]} ">',
				'{#}. <a href="http://twitter.com/#!/search/%23{hashtag}">#{hashtag}</a>',
            '</div>',
		    '</tpl>'
		),	
		trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
		emptyText: 'No images available'
    }
});
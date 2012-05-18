/**
* Armando Gonzalez
 * @class MyNamespace.TimeLine
 * @extends Ext.view.View
 * The Top Hashtags of each twitter acount
 * @manduks
 */
Ext.define('Core.TopUrl', {
    extend: 'Ext.view.View',

	xtype:'topurl',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
		    '<tpl for=".">',
            '<div class="{[xindex % 2 == 0 ? " " : "pan"]} ">',
            '{#}. <a href="{url}">{url}</a>',
            '</div>',
		    '</tpl>'
		),	
		trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
		emptyText: 'No images available'
    }
});
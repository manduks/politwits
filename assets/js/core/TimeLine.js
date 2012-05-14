/**
* Armando Gonzalez
 * @class MyNamespace.TimeLine
 * @extends Ext.view.View
 * The timelien of each twitter acount
 * @manduks
 */
Ext.define('Core.TimeLine', {
    extend: 'Ext.view.View',

	xtype:'timeline',
	
    autoScroll:true,
    config: {
		flex:1,
		tpl: new Ext.XTemplate(
		    '<tpl for=".">',				
				'<div class="thumb-wrap {[xindex % 2 === 0 ? "even" : values.cls]} ">',
				'<div class="img">',
                	'<img src="{image}" />',
				'</div>',
				  '<div class = "time-ago">{date}</div>',
		          '<span class="{[values.negative? "negative":"positive"]}">{tweet}</span>',
		        '</div>',
		    '</tpl>'
		),	
		trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
		emptyText: 'No images available'
    }
});
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
					'<div class = "time-ago">',
						'<span class="{[values.negative ? "badge badge-important badge-negative" : "positive"]}">',
						'<i class="{[values.negative ? "icon-thumbs-down icon-white" : "positive"]}"></i></span>',
						'{date}',
					'</div>',
					'<div style="clear: both">',
						'<div class="img">',
	                		'<img src="{image}" width="48" height="48"/>',
						'</div>',
			          	'<span class="{[values.negative? "negative":"positive"]}">',
			          		'{tweet}',
			          	'</span>',
			        '</div>',
		        '</div>',
		        '<div class = "retweet">',
		        	'<a href = "http://twitter.com/home?status=RT @{screen_name}: {tweet}" target="_blank"><i class="icon-retweet"></i> Retweet</a>',
		        '</div>',
		    '</tpl>'
		),	
		trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
		emptyText: 'No images available'
    },

    getUrlRetweet : function(tweet){
        console.info(tweet);
        //var url = "http://twitter.com/home?status=";
            //'encodeURIComponent(RetweetJS.prefix + origText +',
        return "#";
    }
});
/**
 * Armando Gonzalez
 * @class MyNamespace.TimeLine
 * @extends Ext.view.View
 * The timelien of each twitter acount
 * @manduks
 */
Ext.define('Core.TimeLine', {
    extend:'Ext.view.View',

    xtype:'timeline',

    autoScroll:true,

    config:{
        flex:1,
        tpl:new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap {[xindex % 2 === 0 ? "even" : values.cls]} ">',
            '<div class = "time-ago">',
            '<span class="{[values.negative ? "badge badge-important badge-negative" : "positive"]}">',
            '<i class="{[values.negative ? "icon-thumbs-down icon-white" : "positive"]}"></i></span>',
            '{date}',
            '</div>',
            '<div style="clear: both">',
            '<div class="img">',
            '<a href = "https://twitter.com/#!/{screen_name}" target = "_blank" ><img src="{image}" width="48" height="48"/></a>',
            '</div>',
            '<span class="{[values.negative? "negative":"positive"]}">',
            '<tpl for="."> {[this.getUrls(values.tweet)]} </tpl>',
            '</span>',
            '</div>',
            '</div>',
            '<div class = "retweet">',
            '<tpl for=".">',
            '<a href = "{[this.getRetweet(values)]}" target="_blank"><i class="icon-retweet"></i> Retweet</a>',
            '</tpl>',
            '</div>',
            '</tpl>',
            {
                getUrls:function (tweet) {
                    var urlRegex = /((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                        twRegex = /(@[-aA-zZ0-9_]*)/g,
                        text = tweet.replace(urlRegex, '<a href="$1" target="_blank" >$1</a>');

                    return text.replace(twRegex, '<a href="http://twitter.com/#!/$1" target="_blank" >$1</a>');

                },
                getRetweet : function (values) {
                    var rt = 'RT @',
                        tweet = values.tweet.replace(/#/g, "%23");
                    if (tweet.substring(0,2) !== "RT") {
                        tweet = rt + values.screen_name + ": " + tweet;
                    }

                    return "http://twitter.com/home?status=" + tweet;
                }
            }
        ),
        trackOver:true,
        overItemCls:'x-item-over',
        itemSelector:'div.thumb-wrap',
        emptyText:'No images available'
    }
});
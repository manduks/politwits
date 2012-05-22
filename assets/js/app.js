
Ext.onReady(function(){

    //--- Models ---

    //Tweets Model
	Ext.define('Tweet', {
	    extend: 'Ext.data.Model',
	    fields: [
			{ name:'tweet_k', type:'string' },
            { name:'id_str', type:'string' },
	        { name:'track_k', type:'string' },
	        { name:'tweet', type:'string' },
			{ name:'screen_name', type:'string' },
			{ name:'negative', type:'boolean'},
			{ name:'image',type:'string'},
			{ name:'time',mapping:'date'},
			{ name:'geo_x',type:'string'},
			{ name:'geo_y',type:'string'},
			{ name:'cls',mapping:'track_k',convert:function(val,rec){
				switch(val){
					case '@EPN': return 'pri';
					case '@lopezobrador_': return 'prd';
					case '@G_quadri': return 'alianza';
					case '@JosefinaVM': return 'pan';
				}
			}},
			{name:"date", type:"date", convert:function(date,rec){
                    try {
                        var now = Math.ceil(Number(new Date()) / 1000),
                            dateTime = Math.ceil(Number(new Date(date)) / 1000),
                            diff = now - dateTime,
                            str;

                        if (diff < 60) {
                            return String(diff) + ' s';
                        } else if (diff < 3600) {
                            str = String(Math.ceil(diff / (60)));
                            return str + (str == "1" ? ' m' : ' m');
                        } else if (diff < 86400) {
                            str = String(Math.ceil(diff / (3600)));
                            return str + (str == "1" ? ' h' : ' h');
                        } else if (diff < 60 * 60 * 24 * 365) {
                            str = String(Math.ceil(diff / (60 * 60 * 24)));
                            return str + (str == "1" ? ' d' : ' d');
                        } else {
                            return Ext.Date.format(new Date(date), 'jS M \'y');
                        }
                    } catch (e) {
                        return '';
                    }                
			}}
	    ],
		proxy: {
			type: 'ajax',
		    url : 'politwits/api.php',
			reader:{
				type:'json',
				root:'data'
			}
		}
	});

    //TopHashtag Model
    Ext.define('TopHashtag',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'hashtag_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'name', type: 'string', mapping:'hashtag' },
            { name: 'data', type: 'integer', mapping:'total' },
            { name: 'date', type: 'date' }

        ],
        proxy:{
            type: 'ajax',
            url : 'politwits/api.php',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    //TopRetweet Model
    Ext.define('TopRetweet',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'retweet_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'name', type: 'string', mapping:'retweet' },
            { name: 'data', type: 'integer', mapping: 'total' },
            { name: 'date', type: 'date' }

        ],
        proxy:{
            type: 'ajax',
            url : 'politwits/api.php',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    //TopUrl Model
    Ext.define('TopUrl',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'url_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'name', type: 'string', mapping: 'url' },
            { name: 'data', type: 'integer', mapping: 'total' },
            { name: 'date', type: 'date' }

        ],
        proxy:{
            type: 'ajax',
            url : 'politwits/api.php',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    //LineChart Model
    Ext.define('LineChart', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'track_k', type: 'string'},
            {name: 'time', type: 'date'},
            {name: 'conteo', type: 'integer'}
        ],
        proxy:{
            type: 'ajax',
            url : 'politwits/api.php',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    //PieChart Model
    Ext.define('PieChart', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'name', type: 'string'},
            {name: 'data', type: 'integer'}
        ],
        proxy:{
            type: 'ajax',
            url : 'politwits/api.php',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    //BarChart Model
    Ext.define('BarChart', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'name', type: 'string'},
            {name: 'sinclasificar', type: 'integer'},
            {name: 'negativos', type: 'integer'}
        ],
        proxy:{
            type: 'ajax',
            url : 'politwits/api.php',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    //--- Stores ---

	//AMLO Store
	var storeAmlo = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});

	//EPN Store
	var storeEpn = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});

	//JVM Store
	var storeJvm = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});	
	
	//GQuadri Store
	var storeGquadri = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});

    //TopHashtag Store
    var storeTopHashtag = Ext.create('Ext.data.Store',{
        model: 'TopHashtag'
    });

    //TopRetweet Store
    var storeTopRetweet = Ext.create('Ext.data.Store',{
        model: 'TopRetweet'
    });

    //TopUrl Store
    var storeTopUrl = Ext.create('Ext.data.Store',{
        model: 'TopUrl'
    });

    //LineChart Store
    var storeLineTweets = Ext.create('Ext.data.Store', {
        model: 'LineChart'
    });

    //Top Hashtags PieChart Store
    var storeTopHashtagsPie = Ext.create('Ext.data.Store',{
        model: 'TopHashtag'
    });

    //Top Hashtags PieChart Store
    var storeTopRetweetsPie = Ext.create('Ext.data.Store',{
        model: 'TopRetweet'
    });

    //Top Hashtags PieChart Store
    var storeTopUrlsPie = Ext.create('Ext.data.Store',{
        model: 'TopUrl'
    });

    //BarChart AMLO Store
    var storeBarChartTotal = Ext.create('Ext.data.Store',{
        model: 'BarChart'
    });

	// --- Loaders ---

    //Tweets Loader
	cargarStores=function(){
		storeAmlo.load({
			params:{type:1,	typec:2},
			callback: function(records, operation, success) {
				countAmlo = Ext.decode(operation.response.responseText).count;
			}
		});
		storeEpn.load({
			params:{type:1,typec:0},
			callback: function(records, operation, success) {
				countEpn = Ext.decode(operation.response.responseText).count;
			}
		});
		storeJvm.load({
			params:{type:1,typec:1},
			callback: function(records, operation, success) {
				countJvm = Ext.decode(operation.response.responseText).count;
			}

		});
		storeGquadri.load({
			params:{type:1,typec:3},
			callback: function(records, operation, success) {
				countGquadri = Ext.decode(operation.response.responseText).count;
			}
		});
	};
	cargarStores();

    //Map Loader
	ponerMarcadores = function(){
		Ext.Ajax.request({
		    url : 'politwits/api.php',
			method:'GET',
		    params: {
		        type: 8
		    },
		    success: function(response){
		    	var map = viewport.items.items[1].items.items[1],
					obj = Ext.decode(response.responseText).data,
					icons ={
						'@lopezobrador_':'assets/img/tweet_prd.png',
						'@JosefinaVM':'assets/img/tweet_pan.png',
						'@EPN':'assets/img/tweet_pri.png',
						'@G_quadri':'assets/img/tweet_alianza.png'
					};

				Ext.each(obj,function(o){
					if(o.geo_x !== "" ){
						var marker = map.addMarker({
							lat: o.geo_x,
				        	lng: o.geo_y,
							icon: icons[o.track_k],
				        	listeners: {
                                click: function(e){
                                    var css = '';
                                    switch(o.track_k){
                                            case '@EPN': css = 'pri';break;
                                            case '@lopezobrador_': css = 'prd';break;
                                            case '@G_quadri': css = 'alianza';break;
                                            case '@JosefinaVM': css = 'pan';break;
                                        }

                                    var content = [
                                    '<div class="thumb-wrap '+css+' tipi">',
                                        '<div style="clear: both;">',
                                            '<div class="img">',
                                                '<a href = "https://twitter.com/#!/'+o.screen_name+'" target = "_blank" ><img src="'+o.image+'" width="48" height="48"/></a>',
                                            '</div>',
                                            '<span>',
                                            renderTweet(o.tweet),
                                            '</span>',
                                        '</div>',
                                    '</div>',
                                    '<div class = "reply">',
                                        '<a href="#"  onClick="',
                                        getReply(o),
                                        '" ><i class="icon-share-alt"></i> Reply</a>',
                                    '</div>',
                                    '<div class = "retweet">',
                                        '<a href="#"  onClick="',
                                        getRetweet(o),
                                        '" ><i class="icon-retweet"></i> Retweet</a>',
                                    '</div>'].join('');
                                    var infowindow = new google.maps.InfoWindow({
                                        content: content
                                    });
                                    infowindow.open(map.gmap, marker);
                                }
						    }
						});
					}
				});
			}
		});
	
	};

    //TopList Loader
    topLists = function(){
        storeTopHashtagsPie.load({
            params:{type:3}
        });
        storeTopRetweetsPie.load({
            params:{type:4}
        });
        storeTopUrlsPie.load({
            params:{type:5}
        });
        storeTopHashtag.load({
            params:{type:3}
        });
        storeTopRetweet.load({
            params:{type:4}
        });
        storeTopUrl.load({
            params:{type:5}
        });
    };

    //LineCharts Loader
    lineCharts = function(){
        storeLineTweets.load({
            params:{type:6}
        });
    };

    //PieCharts Loader
    pieCharts = function(){
        storePieTotal.load({
            params:{type:7}
        });
    };

    //BarCharts Loader
    barCharts = function(){
        storeBarChartTotal.load({
            params:{type:9}
        });
    };

	//Update Interval
	setInterval(function(){
		Ext.Ajax.request({
		    url : 'politwits/api.php',
			method:'GET',
		    params: {
		        type: 0
		    },
		    success: function(response){
		       var obj = Ext.decode(response.responseText).data;
				Ext.each(obj,function(o){
					switch(o.track_k){
						case '@EPN':
							var num = 0;
							num = (o.no_twits * 1) - (countEpn * 1);
							if (num > 0){
								Ext.fly('epn').update(num+' nuevos');
								Ext.fly('epn').on('click',function(){
									Ext.get('epn').update('Cargando...');
									storeEpn.load({
										params:{type:1,typec:0},
										callback: function(records, operation, success) {
											countEpn = Ext.decode(operation.response.responseText).count;
											Ext.fly('epn').update('0 nuevos');
										}
									});
								});
							}
						break;
						case '@G_quadri':
							var num = 0;
							num = (o.no_twits * 1) - (countGquadri * 1);
							if (num > 0){
								Ext.fly('gqu').update(num+' nuevos');
								Ext.fly('gqu').on('click',function(){
									Ext.get('gqu').update('Cargando...');
									storeGquadri.load({
										params:{type:1,typec:3},
										callback: function(records, operation, success) {
											countGquadri = Ext.decode(operation.response.responseText).count;
											Ext.fly('gqu').update('0 nuevos');
										}
									});
								});
							}
						break;
						case '@JosefinaVM':
							var num = 0;
							num = (o.no_twits * 1)  - (countJvm * 1);
							if (num > 0){
								Ext.fly('jvm').update(num+' nuevos');
								Ext.fly('jvm').on('click',function(){
									Ext.get('jvm').update('Cargando...');
									storeJvm.load({
										params:{type:1,typec:1},
										callback: function(records, operation, success) {
											countJvm = Ext.decode(operation.response.responseText).count;
											Ext.fly('jvm').update('0 nuevos');
										}
									});
								});
							}
						break;
						case '@lopezobrador_':
							var num = 0;
							num = (o.no_twits * 1) - (countAmlo * 1);
							if (num > 0){
								Ext.fly('obr').update(num+' nuevos');
								Ext.fly('obr').on('click',function(){
									Ext.get('obr').update('Cargando...');
									storeAmlo.load({
										params:{type:1,typec:2},
										callback: function(records, operation, success) {
											countAmlo = Ext.decode(operation.response.responseText).count;
											Ext.fly('obr').update('0 nuevos');
										}
									});
								});
							}
						break;
					}
				});
		    }
		});
	},8000);

    renderTweet = function(tweet){
        var urlRegex = /((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            twRegex = /(@[-aA-zZ0-9_]*)/g,
            text = tweet.replace(urlRegex, '<a href="$1" target="_blank" >$1</a>');

        return text.replace(twRegex, '<a href="http://twitter.com/#!/$1" target="_blank" >$1</a>');
    };

    getRetweet = function (values) {
        return "window.open('https://twitter.com/intent/retweet?tweet_id=" + values.id_str + "', '', 'width=500, height=350');";
    };

    getReply = function (values) {
        return "window.open('https://twitter.com/intent/tweet?in_reply_to=" + values.id_str + "', '', 'width=500, height=350');";
    };

	var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border'
        },
		style:{
			backgroundColor:'#FFF'
		},
        items:  [{
			xtype:'toolbar',
			region:'north',
			cls:'navbar-inner',
			baseCls:'navbar navbar-fixed-top',
			items:[
				'<div class="brand"><a href="https://twitter.com/#!/analitweets" target="_blank">@Analitweets</a></div>',
				{
					text:'<i class="icon-comment icon-white"></i> <span style="color:#FFFFFF;">Tweets</span>',
					cls:'btn btn-primary',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(0);
					}
				},{
					text:'<i class="icon-globe icon-white"></i> <span style="color:#FFFFFF;">Mapa</span>',
					cls:'btn btn-success',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(1);
						ponerMarcadores();
					}
				},{
                    text:'<i class="icon-star icon-white"></i> <span style="color:#FFFFFF;">Top</span>',
                    cls:'btn btn-info',
                    handler:function(btn){
                        var p = btn.up('container').up('container');
                        p.items.items[1].getLayout().setActiveItem(2);
                        topLists();
                    }
                },{
                    text:'<i class="icon-signal icon-white"></i> <span style="color:#FFFFFF;">Estadísticas</span>',
                    cls:'btn btn-danger',
                    handler:function(btn){
                        var p = btn.up('container').up('container');
                        p.items.items[1].getLayout().setActiveItem(3);
                        barCharts();
                    }
                },{
						text:'<i class="icon-refresh icon-white"></i> <span style="color:#FFFFFF;">Recargar</span>',
						cls:'btn btn-warning',
						handler:function(btn){
							cargarStores();
							Ext.fly('obr').update('0 nuevos');
							Ext.fly('jvm').update('0 nuevos');
							Ext.fly('gqu').update('0 nuevos');
							Ext.fly('epn').update('0 nuevos');
                            topLists();
						}
				},'->',
                '<a href="https://twitter.com/share" class="twitter-share-button" style="margin-right: 60px;">Tweet</a><script></script>',
                '<a href="https://twitter.com/Analitweets" class="twitter-follow-button" data-show-count="false" style="margin-right: 30px;">Follow @Analitweets</a><script></script>'
                ]
		},{
			xtype:'container',
			layout:'card',
			region:'center',
			activeItem:0,
			items:[{
				xtype:'container',
				layout: {
	                type: 'hbox',
	                padding:'5',
	                align:'stretch'
	            },
				items:[{
					xtype:'container',
					layout:'border',
					style:{
						backgroundColor:'#FFF'
					},
					flex:1,
					items:[{
						xtype:'container',
						region:'north',
						height:95,
						html:[
							'<div class="candidato">',
								'<div class="img">',
			               			'<img src="https://twimg0-a.akamaihd.net/profile_images/508228230/foto_tw_normal.jpg" />',
								'</div>',
				          		'<span class="label label-warning">@lopezobrador_</span>',
								'<div id="obr" class ="btn  btn-info load">0 nuevos</div>',
				        	'</div>'].join('')
					},{
						xtype:'timeline',
						store:storeAmlo,
						region:'center',
						padding:'10px 0 0 0'
					}]
				},{
					xtype:'container',
					layout:'border',
					style:{
						backgroundColor:'#FFF'
					},
					flex:1,
					items:[{
						xtype:'container',
						region:'north',
						height:95,
						html:[
							'<div class="candidato">',
								'<div class="img">',
			               			'<img src="https://twimg0-a.akamaihd.net/profile_images/2031784254/GQ_NA_Recortado_normal.jpg" />',
								'</div>',
				          		'<span class="label">@g_quadri</span>',
								'<div id="gqu" class ="btn  btn-info load">0 nuevos</div>',
				        	'</div>'].join('')
					},{
						xtype:'timeline',
						store:storeGquadri,
						region:'center',
						padding:'10px 0 0 0'
					}]
				},{
					xtype:'container',
					layout:'border',
					style:{
						backgroundColor:'#FFF'
					},
					flex:1,
					items:[{
						xtype:'container',
						region:'north',
						height:95,
						html:[
							'<div class="candidato">',
								'<div class="img">',
			               			'<img src="https://twimg0-a.akamaihd.net/profile_images/1990796199/EPN_normal.jpg" />',
								'</div>',
				          		'<span class="label label-important">@EPN</span>',
								'<div id="epn" class ="btn  btn-info load">0 nuevos</div>',
				        	'</div>'].join('')
					},{
						xtype:'timeline',
						store:storeEpn,
						region:'center',
						padding:'10px 0 0 0'
					}]
				},{
					xtype:'container',
					layout:'border',
					style:{
						backgroundColor:'#FFF'
					},
					flex:1,
					items:[{
						xtype:'container',
						region:'north',
						height:95,
						html:[
							'<div class="candidato">',
								'<div class="img">',
		                			'<img src="https://twimg0-a.akamaihd.net/profile_images/2171219068/561240_10150799454499533_297028154532_9549761_222771239_n_normal.jpg" />',
								'</div>',
				          		'<span class="label label-info">@JosefinaVM</span>',
								'<div id="jvm" class ="btn  btn-info load">0 nuevos</div>',
				        	'</div>'].join('')
					},{
					xtype:'timeline',
					store:storeJvm,
					region:'center',
					padding:'10px 0 0 0'
				}]
			}]
			},{
				xtype:'gmappanel', // <---  Map Section
				center: {
					geoCodeAddr: 'Mexico'
				}
			},{
                xtype:'container', // <--- TopLists Section Container
                flex: 1,
                layout: {
                    type: 'hbox',
                    padding:'5',
                    align:'stretch'
                },
                items:[{
                    xtype:'container',
                    flex: 1,
                    layout:'border',
                    style:{
                        backgroundColor:'#FFF',
                        padding:'10px'
                    },
                    items:[{
                        xtype:'container',
                        region:'north',
                        height:40,
                        html:[
                            '<div class="alert alert-success" style="text-align: center; font-weight: bold;">',
                            'TOP HASHTAGS',
                            '</div>'].join('')
                    },{
                        xtype:'piechart',
                        region: 'center',
                        store: storeTopHashtagsPie,
                        theme: 'Green',
                        gato: '#'
                    },{
                        xtype:'tophashtag',
                        store:storeTopHashtag,
                        region:'south',
                        padding:'10px 0 0 0'
                    }]
                },{
                    xtype:'container',
                    layout:'border',
                    style:{
                        backgroundColor:'#FFF',
                        padding:'10px'
                    },
                    flex:1,
                    items:[{
                        xtype:'container',
                        region:'north',
                        height:40,
                        html:[
                            '<div class="alert alert-danger" style="text-align: center; font-weight: bold;">',
                            'TOP RETWEETS',
                            '</div>'].join('')
                    },{
                        xtype:'piechart',
                        region: 'center',
                        store: storeTopRetweetsPie,
                        theme: 'Red'
                    },{
                        xtype:'topretweet',
                        store: storeTopRetweet,
                        region: 'south',
                        padding:'10px 0 0 0'
                    }]
                },{
                    xtype:'container',
                    layout:'border',
                    style:{
                        backgroundColor:'#FFF',
                        padding:'10px'
                    },
                    flex:1,
                    items:[{
                        xtype:'container',
                        region:'north',
                        height:40,
                        html:[
                            '<div class="alert alert-info" style="text-align: center; font-weight: bold;">',
                            'TOP URLS',
                            '</div>'].join('')
                    },{
                        xtype:'piechart',
                        region: 'center',
                        store: storeTopUrlsPie,
                        theme: 'Blue'
                    },{
                        xtype:'topurl',
                        store:storeTopUrl,
                        region:'south',
                        padding:'10px 0 0 0'
                    }]
                }]
            },{
                xtype: 'container',//<--- Statistics Section Container
                flex: 1,
                layout: {
                    type: 'vbox',
                    padding: '5',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'barchart',
                        flex: 1,
                        layout: 'border',
                        store: storeBarChartTotal
                    },{
                     xtype: 'linechart',
                     flex: 1,
                     layout: 'border'
                     //store: storePieTotal
                    }]
                }/*,{
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'barchart',
                        flex: 1,
                        layout: 'border',
                        store: storeBarAmlo
                    },{
                        xtype: 'barchart',
                        flex: 1,
                        layout: 'border',
                        store: storeBarGquadri

                    },{
                        xtype: 'barchart',
                        flex: 1,
                        layout: 'border',
                        store: storeBarEpn

                    },{
                        xtype: 'barchart',
                        flex: 1,
                        layout: 'border',
                        store: storeBarJvm
                    }]
                }*/]
            }]
		}],
        listeners:{
            scope:this,
            afterrender:function(c,o){
                !function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                !function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");
            }
        }
	}


    );
});

Ext.onReady(function(){
	Ext.define('Tweet', {
	    extend: 'Ext.data.Model',
	    fields: [
			{ name:'tweet_k', type:'string' },
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

    Ext.define('TweetChart', {
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

    Ext.define('TopHashtag',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'hashtag_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'hashtag', type: 'string' },
            { name: 'total', type: 'integer' },
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

    Ext.define('TopRetweet',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'retweet_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'retweet', type: 'string' },
            { name: 'total', type: 'integer' },
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

    Ext.define('TopUrl',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'url_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'total', type: 'integer' },
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

    // Stores

    var storeGraficaTweets = Ext.create('Ext.data.Store', {
        model: 'TweetChart'
    });

    var storePieAmlo = Ext.create('Ext.data.Store',{
        model: 'PieChart'
    });

    var storePieEpn = Ext.create('Ext.data.Store',{
        model: 'PieChart'
    });

    var storePieJvm = Ext.create('Ext.data.Store',{
        model: 'PieChart'
    });

    var storePieGquadri = Ext.create('Ext.data.Store',{
        model: 'PieChart'
    });

    var storeTopHashtag = Ext.create('Ext.data.Store',{
        model: 'TopHashtag'
    });

    var storeTopRetweet = Ext.create('Ext.data.Store',{
        model: 'TopRetweet'
    });

    var storeTopUrl = Ext.create('Ext.data.Store',{
        model: 'TopUrl'
    });

	var storeAmlo = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});

	var storeEpn = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});

	var storeJvm = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});

	var storeGquadri = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});



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
										          		o.tweet,
										          	'</span>',
										        '</div>',
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

    topLists = function(){
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
    topLists();

    tweetCharts = function(){
        storeGraficaTweets.load({
            params:{type:6}
        });
    };
    tweetCharts();

    pieCharts = function(){
        storePieAmlo.load({
            params:{type:7, typec:2}
        });
        storePieEpn.load({
            params:{type:7, typec:0}
        });
        storePieJvm.load({
            params:{type:7, typec:1}
        });
        storePieGquadri.load({
            params:{type:7, typec:3}
        });
    };
    pieCharts();

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
				'<div class="brand"><a href="https://twitter.com/#!/analitweets" target="_blank">@Analitweets</a></div>','->',
				{
					text:'<i class="icon-comment icon-white"></i>',
					cls:'btn btn-primary',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(0);
					}
				},{
					text:'<i class="icon-globe icon-white"></i>',
					cls:'btn btn-primary',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(1);
						ponerMarcadores();
					}
				},{
                    text:'<i class="icon-signal icon-white"></i>',
                    cls:'btn btn-primary',
                    handler:function(btn){
                        var p = btn.up('container').up('container');
                        p.items.items[1].getLayout().setActiveItem(3);
                        tweetCharts();
                        pieCharts();
                    }
                },{
                    text:'<i class="icon-star icon-white"></i>',
                    cls:'btn btn-primary',
                    handler:function(btn){
                        var p = btn.up('container').up('container');
                        p.items.items[1].getLayout().setActiveItem(2);
                        topLists();
                    }
                },{
						text:'<i class="icon-refresh icon-white"></i>',
						cls:'btn btn-success',
						handler:function(btn){
							cargarStores();
							Ext.fly('obr').update('0 nuevos');
							Ext.fly('jvm').update('0 nuevos');
							Ext.fly('gqu').update('0 nuevos');
							Ext.fly('epn').update('0 nuevos');
						}
					}]
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
				xtype:'gmappanel',
				center: {
					geoCodeAddr: 'Mexico'
				}
			},{
                xtype:'container',
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
                        backgroundColor:'#FFF'
                    },
                    items:[{
                        xtype:'container',
                        region:'north',
                        height:25,
                        html:[
                            '<div class="candidato"',
                            '<span align="center">TOP HASHTAGS</span>',
                            '</div>'].join('')
                    },{
                        xtype:'tophashtag',
                        store:storeTopHashtag,
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
                        height:25,
                        html:[
                            '<div class="candidato">',
                            '<span align="center">TOP RETWEETS</span>',
                            '</div>'].join('')
                    },{
                        xtype:'topretweet',
                        store: storeTopRetweet,
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
                        height:25,
                        html:[
                            '<div class="candidato">',
                            '<span align="center">TOP URLS</span>',
                            '</div>'].join('')
                    },{
                        xtype:'topurl',
                        store:storeTopUrl,
                        region:'center',
                        padding:'10px 0 0 0'
                    }]
                }]

            },{
                xtype: 'container',
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
                        xtype: 'timelinechart',
                        flex: 1,
                        layout: 'border',
                        store: storeGraficaTweets
                    },{
                        xtype: 'piechart',
                        flex: 1,
                        layout: 'border',
                        store: storePieEpn

                    }]
                },{
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'piechart',
                        flex: 1,
                        layout: 'border',
                        store: storePieAmlo
                    },{
                        xtype: 'piechart',
                        flex: 1,
                        layout: 'border',
                        store: storePieGquadri

                    },{
                        xtype: 'piechart',
                        flex: 1,
                        layout: 'border',
                        store: storePieEpn

                    },{
                        xtype: 'piechart',
                        flex: 1,
                        layout: 'border',
                       store: storePieJvm

                    }]
                }]
            }]
		}]
	});
});
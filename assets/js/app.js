
Ext.onReady(function(){

	//Constantes
	var countJvm, countAmlo, countEpn, countGquadri;

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
                        if(diff <= 0){
                        	return "Hace unos segundos";
                        }
                        else if(diff < 60) {
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
            { name: 'users', type: 'string'},
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
            { name: 'id_str', type:'string' },
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
            {name: 'time', type: 'string'},
            {name: 'data1', type: 'integer'},
            {name: 'data2', type: 'integer'},
            {name: 'data3', type: 'integer'},
            {name: 'data4', type: 'integer'}
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

    //Estadisticas Hashtag Model
    Ext.define('EstadisticasHashtag',{
        extend: 'Ext.data.Model',
        fields: [
            { name: 'hashtag_k', type: 'integer' },
            { name: 'track_k', type: 'string' },
            { name: 'name', type: 'string', mapping:'hashtag' },
            { name: 'data', type: 'integer', mapping:'total' },
            { name: 'users', type: 'string'},
            { name: 'porcentaje', type: 'float'},
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

    //Estadisticas Hashtag AMLO Store
    var storeEstadisticasHashtagAmlo = Ext.create('Ext.data.Store', {
        model: 'EstadisticasHashtag'
    });

    //Estadisticas Hashtag EPN Store
    var storeEstadisticasHashtagEpn = Ext.create('Ext.data.Store', {
        model: 'EstadisticasHashtag'
    });

    //Estadisticas Hashtag JVM Store
    var storeEstadisticasHashtagJvm = Ext.create('Ext.data.Store', {
        model: 'EstadisticasHashtag'
    });

    //Estadisticas Hashtag GQuadri Store
    var storeEstadisticasHashtagGquadri = Ext.create('Ext.data.Store', {
        model: 'EstadisticasHashtag'
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

    lineCharts();
    barCharts();


    //Estadisticas Hashtags Loader
    estadisticasHashtags = function(){
        storeEstadisticasHashtagAmlo.load({
            params:{type:10,typec:2}
        });
        storeEstadisticasHashtagEpn.load({
            params:{type:10,typec:0}
        });
        storeEstadisticasHashtagJvm.load({
            params:{type:10,typec:1}

        });
        storeEstadisticasHashtagGquadri.load({
            params:{type:10,typec:3}
        });
    };
    estadisticasHashtags();
	
	//Actualizar contadores y totales
	updateContadores = function(){
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
							//Actualiza el total de tweets para el candidato en la etiqueta
							Ext.fly('epntweets').update(o.no_twits);
							//Actualiza el total de tweets Negativos para el candidato, en la etiqueta
							Ext.fly('epnnegativos').update(o.negatives);
							var num = (o.no_twits * 1) - ((Ext.isDefined(countEpn) ? countEpn : o.num_twits) * 1);
							if (num > 0){
								//Actualiza el numero de nuevos tweets en el boton
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
							//Actualiza el total de tweets para el candidato, en la etiqueta
							Ext.fly('quadritweets').update(o.no_twits);
							//Actualiza el total de tweets Negativos para el candidato, en la etiqueta
							Ext.fly('quadrinegativos').update(o.negatives);
							var num = (o.no_twits * 1) - ((Ext.isDefined(countGquadri) ? countGquadri : o.num_twits) * 1);
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
							//Actualiza el total de tweets para el candidato en la etiqueta
							Ext.fly('jvmtweets').update(o.no_twits);
							//Actualiza el total de tweets Negativos para el candidato, en la etiqueta
							Ext.fly('jvmnegativos').update(o.negatives);
							var num = (o.no_twits * 1)  - ((Ext.isDefined(countJvm) ? countJvm : o.num_twits)  * 1);
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
							//Actualiza el total de tweets para el candidato en la etiqueta
							Ext.fly('obrtweets').update(o.no_twits);
							//Actualiza el total de tweets Negativos para el candidato, en la etiqueta
							Ext.fly('obrnegativos').update(o.negatives);
							var num = (o.no_twits * 1) - ((Ext.isDefined(countAmlo) ? countAmlo : o.num_twits) * 1);
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
	};
	//Primera llamada para actualizar los contadores
	updateContadores();
	//Update Interval
	setInterval(updateContadores,8000);

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

    createPopover=function(id, title, text){
        $('#'+id).popover(
            {
                placement:"bottom",
                title: title,
                content: text,
                trigger:"hover",
                delay:{ show:500, hide:100 }
            }
        )};

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
                    id:"tweets",
					cls:'btn btn-primary',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(0);
					},
                    listeners: {
                        scope: this,
                        afterrender: function(){
                            createPopover("tweets", "Tweets", "Podras observar la actividad de tweets para cada candidato." )
                        }

                    }
				},{
					text:'<i class="icon-globe icon-white"></i> <span style="color:#FFFFFF;">Mapa</span>',
                    id:"mapa",
					cls:'btn btn-success',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(1);
						ponerMarcadores();
					},
                    listeners: {
                        scope: this,
                        afterrender: function(){
                            createPopover("mapa", "Mapa", "Podras observar la geolocalización de las personas que twiteen mencionando algun candidato." )
                        }

                    }
				},{
                    text:'<i class="icon-star icon-white"></i> <span style="color:#FFFFFF;">Top</span>',
                    id: "top",
                    cls:'btn btn-info',
                    handler:function(btn){
                        var p = btn.up('container').up('container');
                        p.items.items[1].getLayout().setActiveItem(2);
                        topLists();
                    },
                    listeners: {
                        scope: this,
                        afterrender: function(){
                            createPopover("top", "Top", "Podras observar el top hashtag, top retweets y top urls. " )
                        }

                    }
                },{
                    text:'<i class="icon-signal icon-white"></i> <span style="color:#FFFFFF;">Estadísticas</span>',
                    id: "est",
                    cls:'btn btn-danger',
                    handler:function(btn){
                        var p = btn.up('container').up('container');
                        p.items.items[1].getLayout().setActiveItem(3);
                        lineCharts();
                        barCharts();
                        estadisticasHashtags();
                    },
                    listeners: {
                        scope: this,
                        afterrender: function(){
                            createPopover("est", "Estadisticas", "Podras observar una serie de estadisticas donde se pueden ver posibles bots para cada candidato." )
                        }

                    }
                },{
						text:'<i class="icon-refresh icon-white"></i> <span style="color:#FFFFFF;">Recargar</span>',
                        id: "recargar",
						cls:'btn btn-warning',
						handler:function(btn){
							cargarStores();
							Ext.fly('obr').update('0 nuevos');
							Ext.fly('jvm').update('0 nuevos');
							Ext.fly('gqu').update('0 nuevos');
							Ext.fly('epn').update('0 nuevos');
                            topLists();
						},
                    listeners: {
                        scope: this,
                        afterrender: function(){
                            createPopover("recargar", "Recargar", "Recarga los tweets de todos los candidatos" )
                        }

                    }
				},'->',
                '<a href="https://twitter.com/share" class="twitter-share-button" style="margin-right: 60px;">Tweet</a><script></script>',
                '<a href="https://twitter.com/Analitweets" class="twitter-follow-button" data-show-count="false" style="margin-right: 30px;">Follow @Analitweets</a><script></script>'
                ]
		},{
			xtype:'container',
			layout:'card',
			region:'center',
			activeItem:3,
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
					minWidth: 260,
					items:[{
						xtype:'container',
						region:'north',
						height:110,
						html:[
				        	'<div class="candidato">',
				        		'<div class="contenedor-centro">',
				        			'<div class="tweets">',
				        				'<h3>Tweets</h3>',
				        				'<p id="obrtweets"class="label label-warning">0</p>',
				        			'</div>',
				        			'<a href="https://twitter.com/#!/lopezobrador_" target="_blank"><div class="recuadro">',
				        				'<div class="imagen obr-imagen"></div>',
				        				'<div class="nombre"><h5>@lopezobrador_</h5></div>',
				        			'</div></a>',
				        			'<div class="negativos">',
				        				'<h3>Negativos</h3>',
				        				'<p id="obrnegativos" class="label label-warning">0</p>',
				        			'</div>',
				        		'</div>',
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
					minWidth: 260,
					items:[{
						xtype:'container',
						region:'north',
						height:110,
						html:[
							'<div class="candidato">',
								'<div class="contenedor-centro">',
									'<div class="tweets">',
										'<h3>Tweets</h3>',
										'<p id="quadritweets"class="label">0</p>',
									'</div>',
									'<a href="https://twitter.com/#!/g_quadri" target="_blank"><div class="recuadro">',
										'<div class="imagen quadri-imagen"></div>',
										'<div class="nombre"><h5>@g_quadri</h5></div>',
									'</div></a>',
									'<div class="negativos">',
										'<h3>Negativos</h3>',
										'<p id="quadrinegativos" class="label">0</p>',
									'</div>',
								'</div>',
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
					minWidth: 260,
					items:[{
						xtype:'container',
						region:'north',
						height:110,
						html:[
							'<div class="candidato">',
								'<div class="contenedor-centro">',
									'<div class="tweets">',
										'<h3>Tweets</h3>',
										'<p id="epntweets"class="label label-success">0</p>',
									'</div>',
									'<a href="https://twitter.com/#!/epn" target="_blank"><div class="recuadro">',
										'<div class="imagen epn-imagen"></div>',
										'<div class="nombre"><h5>@epn</h5></div>',
									'</div></a>',
									'<div class="negativos">',
										'<h3>Negativos</h3>',
										'<p id="epnnegativos" class="label label-success">0</p>',
									'</div>',
								'</div>',
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
					minWidth: 260,
					items:[{
						xtype:'container',
						region:'north',
						height:110,
						html:[
							'<div class="candidato">',
								'<div class="contenedor-centro">',
									'<div class="tweets">',
										'<h3>Tweets</h3>',
										'<p id="jvmtweets"class="label label-info">0</p>',
									'</div>',
									'<a href="https://twitter.com/#!/josefinavm" target="_blank"><div class="recuadro">',
										'<div class="imagen jvm-imagen"></div>',
										'<div class="nombre"><h5>@josefinavm</h5></div>',
									'</div></a>',
									'<div class="negativos">',
										'<h3>Negativos</h3>',
										'<p id="jvmnegativos" class="label label-info">0</p>',
									'</div>',
								'</div>',
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
                    type: 'hbox',
                    padding: '5',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items:[{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            region: 'east',
                            items:[{
                                xtype:'container',
                                region:'north',
                                height:73,
                                html:[
                                    '<div class="candidato">',
                                    '<div class="contenedor-centro">',
                                    '<div class="tweets">',
                                    '<h3>Tweets</h3>',
                                    '<p id="obrtweets"class="label label-warning">0</p>',
                                    '</div>',
                                    '<a href="https://twitter.com/#!/lopezobrador_" target="_blank"><div class="recuadro">',
                                    '<div class="imagen obr-imagen"></div>',
                                    '<div class="nombre"><h5>@lopezobrador_</h5></div>',
                                    '</div></a>',
                                    '<div class="negativos">',
                                    '<h3>Negativos</h3>',
                                    '<p id="obrnegativos" class="label label-warning">0</p>',
                                    '</div>',
                                    '</div>'].join('')
                            },{
                                xtype: 'estadisticashashtag',
                                region: 'south',
                                store:storeEstadisticasHashtagAmlo,
                                padding:'5px 5 5 5'
                            }]
                        },{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            region: 'west',
                            items:[{
                                xtype:'container',
                                region:'north',
                                height:73,
                                html:[
                                    '<div class="candidato">',
                                    '<div class="contenedor-centro">',
                                    '<div class="tweets">',
                                    '<h3>Tweets</h3>',
                                    '<p id="quadritweets"class="label">0</p>',
                                    '</div>',
                                    '<a href="https://twitter.com/#!/g_quadri" target="_blank"><div class="recuadro">',
                                    '<div class="imagen quadri-imagen"></div>',
                                    '<div class="nombre"><h5>@g_quadri</h5></div>',
                                    '</div></a>',
                                    '<div class="negativos">',
                                    '<h3>Negativos</h3>',
                                    '<p id="quadrinegativos" class="label">0</p>',
                                    '</div>',
                                    '</div>'].join('')
                            },{
                                xtype: 'estadisticashashtag',
                                region: 'south',
                                store: storeEstadisticasHashtagGquadri,
                                padding:'5px 5 5 5'
                            }]

                        }]
                    },{
                     xtype: 'barchart',
                     flex: 1,
                     layout: 'border',
                     store: storeBarChartTotal
                    }]
                },{
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items:[{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            region: 'east',
                            items:[{
                                xtype:'container',
                                region:'north',
                                height:73,
                                html:[
                                    '<div class="candidato">',
                                    '<div class="contenedor-centro">',
                                    '<div class="tweets">',
                                    '<h3>Tweets</h3>',
                                    '<p id="epntweets"class="label label-success">0</p>',
                                    '</div>',
                                    '<a href="https://twitter.com/#!/epn" target="_blank"><div class="recuadro">',
                                    '<div class="imagen epn-imagen"></div>',
                                    '<div class="nombre"><h5>@epn</h5></div>',
                                    '</div></a>',
                                    '<div class="negativos">',
                                    '<h3>Negativos</h3>',
                                    '<p id="epnnegativos" class="label label-success">0</p>',
                                    '</div>',
                                    '</div>'].join('')
                            },{
                                xtype: 'estadisticashashtag',
                                region: 'south',
                                store:storeEstadisticasHashtagEpn,
                                padding:'5px 5 5 5'
                            }]
                        },{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            region: 'west',
                            items:[{
                                xtype:'container',
                                region:'north',
                                height:73,
                                html:[
                                    '<div class="candidato">',
                                    '<div class="contenedor-centro">',
                                    '<div class="tweets">',
                                    '<h3>Tweets</h3>',
                                    '<p id="jvmtweets"class="label label-info">0</p>',
                                    '</div>',
                                    '<a href="https://twitter.com/#!/josefinavm" target="_blank"><div class="recuadro">',
                                    '<div class="imagen jvm-imagen"></div>',
                                    '<div class="nombre"><h5>@josefinavm</h5></div>',
                                    '</div></a>',
                                    '<div class="negativos">',
                                    '<h3>Negativos</h3>',
                                    '<p id="jvmnegativos" class="label label-info">0</p>',
                                    '</div>',
                                    '</div>'].join('')
                            },{
                                xtype: 'estadisticashashtag',
                                region: 'south',
                                store: storeEstadisticasHashtagJvm,
                                padding:'5px 5 5 5'
                            }]

                        }]
                    },{
                         xtype: 'linechart',
                         flex: 1,
                         layout: 'border',
                         store: storeLineTweets
                    }]
                }]
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
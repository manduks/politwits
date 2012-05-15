
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
                        return 'aca';
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
	
	
	//store Amlo
	var storeAmlo = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});	

	//store EPN
	var storeEpn = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});	

	//store JVM
	var storeJvm = Ext.create('Ext.data.Store', {
	    model: 'Tweet'
	});	
	
	//store JVM
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
						case '@G_quadri':break;
							var num = 0;
							num = (o.no_twits * 1) - (countGquadri * 1);							
							if (num > 0){
								Ext.fly('gqu').update(num+' nuevos');
								Ext.fly('gqu').on('click',function(){
									storeGquadri.load({
										params:{type:1,typec:3},
										callback: function(records, operation, success) {			        
											countEpn = Ext.decode(operation.response.responseText).count;
											Ext.fly('gqu').update('0 nuevos');
										}
									});
								});
							}
						case '@JosefinaVM':break;
							var num = 0;
							num = (o.no_twits * 1)  - (countJvm * 1);							
							if (num > 0){
								Ext.fly('jvm').update(num+' nuevos');
								Ext.fly('jvm').on('click',function(){
									storeJvm.load({
										params:{type:1,typec:1},
										callback: function(records, operation, success) {			        
											countEpn = Ext.decode(operation.response.responseText).count;
											Ext.fly('jvm').update('0 nuevos');
										}
									});
								});
							}
						case '@lopezobrador_':
							var num = 0;
							num = (o.no_twits * 1) - (countAmlo * 1);							
							if (num > 0){
								Ext.fly('obr').update(num+' nuevos');
								Ext.fly('obr').on('click',function(){
									storeAmlo.load({
										params:{type:1,typec:2},
										callback: function(records, operation, success) {			        
											countEpn = Ext.decode(operation.response.responseText).count;
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
        items: [{
			xtype:'toolbar',
			region:'north',
			cls:'navbar-inner',
			baseCls:'navbar navbar-fixed-top',
			items:[
				'<div class="brand">Politwits</div>','->',
				{
					text:'<i class="icon-comment icon-white"></i>',
					cls:'btn btn-primary',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(0);
					}
				},{
					text:'<i class="icon-signal icon-white"></i>',
					cls:'btn btn-primary',
					handler:function(btn){
						var p = btn.up('container').up('container');
						p.items.items[1].getLayout().setActiveItem(1);
					}
				},{
						text:'<i class="icon-refresh icon-white"></i>',
						cls:'btn btn-success',
						handler:function(btn){
							cargarStores();
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
					geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
				    marker: {title: 'Fenway Park'}
				},
				markers: [{
					lat: 42.339641,
					lng: -71.094224,
					title: 'Boston Museum of Fine Arts',
					listeners: {
							click: function(e){
				    			Ext.Msg.alert('It\'s fine', 'and it\'s art.');
							}
						}
				    },{
				    	lat: 42.339419,
				       	lng: -71.09077,
				        title: 'Northeastern University'
				}]
			}]
		}]
	});
});
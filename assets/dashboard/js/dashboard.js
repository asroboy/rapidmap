var map = null;
var source = null;
var layers = null;
var layer_group = null;
var layersOSM = null;
var layersRBI = null;
var view = null;
var button = null;
var win = null;
var space = null;
var sb = null;
var i = 0;
var source1 = new ol.source.TileArcGISRest();
var source2 = new ol.source.TileArcGISRest();
var basemap = "osm";
var basemap1 = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
var basemap2 = new ol.layer.Tile({
		source: source1
	});
var url = null;
var tile_index = [];

Ext.require(['*']);
Ext.onReady(function () {	
	var chart1 = Ext.create('Ext.chart.Chart',{
		animate: false,
		store: store1,
		insetPadding: 30,
		axes: [{
			type: 'Numeric',
			minimum: 0,
			position: 'left',
			fields: ['data1'],
			title: false,
			grid: true,
			label: {
				renderer: Ext.util.Format.numberRenderer('0,0'),
				font: '10px Arial'
			}
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['name'],
			title: false,
			label: {
				font: '11px Arial',
				renderer: function(name) {
					return name.substr(0, 3) + ' 07';
				}
			}
		}],
		series: [{
			type: 'line',
			axis: 'left',
			xField: 'name',
			yField: 'data1',
			listeners: {
			  itemmouseup: function(item) {
				  Ext.example.msg('Item Selected', item.value[1] + ' visits on ' + Ext.Date.monthNames[item.value[0]]);
			  }  
			},
			tips: {
				trackMouse: true,
				width: 80,
				height: 40,
				renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name'));
					this.update(storeItem.get('data1'));
				}
			},
			style: {
				fill: '#38B8BF',
				stroke: '#38B8BF',
				'stroke-width': 3
			},
			markerConfig: {
				type: 'circle',
				size: 4,
				radius: 4,
				'stroke-width': 0,
				fill: '#38B8BF',
				stroke: '#38B8BF'
			}
		}]
	});

	var chart2 = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        shadow: true,
        store: store1,
        insetPadding: 30,
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name']
        }],
        series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
              trackMouse: true,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
              }
            },
            label: {
              display: 'insideEnd',
              'text-anchor': 'middle',
                field: 'data1',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },
            xField: 'name',
            yField: 'data1'
        }]
    });

    var chart3 = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        animate: true,
        store: store1,
        insetPadding: 10,
        shadow: false,
        legend: {
            position: 'right'
        },
        theme: 'Base:gradients',
        series: [{
            type: 'pie',
            field: 'data1',
            showInLegend: false,
            donut: true,
            tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                //calculate percentage.
                var total = 0;
                store1.each(function(rec) {
                    total += rec.get('data1');
                });
                this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
              }
            },
            highlight: {
              segment: {
                margin: 20
              }
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true,
                font: '8px Arial'
            }
        }]
    });

    Ext.define('ImageModel', {
        extend: 'Ext.data.Model',
        fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
    });

    var store2 = Ext.create('Ext.data.JsonStore', {
        model: 'ImageModel',
        proxy: {
            type: 'ajax',
            url: 'get-images.php',
            reader: {
                type: 'json',
                root: 'images'
            }
        }
    });

    store2.load();

    // Ext.define('DashboardModel', {
    //     extend: 'Ext.data.Model',
    //     fields: ['isi_data']
    // });

    DashboardModel = Ext.define('DashboardModel', {
	    extend: 'Ext.data.Model',
	    fields: [
	       {name: 'isi_data'}
	    ]
	});

    var store_list_dashboard = Ext.create('Ext.data.Store', {
        model: 'DashboardModel',
        storeId: 'StoreDashboard',
        proxy: {
            type: 'ajax',
            url: 'dashboard/ListService',
            reader: {
                type: 'json',
                root: 'list-dashboard'
            }
        }
    });

    store_list_dashboard.load();

    function renderDescription(value) {
    	i++;
    	var str = value.split("#");
        return '<div class="grid-listview"><div class="head-grid-listview">'+str[0]+'</div>'+
        	   '<div class="content1-grid-listview">Tgl Publikasi: '+str[2]+'</div>'+
        	   '<div class="content1-grid-listview">Sumber: '+str[4]+'</div>'
        	   '</div>';
    }

    var listView = Ext.create('Ext.grid.Panel', {
        layout: 'fit',
        renderTo: Ext.getBody(),
        store: store_list_dashboard,
        multiSelect: false,
        viewConfig: {
            emptyText: 'No data to display'
        },
        hideHeaders: true,
        columns: [{
            flex: 50,
            dataIndex: 'isi_data',
            renderer: renderDescription
        }],
        listeners: {
		    select: function(grid, record) {
		        var isi = record.get('isi_data');
		        var str = isi.split('#');
		        document.getElementById('judul-peta').innerHTML = str[0];
		        document.getElementById('tgl-peta').innerHTML = "Tgl Publikasi: "+str[2];
		        url = str[1];
		        if(basemap == "osm"){
		        	call_osm_basemap(url);
		        }else{
		        	call_rbi_basemap(url);
		        }
		    }
		}
    });

    function onItemCheckLayer(){
    	Ext.Msg.alert('Menu Click', 'You clicked the', "Msg");
    }
	
	Ext.define('NamaPetaBencana', {
        extend: 'Ext.data.Model',
        fields: ['isi_nama']
    });

    var namapeta = Ext.create('Ext.data.JsonStore', {
        model: 'NamaPetaBencana',
        proxy: {
            type: 'ajax',
            url: site_url + 'Dashboard/ListNameBencana',
            reader: {
                type: 'json'
            }
        }
    });
    namapeta.load();
	
    var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: '5 5 5 5'
        },
        items: [{
            region: 'north',
            collapsible: false,
            crossOrigin: 'Anonymouse',
            split: false,
            border: false,
            bodyStyle: 'margin-bottom: 10px;background-color: #3892d3',
            height: 98, //98
            minHeight: 98, //98
            html: '<table width="100%" height="70" style="background-color: #3892d3"><tr><td style="width: 60px; text-align: right"><img src="assets/dashboard/images/logo.png" width="50px" height="50px" style="padding: 0px;"></td><td style="padding-left: 10px"><div class="text-logo">BADAN INFORMASI GEOSPASIAL<div><div class="text-small-logo">SISTEM INFORMASI RAPID MAPPING KEBENCANAAN<div></td></tr></table>',
			dockedItems: [{
				dock: 'bottom',
				padding: 2,
				border: false,
				xtype: 'toolbar',
				items: [{
					xtype: 'button',
					iconCls : 'icon-home',
					text: 'Beranda'
				},{
					xtype: "label",
					html: "|"
				},{
					xtype: 'button',
					iconCls : 'icon-download',
					text: 'Unduh Peta',
					handler: function(){
						map.once('postcompose', function(event) {
				          var canvas = event.context.canvas;
				          if (navigator.msSaveBlob) {
				            navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
				          } else {
				            canvas.toBlob(function(blob) {
				              saveAs(blob, 'map.png');
				            });
				          }
				        });
				        map.renderSync();
						// var dims = {a4: [297, 210]};
						// var size = (map.getSize());
      //   				var extent = map.getView().calculateExtent(size);
      //   				var source = "";
      //   				var format = "a4";
      //   				var resolution = "72";

      //   				var dim = dims[format];
				  //       var width = Math.round(dim[0] * resolution / 25.4);
				  //       var height = Math.round(dim[1] * resolution / 25.4);
				  //       var size = (map.getSize());
				  //       var extent = map.getView().calculateExtent(size);
				  //       var loading = 0;
      // 					var loaded = 0;

      //   				if(basemap == "osm"){
      //   					source = basemap1.getSource();
      //   				}else{
      //   					source = basemap2.getSource();
      //   				}

      //   				var tileLoadStart = function() {
				  //         	++loading;
				  //       };

				  //       var timer;
				  //       var keys = [];

      //   				function tileLoadEndFactory(canvas) {
      //     					return function () {
      //     						if (timer) {
					 //              	clearTimeout(timer);
					 //              	timer = null;
					 //            }

					 //            if (loading === loaded) {
					 //              	timer = window.setTimeout(function () {
					 //                	loading = 0;
					 //                	loaded = 0;
					 //                	var data = canvas.toDataURL('image/jpeg');
					 //                	var pdf = new jsPDF('landscape', undefined, format);
					 //                	pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
					 //                	pdf.save('map.pdf');
					 //                	keys.forEach(ol.Observable.unByKey);
					 //                	keys = [];
					 //                	// map.setSize(size);
					 //                	// map.getView().fit(extent, {size: size});
					 //                	// map.renderSync();
					 //                	document.body.style.cursor = 'auto';
					 //              	}, 500);
					 //            }
      //     					};
      //     				}

      //     				map.once('postcompose', function(event) {
				  //         	var canvas = event.context.canvas;
				  //         	var tileLoadEnd = tileLoadEndFactory(canvas);
				  //         	keys = [
				  //           	source.on('tileloadstart', tileLoadStart),
				  //           	source.on('tileloadend', tileLoadEnd),
				  //           	source.on('tileloaderror', tileLoadEnd)
				  //         	];

			   //        		tileLoadEnd();
			   //      	});

			        	// var printSize = [width, height];
			        	// map.setSize(printSize);
			        	// map.getView().fit(extent, {size: printSize});
			        	// loaded = -1;
			        	// map.renderSync();
					}
				},{
					xtype: "label",
					html: "|"
				},{
					xtype: 'button',
					text: 'Peta Dasar',
					iconCls : 'icon-basemap',
					menu : {
						items: [{
							text: 'Open Street Map (OSM)', 
							group: 'default',
							checked: true,
                            listeners: {
								checkchange: function(item, state){
								    if(state){
								    	basemap = "osm";
								    	call_osm_basemap(url);
								    }
								}
							}
						}, {
							text: 'Rupa Bumi Indonesia (RBI)', 
							group: 'default',
							checked: false,
							listeners: {
								checkchange: function(item, state){
								    if(state){
								    	basemap = "rbi";
								    	call_rbi_basemap(url);
								    }
								}
							}
						}]
					}
				}]
			}]
        },{
			region: 'east',
            collapsible: true,
            layout: 'fit',
            title: 'Nama Peta Bencana',
            split: true,
            width: 300,
            minWidth: 100,
            items: [listView],
            dockedItems: [{
				dock: 'top',
				padding: 2,
				border: false,
				xtype: 'toolbar',
				items: [{
					xtype: 'combobox',
			        name: 'nama_peta',
			        valueField: 'isi_nama',
			        displayField: 'isi_nama',
			        typeAhead: true,
			        queryMode: 'local',
			        width: 235,
			        margin: '0 5 0 0',
			        emptyText: '',
					emptyText: 'Nama Bencana',
			        store: namapeta
				},{
			        xtype: 'button',
			        iconCls : 'icon-search',
			        handler: function(){
			        	var val = Ext.ComponentQuery.query('textfield[name="nama_peta"]')[0].getValue();
				    	var store = Ext.getStore('StoreDashboard');
				        store.clearFilter();
						store.filter('isi_data', val);
				        store.load();
			        }
			    },{
			        xtype: 'button',
			        iconCls : 'icon-refresh',
			        handler: function(){
			        	var val = '';
				    	var store = Ext.getStore('StoreDashboard');
				        store.clearFilter();
						store.filter('isi_data', val);
				        store.load();
			        }
			    }]
			}]
		},{
			region: 'center',
            border: false,
            split: false,
            layout: 'fit',
			items: [mappanel],
			dockedItems: [{
				dock: 'top',
				padding: 0,
				html: '<div class="judul-peta"><b id="judul-peta">&nbsp;</b><br><small id="tgl-peta">&nbsp;</small></div>'
			}]
		}]
		/*,{
            region: 'south',
            id: 'south_panel',
            collapsible: true,
            collapsed: true,
            hideCollapseTool:true,
            splitterResize: true,
            preventHeader: true,
            collapseMode: 'mini',
            split: true,
            height: 180,
            minHeight: 180,
            //title: '',
            layout: 'column',
            items: [{
                columnWidth: 1/3,
                height: 180,
            	minHeight: 180,
                border: true,
                items:[{
                    title: 'Data Penduduk',
                    layout: 'fit',
                    items: chart1,
					height: 180,
					minHeight: 180
                }]
            },{
                columnWidth: 1/3,
                //padding: '0 3 0 3',
                height: 180,
            	minHeight: 180,
                border: true,
                items:[{
                    title: 'Tingkat Bencana',
                    layout: 'fit',
                    items: chart2,
					height: 180,
					minHeight: 180
                }]
            },{
                columnWidth: 1/3,
                height: 180,
            	minHeight: 180,
                border: true,
                items:[{
                    title: 'Jumlah Bencana Yang Terjadi',
                    layout: 'fit',
                    items: chart3,
					height: 180,
					minHeight: 180
                }]
            }]
        },{
            region: 'south',
			title: '',
			split: true,
			resize: false,
			html: '<center style="padding:8px; background-color:#fff; color:#000">© 2018 PT. Virtua Internasional Pratama</center>'
        }]*/
    });
});

var mappanel = Ext.create('Ext.panel.Panel', {
	layout: 'fit',
	html: "<div id='map'></div>", // The map will be drawn inside
	listeners: {
		afterrender: function () {
			var indonesia = [13100000, -235000];

			view = new ol.View({
				center: indonesia,
				zoom: 5
			});

			map = new ol.Map({
				controls: ol.control.defaults({attribution: false}).extend([
					new ol.control.ScaleLine(),
					new ol.control.Zoom({
						zoomInTipLabel: 'Perbesar',
						zoomOutTipLabel: 'Perkecil'
					}),
					new ol.control.Rotate({
						label: '\u2B9D',
						tipLabel: 'Reset Rotasi Utara',
						autoHide: false
					})
				]),
				target: 'map',
				transparent: true,
				opacity: 0.5,
				crossOrigin: 'anonymous',
				loadTilesWhileAnimating: true,
    			loadTilesWhileInteracting: true,
				view: view
			});

			call_osm_basemap();
		},
		// The resize handle is necessary to set the map!
		resize: function () {
			var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight];
			//console.log(size);
			map.setSize(size);
		}
	}
});

function call_osm_basemap(val){
	var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
    myMask.show();
	if(val == null){
		layersOSM = new ol.layer.Group({
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				})
			]
		});

		map.setLayerGroup(layersOSM);
	}else{
		basemap1 = new ol.layer.Tile({
			source: new ol.source.OSM()
		});
		layers = new ol.layer.Tile({
			source: source2
		});

		if(tile_index.length > 0){
			tile_index.shift();
			tile_index.shift();
		}

		tile_index.push(basemap1);
		tile_index.push(layers);

		layer_group = new ol.layer.Group({
			layers: tile_index
		});

		map.setLayerGroup(layer_group);
		source2.setUrl(url);
	}
	myMask.hide();
}

function call_rbi_basemap(val){
	var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
	source1.setUrl('https://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer');
	if(val == null){
		layersRBI = new ol.layer.Group({
			layers: [
				new ol.layer.Tile({
					source: source1
				})
			]
		});
		map.setLayerGroup(layersRBI);
	}else{
		basemap2 = new ol.layer.Tile({
			source: source1
		});
		layers = new ol.layer.Tile({
			source: source2
		});

		if(tile_index.length > 0){
			tile_index.shift();
			tile_index.shift();
		}

		tile_index.push(basemap2);
		tile_index.push(layers);

		layer_group = new ol.layer.Group({
			layers: tile_index
		});

		map.setLayerGroup(layer_group);
		source2.setUrl(url);
	}
	myMask.hide();
}
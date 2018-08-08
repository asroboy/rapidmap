var map = null;
var source = null;
var layersOSM = null;
var layersRBI = null;
var view = null;
var button = null;
var win = null;
var space = null;
var sb = null;

Ext.Loader.setPath('Ext.ux', url + '/assets/analisis-spasial/js/ux/statusbar');
Ext.require(['*']);
Ext.onReady(function() {
	var loadFn = function(btn, statusBar){
        btn = Ext.getCmp(btn);
        statusBar = Ext.getCmp(statusBar);

        btn.disable();
        statusBar.showBusy();

         Ext.defer(function(){
            statusBar.clearStatus({useDefaults:true});
            btn.enable();
        }, 2000);
    };

	function onItemClick(item){
        Ext.Msg.alert('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }
	
	function onItemCheck(item, checked){
        //Ext.Msg.alert('Peta Dasar',item.text);
		if(item.text === "Open Street Map (OSM)"){
			map.setLayerGroup(layersOSM);
		}else{
			map.setLayerGroup(layersRBI);
			source.setUrl('https://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer');
		}
    }

    function onItemCheckLayer(item){
    	Ext.Msg.alert('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }

    function onAnalisisClick(){
    	//Ext.Msg.alert('Menu Click', 'You clicked the "{0}" menu item.');
    	Ext.getCmp('south_panel').toggleCollapse();
    }

    // status pengguna
    function onRefreshStatusPenggunaClick(){
		getSearchStatusPengguna();
	}
	
	function onSearchStatusPenggunaClick(){
		getSearchStatusPengguna();
	}

    function getSearchStatusPengguna(){
    	var val = Ext.ComponentQuery.query('textfield[name="txSearchStatusPengguna"]')[0].getValue();
    	var store = field.up('gridStatusPengguna').getStore();
        store.clearFilter(true);
        store.filter('nama', value);
    	store.reload();
	}

	function onDeleteStatusPenggunaClick(){
		if (gridStatusPengguna.getSelectionModel().hasSelection()) {
		   var row = gridStatusPengguna.getSelectionModel().getSelection()[0];
		   alert(row.get('nama'));
		}
	}

    // berita	
	function onRefreshBeritaClick(){
		getSearchBerita();
	}
	
	function onSearchBeritaClick(){
		getSearchBerita();
	}
	
	function getSearchBerita(){
		var val = Ext.ComponentQuery.query('textfield[name="txSearchBerita"]')[0].getValue();
		var store = Ext.getStore('StoreBerita');
        store.clearFilter();
		store.filter('judul', val);
        store.load();
	}

    function onUserStatusClick(){
    	var winx = null;
    	if (!win) {
    		button = Ext.get('show-btn-profile');
    		space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	        win = new Ext.Window({
	            title: 'Profil Pengguna',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 800,
	            minWidth: 800,
	            height: 450,
	            modal : true,
	            items: gridStatusPengguna,
	            layout: 'fit',
	            tbar: [{
			    	xtype: 'button',
			    	iconCls : 'icon-add',
			        handler: onUserStatusClick
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-edit',
			        handler: onItemCheckLayer
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-delete',
			        handler: onDeleteStatusPenggunaClick
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-refresh',
			        handler: onSearchStatusPenggunaClick
			    },'->',{
					xtype: 'textfield',
			    	name: 'txSearchStatusPengguna',
			    	width: '30%',
			    	listeners : {
						'render' : function(cmp) {
							cmp.getEl().on('keypress', function(e) {
								if (e.getKey() == e.ENTER) {
									getSearchStatusPengguna();
								}
							});
						}
					}
				},{
			        xtype: 'button',
			        iconCls : 'icon-search',
			        handler: onSearchStatusPenggunaClick
			    }],
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Tutup',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onBeritaClick(){
    	var winx = null;
    	if (!win) {
    		button = Ext.get('show-btn-news');
    		space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	        win = new Ext.Window({
	            title: 'Berita',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 800,
	            minWidth: 800,
	            height: 400,
	            modal : true,
	            items: gridBerita,
	            layout: 'fit',
	            tbar: [{
			    	xtype: 'button',
			    	iconCls : 'icon-add',
			        handler: onAddBeritaClick
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-edit',
			        handler: onItemCheckLayer
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-delete',
			        handler: onItemCheckLayer
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-refresh',
			        handler: onRefreshBeritaClick
			    },'->',{
					xtype: 'textfield',
			    	readOnly: false,
			    	name: 'txSearchBerita',
			    	width: '25%',
					listeners : {
						'render' : function(cmp) {
							cmp.getEl().on('keypress', function(e) {
								if (e.getKey() == e.ENTER) {
									getSearchBerita();
								}
							});
						}
					}
				},{
			        xtype: 'button',
			        iconCls : 'icon-search',
			        handler: onSearchBeritaClick
			    }],
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Tutup',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onAddBeritaClick(){
    	var winx = null;
    	if (!winx) {
	        winx = new Ext.Window({
	            title: 'Data Berita',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            closable: false,
	            width: 700,
	            minWidth: 700,
	            height: 460,
	            modal : true,
	            items: formBerita,
	            layout: 'fit',
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Simpan',
	        		handler: function() {
                    	/* script */
		            }
	    		},{
        			text: 'Tutup',
	        		handler: function() {
                    	winx.hide();
	                    winx = null;
		            }
	    		}]
	        });

	        if (winx.isVisible()) {
	            winx.hide();
	        } else {
	            winx.show();
	        }
	    }
    }

    function onAddGalleryClick(){
    	var winx = null;
    	if (!winx) {
	        winx = new Ext.Window({
	            title: 'Unggah Berkas',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            closable: false,
	            width: 400,
	            minWidth: 400,
	            height: 250,
	            modal : true,
	            items: formGallery,
	            layout: 'fit',
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Simpan',
	        		handler: function() {
                    	/* script */
		            }
	    		},{
        			text: 'Tutup',
	        		handler: function() {
                    	winx.hide();
	                    winx = null;
		            }
	    		}]
	        });

	        if (winx.isVisible()) {
	            winx.hide();
	        } else {
	            winx.show();
	        }
	    }
    }

    function onGalleryClick(){
    	var winx = null;
    	if (!win) {
    		button = Ext.get('show-btn-gallery');
	        win = new Ext.Window({
	            title: 'Galeri',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            border: false,
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 800,
	            minWidth: 800,
	            height: 580,
	            modal : true,
	            layout: 'fit',
	            maximizable: true,
	            items: [{
	            	layout: 'border',
			        items: [{
			        	region: 'center',
			            title: 'Berkas Galeri',
			            layout: 'border',
			            items: [{
			                region: 'center',
				            split: true,
			                collapsible: false,
			                overflowY: 'auto',
			                items: gallery_panel,
			                tbar: [{
			                	xtype: 'button',
						        iconCls : 'icon-add',
						        handler: onAddGalleryClick
			                },{
						    	xtype: 'button',
						    	iconCls : 'icon-edit',
						        handler: onItemCheckLayer
						    },{
			                	xtype: 'button',
						        iconCls : 'icon-delete',
						        action: onItemCheckLayer
			                },{
			                	xtype: 'button',
						        iconCls : 'icon-refresh',
						        action: onItemCheckLayer
			                },'->',{
								xtype: 'textfield',
						    	readOnly: false,
						    	name: 'cariBerkas',
						    	width: '40%',
						    	padding: 0
							},{
						        xtype: 'button',
						        iconCls : 'icon-search',
						        action: onItemCheckLayer
						    }]
			            },{
			                title: 'Informasi Berkas',
			                region: 'south',
				            minHeight: 150,
				            height: 150,
			                collapsible: true,
			                html: '<div style="padding: 10px">Nama Berkas: Vektor 1<br>Ukuran Berkas: 12MB<br>Sumber: Instansi 1<br>Tgl Unggah: 12/04/2017<br>Jenis Berkas: Vektor</div>'
			                //splitterResize: true,
			                //collapseMode: 'mini'
			            }]
			        },{
			            region: 'west',
			            title: 'Direktori Berkas',
			            collapsible: true,
			            split: true,
			            width: 200,
			            minWidth: 200,
			            items: treeGallery
			        }]
	            }],
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Unduh',
	        		handler: function() {
                    	
		            }
	    		},{
        			text: 'Tutup',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onChangeProfileClick(){
    	var winx = null;
    	if (!win) {
    		button = Ext.get('show-btn-profile');
    		space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	        win = new Ext.Window({
	            title: 'Profil Pengguna',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 500,
	            minWidth: 350,
	            height: 380,
	            modal : true,
	            items: formProfile,
	            layout: 'fit',
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Perbarui',
	        		handler: function() {
                    	
		            }
	    		},{
        			text: 'Tutup',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onChangePasswordClick(){
    	if (!win) {
    		button = Ext.get('show-btn-profile');
    		space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	        win = new Ext.Window({
	            title: 'Ubah Kata Sandi',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 350,
	            minWidth: 350,
	            height: 220,
	            modal : true,
	            items: formKataSandi,
	            layout: 'fit',
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Perbarui',
	        		handler: function() {
                    	
		            }
	    		},{
        			text: 'Tutup',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onLayerClick(){
    	var winx = null;
    	if (!win) {
    		button = Ext.get('show-btn-layer');
	        win = new Ext.Window({
	            title: 'Ketersedian Service',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 800,
	            minWidth: 800,
	            height: 400,
	            modal : true,
	            items: gridService,
	            layout: 'fit',
	            tbar: [{
			    	xtype: 'button',
			    	iconCls : 'icon-upload'
			        //handler: onAddLayerClick
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-delete',
			        handler: onItemCheckLayer
			    },{
			    	xtype: 'button',
			    	iconCls : 'icon-refresh',
			        handler: onItemCheckLayer
			    },'->',{
					xtype: 'combobox',
			        name: 'service',
			        valueField: 'abbr',
			        displayField: 'service',
			        typeAhead: true,
			        queryMode: 'local',
			        margin: '0 5 0 0',
			        emptyText: '',
			        store: ['Nama Service','Instansi','Tahun']
				},{
					xtype: 'textfield',
			    	readOnly: false,
			    	name: 'namaPengguna',
			    	width: '25%'
				},{
			        xtype: 'button',
			        iconCls : 'icon-search',
			        action: onItemCheckLayer
			    }],
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Pilih',
	        		handler: function() {
                    	/* script */
		            }
	    		},{
	    			text: 'Batal',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onBuatPetaClick() {
    	var winx = null;
    	if (!win) {
    		button = Ext.get('show-btn-buat-peta');
	        win = new Ext.Window({
	            title: 'Buat Peta',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 400,
	            minWidth: 400,
	            height: 200,
	            modal : true,
	            items: formBeritaPeta,
	            layout: 'fit',
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Simpan',
	        		handler: function() {
                    	/* script */
		            }
	    		},{
	    			text: 'Batal',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		}]
	        });

	        if (win.isVisible()) {
	            win.hide();
	        } else {
	            win.show();
	        }
	    }
    }

    function onBagikanClick(){
    	var winx = null;
    	if (!winx) {
    		button = Ext.get('show-btn-share');
	        winx = new Ext.Window({
	            title: 'Bagikan ke Media Sosial',
	            header: {
	                titlePosition: 0,
	                titleAlign: 'left'
	            },
	            closeAction: 'hide',
	            animateTarget: button,
	            closable: false,
	            width: 900,
	            minWidth: 800,
	            height: 400,
	            modal : true,
	            layout: 'border',
	            items: [{
	            	region: 'west',
	            	width: 350,
	            	layout: 'vbox',
	            	bodyStyle: 'padding: 15px',
	            	items: [{
	            		xtype: 'combobox',
				    	fieldLabel: 'Judul Berita',
				    	name: 'judulBerita',
				    	width: '100%'
	            	},{
			            xtype: 'checkboxfield',
			            name: 'ck1',
			            value: 'ck1',
			            fieldLabel: 'Tujuan Share',
			            boxLabel: 'Facebook',
			            checked: true
			        }, {
			            xtype: 'checkboxfield',
			            name: 'ck2',
			            value: 'ck2',
			            fieldLabel: '',
			            labelSeparator: '',
			            hideEmptyLabel: false,
			            boxLabel: 'Twitter',
			            checked: true
			        }, {
			            xtype: 'checkboxfield',
			            name: 'ck3',
			            value: 'ck3',
			            fieldLabel: '',
			            labelSeparator: '',
			            hideEmptyLabel: false,
			            boxLabel: 'Instagram',
			            checked: true
			        }]
	            },{
	            	region: 'center',
	            	items: gridBagikan
	            }],
	            buttonAlign : 'center',
		        buttons: [{
        			text: 'Bagikan',
	        		handler: function() {
                    	win.hide();
	                    win = null;
		            }
	    		},{
        			text: 'Batal',
	        		handler: function() {
                    	winx.hide();
	                    winx = null;
		            }
	    		}]
	        });

	        if (winx.isVisible()) {
	            winx.hide();
	        } else {
	            winx.show();
	        }
	    }
    }

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: '5 5 5 5'
        },
        items: [{
            region: 'north',
            collapsible: false,
            split: false,
            bodyStyle: 'padding-bottom: 10px;background-color: #3892d3',
            height: 98, //98
            minHeight: 98, //98
            html: '<table width="100%" height="70" style="background-color: #d7e4f2"><tr><td style="width: 60px; text-align: right"><img src="assets/analisis-spasial/images/logo.png" width="60px" height="60px" style="padding: 3px;"></td><td style="padding-left: 10px"><div class="text-logo">BADAN INFORMASI GEOSPASIAL<div><div class="text-small-logo">SISTEM INFORMASI RAPID MAPPING KEBENCANAAN<div></td></tr></table>',
            //html: '<table width="100%" height="70" style="background-color: #3892d3"><tr><td style="width: 60px; text-align: right"><img src="assets/images/logo.png" width="60px" height="60px" style="padding: 3px;"></td><td style="padding-left: 10px"><div class="text-logo">BADAN INFORMASI GEOSPASIAL<div><div class="text-small-logo">SISTEM INFORMASI RAPID MAPPING KEBENCANAAN<div></td></tr></table>',
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				items: [{
					xtype: 'button',
					iconCls : 'icon-home',
					text: 'Beranda'
				},{
					xtype: 'button',
					id: 'show-btn-gallery',
					iconCls : 'icon-gallery',
					text: 'Galeri',
					handler: onGalleryClick
				},{
					xtype: 'button',
					id: 'show-btn-news',
					iconCls : 'icon-news',
					text: 'Berita',
					handler: onBeritaClick
				},{
					xtype: 'button',
					id: 'show-btn-share',
					iconCls : 'icon-share',
					text: 'Bagikan',
					handler: onBagikanClick
				},{
					xtype: 'button',
					id: 'show-btn-analysis',
					iconCls : 'icon-analysis',
					text: 'Analisis Spasial',
					handler: onAnalisisClick
				}, '->', {
					xtype: "label",
					html: "Selamat Datang, Fajar",
					padding: '0 0 2.48 0'
				},{
					xtype: "label",
					html: "|",
					padding: '0 5 0 5'
				},{
					xtype: 'button',
					text: 'Peta Dasar',
					iconCls : 'icon-basemap',
					menu : {
						items: [{
							text: 'Open Street Map (OSM)', 
							group: 'default',
							checked: true,
                            checkHandler: onItemCheck
						}, {
							text: 'Rupa Bumi Indonesia (RBI)', 
							group: 'default',
							checked: false,
                            checkHandler: onItemCheck
						}]
					}
				},{
					xtype: 'button',
					id: 'show-btn-profile',
					text: 'Profil Pengguna',
					iconCls : 'icon-profile',
					menu : {
						items: [{
							text: 'Ubah Profil',
							iconCls : 'icon-user-edit',
							handler: onChangeProfileClick
						}, {
							text: 'Ubah Kata Sandi',
							iconCls : 'icon-edit-password',
							handler: onChangePasswordClick
						}, {
							text: 'Status Pengguna',
							iconCls : 'icon-status',
							handler: onUserStatusClick
						}]
					}
				},{
					xtype: 'button',
					text: 'Keluar',
					iconCls : 'icon-logout',
					handler: function() {
						window.location.href = 'analisis/logout';
					}
				}]
			}]
        },{
            region: 'west',
            collapsible: true,
            layout: 'absolute',
            title: 'Lapisan (Layer)',
            split: true,
            width: 230,
            minWidth: 100,
            //minHeight: 100,
            //html: '',
            items: [treeService],
            dockedItems : [{
               	xtype: 'button',
               	id: 'show-btn-buat-peta',
               	text: 'Buat Peta',
               	padding: 8,
               	dock: 'top',
               	handler: onBuatPetaClick
           	}],
            tbar: [{
		        text: '',
		        id: 'show-btn-layer',
		        iconCls : 'icon-add',
		        handler: onLayerClick
		    }, {
		        text: '',
		        iconCls : 'icon-delete',
		        action: onItemCheckLayer
		    }]
        },{
            region: 'center',
			title: 'Map Viewer',
            items: [mappanel]
        },{
            region: 'south',
            id: 'south_panel',
            collapsible: true,
            collapsed: true,
            hideCollapseTool:true,
            splitterResize: true,
            preventHeader: true,
            collapseMode: 'mini',
            split: true,
            height: 150,
            minHeight: 150,
            //title: '',
            layout: 'border',
            items: [{
                title: 'Analisis Spasial',
                region: 'west',
                width: 230,
	            minWidth: 100,
	            minHeight: 100,
                split: true,
                collapsible: false,
                items: form_analisis
            },{
                title: 'Informasi Analisis',
                region: 'center',
                html: '',
                collapsible: false
            }]
        },{
            region: 'south',
			title: '',
			html: '<center style="padding:8px; background-color: #dfe8f6">© 2018 PT. Virtua Internasional Pratama</center>'
        }]
    });
});

var store = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [{ 
        	text: "Galeri", 
        	expanded: true, 
        	children: [{ 
        		text: "Citra", expanded: true, leaf: false, children: [{
        			text: "Citra 1", leaf: true
        		},{
        			text: "Citra 2", leaf: true
        		},{
        			text: "Citra 3", leaf: true
        		}]
        	},{ 
        		text: "Vektor", expanded: true, leaf: false, children: [{
        			text: "Vektor 1", leaf: true
        		},{
        			text: "Vektor 2", leaf: true
        		},{
        			text: "Vektor 3", leaf: true
        		}]
        	},{ 
        		text: "Pdf", expanded: true, leaf: false, children: [{
        			text: "Pdf 1", leaf: true
        		},{
        			text: "Pdf 2", leaf: true
        		},{
        			text: "Pdf 3", leaf: true
        		}]
        	},{ 
        		text: "Gambar", expanded: true, leaf: false, children: [{
        			text: "Gambar 1", leaf: true
        		},{
        			text: "Gambar 2", leaf: true
        		},{
        			text: "Gambar 3", leaf: true
        		}]
        	}]
	    }]
    }
});

var storeService = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [{ 
        	text: "Judul Peta Bencana", 
        	expanded: true, 
        	children: [{ 
        		text: "Nama Service 1", expanded: true, leaf: false, children: [{
        			text: "Layer 1", leaf: true
        		},{
        			text: "Layer 2", leaf: true
        		},{
        			text: "Layer 3", leaf: true
        		}]
        	},{ 
        		text: "Nama Service 2", expanded: true, leaf: false, children: [{
        			text: "Layer 1", leaf: true
        		},{
        			text: "Layer 2", leaf: true
        		},{
        			text: "Layer 3", leaf: true
        		},{
        			text: "Layer 4", leaf: true
        		},{
        			text: "Layer 5", leaf: true
        		},{
        			text: "Layer 6", leaf: true
        		}]
        	}]
	    }]
    }
});

var treeGallery = new Ext.create('Ext.tree.Panel', {
    border: false,
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody()
});

var treeService = new Ext.create('Ext.tree.Panel', {
    border: false,
    store: storeService,
    rootVisible: false,
    renderTo: Ext.getBody()
});

ImageModel = Ext.define('ImageModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'name'},
       {name: 'url'},
       {name: 'size', type: 'float'},
       {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});

var store = Ext.create('Ext.data.Store', {
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

store.load();

var gallery_panel = Ext.create('Ext.Panel', {
    id: 'images-view',
    frame: false,
    border: false,
    collapsible: false,
    autoWidth: false,
    padding: 10,
    title: '',
    renderTo: Ext.getBody(),
    items: Ext.create('Ext.view.View', {
        store: store,
        tpl: [
            '<tpl for=".">',
                '<div class="thumb-wrap" id="{name:stripTags}">',
                    '<div class="thumb"><img src="{url}" title="{name:htmlEncode}"></div>',
                    '<span class="x-editable">{shortName:htmlEncode}</span>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],
        multiSelect: true,
        height: 310,
        trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
        emptyText: 'No images to display',
        plugins: [
            Ext.create('Ext.ux.DataView.DragSelector', {}),
            Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
        ],
        prepareData: function(data) {
            Ext.apply(data, {
                shortName: Ext.util.Format.ellipsis(data.name, 15),
                sizeString: Ext.util.Format.fileSize(data.size),
                dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
            });
            return data;
        },
        listeners: {
            /*selectionchange: function(dv, nodes ){
                var l = nodes.length,
                    s = l !== 1 ? 's' : '';
                this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
            }*/
        }
    })
});

var menu = Ext.create('Ext.menu.Menu', {
	id: 'mainMenu',
	style: {
		overflow: 'visible'     // For the Combo popup
	},
	items: [
		{
		   text: 'Choose a Date',
		   iconCls: 'calendar'
		},{
		   text: 'Choose a Color'
		}
	]
});

Ext.create('Ext.data.Store', { 
	storeId:'simpsonsStore', 
	fields:['name', 'email', 'phone'], 
	data:{
		'items':[ 
			{ 'name': 'Lisa', "email":"lisa@simpsons.com", "phone":"555-111-1224" }, 
			{ 'name': 'Bart', "email":"bart@simpsons.com", "phone":"555-222-1234" }, 
			{ 'name': 'Homer', "email":"homer@simpsons.com", "phone":"555-222-1244" }, 
			{ 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254" } 
		]},
		proxy: {
			type: 'memory',
			reader: {
				type: 'json',
				rootProperty: 'items'
			}
	}
});

// status pengguna
statusPenggunaModel = Ext.define('statusPenggunaModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'nama'},
       {name: 'email'},
	   {name: 'tgl_daftar'},
       {name: 'tgl_approve'},
       {name: 'status'}       
    ]
});

var store_status_pengguna = Ext.create('Ext.data.Store', {
    model: 'statusPenggunaModel',
	storeId: 'StoreStatusPengguna',
    proxy: {
        type: 'ajax',
        url: 'analisis/list_status_pengguna',
        reader: {
            type: 'json',
            root: 'status_pengguna'
        }
    }
});

store_status_pengguna.load();

var gridStatusPengguna = Ext.create('Ext.grid.Panel', { 
	store: store_status_pengguna,	 
	columns: [	 
		{ text: 'Nama Pengguna', width: 150, dataIndex: 'nama' },
		{ text: 'Email', width: 150, dataIndex: 'email' },
		{ text: 'Tgl Daftar', width: 150, dataIndex: 'tgl_daftar' },
		{ text: 'Tgl Diterima', width: 150, dataIndex: 'tgl_approve' },
		{ text: 'Status', width: 150, dataIndex: 'status' }
	],
	height: 200,
	width: 400,
	forceFit: true,
	loadMask: true,
	renderTo: Ext.getBody()
});


// berita
BeritaModel = Ext.define('BeritaModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'judul'},
	   {name: 'tgl_berita'},
       {name: 'url_service'},
       {name: 'status_berita'}       
    ]
});

var store_berita = Ext.create('Ext.data.Store', {
    model: 'BeritaModel',
	storeId: 'StoreBerita',
    proxy: {
        type: 'ajax',
        url: 'berita/listberita',
        reader: {
            type: 'json',
            root: 'berita'
        }
    }
});

store_berita.load();

var gridBerita = Ext.create('Ext.grid.Panel', { 
	store: store_berita,
	columns: [	 
		{ text: 'Judul Berita', dataIndex: 'judul' },
		{ text: 'Tgl berita', dataIndex: 'tgl_berita' },
		{ text: 'Url Service', dataIndex: 'url_service' },
		{ text: 'Status Publikasi', dataIndex: 'status_berita' }
	],
	height: 200,
	width: 400,
	forceFit: true,
	loadMask: true,
	renderTo: Ext.getBody()
});

var gridBagikan = Ext.create('Ext.grid.Panel', { 
	store: Ext.data.StoreManager.lookup('simpsonsStore'),	 
	columns: [	 
		{ text: 'Tgl Dibagikan', width: 150, dataIndex: 'name' },
		{ text: 'Judul Berita', width: 150, dataIndex: 'email' },
		{ text: 'Facebook', width: 150, dataIndex: 'phone' },
		{ text: 'Twitter', width: 150, dataIndex: 'phone' },
		{ text: 'Instagram', width: 150, dataIndex: 'phone', flex: 1 }
	],
	layout: 'fit',
	border: false,
	renderTo: Ext.getBody()
});

var gridService = Ext.create('Ext.grid.Panel', { 
	store: Ext.data.StoreManager.lookup('simpsonsStore'),	 
	columns: [	 
		{ text: 'Nama Service', width: 150, dataIndex: 'name' },
		{ text: 'Tahun', width: 150, dataIndex: 'email' },
		{ text: 'Instansi', width: 150, dataIndex: 'phone', flex: 1 }
	],
	height: 200,
	width: 400,
	renderTo: Ext.getBody()
});

var picBox = {
	border: false,
	items: [{
		xtype: 'box',
   		html: '<img id="pic" src="' + Ext.BLANK_IMAGE_URL + '" class="img-contact" />'
   	},{
   		xtype: 'button',
   		width: 110,
        text: 'Ubah Foto'
   	}]
}

var contentBox = {
	border: false,
	items: [{
		xtype: 'textfield', 
    	fieldLabel: 'Nama Pengguna',
    	readOnly: true,
    	name: 'namaPengguna',
    	width: '100%'
   	},{
   		xtype: 'textfield', 
    	fieldLabel: 'Email', 
    	inputType: 'email',  
    	name: 'email',
    	width: '100%'
   	},{
   		xtype: 'textfield',
    	fieldLabel: 'Alamat', 
    	name: 'alamat',
    	width: '100%'
   	},{
   		xtype: 'textfield',
    	fieldLabel: 'Telepon', 
    	name: 'telepon',
    	width: '100%'
   	}]
}

var form_analisis = {
	border: false,
	padding: 8,
	layout: {
        type: 'vbox',
        padding: 5,
        align: 'stretch'
    },
    items: [{
        xtype: 'component',
        html: 'Pilih Metode Analisis',
        align: 'stretch',
        padding: '0 0 5 0'
    },{
        xtype: 'combobox',
        name: 'state',
        valueField: 'abbr',
        displayField: 'state',
        typeAhead: true,
        queryMode: 'local',
        margin: '0 0 10 0',
        emptyText: '',
        store: ['Intersect','Buffer','Overlay','Skoring']
    },{
   		xtype: 'button',
   		width: '100%',
        text: 'Eksekusi',
        padding: '8 0 8 0'
   	}]
}

var formProfile = new Ext.FormPanel({
	bodyStyle: 'padding: 15px',
	items: [{
		border: false,
	    layout: 'column',
	    items: [{ 
	        columnWidth: '.3', 
	        border: false,
	        items: [picBox]
	    }, { 
	        columnWidth: '.7', 
	        border: false,
	        items: [contentBox]
	    }]
	},{
		border: false,
   		html: '<br>'
   	},{
   		border: false,
   		html: '<div style="float: right; padding-right: 3px">Tgl Buat: 12-01-2018</div>'
   	},{
		border: false,
   		html: '<div style="height:2px"></div>'
   	},{
   		xtype: 'label',
    	text: 'Catatan:',
    	width: '100%'
   	},{
		xtype: 'textarea',
		width: '100%',
		height: 100
	}]
});

var formGallery = new Ext.FormPanel({
	bodyStyle: 'padding: 15px',
	border: false,
	items: [{
		xtype: 'textfield', 
    	fieldLabel: 'Instansi',
    	readOnly: true,
    	name: 'instansi',
    	width: '100%'
   	},{
   		xtype: 'textfield', 
    	fieldLabel: 'Nama Berkas',
    	name: 'namaBerkas',
    	width: '100%'
   	},{
   		xtype:'combobox',
    	fieldLabel: 'Jenis Berkas',
    	name: 'jenisBerkas',
    	displayField:'Name',
        valueField:'Id',
        queryMode:'local',
        store:['Citra','Vektor','Pdf'],
		autoSelect:true,
		forceSelection:true,
    	width: '100%'
   	},{
   		xtype: 'fileuploadfield',
        name: 'file',
        fieldLabel: 'Unggah Berkas',
        allowBlank: false,
        buttonText: '...',
        width: '100%',
        reset: function () {
            var me = this,
                clear = me.clearOnSubmit;
            if (me.rendered) {
                me.button.reset(clear);
                me.fileInputEl = me.button.fileInputEl;
                me.fileInputEl.set({
                    accept: 'image/*'
                });
                if (clear) {
                    me.inputEl.dom.value = '';
                }
                me.callParent();
            }},
        listeners:{
            change: 'fileInputChange',
            afterrender:function(cmp){
                cmp.fileInputEl.set({
                    accept:'image/*'
                });
            }
        },
        regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
        regexText: 'Only PNG and JPEG image formats are accepted'
   	}]
});

var formBeritaPeta = new Ext.FormPanel({
	bodyStyle: 'padding: 15px',
	border: false,
	items: [{
		xtype: 'textfield', 
    	fieldLabel: 'Judul Peta Bencana',
    	name: 'judulPeta',
    	labelWidth: '30%',
    	width: '100%'
   	},{
   		xtype: 'textfield', 
    	fieldLabel: 'Lokasi',
    	name: 'lokasi',
    	labelWidth: '30%',
    	width: '100%'
   	},{
   		xtype: 'textfield', 
    	fieldLabel: 'Tahun',
    	name: 'tahun',
    	labelWidth: '30%',
    	width: '100%'
   	}]
});

var formBerita = new Ext.FormPanel({
	bodyStyle: 'padding: 10px',
	border: false,
	layout: {
        type: 'vbox',
        padding:'5'
    },
    items: [{
	    layout: {
	    	type: 'hbox',
	    	padding:'2'
		},
		border: false,
		defaults:{margin:'0 130 0 0'},
	    items:[{
	        xtype:'textfield',
	        fieldLabel: 'Judul Berita'
	    },{
	        xtype: 'combobox',
	        name: 'state',
	        valueField: 'abbr',
	        displayField: 'state',
	        typeAhead: true,
	        queryMode: 'local',
	        emptyText: '',
	        fieldLabel: 'Nama Peta'
	    }]
    },{
    	layout: {
	    	type: 'hbox',
	    	padding:'2'
		},
		border: false,
		defaults:{margin:'0 130 0 0'},
	    items:[{
	        xtype:'textfield',
	        fieldLabel: 'Lokasi'
	    },{
	        xtype: 'checkbox',
	        fieldLabel: 'Status',	        
            boxLabel: 'Publikasi',
            name: 'status',
            checked: true,
            inputValue: '1'
	    }]
    },{
    	layout: {
	    	type: 'hbox',
	    	padding:'2'
		},
		border: false,
		defaults:{margin:'0 130 0 0'},
	    items:[{
	        xtype:'datefield',
	        fieldLabel: 'Tgl Berita'
	    }]
    },{
    	layout: {
	    	type: 'hbox',
	    	padding:'2'
		},
		border: false,
		defaults:{margin:'0 130 0 0'},
	    items:[{
	    	xtype: 'fileuploadfield',
	        name: 'file',
	        fieldLabel: 'Unggah Berkas',
	        allowBlank: false,
	        buttonText: '...',
	        fieldWidth: '15%',
	        reset: function () {
	            var me = this,
	                clear = me.clearOnSubmit;
	            if (me.rendered) {
	                me.button.reset(clear);
	                me.fileInputEl = me.button.fileInputEl;
	                me.fileInputEl.set({
	                    accept: 'image/*'
	                });
	                if (clear) {
	                    me.inputEl.dom.value = '';
	                }
	                me.callParent();
	            }},
	        listeners:{
	            change: 'fileInputChange',
	            afterrender:function(cmp){
	                cmp.fileInputEl.set({
	                    accept:'image/*'
	                });
	            }
	        },
	        regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
	        regexText: 'Only PNG and JPEG image formats are accepted'
	    }]
    },{
    	xtype: 'label',
    	text: 'Isi Berita:',
    	width: '100%',
    	padding: '10 0 0 2'
    },{
    	xtype: 'htmleditor',
    	width: '100%',
    	padding: '10 0 0 2',
    	height: 250
    }]
});

var formKataSandi = new Ext.FormPanel({
	bodyStyle: 'padding: 15px',
	border: false,
    layout: 'form',
    items: [{
		xtype: 'textfield', 
    	fieldLabel: 'Nama Pengguna',
    	readOnly: true,
    	name: 'namaPengguna',
    	width: '100%'
   	},{
   		xtype: 'textfield',
   		inputType: 'password',
   		readOnly: true,
    	fieldLabel: 'Kata Sandi Lama', 
    	name: 'kataSandiLama',
    	width: '100%'
   	},{
		border: false,
   		html: '<div style="height:2px"></div>'
   	},{
   		xtype: 'textfield', 
   		inputType: 'password',
    	fieldLabel: 'Kata Sandi Baru', 
    	name: 'kataSandiBaru',
    	width: '100%'
   	},{
   		xtype: 'textfield',
   		inputType: 'password',
    	fieldLabel: 'Ulangi Kata Sandi', 
    	name: 'ulangiKataSandiBaru',
    	width: '100%'
   	}]
});

var mappanel = Ext.create('Ext.panel.Panel', {
	layout: 'fit',
	html: "<div id='map'></div>", // The map will be drawn inside
	listeners: {
		afterrender: function () {
			var indonesia = [13100000, -235000];
			source = new ol.source.TileArcGISRest();
			view = new ol.View({
				center: indonesia,
				zoom: 5
			});

			layersRBI = new ol.layer.Group({
				layers: [
					new ol.layer.Tile({
						source: source
					})
				]
			});
			
			layersOSM = new ol.layer.Group({
				layers: [
					new ol.layer.Tile({
						source: new ol.source.OSM()
					})
				]
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
				loadTilesWhileAnimating: true,
    			loadTilesWhileInteracting: true,
				view: view
			});

			map.setLayerGroup(layersOSM);
		},
		// The resize handle is necessary to set the map!
		resize: function () {
			var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight-33];
			//console.log(size);
			map.setSize(size);
		}
	}
});
var map = null;
var source = null;
var layersOSM = null;
var layersRBI = null;
var layers = null;
var view = null;
var button = null;
var win = null;
var space = null;
var sb = null;
var storeData_ = null;
var treeService = null;
var resetSize = false;
var changeLayer = null;
var judul_peta = null;

Ext.Loader.setPath('Ext.ux', url + '/assets/analisis-spasial/js/ux/statusbar');
Ext.require(['*']);

// Ext.Loader.setPath('RidhoAnalisis', url + '/assets/analisis-spasial/js/analisis_spasial_content.js');
// Ext.require(['RidhoAnalisis']);

function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) return true;
    }
    return false;
}

//functions
function onChangeProfileClick() {
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
            modal: true,
            items: formProfile,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Perbarui',
                handler: function () {
                    // The getForm() method returns the Ext.form.Basic instance:
                    var form = formProfile.getForm();
                    if (form.isValid()) {
                        // Submit the Ajax request and handle the response
                        form.submit({
                            success: function (form, action) {
                                Ext.Msg.alert('Success', action.result.message);
                            },
                            failure: function (form, action) {
                                console.log(action);
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }

                }
            }, {
                text: 'Tutup',
                handler: function () {
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

function onChangePasswordClick() {
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
            modal: true,
            items: formKataSandi,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Perbarui',
                handler: function () {

                }
            }, {
                text: 'Tutup',
                handler: function () {
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

function onUserStatusClick() {
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
            modal: true,
            items: gridStatusPengguna,
            layout: 'fit',
            tbar: [{
                xtype: 'button',
                iconCls: 'icon-add',
                handler: onUserStatusClick
            }, {
                xtype: 'button',
                iconCls: 'icon-edit',
                handler: onItemCheckLayer
            }, {
                xtype: 'button',
                iconCls: 'icon-delete',
                action: onItemCheckLayer
            }, {
                xtype: 'button',
                iconCls: 'icon-refresh',
                action: onItemCheckLayer
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
            buttonAlign: 'center',
            buttons: [{
                text: 'Tutup',
                handler: function () {
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

function onItemCheck(item, checked) {
    //Ext.Msg.alert('Peta Dasar',item.text);
    if (item.text === "Open Street Map (OSM)") {
        map.setLayerGroup(layersOSM);
    } else {
        map.setLayerGroup(layersRBI);
        source.setUrl('https://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer');
    }
}

function onBagikanClick() {
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
            modal: true,
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
                }, {
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
            }, {
                region: 'center',
                items: gridBagikan
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'Bagikan',
                handler: function () {
                    winx.hide();
                    winx = null;
                }
            }, {
                text: 'Batal',
                handler: function () {
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

function onAddLayerClick() {
    var winx = null;
    if (!winx) {
        button = Ext.get('show-btn-service-layer');
        winx = new Ext.Window({
            title: 'Data Service',
            header: {
                titlePosition: 0,
                titleAlign: 'left'
            },
            closeAction: 'hide',
            animateTarget: button,
            items: formUploadService,
            closable: false,
            width: 400,
            minWidth: 400,
            height: 200,
            modal: true,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Simpan',
                handler: function () {
                    winx.hide();
                    winx = null;
                }
            }, {
                text: 'Batal',
                handler: function () {
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

function onLayerClick() {
    // var winx = null;
    if (!win) {
        button = Ext.get('show-btn-layer');
        win = new Ext.Window({
            title: 'Ketersediaan Service',
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
            modal: true,
            items: gridService,
            layout: 'fit',
            tbar: [{
                xtype: 'button',
                iconCls: 'icon-upload',
                id: 'show-btn-service-layer',
                handler: onAddLayerClick
            }, {
                xtype: 'button',
                iconCls: 'icon-delete',
                handler: onItemCheckLayer
            }, {
                xtype: 'button',
                iconCls: 'icon-refresh',
                handler: onItemCheckLayer
            }, '->', {
                xtype: 'combobox',
                name: 'service',
                valueField: 'abbr',
                displayField: 'service',
                typeAhead: true,
                queryMode: 'local',
                margin: '0 5 0 0',
                emptyText: '',
                store: ['Nama Layer','Nama Service', 'Instansi', 'Tahun']
            }, {
                xtype: 'textfield',
                readOnly: false,
                name: 'namaPengguna',
                width: '25%'
            }, {
                xtype: 'button',
                iconCls: 'icon-search',
                action: onItemCheckLayer
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'Pilih',
                handler: function () {
                    if (gridService.getSelectionModel().hasSelection()) {
                        var row = gridService.getSelectionModel().getSelection()[0];
                        console.log(row)

                        var treeNode = storeService.getRootNode();
                        // treeNode.expandChildren(true); // Optional: To see what happens
                        treeNode.appendChild({
                            // id: row.raw.id,
                            text: row.raw.layer,
                            leaf: true,
                            checked: false
                        });
                        // treeNode.getChildAt(2).getChildAt(0).appendChild({
                        //     id: 'gc13',
                        //     text: 'Grand Child 3',
                        //     leaf: true
                        // });

                    }
                    win.hide();
                    win = null;
                }
            }, {
                text: 'Batal',
                handler: function () {

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

function onSetParameterClick() {
    var winx = null;
    if (!win) {
        button = Ext.get('show-btn-profile');
        space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        win = new Ext.Window({
            title: 'Set Parameter',
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
            modal: true,
            items: formSetParameter,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Eksekusi',
                handler: function () {
                    var treeNode = storeService.getRootNode();
                        // treeNode.expandChildren(true); // Optional: To see what happens
                    treeNode.appendChild({
                        // id: row.raw.id,
                        text: 'bahaya_banjir',
                        leaf: true,
                        checked: false
                    });

                    win.hide();
                    win = null;
                        // treeNode.getChildAt(2).getChildAt(0).appendChild({
                        //     id: 'gc13',
                        //     text: 'Grand Child 3',
                        //     leaf: true
                        // });
                    //alert('menjalankan script analisis');
                    // map.getLayers().forEach(function (layer) {
                    //     if (layer.get('label') === rec.data.text) {
                    //         layer.setVisible(checked);
                    //     }
                    // });
                }
            },{
                text: 'Batal',
                handler: function () {
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

function onAnalisisClick() {
    //Ext.Msg.alert('Menu Click', 'You clicked the "{0}" menu item.');
    Ext.getCmp('south_panel').toggleCollapse();
}

function onBeritaClick() {
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
            modal: true,
            items: gridBerita,
            layout: 'fit',
            tbar: [{
                xtype: 'button',
                iconCls: 'icon-add',
                handler: onAddBeritaClick
            }, {
                xtype: 'button',
                iconCls: 'icon-edit',
                handler: onItemCheckLayer
            }, {
                xtype: 'button',
                iconCls: 'icon-delete',
                handler: onItemCheckLayer
            }, {
                xtype: 'button',
                iconCls: 'icon-refresh',
                handler: onItemCheckLayer
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

function onAddBeritaClick() {
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
            modal: true,
            items: formBerita,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Simpan',
                handler: function () {
                    /* script */
                }
            }, {
                text: 'Tutup',
                handler: function () {
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

function onAddGalleryClick() {
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
            modal: true,
            items: formGallery,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Simpan',
                handler: function () {
                    /* script */
                }
            }, {
                text: 'Tutup',
                handler: function () {
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

function onGalleryClick() {
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
            modal: true,
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
                            iconCls: 'icon-add',
                            handler: onAddGalleryClick
                        }, {
                            xtype: 'button',
                            iconCls: 'icon-edit',
                            handler: onItemCheckLayer
                        }, {
                            xtype: 'button',
                            iconCls: 'icon-delete',
                            action: onItemCheckLayer
                        }, {
                            xtype: 'button',
                            iconCls: 'icon-refresh',
                            action: onItemCheckLayer
                        }, '->', {
                            xtype: 'textfield',
                            readOnly: false,
                            name: 'cariBerkas',
                            width: '40%',
                            padding: 0
                        }, {
                            xtype: 'button',
                            iconCls: 'icon-search',
                            action: onItemCheckLayer
                        }]
                    }, {
                        title: 'Informasi Berkas',
                        region: 'south',
                        minHeight: 150,
                        height: 150,
                        collapsible: true,
                        html: '<div style="padding: 10px">Nama Berkas: Vektor 1<br>Ukuran Berkas: 12MB<br>Sumber: Instansi 1<br>Tgl Unggah: 12/04/2017<br>Jenis Berkas: Vektor</div>'
                        //splitterResize: true,
                        //collapseMode: 'mini'
                    }]
                }, {
                    region: 'west',
                    title: 'Direktori Berkas',
                    collapsible: true,
                    split: true,
                    width: 200,
                    minWidth: 200,
                    items: treeGallery
                }]
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'Unduh',
                handler: function () {

                }
            }, {
                text: 'Tutup',
                handler: function () {
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

function onItemCheckLayer(item) {
    Ext.Msg.alert('Menu Click', 'You clicked the "{0}" menu item.', item.text);
}

function onItemClick(item) {
    Ext.Msg.alert('Menu Click', 'You clicked the "{0}" menu item.', item.text);
}

function updateProfile(user) {
    console.log(user);
    Ext.Ajax.request({
        url: 'http://localhost/rapidmapapi/api.php/user/' + user.id,
        method: 'PUT',
        params: {
            nama_depan: user.nama_depan,
            nama_belakang: user.nama_belakang,
            username: user.username,
            passsword: user.passsword,
            email: user.email
        },
        success: function (response) {
            var text = response.responseText;
            console.log(text);
            Ext.Msg.alert("Profile berhasil diiupdate", text);
            // process server response here
        }
    });
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
            modal: true,
            items: formBuatPeta,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Simpan',
                handler: function () {
                    /* script */
                    judul_peta = Ext.ComponentQuery.query('textfield[name="judulPeta"]')[0].getValue();
                    var treeNode = storeService.getRootNode();
                    // treeNode.expandChildren(true); // Optional: To see what happens
                    treeNode.appendChild({
                        text: judul_peta,
                        leaf: false
                    });

                    win.hide();
                    win = null;
                }
            }, {
                text: 'Batal',
                handler: function () {
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

var baseMapSelection = {
    xtype: 'button',
    text: 'Peta Dasar',
    iconCls: 'icon-basemap',
    menu: {
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
};

var profilePengguna = {
    xtype: 'button',
    id: 'show-btn-profile',
    text: 'Profil Pengguna',
    iconCls: 'icon-profile',
    menu: {
        items: [{
            text: 'Ubah Profil',
            iconCls: 'icon-user-edit',
            handler: onChangeProfileClick
        }, {
            text: 'Ubah Kata Sandi',
            iconCls: 'icon-edit-password',
            handler: onChangePasswordClick
        }, {
            text: 'Status Pengguna',
            iconCls: 'icon-status',
            handler: onUserStatusClick
        }]
    }
};

var logoutButton = {
    xtype: 'button',
    text: 'Keluar',
    iconCls: 'icon-logout',
    handler: function () {
        var txt;
        var r = confirm("Yakin akan keluar?");
        if (r == true) {
            window.location.href = 'analisis/logout';
        }
    }
};

// status pengguna
function onRefreshStatusPenggunaClick(){
    getSearchStatusPengguna();
}

function onSearchStatusPenggunaClick(){
    getSearchStatusPengguna();
}

function getSearchStatusPengguna(){
    var val = Ext.ComponentQuery.query('textfield[name="txSearchStatusPengguna"]')[0].getValue();
    // Ext.getCmp('gridStatusPengguna').store.clearFilter();
    // Ext.getCmp('gridStatusPengguna').store.filter([{
    //     property: 'Name',
    //     anyMatch: true,
    //     value   : val
    // }]);
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

var formServicePublikasi = new Ext.FormPanel({
    bodyStyle: 'padding: 15px',
    border: false,
    items: [{
        xtype: 'combobox',
        name: 'cb_service_publikasi',
        fieldLabel: 'Nama Service',
        labelWidth: '50%',
        valueField: 'abbr',
        displayField: 'Nama Service',
        typeAhead: true,
        queryMode: 'local',
        margin: '0 5 0 0',
        emptyText: '',
        store: ['Administrasi Lombok','Sungai Lombok', 'Bangunan Lombok']
    }, {
        xtype: 'combobox',
        fieldLabel: 'Status',
        labelWidth: '50%',
        name: 'cb_status_publikasi',
        valueField: 'abbr',
        displayField: 'Status',
        typeAhead: true,
        queryMode: 'local',
        margin: '0 5 0 0',
        emptyText: '',
        store: ['Aktif','Non Aktif']
    }]
});

function onAddServicePublikasiClick(){
    var winx = null;
    if (!winx) {
        button = Ext.get('show-btn-service-publikasi');
        winx = new Ext.Window({
            title: 'Data Service Publikasi',
            header: {
                titlePosition: 0,
                titleAlign: 'left'
            },
            closeAction: 'hide',
            animateTarget: button,
            items: formServicePublikasi,
            closable: false,
            width: 400,
            minWidth: 400,
            height: 200,
            modal: true,
            layout: 'fit',
            buttonAlign: 'center',
            buttons: [{
                text: 'Simpan',
                handler: function () {
                    winx.hide();
                    winx = null;
                }
            }, {
                text: 'Batal',
                handler: function () {
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

function onServiceClick(){
    if (!win) {
        button = Ext.get('show-btn-publikasi');
        win = new Ext.Window({
            title: 'Publikasi Service',
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
            modal: true,
            items: gridServicePublikasi,
            layout: 'fit',
            tbar: [{
                xtype: 'button',
                iconCls: 'icon-add',
                id: 'show-btn-service-publikasi',
                handler: onAddServicePublikasiClick
            }, {
                xtype: 'button',
                iconCls: 'icon-delete',
                handler: onItemCheckLayer
            }, {
                xtype: 'button',
                iconCls: 'icon-refresh',
                handler: onItemCheckLayer
            }, '->', {
                xtype: 'combobox',
                name: 'service',
                valueField: 'abbr',
                displayField: 'service',
                typeAhead: true,
                queryMode: 'local',
                margin: '0 5 0 0',
                emptyText: '',
                store: ['Nama Layer','Nama Service', 'Instansi', 'Tahun']
            }, {
                xtype: 'textfield',
                readOnly: false,
                name: 'namaPengguna',
                width: '25%'
            }, {
                xtype: 'button',
                iconCls: 'icon-search',
                action: onItemCheckLayer
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'Pilih',
                handler: function () {
                    if (gridService.getSelectionModel().hasSelection()) {
                        var row = gridService.getSelectionModel().getSelection()[0];
                        console.log(row)

                        var treeNode = storeService.getRootNode();
                        // treeNode.expandChildren(true); // Optional: To see what happens
                        treeNode.appendChild({
                            // id: row.raw.id,
                            text: row.raw.layer,
                            leaf: true,
                            checked: false
                        });
                        // treeNode.getChildAt(2).getChildAt(0).appendChild({
                        //     id: 'gc13',
                        //     text: 'Grand Child 3',
                        //     leaf: true
                        // });

                    }
                    win.hide();
                    win = null;
                }
            }, {
                text: 'Batal',
                handler: function () {

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

Ext.onReady(function () {

    var loadFn = function (btn, statusBar) {
        btn = Ext.getCmp(btn);
        statusBar = Ext.getCmp(statusBar);

        btn.disable();
        statusBar.showBusy();

        Ext.defer(function () {
            statusBar.clearStatus({useDefaults: true});
            btn.enable();
        }, 2000);
    };
    // store_peta.load();


    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    Ext.create('Ext.Viewport', {
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
                    iconCls: 'icon-home',
                    text: 'Beranda'
                }, {
                    xtype: 'button',
                    id: 'show-btn-gallery',
                    iconCls: 'icon-gallery',
                    text: 'Galeri',
                    handler: onGalleryClick
                }, {
                    xtype: 'button',
                    id: 'show-btn-news',
                    iconCls: 'icon-news',
                    text: 'Berita',
                    handler: onBeritaClick
                }, {
                    xtype: 'button',
                    id: 'show-btn-share',
                    iconCls: 'icon-share',
                    text: 'Bagikan',
                    handler: onBagikanClick
                }, {
                    xtype: 'button',
                    id: 'show-btn-analysis',
                    iconCls: 'icon-analysis',
                    text: 'Analisis Spasial',
                    handler: onAnalisisClick
                }, {
                    xtype: 'button',
                    id: 'show-btn-publikasi',
                    iconCls: 'icon-public',
                    text: 'Service Publikasi',
                    handler: onServiceClick
                }, '->', {
                    xtype: "label",
                    html: "Selamat Datang, Fajar",
                    padding: '0 0 2.48 0'
                }, {
                    xtype: "label",
                    html: "|",
                    padding: '0 5 0 5'
                }, baseMapSelection,
                    profilePengguna,
                    logoutButton]
            }]
        }, {
            region: 'west',
            collapsible: true,
            layout: 'absolute',
            title: 'Lapisan (Layer)',
            split: true,
            width: 230,
            minWidth: 100,
            minHeight: 10,
            //html: '',
            items: [treeServiceContainer],
            dockedItems: [{
                xtype: 'button',
                id: 'show-btn-buat-peta',
                text: 'Buat Peta',
                padding: 8,
                dock: 'top',
                handler: onBuatPetaClick
            }],
            tbar: [{
                text: 'Add Layer',
                id: 'show-btn-layer',
                iconCls: 'icon-add',
                handler: onLayerClick
            }, {
                text: 'Delete layer',
                iconCls: 'icon-delete',
                action: function () {
                    var nodeToRemove = treeServiceContainer.getSelectionModel().getSelectedNode();
                    if (!nodeToRemove.rendered) {
                        var children = node.parentNode.attributes.children;
                        Ext.each(children, function (child, index) {
                            if (child.id == nodeToRemove.id) {
                                chilren.splice(index, 1);
                                return false;
                            }
                        });
                    } else {
                        nodeToRemove.remove(true);
                    }
                }
            }]
        }, {
            region: 'center',
            title: 'Map Viewer',
            items: [mappanel]
        }, {
            region: 'south',
            id: 'south_panel',
            collapsible: true,
            collapsed: true,
            hideCollapseTool: true,
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
            }, {
                title: 'Informasi Analisis',
                region: 'center',
                html: '<div style="padding:10px" id="info-analisis"></div>',
                collapsible: false
            }]
        }, {
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
                }, {
                    text: "Citra 2", leaf: true
                }, {
                    text: "Citra 3", leaf: true
                }]
            }, {
                text: "Vektor", expanded: true, leaf: false, children: [{
                    text: "Vektor 1", leaf: true
                }, {
                    text: "Vektor 2", leaf: true
                }, {
                    text: "Vektor 3", leaf: true
                }]
            }, {
                text: "Pdf", expanded: true, leaf: false, children: [{
                    text: "Pdf 1", leaf: true
                }, {
                    text: "Pdf 2", leaf: true
                }, {
                    text: "Pdf 3", leaf: true
                }]
            }, {
                text: "Gambar", expanded: true, leaf: false, children: [{
                    text: "Gambar 1", leaf: true
                }, {
                    text: "Gambar 2", leaf: true
                }, {
                    text: "Gambar 3", leaf: true
                }]
            }]
        }]
    }
});

var inaGeoPortalUrlService = 'https://portal.ina-sdi.or.id/arcgis/rest/services?f=pjson';
var inaGeoPortalUrlRootService = 'https://portal.ina-sdi.or.id/arcgis/rest/services';

PetaModel = Ext.define('PetaModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'raw'}]
});

PetaModel = Ext.define('PetaModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'raw'}]
});

ServiceModel = Ext.define('ServiceModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'name'}, {name: 'type'}]
});

var store_peta = Ext.create('Ext.data.Store', {
    model: 'PetaModel',
    proxy: {
        type: 'jsonp',
        url: inaGeoPortalUrlService,
        reader: {
            type: 'json',
            root: 'folders'
        }
    },
    listeners: {
        load: function (store, records, success, operation) {

            // console.log(store);
            console.log("size " + store.data.items.length);
            storeData_ = Ext.create('Ext.data.TreeStore', {
                root: {
                    children: [{
                        text: "Service tersedia",
                        expanded: true,
                        children: storeService
                        // children: extractData(store)
                    }]
                }
            });

            console.log(storeData_);

            treeService = new Ext.create('Ext.tree.Panel', {
                border: false,
                store: storeData_,
                rootVisible: false,
                renderTo: 'panel-1139-innerCt',
                listeners: {
                    itemclick: function (view, rec, item, index, eventObj) {
                        // console.log(item);
                        console.log(index);
                        if (index == 1 || index == 5) {

                            // var source2 = new ol.source.TileArcGISRest();
                            // var layersList = new ol.layer.Group({
                            //     layers: [
                            //         new ol.layer.Tile({
                            //             source: new ol.source.OSM()
                            //         }),
                            //         new ol.layer.Tile({
                            //             source: source2,
                            //         })
                            //     ]
                            // });
                            //
                            // map.setLayerGroup(layersList);
                            // source2.setUrl(rec.data.text);
                        }

                    },
                    // click: {
                    //     element: 'el', //bind to the underlying el property on the panel
                    //     fn: function(data){
                    //         console.log('click el');
                    //         console.log(data);
                    //     }
                    //
                    // },
                    dblclick: {
                        element: 'body', //bind to the underlying body property on the panel
                        fn: function (view, rec, item, index, eventObj) {
                            console.log('dblclick body ');
                            console.log(rec.data);

                            var folderFormat = [];
                            var store_peta = Ext.create('Ext.data.Store', {
                                model: 'ServiceModel',
                                proxy: {
                                    type: 'jsonp',
                                    url: inaGeoPortalUrlRootService + '/' + item + "?f=pjson",
                                    reader: {
                                        type: 'json',
                                        root: 'services'
                                    }
                                },
                                listeners: {
                                    load: function (store, records, success, operation) {
                                        // console.log('CHILD');
                                        // console.log(store);
                                        var n = 0;
                                        for (i in store.data.items) {
                                            var item_ = {
                                                text: inaGeoPortalUrlRootService + '/' + store.data.items[n].data.name + '/' + store.data.items[n].data.type,
                                                leaf: true
                                            };
                                            folderFormat.push(item_);
                                            console.log(n);
                                            // console.log(store.data.items[n].raw);

                                            n++;
                                        }
                                    }
                                }
                            });

                            store_peta.load();

                            view.childrens = folderFormat;
                            console.log(folderFormat)
                        }
                    }
                }
            });

        }
    }
});


function extractData(store) {
    var folderFormat = [];
    var n = 0;

    for (i in store.data.items) {
        folderFormat.push(getChild(store.data.items[n].raw));
        // console.log(n);
        // console.log(store.data.items[n].raw);
        n++;
    }
    // console.log(folderFormat);
    return folderFormat;
}

function getChild(path) {
    var folderFormat = [];
    var store_peta = Ext.create('Ext.data.Store', {
        model: 'ServiceModel',
        proxy: {
            type: 'jsonp',
            url: inaGeoPortalUrlRootService + '/' + path + "?f=pjson",
            reader: {
                type: 'json',
                root: 'services'
            }
        },
        listeners: {
            load: function (store, records, success, operation) {
                // console.log('CHILD');
                // console.log(store);
                var n = 0;
                for (i in store.data.items) {
                    var item_ = {
                        // text: inaGeoPortalUrlRootService + '/'+ store.data.items[n].data.name + '/' + store.data.items[n].data.type,
                        leaf: true,
                        text: 'Halo'
                    };
                    folderFormat.push(item_);
                    // console.log(n);
                    // console.log(store.data.items[n].raw);

                    n++;
                }
            }
        }
    });

    store_peta.load();
    console.log(folderFormat);
    var item = {
        expanded: false,
        text: path,
        leaf: false,
        childrens: folderFormat
    };
    return item;
}

var storeService = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: []
    }
});


function getChild_tree(items, items_I) {
    var subChildren = [];
    for (k in items_I.raw.subLayerIds) {
        for (j in items) {
            var childItem = items[j];
            var jumlahSublayerId = 0;
            if (childItem.raw.subLayerIds) {
                jumlahSublayerId = childItem.raw.subLayerIds.length;
            }
            if (items_I.raw.subLayerIds[k] == childItem.raw.id) {
                if (jumlahSublayerId > 0) {
                    var subChildren_ = getChild_tree(items, childItem);

                    subChildren.push({
                        text: childItem.raw.id + ":" + childItem.raw.name,
                        leaf: false,
                        children: subChildren_
                    });
                } else {
                    subChildren.push({
                        text: childItem.raw.id + ":" + childItem.raw.name,
                        leaf: true
                    });
                }

            }
        }
    }

    return subChildren;
}

function getBaseUrlFromParentNode(parentNode) {
    var url = "";
    if (!(parentNode.data.text.indexOf("MapServer") > -1)) {
        getBaseUrlFromParentNode(parentNode.parentNode);
    } else {
        url = parentNode.data.text;
    }

    return url;
}

var treeServiceContainer = new Ext.create('Ext.tree.Panel', {
    border: false,
    id: 'tree_service_container',
    store: storeService,
    rootVisible: false,
    autoHeight: true,
    autoScroll: true,
    renderTo: Ext.getBody(),
    listeners: {
        checkchange: function(rec, checked, node, eOpts ){
            map.getLayers().forEach(function (layer) {
                if(layer.get('label') === rec.data.text) {
                    layer.setVisible(checked);
                }else if(rec.data.text === 'bahaya_banjir'){
                    if(layer.get('label') === 'adm_selong'){
                        layer.setVisible(checked);
                    }else if (layer.get('label') === 'clip_sungai_adm'){
                        layer.setVisible(checked);
                    }else if (layer.get('label') === 'buffer_sungai'){
                        layer.setVisible(checked);
                    }else if (layer.get('label') === 'intersect_bangunan_sungai'){
                        layer.setVisible(checked);
                    }

                    if(checked == true){
                        document.getElementById('info-analisis').innerHTML = "Kecamatan : <br>Selong<br><br>Luas Bahaya : <br>81,25 km<sup>2</sup>";
                    }else{
                        document.getElementById('info-analisis').innerHTML = "";
                    }
                    
                }
            });
        }
    }
});


var treeGallery = new Ext.create('Ext.tree.Panel', {
    border: false,
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody()
});


ImageModel = Ext.define('ImageModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name'},
        {name: 'url'},
        {name: 'size', type: 'float'},
        {name: 'lastmod', type: 'date', dateFormat: 'timestamp'}
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
        prepareData: function (data) {
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
        }, {
            text: 'Choose a Color'
        }
    ]
});

Ext.create('Ext.data.Store', {
    storeId: 'simpsonsStore',
    fields: ['name', 'email', 'phone'],
    data: {
        'items': [
            {'name': 'Lisa', "email": "lisa@simpsons.com", "phone": "555-111-1224"},
            {'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234"},
            {'name': 'Homer', "email": "homer@simpsons.com", "phone": "555-222-1244"},
            {'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254"}
        ]
    },
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
    remoteSort:true,
    remoteFilter:true,
    autoDestroy: true,
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
        {text: 'Tgl Dibagikan', width: 150, dataIndex: 'name'},
        {text: 'Judul Berita', width: 150, dataIndex: 'email'},
        {text: 'Facebook', width: 150, dataIndex: 'phone'},
        {text: 'Twitter', width: 150, dataIndex: 'phone'},
        {text: 'Instagram', width: 150, dataIndex: 'phone', flex: 1}
    ],
    layout: 'fit',
    border: false,
    renderTo: Ext.getBody()
});


ServiceModel2 = Ext.define('ServiceModel2', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nama_layer'},
        {name: 'nama_service'},
        {name: 'tahun'},
        {name: 'instansi'}
    ]
});

var store_service2 = Ext.create('Ext.data.Store', {
    model: 'ServiceModel2',
    storeId: 'StoreService',
    data: [
        {
            id: 1,
            nama_layer: "Administrasi_AR",
            nama_service: "Administrasi Lombok",
            tahun: 2018,
            instansi: "Contoh",
            url: "http://103.52.147.211:8080/geoserver/rapimap/wms",
            layer: "administrasi_ar"
        },{
            id: 2,
            nama_layer: "Sungai_LN",
            nama_service: "Sungai Lombok",
            tahun: 2018,
            instansi: "Contoh",
            url: "http://103.52.147.211:8080/geoserver/rapimap/wms",
            layer: "sungai_ln"
        },{
            id: 3,
            nama_layer: "Bangunan_AR",
            nama_service: "Bangunan Lombok",
            tahun: 2018,
            instansi: "Contoh",
            url: "http://103.52.147.211:8080/geoserver/rapimap/wms",
            layer: "bangunan_ar"
        }
    ]
});

// store_service2.load();

var gridService = Ext.create('Ext.grid.Panel', {
    store: store_service2,
    columns: [
        {text: 'Nama Layer', width: 150, dataIndex: 'nama_layer'},
        {text: 'Nama Service', width: 150, dataIndex: 'nama_service'},
        {text: 'Tahun', width: 150, dataIndex: 'tahun'},
        {text: 'Instansi', width: 150, dataIndex: 'instansi', flex: 1}
    ],
    height: 200,
    width: 400,
    renderTo: Ext.getBody()
});

ServicePublikasiModel = Ext.define('ServicePublikasiModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nama_service'},
        {name: 'status_publikasi'}
    ]
});

var store_service_publikasi = Ext.create('Ext.data.Store', {
    model: 'ServicePublikasiModel',
    storeId: 'StoreServicePublikasi',
    data: [
        {
            id: 1,
            nama_service: "Administrasi Lombok",
            status_publikasi: "Non Aktif"
        },{
            id: 2,
            nama_service: "Sungai Lombok",
            status_publikasi: "Non Aktif"
        },{
            id: 3,
            nama_service: "Bangunan Lombok",
            status_publikasi: "Non Aktif"
        }
    ]
});

var gridServicePublikasi = Ext.create('Ext.grid.Panel', {
    store: store_service_publikasi,
    columns: [
        {text: 'Nama Service', width: 150, dataIndex: 'nama_service'},
        {text: 'Status', width: 150, dataIndex: 'status_publikasi'}
    ],
    height: 200,
    width: 400,
    forceFit: true,
    loadMask: true,
    renderTo: Ext.getBody()
});

var picBox = {
    border: false,
    items: [{
        xtype: 'box',
        html: '<img id="pic" src="' + Ext.BLANK_IMAGE_URL + '" class="img-contact" />'
    }, {
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
        readOnly: false,
        name: 'username',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Email',
        inputType: 'email',
        name: 'email',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Alamat',
        name: 'alamat',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Telepon',
        name: 'telepon',
        width: '100%'
    }]
}

//====== HALO
var formProfile = new Ext.form.Panel({
    bodyStyle: 'padding: 15px',
    url: 'http://localhost/rapidmapapi/api.php/user/3',
    method: 'PUT',
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
    }, {
        border: false,
        html: '<br>'
    }, {
        border: false,
        html: '<div style="float: right; padding-right: 3px">Tgl Buat: 12-01-2018</div>'
    }, {
        border: false,
        html: '<div style="height:2px"></div>'
    }, {
        xtype: 'label',
        text: 'Catatan:',
        width: '100%'
    }, {
        xtype: 'textarea',
        width: '100%',
        height: 100
    }]
});

var user = null;
// formProfile.getForm().load({
//     url: 'http://localhost/rapidmapapi/api.php/user/3',
//     method: 'GET',
//     failure: function (form, action) {
//         Ext.Msg.alert("Load failed", action.result);
//     },
//     success: function (form, action) {
//         user = action.result.data;
//         console.log(action);
//     }
//
// });

var formGallery = new Ext.FormPanel({
    bodyStyle: 'padding: 15px',
    border: false,
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Instansi',
        readOnly: true,
        name: 'instansi',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama Berkas',
        name: 'namaBerkas',
        width: '100%'
    }, {
        xtype: 'combobox',
        fieldLabel: 'Jenis Berkas',
        name: 'jenisBerkas',
        displayField: 'Name',
        valueField: 'Id',
        queryMode: 'local',
        store: ['Citra', 'Vektor', 'Pdf'],
        autoSelect: true,
        forceSelection: true,
        width: '100%'
    }, {
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
            }
        },
        listeners: {
            change: 'fileInputChange',
            afterrender: function (cmp) {
                cmp.fileInputEl.set({
                    accept: 'image/*'
                });
            }
        },
        regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
        regexText: 'Only PNG and JPEG image formats are accepted'
    }]
});

var formBuatPeta = new Ext.FormPanel({
    bodyStyle: 'padding: 15px',
    border: false,
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Judul Peta Bencana',
        id: 'judulPeta',
        name: 'judulPeta',
        labelWidth: '30%',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Lokasi',
        name: 'lokasi',
        labelWidth: '30%',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Tahun',
        name: 'tahun',
        labelWidth: '30%',
        width: '100%'
    }]
});

var formUploadService = new Ext.FormPanel({
    bodyStyle: 'padding: 15px',
    border: false,
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Nama Service',
        name: 'namaService',
        labelWidth: '30%',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Tahun',
        name: 'tahun',
        labelWidth: '30%',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Instansi',
        name: 'instansi',
        labelWidth: '30%',
        width: '100%'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Url Service',
        name: 'urlService',
        labelWidth: '30%',
        width: '100%'
    }]
});

var formBerita = new Ext.FormPanel({
    bodyStyle: 'padding: 10px',
    border: false,
    layout: {
        type: 'vbox',
        padding: '5'
    },
    items: [{
        layout: {
            type: 'hbox',
            padding: '2'
        },
        border: false,
        defaults: {margin: '0 130 0 0'},
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Judul Berita'
        }, {
            xtype: 'combobox',
            name: 'state',
            valueField: 'abbr',
            displayField: 'state',
            typeAhead: true,
            queryMode: 'local',
            emptyText: '',
            fieldLabel: 'Nama Peta'
        }]
    }, {
        layout: {
            type: 'hbox',
            padding: '2'
        },
        border: false,
        defaults: {margin: '0 130 0 0'},
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Lokasi'
        }, {
            xtype: 'checkbox',
            fieldLabel: 'Status',
            boxLabel: 'Publikasi',
            name: 'status',
            checked: true,
            inputValue: '1'
        }]
    }, {
        layout: {
            type: 'hbox',
            padding: '2'
        },
        border: false,
        defaults: {margin: '0 130 0 0'},
        items: [{
            xtype: 'datefield',
            fieldLabel: 'Tgl Berita'
        }]
    }, {
        layout: {
            type: 'hbox',
            padding: '2'
        },
        border: false,
        defaults: {margin: '0 130 0 0'},
        items: [{
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
                }
            },
            listeners: {
                change: 'fileInputChange',
                afterrender: function (cmp) {
                    cmp.fileInputEl.set({
                        accept: 'image/*'
                    });
                }
            },
            regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
            regexText: 'Only PNG and JPEG image formats are accepted'
        }]
    }, {
        xtype: 'label',
        text: 'Isi Berita:',
        width: '100%',
        padding: '10 0 0 2'
    }, {
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
    }, {
        xtype: 'textfield',
        inputType: 'password',
        readOnly: true,
        fieldLabel: 'Kata Sandi Lama',
        name: 'kataSandiLama',
        width: '100%'
    }, {
        border: false,
        html: '<div style="height:2px"></div>'
    }, {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: 'Kata Sandi Baru',
        name: 'kataSandiBaru',
        width: '100%'
    }, {
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
            // view = new ol.View({
            //     center: indonesia,
            //     zoom: 5
            // });

            // layersRBI = new ol.layer.Group({
            //     layers: [
            //         new ol.layer.Tile({
            //             source: source
            //         })
            //     ]
            // });

            // layersOSM = new ol.layer.Group({
            //     layers: [
            //         new ol.layer.Tile({
            //             source: new ol.source.OSM()
            //         })
            //     ]
            // });

            // map = new ol.Map({
            //     controls: ol.control.defaults({attribution: false}).extend([
            //         new ol.control.ScaleLine(),
            //         new ol.control.Zoom({
            //             zoomInTipLabel: 'Perbesar',
            //             zoomOutTipLabel: 'Perkecil'
            //         }),
            //         new ol.control.Rotate({
            //             label: '\u2B9D',
            //             tipLabel: 'Reset Rotasi Utara',
            //             autoHide: false
            //         })
            //     ]),
            //     target: 'map',
            //     loadTilesWhileAnimating: true,
            //     loadTilesWhileInteracting: true,
            //     view: view
            // });

            // map.setLayerGroup(layersOSM);

            var wms_source1 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:administrasi_ar'
                }
            });

            var wms_source2 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:sungai_ln'
                }
            });

            var wms_source3 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:bangunan_ar'
                }
            });

            var wms_source4 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:adm_selong'
                }
            });

            var wms_source5 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:clip_sungai_adm'
                }
            });

            var wms_source6 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:buffer_sungai'
                }
            });

            var wms_source7 = new ol.source.TileWMS({
                url: 'http://103.52.147.211:8080/geoserver/rapimap/wms',
                params: {
                      'LAYERS': 'rapimap:intersect_bangunan_sungai'
                }
            });

            var wms_layer1 = new ol.layer.Tile({
                label: 'administrasi_ar',
                opacity: 0.7,
                visible: false,
                source:  wms_source1
            });

            var wms_layer2 = new ol.layer.Tile({
                label: 'sungai_ln',
                opacity: 0.5,
                visible: false,
                source:  wms_source2
            });

            var wms_layer3 = new ol.layer.Tile({
                label: 'bangunan_ar',
                opacity: 0.5,
                visible: false,
                source:  wms_source3
            });

            var wms_layer4 = new ol.layer.Tile({
                label: 'adm_selong',
                opacity: 0.7,
                visible: false,
                source:  wms_source4
            });

            var wms_layer5 = new ol.layer.Tile({
                label: 'clip_sungai_adm',
                opacity: 0.5,
                visible: false,
                source:  wms_source5
            });

            var wms_layer6 = new ol.layer.Tile({
                label: 'buffer_sungai',
                opacity: 0.5,
                visible: false,
                source:  wms_source6
            });

            var wms_layer7 = new ol.layer.Tile({
                label: 'intersect_bangunan_sungai',
                opacity: 0.5,
                visible: false,
                source:  wms_source7
            });

            var base_map = new ol.layer.Tile({
               source: new ol.source.OSM()
            });

            layers = [
                base_map,wms_layer1,wms_layer2,wms_layer3,wms_layer4,wms_layer5,wms_layer6,wms_layer7
            ];

            var vw = new ol.View({
                center: indonesia,
                zoom:5
            });

            map = new ol.Map({
                target: 'map',
                layers: layers,
                view: vw
            });
        },
        // The resize handle is necessary to set the map!
        resize: function () {
            if(resetSize == false){
                var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight];
                //console.log(size);
                map.setSize(size);
                resetSize = true;
            }
            
        }
    }
});
// Ext.define('RidhoAnalisis', {});

function callHere(message){
    console.log((message));
}

var combo_analisis_value = '';
var combo_analisis = {
    xtype: 'combobox',
    id: 'action_combo_box',
    name: 'state',
    valueField: 'abbr',
    displayField: 'state',
    typeAhead: true,
    queryMode: 'local',
    margin: '0 0 10 0',
    emptyText: '',
    //store: ['Intersect', 'Buffer', 'Overlay', 'Scoring'],
    store: ['Basic', 'Scoring'],
    listeners: {
        'select': function () {
            combo_analisis_value = this.value;
            //console.log("saya dipilih " + combo_analisis_value);
        }
    }

}

var combo_jenis_bencana = {
    xtype: 'combobox',
    id: 'action_combo_jenis_bencana',
    name: 'state',
    valueField: 'abbr',
    displayField: 'state',
    typeAhead: true,
    fieldLabel: 'Jenis Bencana',
    queryMode: 'local',
    margin: '0 0 10 0',
    emptyText: '',
    store: ['Banjir','Gerakan Tanah','Gunung Api','Gempa','Tsunami','Kekeringan','Kebakaran','Kilometer'],
    listeners: {
        'select': function () {
            //combo_analisis_value = this.value;
            //console.log("saya dipilih " + combo_analisis_value);
        }
    }

}

var combo_kategori = {
    xtype: 'combobox',
    id: 'action_combo_kategori',
    name: 'state',
    valueField: 'abbr',
    displayField: 'state',
    typeAhead: true,
    fieldLabel: 'Kategori',
    queryMode: 'local',
    margin: '0 0 10 0',
    emptyText: '',
    store: ['Bahaya','Kerentanan','Kapasitas','Resiko'],
    listeners: {
        'select': function () {
            //combo_analisis_value = this.value;
            //console.log("saya dipilih " + combo_analisis_value);
        }
    }

}

var button_execute_analisis = {
    xtype: 'button',
    width: '100%',
    text: 'Set Parameter',
    padding: '8 0 8 0',
    handler: function () {
        var v = combo_analisis.value;
        // var record = combo_analisis.findRecord(combo_analisis.valueField || combo_analisis.displayField, v);
        // var index = combo_analisis.store.indexOf(record);
        //console.log("saya di klik " + combo_analisis_value);
        var displayField = Ext.ComponentQuery.query('textfield[name="judulAnalisis"]');
        displayField[0].setValue(judul_peta);
        onSetParameterClick();
        // console.log();
    }
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
    }, combo_analisis, button_execute_analisis]
}

var formSetParameter = new Ext.FormPanel({
    bodyStyle: 'padding: 15px',
    border: false,
    layout: 'form',
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Judul Analisis',
        readOnly: true,
        name: 'judulAnalisis',
        width: '100%'
    }, combo_jenis_bencana, combo_kategori]
});
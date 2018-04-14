

    var path = $(location).attr('hostname');
    var str = window.location.pathname;
    var curr = str.slice(0,6);
    var jskey = "js" + curr + sid;
    var jsskey = "jss" + curr + sid;
    var jspats = window.location.hostname + curr

    $('#jstree').jstree({
        'core' : {

            'data' : {
                'url' : '//' + path + '/tree/data?op=get_node',
                'data' : function (node) {
                    return { 'id' : node.id };
                },
                'dataType':'json',
            },
            'check_callback' : true,
            'themes' : {
                'responsive' : false
            }
        },
        'types' : {
            '#' : {
        //     "valid_children":["folder","file"],
                /* 'icon' : "iiicns"*/
            },
            'default' : {
                /* "icon" : " glyphicon-folder-close"*/
            },
            "folder" : {
                "valid_children":["folder","file"],
                "icon" : "glyphicon glyphicon-folder-close yellow"

            },
            "file" : {
                "valid_children":null,
                "icon" : "glyphicon glyphicon-file green"
            },
            "ext" : {

            }
        },

        'force_text' : true,
        "state" : { "key" : jskey },
        'plugins' : ['state','dnd','types']//,'contextmenu','wholerow'
    }).on('create_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=create_node', { 'id' : data.node.parent, 'position' : data.position, 'type' : data.node.type })
            .done(function (id) {
                data.instance.set_id(data.node, id);
                $("#jstree").jstree(true).edit(id);
            })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('rename_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=rename_node', { 'id' : data.node.id, 'text' : data.text })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('delete_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=delete_node', { 'id' : data.node.id })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('move_node.jstree', function (e, data) {
        $.get('//' + path + '/tree/data?op=move_node', { 'id' : data.node.id, 'parent' : data.parent, 'position' : data.position })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('open_node.jstree', function (e, data) {
        // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-open blue");
    }).on('close_node.jstree', function (e, data) {
        // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-close blue");
    }).on('changed.jstree', function (e, data) {
        if(typeof data.node != "undefined"){
            if(data.node.type == "file"){
                //location.href = data.instance.get_node(data.node, true).children('a').attr('href');

            }else{

            }

        }
    }).on("contextmenu", ".jstree-anchor", function (e) {
        e.preventDefault();
        $("#jstree").jstree(true).activate_node(this);
    }).on('click', '.jstree-anchor', function (e) {
        $(this).jstree(true).toggle_node(e.target);
    }).on('click', '.jstree-leaf .jstree-anchor', function (e) {
        window.location = "http://" + window.location.hostname + window.location.pathname.slice(0,6) + $(this).attr('id');
    });


    $('#jstreeSlave').jstree({
        'core' : {
            "themes": {
                "icons":false,
                "dots":false,
            },
            'data' : {
                'url' : '//' + path + '/treeslave/data?op=get_node',
                'data' : function (node) {
                    return { 'id' : node.id };
                },
                'dataType':'json',
            },
            'check_callback' : true,
            'themes' : {
                'responsive' : false
            }
        },
        'types' : {
            '#' : {
    //                "valid_children":["folder","file"],
                /* 'icon' : "iiicns"*/
            },
            'default' : {
                /* "icon" : " glyphicon-folder-close"*/
            },
            "folder" : {
                "valid_children":["folder","file"],
                "icon" : "glyphicon glyphicon-folder-close yellow"

            },
            "file" : {
                "valid_children":null,
                "icon" : "glyphicon glyphicon-leaf green"
            },
            "ext" : {

            }
        },

        'force_text' : true,
        "state" : { "key" : jsskey },
        'plugins' : ['state','dnd','types']//,'contextmenu','wholerow'
    }).on('create_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=create_node', { 'id' : data.node.parent, 'position' : data.position, 'type' : data.node.type })
            .done(function (id) {
                data.instance.set_id(data.node, id);
                $("#jstreeSlave").jstree(true).edit(id);
            })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('rename_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=rename_node', { 'id' : data.node.id, 'text' : data.text })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('delete_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=delete_node', { 'id' : data.node.id })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('move_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=move_node', { 'id' : data.node.id, 'parent' : data.parent, 'position' : data.position })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('open_node.jstree', function (e, data) {
        // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-open blue");
    }).on('close_node.jstree', function (e, data) {
        // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-close blue");
    }).on('changed.jstree', function (e, data) {
        if(typeof data.node != "undefined"){
            if(data.node.type == "file"){
               // alert(data.node.a_attr.href);
                //window.location.href = data.node.a_attr.href;
            }else{
                //alert(data.node.a_attr.href);
                //window.location.href = data.node.a_attr.href;
            }

        }
    }).on("contextmenu", ".jstree-anchor", function (e) {
        e.preventDefault();
        $("#jstreeSlave").jstree(true).activate_node(this);
    }).on('click', '.jstree-anchor', function (e) {
        $(this).jstree(true).toggle_node(e.target);
    }).on('click', '.jstree-leaf .jstree-anchor', function (e, data) {
        //$('#jstreeSlave').jstree(true).deselect_all();
        //$('#jstreeSlave').jstree(true).select_node($(this).parent('li').attr('id'));
        //alert($(this).parent('li').attr('id'))
        $('#jstreeSlave').jstree(true).set_state({ core : { 'selected' : [30] } })

        window.location.href = "http://" + window.location.hostname + window.location.pathname.slice(0,6) + $(this).attr('id');

    }).on('ready.jstree', function (e, data) {
        //data.instance.open_node(["id1","id2","id3"]);

        //data.instance.select_node(30);
    })




    $('#jstreeSlaveNew').jstree({
        'core' : {
            "themes": {
                "icons":false,
                "dots":false,
            },
        //    'data' : {
                //'url' : '//' + path + '/treeslave/data?op=get_node',
        //        'data' : function (node) {
        //            return { 'id' : node.id };
        //        },
             //   'dataType':'json',
      //      },
            'check_callback' : true,
            'themes' : {
                'responsive' : false
            }
        },
        'types' : {
            '#' : {
                //                "valid_children":["folder","file"],
                /* 'icon' : "iiicns"*/
            },
            'default' : {
                /* "icon" : " glyphicon-folder-close"*/
            },
            "folder" : {
                "valid_children":["folder","file"],
                "icon" : "glyphicon glyphicon-folder-close yellow"

            },
            "file" : {
                "valid_children":null,
                "icon" : "glyphicon glyphicon-leaf green"
            },
            "ext" : {

            }
        },

        'force_text' : true,
        "state" : { "key" : jsskey },
        'plugins' : ['dnd','types']//,'contextmenu','wholerow''state',
    }).on('create_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=create_node', { 'id' : data.node.parent, 'position' : data.position, 'type' : data.node.type })
            .done(function (id) {
                data.instance.set_id(data.node, id);
                //alert(id);
                $("#jstreeSlaveNew").jstree(true).edit(id);
            })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('rename_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=rename_node', { 'id' : data.node.id, 'text' : data.text })
            .fail(function () {
                data.instance.refresh();
            }).done(function(id){
            console.log($(this));
            });
    }).on('delete_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=delete_node', { 'id' : data.node.id })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('move_node.jstree', function (e, data) {
        $.get('//' + path + '/treeslave/data?op=move_node', { 'id' : data.node.id, 'parent' : data.parent, 'position' : data.position })
            .fail(function () {
                data.instance.refresh();
            });
    }).on('open_node.jstree', function (e, data) {
        // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-open blue");
    }).on('close_node.jstree', function (e, data) {
        // data.instance.set_icon(data.node, "glyphicon glyphicon-folder-close blue");
    }).on('changed.jstree', function (e, data) {
        if(typeof data.node != "undefined"){
            if(data.node.type == "file"){
                // alert(data.node.a_attr.href);
                //window.location.href = data.node.a_attr.href;
            }else{
                //alert(data.node.a_attr.href);
                //window.location.href = data.node.a_attr.href;
            }

        }
    }).on("contextmenu", ".jstree-anchor", function (e) {
        e.preventDefault();
        $("#jstreeSlaveNew").jstree(true).activate_node(this);
    }).on('click', '.jstree-anchor', function (e) {
        $(this).jstree(true).toggle_node(e.target);
    }).on('click', '.jstree-leaf .jstree-anchor', function (e, data) {
        //$('#jstreeSlave').jstree(true).deselect_all();
        //$('#jstreeSlave').jstree(true).select_node($(this).parent('li').attr('id'));
        //alert($(this).parent('li').attr('id'))
        //$('#jstreeSlave').jstree(true).set_state({ core : { 'selected' : [30] } })

        window.location.href = $(this).attr('href');
     //   window.location.href = "http://" + window.location.hostname + window.location.pathname.slice(0,6) + $(this).attr('href');

    }).on('ready.jstree', function (e, data) {
        //data.instance.open_node(["id1","id2","id3"]);

        //data.instance.select_node(30);
    })























    $.contextMenu({
        selector: "#jstree .jstree-anchor",
        autoHide: true,
        zIndex: 1000,
        items: {
            createFile: {
                name: "New File",
                icon: "add",
                visible: function(){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#jstree").jstree('create_node', node[0].id, { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",
                visible: function(){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#jstree").jstree('create_node', node[0].id, { 'text' : 'New folder', 'type': 'folder'}, 'last');

                }
            },
            "sep1": {
                "type": "cm_seperator",
                visible: function(){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
            },
            rename: {
                name: "Rename",
                icon: "edit",
                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#jstree").jstree(true).edit(node[0].id);
                }
            },

            delete: {
                name: "Delete",
                icon: "delete",
                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#jstree").jstree(true).delete_node(node[0].id);
                }
            }

        }
    });


    $.contextMenu({
        selector: "#newBtn",
        trigger:'left',
        autoHide: true,
        zIndex: 1000,
        items: {
            createFile: {
                name: "New File",
                icon: "add",

                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#jstree").jstree('create_node', '#', { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",

                callback: function(key, opt){
                    var node = $("#jstree").jstree(true).get_selected(true);
                    $("#jstree").jstree('create_node', '#', { 'text' : 'New folder', 'type': 'folder'}, 'last');

                }
            }
        }


    });


    $.contextMenu({
        selector: "#jstreeSlave .jstree-anchor",
        autoHide: true,
        zIndex: 1000,
        items: {
            createFile: {
                name: "New File",
                icon: "add",
                visible: function(){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    $("#jstreeSlave").jstree('create_node', node[0].id, { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",
                visible: function(){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    $("#jstreeSlave").jstree('create_node', node[0].id, { 'text' : 'New folder', 'type': 'folder'}, 'last');

                }
            },
            "sep1": {
                "type": "cm_seperator",
                visible: function(){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
            },
            rename: {
                name: "Rename",
                icon: "edit",
                callback: function(key, opt){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    $("#jstreeSlave").jstree(true).edit(node[0].id);
                }
            },

            delete: {
                name: "Delete",
                icon: "delete",
                callback: function(key, opt){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    $("#jstreeSlave").jstree(true).delete_node(node[0].id);
                }
            }

        }
    });


    $.contextMenu({
        selector: "#newBtnSlave",
        autoHide: true,
        trigger:'left',
        zIndex: 1000,
        items: {
            createFile: {
                name: "New File",
                icon: "add",

                callback: function(key, opt){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    $("#jstreeSlave").jstree('create_node', '#', { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",

                callback: function(key, opt){
                    var node = $("#jstreeSlave").jstree(true).get_selected(true);
                    $("#jstreeSlave").jstree('create_node', '#', { 'text' : 'New folder', 'type': 'folder'}, 'last');

                }
            }
        }


    });

    $.contextMenu({
        selector: "#newBtnSlaveNew",
        autoHide: true,
        trigger:'left',
        zIndex: 1000,
        items: {
            createFile: {
                name: "New File",
                icon: "add",

                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree('create_node', '#', { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",

                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree('create_node', '#', { 'text' : 'New folder', 'type': 'folder'}, 'last');

                }
            }
        }


    });

    $.contextMenu({
        selector: "#jstreeSlaveNew .jstree-anchor",
        autoHide: true,
        zIndex: 1000,
        items: {
            bookmark: {
                name: "Add bookmark",
                icon: "glyphicon glyphicon-folder-close",
                visible: function(){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    return (node[0].type == "file") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree(true).delete_node(node[0].id);
                }
            },
            "sep2": {
                "type": "cm_seperator",
                visible: function(){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    return (node[0].type == "file") ? true : false;
                },
            },
            createFile: {
                name: "New File",
                icon: "add",
                visible: function(){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree('create_node', node[0].id, { 'text' : 'New file', 'type': 'file'}, 'last');
                }
            },
            createFolder: {
                name: "New Folder",
                icon: "add",
                visible: function(){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree('create_node', node[0].id, { 'text' : 'New folder', 'type': 'folder'}, 'last');

                }
            },
            "sep1": {
                "type": "cm_seperator",
                visible: function(){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    return (node[0].type == "folder") ? true : false;
                },
            },
            rename: {
                name: "Rename",
                icon: "edit",
                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree(true).edit(node[0].id);
                }
            },

            delete: {
                name: "Delete",
                icon: "delete",
                callback: function(key, opt){
                    var node = $("#jstreeSlaveNew").jstree(true).get_selected(true);
                    $("#jstreeSlaveNew").jstree(true).delete_node(node[0].id);
                }
            }

        }
    });

    $( "#bbtn" ).click(function() {
        $('#jstreeSlave').jstree(true).deselect_all();
        //$('#jstreeSlave').jstree(true).select_node(30);
        $('#jstreeSlave').jstree(true).select_node(30);
    });
    $( "#bbtn1" ).click(function() {
        $('#jstreeSlave').jstree(true).deselect_all();
        //$('#jstreeSlave').jstree(true).select_node(30);
        $('#jstreeSlave').jstree(true).select_node(24);
    });




$( document ).ready(function() {
    $('#tree').jstree();
});



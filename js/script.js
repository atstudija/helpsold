$( document ).ready(function() {
      //  CKEDITOR.skinName = 'moonocolor,/plugins/ckeditor/skins/moonocolor/';
      //  CKEDITOR.replace('editor1');
    $('#jstree11').jstree({ 'core' : {
        'data' : [
            'Simple root node',
            {
                'text' : 'Root node 2',
                'state' : {
                    'opened' : true,
                    'selected' : true
                },
                'children' : [
                    { 'text' : 'Child 1' },
                    'Child 2'
                ]
            },
            'Simple root node',
            {
                'text' : 'Root node 2',
                'state' : {
                    'opened' : true,
                    'selected' : true
                },
                'children' : [
                    { 'text' : 'Child 1' },
                    'Child 2'
                ]
            }
        ]
    } });
    $('#jstree2').jstree({ 'core' : {
        'data' : [
            'Simple root node',
            {
                'text' : 'Root node 2',
                'state' : {
                    'opened' : true,
                    'selected' : true
                },
                'children' : [
                    { 'text' : 'Child 1' },
                    'Child 2'
                ]
            }
        ]
    } });





    ddsmoothmenu.init({
        mainmenuid: "smoothmenu1", //menu DIV id
        orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
        classname: 'ddsmoothmenu', //class added to menu's outer DIV
        arrowimages: {down:['downarrowclass', '/plugins/ddsmoothmenu/down.gif', 23], right:['rightarrowclass', '/plugins/ddsmoothmenu/right.gif', 6]},
        //customtheme: ["#1c5a80", "#18374a"],
        contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
    })


    //CKEDITOR.disableAutoInline = true;
    //CKEDITOR.inline( '#title' );
    //CKEDITOR.inline( '#body' );

    var body = document.getElementById( 'body' );
    body.setAttribute( 'contenteditable', true );
    var title = document.getElementById( 'title' );
    title.setAttribute( 'contenteditable', true );
    CKEDITOR.inline( 'body', {

    }).on('blur',function (en) {
        postdata()
    });


    CKEDITOR.inline( 'title', {

    }).on('blur',function (en) {
        postdata()
    });

    function postdata (){
        var titleData = CKEDITOR.instances.title.getData();
        var bodyData = CKEDITOR.instances.body.getData();
        if(ssid>0) {
            $.post("/savedata", {"id": ssid, 'title': titleData, "body": bodyData}, function (data) {
                // alert("ok")
            });
        }
    }


    $('[data-toggle="tooltip"]').tooltip()

});
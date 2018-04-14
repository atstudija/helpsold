<!DOCTYPE html>
<html lang="en">
@section('htmlheader')
    @include('layouts.partials.htmlheader')
@show
<body style="text-align: center">
    <div id="app" style="width:1024px;margin: 0 auto; ;padding: 0">
        <table id="table">
            <tr style="height: 50px">
                <td colspan="3" style="position: relative;background-color: transparent;padding: 0;">
                    <span id="menuEditBtn" class="editBtn glyphicon glyphicon-cog"></span>
                    <div id="menu">
                        @section('menu')
                            @include('layouts.partials.menu')
                        @show
                    </div>
                    <div style="float:right">
                        @if (Auth::guest())
                            <li><a href="{{ url('/login') }}">Login</a></li>
                            <li><a href="{{ url('/register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a style="color: white;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ url('/logout') }}"
                                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </div>
                </td>
            </tr>
            <tr style="min-height: 1000px">
                <td style="border: 2px solid black;width: 200px;opacity: 0.7; filter: alpha(opacity=50);">
                    <div>
                        <button id="newBtnSlaveNew">New</button>
                    </div>
                    <div style="width: 200px;overflow-x:auto;overflow-y: hidden">
                        @section('menuslave')
                            @include('layouts.partials.menuslave')
                        @show
                    </div>
                </td>
                <td style="position:relative; padding: 12px;border: 2px solid black;">
                    <span id="titleEditBtn" class="editBtn glyphicon glyphicon-cog" title="Edit" data-toggle='tooltip' data-placement='top' ></span>
                    <span id="bodyEditBtn" class="editBtn glyphicon glyphicon-cog"></span>
                    <div style="width:550px;min-height: 600px">

                        @yield('content')

                    </div>

                </td>
                <td style="border: 2px solid black; opacity: 0.7; filter: alpha(opacity=50);">
                    <div id="bookmarks">
                        <ul>
                            <li>
                                <a style="white-space: nowrap" href="/page/1/20">Make css styles</a>
                            </li>
                            <li>
                                <a style="white-space: nowrap" href="/page/1/52">Make css styles</a>
                            </li>
                            <li>
                                <a style="white-space: nowrap" href="/page/1/20">Laravel rules</a>
                            </li>
                            <li>
                                <a style="white-space: nowrap" href="/page/1/20">Laravel requests</a>
                            </li>
                            <li>
                                <a style="white-space: nowrap" href="/page/1/20">Fix HP notebook</a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="opacity: 0.5; filter: alpha(opacity=50);">
                    <div id="footer" style="height:200px">
                        <a href="http://www.google.lv" target="_blank">Google</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="modal fade" id="modal">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    {<h4 class="modal-title">Edit menu</h4>
                </div>
                <div style="text-align: left; padding-left: 10px;">
                    <button id="newMaster">New</button>
                </div>
                <div class="modal-body" id="bodyy" style="text-align: left">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- Scripts -->
    @section('scripts')
        @include('layouts.partials.scripts')
        <script type="text/javascript">
            $('#menuEditBtn').click(function(){
                //alert('click')
                $('#bodyy').load('/modal',{'id':sid}, function(){



                    $('#modal-tree').jstree({
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



                    $('#modal').modal()
                })

            })
        </script>
    @show
</body>
</html>

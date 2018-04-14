<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{--<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>--}}
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{--<title>{{ config('app.name', 'Laravel') }}</title> --}}
    <title> @yield('htmlheader_title', 'Your title here') </title>

    <!-- Styles -->
   {{--}} <link href="{{ asset('/css/app.css') }}" rel="stylesheet" type="text/css" /> --}}
    <link href="{{ asset('/bootstrap-3.3.7/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('/bootstrap-3.3.7/css/bootstrap-theme.min.css') }}" rel="stylesheet" type="text/css" />

   {{-- @if ($_SERVER['REQUEST_URI'] !== "/editt")--}}
        <link href="{{ asset('/plugins/jstree/themes/default/style.min.css') }}" rel="stylesheet" type="text/css" />
    {{--@endif--}}
    <link href="{{ asset('/plugins/ddsmoothmenu/ddsmoothmenu.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('/plugins/ddsmoothmenu/ddsmoothmenu-v.css') }}" rel="stylesheet" type="text/css" />
    {{--}}<link href="{{ asset('/plugins/') }}" rel="stylesheet" type="text/css" />--}}

    <link href="{{ asset('/plugins/jqcmenu/jquery.contextMenu.min.css') }}" rel="stylesheet" type="text/css" />

    <link href="{{ asset('/css/style.css') }}" rel="stylesheet" type="text/css" />

<!-- Scripts -->
<script>
    window.Laravel = <?php echo json_encode([
        'csrfToken' => csrf_token(),
    ]); ?>
</script>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<!--<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<?php
    echo '<script type="text/javascript">';

            echo "sid = ";
            if(Session::get("sid")){
                echo Session::get("sid")."; ";
            }else{
                echo '0'."; ";
            }

            echo "ssid = ";
            if(Session::get("ssid")){
                echo Session::get("ssid")."; ";
            }else{
                echo '0'."; ";
            }

    echo "</script>";
?>
</head>
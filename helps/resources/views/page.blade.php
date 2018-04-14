@extends('layouts.app')

@section('content')

    <div id="title" style="min-height: 40px; margin-top: 0;font-size: 24px; font-weight: bold;">

        <?php echo (isset($node->title)) ? htmlspecialchars_decode($node->title,ENT_QUOTES)  : "";?>

    </div>
    <div id="body" style="min-height: 200px">

        <?php echo (isset($node->body)) ? htmlspecialchars_decode($node->body,ENT_QUOTES)  : "";?>

    </div>

@endsection

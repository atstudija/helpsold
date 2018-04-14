@extends('layouts.edit')

@section('content')
    <div class="container">
        <div class="row">

            <div class="" style="width:50%;float:left; max-width: 300px">
                <div>
                    <button id="newBtn">New</button>
                </div>
                <div id="jstree"></div>
            </div>
            <div class="" style="width:50%;float:left; max-width: 300px">
                <div>
                    <button id="newBtnSlave">New</button>
                </div>
                <div id="jstreeSlave"></div>
            </div>

        </div>
    </div>

@endsection
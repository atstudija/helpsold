<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
use App\Data;
use Illuminate\Http\Request;

Route::get('/welcome', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', function () {
        return redirect('page');;
    });
    Route::get('/page/{id?}/{idSlave?}', function ($id = null, $idSlave = null) {
        return App::make("App\Http\Controllers\HomeController")->page($id, $idSlave);
    });
    Route::get('/edit/{id?}/{idSlave?}', function ($id = null, $idSlave = null) {
        return App::make("App\Http\Controllers\HomeController")->edit($id, $idSlave);
    });
});///{id}/{title}/{body}$id, $title, $body
Route::post('/savedata', function (Request $request){

    function dataready($data) {
        $data = htmlspecialchars($data,ENT_QUOTES);
        return $data;
    }
    $data = Data::find($request->input('id'));
    $data->title = dataready($request->input('title'));
    $data->body = dataready($request->input('body'));
    if($data->save()){
        return "true";
    }

});
Route::post('/menu', function (Request $request){
    //echo Session::get('sid');
    return view('layouts.partials.menu');
});
Route::post('/modal', function (Request $request){
    //echo Session::get('sid');
    return view('modal');
});
Route::get('/jsson', 'HomeController@jsson');

Route::get('/tree/data', 'NestedSetController@data');
Route::get('/treeslave/data', 'NestedSetController@dataSlave');

Route::post('/session/set', 'SessionController@set');
Route::post('/session/get', 'SessionController@get');

Route::get('datas', function () {
    return App\Structs::uid(Auth::user()->id)->get()->toHierarchy();
});

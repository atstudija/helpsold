<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Structs;
use Auth;
use Session;
use App\Data;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $arrs;
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
    public function page($id, $idSlave)
    {
        Session::set('sid', $id);
        Session::set('ssid', $idSlave);
        $node = Data::where("id",$idSlave)->first();

        return view('page', ['id' => $id, 'idSlave' => $idSlave,'node' => $node]);
    }
    public function savedata($id,$node)
    {
        $data = Data::find($id, $node);
        $data->title = $node->title;
        $data->body = $node->title;
        $data->save();
    }
    public function edit($id, $idSlave)
    {
        Session::set('sid', $id);
        Session::set('ssid', $idSlave);
        return view('edit', ['id' => $id, 'idSlave' => $idSlave]);
    }
    public static function jsson()
    {

        /*       function renderNode($node)
             {
       /*
                   echo "<li id='{$node->id}'>";
                   echo "<b>{$node->text}</b>";

                   if ($node->children()->count() > 0) {
                       echo "<ul>";
                       foreach ($node->children as $child) renderNode($child);
                       echo "</ul>";
                   }

               }
               $roots = Structs::roots()->get();

               echo "<ul>";
               foreach($roots as $root):
                   renderNode($root);
               endforeach;


    }*/
    // *Very simple* recursive rendering function
    /*function renderNode($node) {

        echo "<li id='{$node->id}'>";
        echo "<b>{$node->text}</b>";

        if ( $node->children()->count() > 0 ) {
            echo "<ul>";
            foreach($node->children as $child) $this->renderNode($child);
            echo "</ul>";
        }

        echo "</li>";*/

    }
}

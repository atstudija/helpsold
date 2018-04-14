<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\libs;

use App\StructsSlave;
use App\Data;
use DB;
use Auth;
use Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//use Kalnoy\Nestedset\NestedSet;

/**
 * Description of nestedSet
 *
 * @author andris
 */
class nestedSetSlave {

    public function get_node3($id, $with_children = false, $deep_children = false, $with_path = false) {
        $node = DB::table("tree_struct_slave")
                ->join('tree_data','tree_struct.id','=','tree_data.id')
                ->where('tree_struct.id',(int)$id)
                ->get();
        
        if(!$node){
            throw new Exception('Node does not exist');
        }
        $nodes = Category::get()->toTree();
//        if($with_children) {
//            $node['children']="";
//        }
//        if($with_path) {
//            $node['children']="";
//        }
        
        return $node;

    }
    
    public function get_node($id, $recursive = false) {
        
    }
    
    public function get_children($id, $recursive = false) {
        if($id == "#"){
            $roots = StructsSlave::roots()->sid(Session::get('sid'))->get();
        }else{
            $roots = StructsSlave::where('id', $id)->first()->children()->sid(Session::get('sid'))->get();
        }
        $rslt = array();
        $type = 'folder';
        $types['type'] = $type;

         foreach($roots as $root){
             $href = Session::get('sid')."/".$root['id'];
             $rslt[] = array('id' => $root['id'], 'text' => $root['text'], 'voice' => $root['voice'],
                 'lang' => $root['lang'], 'type' => $root['type'], 'children' => ($root['rgt'] - $root['lft'] > 1),
                 'a_attr' => ['id' => $href, 'href' => $href ]);
         }
         
        return $rslt;
    }
    
    public function mk($parent, $position = 0, $type) {
        if($parent === 0){
           // DB::transaction(function($type) {
            $node = StructsSlave::create(['text' => 'New ' . $type, 'type' => $type, 'sid' => Session::get('sid'), 'parent_id' => null]);
            $data = new Data;
            $data->id = $node->id;
            $data->save();
           // });

        }else{
           // DB::transaction(function($type) {
            $node = StructsSlave::where('id', $parent)->first()->children()//->id
                ->create(['text' => 'New '.$type, 'type' => $type, 'sid' => Session::get('sid')]);
            $data = new Data;
            $data->id = $node->id;
            $data->save();

          //  });
        }

        return $node;
    }
    
    public function rn($id, $text) {
        $node = StructsSlave::where('id', $id)->first();
        $node->text = $text;
        $node->save();
        
        return true;
    }
    
    public function rm($id) {
        $ret = StructsSlave::where('id', $id)->first()->delete();
        $data = Data::find($id);
        $data->delete();
        return true;
    }
    
    public function mv($id, $parent, $position = 0) {
        
        $node = StructsSlave::where('id', $id)->sid(Session::get('sid'))->first();
        $parentNode = StructsSlave::where('id', $id)->sid(Session::get('sid'))->first()->parent()->first();
        if($parent === 0){
            $roots = StructsSlave::roots()->sid(Session::get('sid'))->withoutNode($node)->get();
            $countRoots = count($roots);
            if($countRoots > $position){
                $target = $roots[$position]['id'];
                $tnode = StructsSlave::where('id', $target)->sid(Session::get('sid'))->first();
                $node->moveToLeftOf($tnode);
            }else{
                $target = $roots[$position - 1]['id'];
                $tnode = StructsSlave::where('id', $target)->sid(Session::get('sid'))->first();
                $node->moveToRightOf($tnode);
            }
        }else{
            $targetParentNode = StructsSlave::where('id', $parent)->sid(Session::get('sid'))->first();
            if(!$targetParentNode->isLeaf()){
                $childs = StructsSlave::where('id', $parent)->sid(Session::get('sid'))
                    ->first()->children()->withoutNode($node)->get();
                $countChilds = count($childs);
                if($countChilds > $position){
                    $target = $childs[$position]['id'];
                    $tnode = StructsSlave::where('id', $target)->sid(Session::get('sid'))->first();
                    $node->moveToLeftOf($tnode);
                }else{
                    $target = $childs[$position - 1]['id'];
                    $tnode = StructsSlave::where('id', $target)->sid(Session::get('sid'))->first();
                    $node->moveToRightOf($tnode);
                }
            }else{
                $tnode = StructsSlave::where('id', $parent)->sid(Session::get('sid'))->first();
                $node->makeFirstChildOf($targetParentNode);                
            }
        }
        
        return true;
    }


    
}

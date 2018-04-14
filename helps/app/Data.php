<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    protected $table = 'data';
    protected $fillable = ['id', 'ssid', 'title', 'body'];

    public function StructsSlave()
    {
        return $this->hasOne('App\StructsSlave','id');
    }



}

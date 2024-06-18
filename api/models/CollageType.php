<?php

use \Illuminate\Database\Eloquent\Model;

class CollageType extends Model
{

    public $timestamps = false;

    public function collages()
    {
        return $this->belongsToMany(Collage::class, 'collage_type_collage', 'collage_type_id', 'collage_id');
    }
}
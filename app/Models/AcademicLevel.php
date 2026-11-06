<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class AcademicLevel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'short_name',
        'description',
        'badge_color',
        'icon',
        'order',
    ];

    public function semesters(): HasMany
    {
        return $this->hasMany(Semester::class)->orderBy('order');
    }

    public function modules(): HasManyThrough
    {
        return $this->hasManyThrough(CourseModule::class, Semester::class);
    }

    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }
}

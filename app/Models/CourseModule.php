<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseModule extends Model
{
    use HasFactory;

    protected $table = 'modules';

    protected $fillable = [
        'semester_id',
        'name',
        'code',
        'slug',
        'description',
        'credits',
        'coefficient',
        'hours',
        'icon',
        'color',
    ];

    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class, 'module_id');
    }

    public function communityPosts(): HasMany
    {
        return $this->hasMany(CommunityPost::class, 'module_id');
    }
}

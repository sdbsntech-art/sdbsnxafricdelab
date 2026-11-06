<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommunityPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'module_id',
        'title',
        'slug',
        'content',
        'category',
        'is_solved',
        'views_count',
        'likes_count',
    ];

    protected $casts = [
        'is_solved' => 'boolean',
        'views_count' => 'integer',
        'likes_count' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(CourseModule::class, 'module_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(CommunityComment::class)->orderBy('created_at', 'asc');
    }
}

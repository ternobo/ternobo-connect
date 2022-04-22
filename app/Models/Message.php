<?php

namespace App\Models;

use Ternobo\TernoboChat\Models\Message as TernoboChatMessage;

/**
 * App\Models\Message
 *
 * @property int $id
 * @property int $sender_id
 * @property string $sender_type
 * @property int $conversation_id
 * @property string $type
 * @property string|null $text
 * @property mixed|null $media
 * @property mixed|null $meta
 * @property int $seen
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Models\Conversation|null $conversation
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $sender
 * @method static \Illuminate\Database\Eloquent\Builder|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereConversationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMedia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereSeen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereSenderType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Message extends TernoboChatMessage
{
    public function conversation()
    {
        return $this->belongsTo("App\Models\Conversation");
    }
}

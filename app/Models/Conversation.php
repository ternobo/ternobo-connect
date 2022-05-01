<?php
namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboChat\Models\Conversation as TenoboChatConversation;
use Ternobo\TernoboChat\Models\MutedConversation;

/**
 * App\Models\Conversation
 *
 * @property int $id
 * @property string $type
 * @property mixed $members
 * @property string|null $created_by
 * @property string|null $token
 * @property string|null $title
 * @property string|null $icon
 * @property string|null $description
 * @property mixed|null $meta
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Ternobo\TernoboChat\Models\Message|null $lastMessage
 * @property-read \Illuminate\Database\Eloquent\Collection|\Ternobo\TernoboChat\Models\Message[] $messages
 * @property-read int|null $messages_count
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Conversation extends TenoboChatConversation
{
    public function toArray()
    {
        $data = parent::toArray();
        if (Auth::check()) {
            if (count($data['members']) > 1 && $data['type'] == 'private') {
                $data['user'] = $data['members'][0] == Auth::user()->id ?
                User::query()->where("active", true)->where("id", $data['members'][1])->first()
                : User::query()->where("active", true)->where("id", $data['members'][0])->first();
                if (isset($data['title'])) {
                    if ($data['title'] == null) {
                        $data['showItem'] = false;
                    }
                }
            }
        }
        return $data;
    }

    public function unmute()
    {
        return MutedConversation::query()->where("user_id", Auth::user()->id)->where("conversation_id", $this->id)->delete();
    }

}

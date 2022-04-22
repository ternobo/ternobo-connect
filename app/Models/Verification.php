<?php

namespace App\Models;

use App\SMS;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Verification
 *
 * @property int $id
 * @property string|null $phone
 * @property string|null $email
 * @property string $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|Verification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Verification newQuery()
 * @method static \Illuminate\Database\Query\Builder|Verification onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Verification query()
 * @method static \Illuminate\Database\Eloquent\Builder|Verification whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Verification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Verification whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Verification whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Verification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Verification wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Verification whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Verification withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Verification withoutTrashed()
 * @mixin \Eloquent
 */
class Verification extends Model
{
    use SoftDeletes;

    public function sendVerification($type, $input)
    {
        $code = random_int(111111, 999999);
        $verification = new Verification();
        $verification->code = $code;

        if ($type == "phne") {
            $sms = new SMS($input);
            $verification->phone = $input;
            $verification->save();
            session()->put("phone", $input);
            return response()->json(array("result" => $sms->sendUltraFastSMS(array(SMS::makeParameter("VerificationCode", $code)), "23109")));
        } elseif ($type == "email") {
            $verification->email = $input;
            $verification->save();
            session()->put("email", $input);
            $html = preg_replace("/\r|\n/", "", view('emails.verification', array("vcode" => $code))->render());
            $text = "کد فعالسازی شما در ترنوبو : $code";
            $title = "کد فعالسازی ترنوبو";
            $mail = new Mail();
            $mail->addAddress($input);
            $mail->send($title, $text, $html);
            session()->put("email", $input);
            return response()->json(array("result" => true));
        }
        return response()->json(['result' => false]);
    }

    public function save(array $options = [])
    {
        Verification::query()->where("email", $this->email)->orWhere("phone", $this->phone)->delete();
        parent::save();
    }
}

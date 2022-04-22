<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * User Education
 *
 * @property int $id
 * @property int $user_id
 * @property string $school
 * @property string $degree
 * @property string $field
 * @property string $grade
 * @property string|null $description
 * @property string $start_date
 * @property string|null $end_date
 * @property int|null $connected_to
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Education newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Education newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Education query()
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereConnectedTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereDegree($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereField($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereGrade($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Education whereUserId($value)
 * @mixin \Eloquent
 */
class Education extends Model {
   
    /**
     * the user id
     * @var integer
     */
    
    /**
     * school/university name
     * @var string 
     */
    
    /**
     * degree name
     * @var string
     */
    
    /**
     * field of study
     * @var string
     */
    
    /**
     * grade of degree
     * @var string
     */
    
    /**
     * description about the education part
     * @var string 
     */
    
    /**
     *  start of education
     * @var string
     */
    
    /**
     * end of education
     * @var string 
     */

    /**
     * connected to school or university page
     * @var integer
     */
    
    
}

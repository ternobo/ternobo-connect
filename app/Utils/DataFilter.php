<?php

namespace App\Utils;

use App\Models\RealEstate;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class DataFilter
{
    private static $allowedOperators = ['LIKE', "IN", "=", ">", "<"];

    public static function filterByColumnsLike(array $columns, Builder $query, bool $startWithOr = true): Builder
    {
        $isFirst = !$startWithOr;
        foreach ($columns as $column => $searchFilter) {
            abort_if(!in_array($searchFilter['operator'], self::$allowedOperators), 400, "Invalid Operator");
            $query = $query->where($column, $searchFilter['operator'], $searchFilter['value'], $isFirst ? "and" : "or");
        }
        return $query;
    }

    public static function filterByGeoPosition(string $column, int $radius, object $postion, Builder $query, bool $isOr = true)
    {
        $calcQuery = "ROUND((6371 * acos(
            cos(radians($postion->latitude)) * cos(radians($column->\"$.latitude\")) * cos(radians($column->\"$.longitude\") - radians($postion->longitude)) +
            sin(radians($postion->latitude)) * sin(radians($column->\"$.latitude\")))), (2))";
        $query = $query->whereRaw($calcQuery . " < " . $radius);
        return $query;
    }
}

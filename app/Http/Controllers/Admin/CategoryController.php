<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Models\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $page
     * @return \Illuminate\Http\Response
     */
    public function index($page)
    {
        $categories = Category::with("posts")
            ->where("page_id", $page)
            ->get();
        return response()->json(["result" => true, "categories" => $categories]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $page
     * @param \App\Category $category
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy($page, Category $category)
    {
        return response()->json(['result' => $category->delete()]);
    }
}

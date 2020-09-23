<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;

class CategoryController extends Controller {

    public function __construct(){
        $this->middleware('auth');
    }

    public function sort(Request $request, $category) {
        $validator = Validator::make($request->all(), [
                    "order" => "required",
                        ], ["orders.required" => "موقعیت اجباری است."]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $category = Category::query()->where("id", $category)->where("page_id", Auth::user()->getPage()->id)->firstOrFail();
            $category->sort_place = $request->order;
            return response()->json(array("result" => $category->save()));
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
                    "name" => "required",
                        ], ["name.required" => "نام دسته بندی اجباری است."]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $category = new Category();
            $category->name = $request->name;
            $category->page_id = Auth::user()->personalPage->id;
            $result = $category->save();
            dd(Auth::user()->personalPage);
            return response()->json(array("result" => $result));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category) {
        $validator = Validator::make($request->all(), [
                    "value" => "required",
                        ], ["name.required" => "نام دسته بندی اجباری است."]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            if ($category->page_id === Auth::user()->getPage()->id) {
                $category->name = $request->value;
                return response()->json(array("result" => $category->save()));
            } else {
                return abort(404);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category) {
        if ($category->page_id === Auth::user()->getPage()->id) {
            $posts = Post::query()->where("category_id", $category->id)->get();
            foreach ($posts as $post) {
                $post->category_id = null;
                $post->save();
            }
            return response()->json(array("result" => $category->delete()));
        } else {
            return abort(404);
        }
    }

}

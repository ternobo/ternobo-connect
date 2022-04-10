<?php

use Illuminate\Support\Facades\Route;

Route::prefix("/feedbacks")->group(function () {
    Route::post("/bookmark", "Feedback\FeedbacksController@bookmark");
    Route::get("/myfeedbacks", "Feedback\FeedbacksController@myFeedback");
    Route::post("/reply/{feedback:id}", "Feedback\FeedbacksController@addReply");
    Route::delete("/reply/{id}", "Feedback\FeedbacksController@deleteComment");
    Route::post("/vote", "Feedback\FeedbacksController@voteFeedback");

    // Route::post("/change-type", "Feedback\FeedbacksController@changeType")->middleware(WebAdminMiddleware::class);
});

Route::resource("/feedbacks", "Feedback\FeedbacksController");

Route::resource('feedbacks.replies', "Feedback\RepliesCotnroller");

Route::any("/feedback-replies/{id}/replies", "Feedback\RepliesCotnroller@replies");
Route::post("/feedback-replies/{id}/like", "Feedback\RepliesCotnroller@likeIdeaReply");
Route::post("/feedback-replies/{id}/pin", "Feedback\RepliesCotnroller@pinnReply");

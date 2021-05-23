<?php
use Laravel\Socialite\Facades\Socialite; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>انتقال به درگاه پرداخت</title>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />

    <style>
        body {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    </style>

</head>

<body>
    <script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-login="ternobo_bot" data-size="medium" data-auth-url="{{ url('/connect/telegram/callback') }}"
        data-request-access="write"></script>
</body>

</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>انتقال به درگاه پرداخت</title>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />

    <style>
        .text-center {
            text-align: center;
        }

        .mt-2 {
            margin-top: 2em;
        }

        .spinner {
            margin: 100px auto 0;
            width: 70px;
            text-align: center;
        }

        .spinner>div {
            width: 18px;
            height: 18px;
            background-color: #333;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }

        .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }

        .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }

        @-webkit-keyframes sk-bouncedelay {

            0%,
            80%,
            100% {
                -webkit-transform: scale(0)
            }

            40% {
                -webkit-transform: scale(1.0)
            }
        }

        @keyframes sk-bouncedelay {

            0%,
            80%,
            100% {
                -webkit-transform: scale(0);
                transform: scale(0);
            }

            40% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
            }
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }

    </style>
</head>

<body>
    <h2 class="text-center text-success">
        پرداخت موفق
    </h2>
    <p class="text-center text-success">
        می‌توانید اطلاعات پرداخت را در صفحه حمایت‌های خود مشاهده کنید
    </p>
    <button class="btn btn-primary" onclick="window.close()">بستن</button>
</body>

</html>

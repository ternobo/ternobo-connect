<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        p {
            font-size: 1.1rem;
            width: 100%
        }

        .w-100 {
            width: 100
        }

    </style>
</head>

<body dir="rtl">
    <div style="padding: 1rem 0;background-color: #fafafa;">
        <div style="max-width: 900px;margin: 5px auto;box-shadow: 0 0 1rem 0 rgba(8, 152, 223, 0.2);padding: 1.7rem;background: white;">
            <div class="img " style="text-align: center;margin-bottom: 60px;"> <img src="{{ url('/images/forgot-pass.png') }}" style="max-width: 80%;"></div>
            <div class="container"> <img src="{{ url('/images/farsi-logo-blue.png') }}" style="height: 32px;margin-top: 64px;">
                <p style="width: 100%;margin-top: 32px;overflow: hidden;line-height: 3;"> درخواستی مبنی بر تغییر رمزعبور حساب کاربری شما با نام کاربری <b style="color: #0898DF;">
                        {{ $username }} </b> داده شده است <br> جهت تایید درخواست و تغییر رمزعبور از کد زیر استفاده کنید</p>
                <div style="height: auto;padding: 1.2rem;width: 100%;text-align: center;">{{ $code }}</div>
                <p style="width: 100%;margin-top: 64px;overflow: hidden;margin-bottom: 5px;line-height: 2;"> اگر این درخواست از جانب شما ارسال نشده، این پیام را نادیده بگیرید. ممکن
                    است این درخواست به اشتباه از سمت دیگر کاربران ارسال شده باشد <br> باتشکر <br> تیم پشتیبانی ترنوبو</p> <a href="https://help.Ternobo.com"
                    style="margin-top: 32px; color:#0d0d0d; text-align: center; opacity: 0.32;">help.Ternobo.com</a>
            </div>
        </div>
    </div>
</body>

</html>

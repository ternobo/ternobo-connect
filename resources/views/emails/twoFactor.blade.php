<html>

<head>
    <title>Ternobo Verification</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body dir="rtl">
    <div style="padding: 1rem 0;background-color: #fafafa;">
        <div style="max-width: 900px;margin: 5px auto;box-shadow: 0 0 1rem 0 rgba(8, 152, 223, 0.2);padding: 1.7rem;background: white;">
            <div style="text-align: center;">
                <div class="img d-flex justify-content-center align-items-center"> <img src="{{ url('/images/confirm.png') }}" style="max-width: 80%" /> </div>
                <div class="container" style="width: 100%;">
                    <div class="col-md-6" style="margin: auto;text-align: right;">
                        <h1 style="color:#000;text-align: center"> <img src="{{ url('/images/farsi-logo-blue.png') }}" style="height: 32px;margin-top: 64px;"> </h1>
                        <p>جهت تایید فرایند تایید هویت ۲ مرحله‌ای از کد زیر استفاده کنید:</p>
                        <p style="text-align:center;"><a style="color: rgb(95, 93, 126);text-decoration: none;font-size: 1.5rem;font-weight: 600;">{{ $vcode }}</a></p>
                        <p>باتشکر</p>
                        <h2 style="text-align: center;">تیم پشتیبانی ترنوبو</h2>
                        <div style="text-align: center"> <a href="https://help.Ternobo.com"
                                style="margin-top: 32px; color:#0d0d0d; text-align: center; opacity: 0.32;text-decoration: none">help.Ternobo.com</a> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

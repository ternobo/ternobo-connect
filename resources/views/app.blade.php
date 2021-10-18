<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="/ternobo-telegram/style.css">
    <link rel="stylesheet" href="/ternoboicons/style.css">

    {!! SEO::generate() !!}

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#191919">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="stylesheet" href="/css/video-player.css">
    <script>
        var APP_URL = "{{ url('/') }}";
        window.lang = document.documentElement.lang;
        var country = "Iran"
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                country = response.country;
            });
    </script>
    {{-- <script id="translationScript" async defer src="/translations.js?version={{ time() }}"></script> --}}
</head>

<body dir="{{ app()->getLocale() == 'en' ? 'ltr' : 'rtl' }}" class="font-sans antialiased" data-wire='{{ $tuuid }}'>
    {!! $ternoboApp !!}
    <script src="{{ mix('/js/manifest.js') }}" defer></script>
    <script src="{{ mix('/js/vendor.js') }}" defer></script>
    <script src="{{ mix('/js/app.js') }}" defer></script>
    @if (app()->getLocale() == 'en')
        <link href="{{ env('ASSETS_ENV') != 'local' ? '/css/app.ltr.css' : mix('/css/app.ltr.css') }}" rel="stylesheet" />
    @else
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    @endif
</body>

</html>

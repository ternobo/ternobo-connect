<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/ternobo-socials/style.css">
    <link rel="stylesheet" href="/ternobo-telegram/style.css">
    {!! SEO::generate() !!}


    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="manifest" href="/site.webmanifest.json" crossorigin="use-credentials">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#191919">
    <link rel="preload" href="/fonts/google-material/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"/>
    <link rel="preload" href="/manifest.js" as="script">
    <link rel="preload" href="/js/vendor.js" as="script">
    <link rel="preload" href="/js/app.js" as="script">

    <link rel="preload" href="/fonts/dana/woff2/dana-noen-bold.woff2">
    <link rel="preload" href="/fonts/dana/woff2/dana-noen-regular.woff2">
    <link rel="preload" href="/fonts/roboto/Roboto-Regular.ttf">
    <link rel="preload" href="/fonts/google-material/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2">

    <meta name="apple-mobile-web-app-title" content="Ternobo">
    <meta name="application-name" content="Ternobo">
    <meta name="msapplication-TileColor" content="#191919">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#191919">
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">

    <script>
        var APP_URL = "{{ url('/') }}";
        var country = "Iran"
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                country = response.country;
            });

    </script>

    <script>
        var user_id = @auth {{ Auth::user()->id }} @endauth @guest false @endguest;
    </script>


        <script src="/manifest.js" defer></script>
        <script src="/js/vendor.js" defer></script>
        <script src="/js/app.js" defer></script>
        
    </head>

    <body class="font-sans antialiased">
        @inertia
        <link href="/css/app.css" rel="stylesheet"/>
    </body>

</html>

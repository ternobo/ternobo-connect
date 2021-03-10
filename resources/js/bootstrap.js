window._ = require('lodash');
import NoiseGate from "noise-gate";
window.moment = require('jalali-moment');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;
window.axios.defaults.headers.common['Cache-Control'] = 'no-cache';
window.axios.defaults.headers.common['Pragma'] = 'no-cache';
window.axios.defaults.headers.common['Expires'] = '0';

window.NoiseGate = NoiseGate;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
import Echo from 'laravel-echo';
window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'https://tsocket.ternobo.com',
    forceTLS: true,
    csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    auth:
    {
        headers:
        {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
    }
});

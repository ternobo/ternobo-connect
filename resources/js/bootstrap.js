window._ = require('lodash');
import NoiseGate from "noise-gate";
window.moment = require('jalali-moment');

require("./Libs/Emojify");
require("./utils/PostContentRenderer");

window.moment.isSameWeek = function (firstDay, secondDay, offset = -1) {
    var firstMoment = moment(firstDay);
    var secondMoment = moment(secondDay);

    var startOfWeek = function (_moment, _offset) {
        return _moment.add("days", _moment.weekday() * -1 + (_moment.weekday() >= 7 + _offset ? 7 + _offset : _offset));
    }

    return startOfWeek(firstMoment, offset).isSame(startOfWeek(secondMoment, offset), "day");
}
window.CaretPos = require("./Libs/CaretPos");

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


const axios = require('axios');

const axiosInstance = axios.create({
    headers: {
        'X-Requested-With': "XMLHttpRequest",
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        'Cache-Control': "no-cache",
        'Pragma': "no-cache",
        "Expires": "0"
    }
});

window.axios = axiosInstance;

window.updateCsrf = () => {
    axios.get("/refresh-csrf").then((response) => {
        document.querySelector('meta[name="csrf-token"]').content = response.data.csrf;
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf;
    });
}


window.NoiseGate = NoiseGate;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
import Echo from 'laravel-echo';

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: process.env.MIX_LARAVEL_ECHO_HOST,
    // forceTLS: true,
    csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
});
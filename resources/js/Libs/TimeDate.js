import TimeAgo from "javascript-time-ago";
import fa from "javascript-time-ago/locale/fa";
import en from "javascript-time-ago/locale/en";
import moment from "jalali-moment";

TimeAgo.addLocale(fa);
TimeAgo.addLocale(en);
export default function (Vue) {
    Vue.prototype.yearsToNow = (startYear, addition = 0) => {
        var currentYear = new Date().getFullYear() + addition
        if (window.lang == "fa") {
            currentYear = new PersianDate().year() + addition;
        }
        let years = [];
        startYear = startYear || 1980;
        while (currentYear >= startYear) {
            years.push(currentYear--);
        }
        return years;
    }


    Vue.prototype.months = function (to) {
        to = to || 12;
        let months = [];
        const monthNames = ["", "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        for (let i = 1; i <= to; i++) {
            months.push(
                {
                    label: window.lang == "fa" ? new PersianDate()._monthName(i) : monthNames[i],
                    id: i
                }
            );
        }
        return months;
    }

    Vue.prototype.currentYear = () => {
        return window.lang == "fa" ? new PersianDate().year() : new Date().getFullYear();
    }

    Vue.prototype.currentMonth = () => {
        return window.lang == "fa" ? new PersianDate().month() : new Date().getMonth();
    }

    Vue.prototype.formatTime = function (time, format) {
        return window.lang == "fa" ? moment.from(time, "en").locale("fa").format(format) : moment(time).format(format);
    }

    Vue.prototype.getFormatedDate = function () {
        return window.lang == "fa" ? moment().locale("fa").format("YYYY/MM/DD HH:m") : moment().format("YYYY-MM-DD HH:m");
    }

    Vue.prototype.getFormatedDateTime = function () {
        return window.lang == "fa" ? moment().locale("fa").format("YYYY/MM/DD HH:m") : moment().format("YYYY-MM-DD HH:m");
    }

    Vue.prototype.getDateObject = (date) => {
        if (window.lang == "fa") {
            date = moment(date).locale("fa");
            return {
                year: date.year(),
                month: { id: date.month(), label: new PersianDate()._monthName(date.month()) },
                day: date.day(),
            }
        }

        const monthNames = ["", "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        date = new Date(date);

        return {
            year: String(date.getFullYear()),
            month: { id: date.getMonth(), label: monthNames[date.getMonth()] },
            day: String(date.getDate()),
        }

    }

    Vue.prototype.timeAgo = function (time) {
        let timeAgo = new TimeAgo(window.lang == "fa" ? 'fa-FA' : 'en-US');
        return timeAgo.format(Date.parse(time));
    }

    Vue.prototype.yearsFrom = function (startYear, to) {
        var currentYear = to || new Date().getFullYear();
        if (window.lang == "fa") {
            currentYear = to || new PersianDate().year();
        }
        let years = [];
        startYear = startYear || 1980;
        while (currentYear >= startYear) {
            years.push(currentYear--);
        }
        return years;
    }
}
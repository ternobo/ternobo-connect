export default {
    data() {
        return {
            countdown: 30,
        }
    },
    methods: {
        countDownTimer() {
            if (this.countdown > 0) {
                setTimeout(() => {
                    this.countdown -= 1;
                    this.countDownTimer();
                }, 1000);
            }
        },
    }
}
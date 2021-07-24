import { PasswordMeter } from "password-meter";

export default {
    methods: {
        passwordStrength(password) {
            return new PasswordMeter().getResult(password).percent;
        }
    }
}
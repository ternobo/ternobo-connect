<template>
<button :class="{'loading': loading}" :disabled="loading || disabled">
    <span :class="{'opacity-0': loading}">
        <slot>
        </slot>
    </span>
</button>
</template>

<script>
export default {
    name: "LoadingButton",
    props: {
        loading: {
            type: Boolean,
            default: false,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
    }
}
</script>

<style lang="scss" scoped>
button {
    position: relative;
    display: inline-block;
    font-size: 15px;
    letter-spacing: 0.05em;
    outline: 0;
    border: 1px solid transparent;
    transition: all 0.4s ease-in-out;
}

button.loading {
    background: #FFF;
    border-color: #191919;
}

button::before {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -4px;
    margin-left: -4px;
    content: '';
    height: 8px;
    width: 8px;
    background: white;
    border-radius: 100%;
    transition: all 0.4s linear;
    animation: loading 2s infinite;
    opacity: 0;
}

button.loading::before {
    opacity: 1;
    background-color: #223;

}

@keyframes one-two {
    0% {
        left: 20%;
        top: 50%;
    }

    12.5% {
        top: 20%;
    }

    25% {
        top: 50%;
    }

    37.5% {
        top: 70%;
    }

    50% {
        left: 70%;
        top: 50%;
    }

    62.5% {
        top: 20%;
    }

    75% {
        top: 50%;
    }

    87.5% {
        top: 70%;
    }

    100% {
        left: 20%;
        top: 50%;
    }
}

@keyframes loading {
    0% {
        left: 20%;
    }

    50% {
        left: 80%;
    }

    100% {
        left: 20%;
    }
}
</style>

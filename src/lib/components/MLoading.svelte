<div class="spinner-wrap">
    <div class="spinner" />
</div>

<style lang="scss">
    .spinner-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #282c2dad;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(var(--vh, 1vh) * 100);
        width: 100%;
        z-index: 99;
    }

    .spinner,
    .spinner:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }

    .spinner {
        font-size: 10px;
        border-top: 1.1em solid rgba(255, 255, 255, 0.2);
        border-right: 1.1em solid var(--color-main);
        border-bottom: 1.1em solid var(--color-main);
        border-left: 1.1em solid var(--color-main);
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.8s infinite linear;
        animation: load8 1.8s infinite linear;
    }

    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>

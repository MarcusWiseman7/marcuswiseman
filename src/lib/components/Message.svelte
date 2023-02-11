<script lang="ts">
    // types
    import type { IMessage } from '$lib/ts-interfaces';

    // props
    export let messageObj: IMessage;

    // helpers
    import { appMessages } from '$lib/stores';
    import { fly } from 'svelte/transition';

    // methods
    setTimeout(() => {
        appMessages.update((a) => a.filter((m) => m.id !== messageObj.id));
    }, messageObj.timeout);
</script>

<div transition:fly={{ x: -100 }} class={`message message--${messageObj.type}`}>
    {messageObj.message}
</div>

<style lang="scss">
    .message {
        position: fixed;
        bottom: 40px;
        left: 40px;
        z-index: 50;
        padding: 8px 32px;
        font-weight: 600;
        color: var(--color-light);
        font-size: 18px;
        line-height: 28px;
        max-width: 320px;
        text-align: justify;

        &--success {
            background-color: rgb(22 163 74);
        }

        &--error {
            background-color: rgb(220 38 38);
        }

        &--warning {
            background-color: rgb(202 138 4);
        }

        &--info {
            background-color: rgb(168 162 158);
        }
    }
</style>

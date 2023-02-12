<script lang="ts">
    import '../app.scss';

    // components
    import MHeader from '$lib/components/MHeader.svelte';
    import MLoading from '$lib/components/MLoading.svelte';
    import Message from '$lib/components/Message.svelte';

    // helpers
    import { appMessages, loading } from '$lib/stores';
</script>

<div class="layout">
    <MHeader />

    <slot />

    {#if $appMessages?.length}
        {#each $appMessages as messageObj}
            <Message {messageObj} />
        {/each}
    {/if}

    {#if $loading}
        <MLoading />
    {/if}
</div>

<style lang="scss">
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-height: 100vh;
        padding-top: 55px;

        @media (min-width: 1024px) {
            padding-top: 155px;
        }
    }
</style>

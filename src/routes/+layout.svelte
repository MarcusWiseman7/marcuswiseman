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

    <!-- APP MESSAGES -->
    {#if $appMessages?.length}
        {#each $appMessages as messageObj}
            <Message {messageObj} />
        {/each}
    {/if}

    <!-- APP LOADING... -->
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

    .background-image {
        position: fixed;
        left: 0;
        top: 0;
        min-width: 100%;
        height: 100vh;
        z-index: -1;

        background-color: rgba(0, 0, 0, 0.5);

        img {
            height: 100%;
            min-width: 100%;
            object-fit: cover;
            opacity: 0.2;
        }
    }
</style>

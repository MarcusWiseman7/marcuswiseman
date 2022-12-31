<script lang="ts">
    import '../app.scss';

    // components
    import MHeader from '$lib/components/MHeader.svelte';

    // images
    import avifSmoke from '$lib/assets/images/2.avif';
    import webpSmoke from '$lib/assets/images/2.webp';
    import jpgSmoke from '$lib/assets/images/2.jpg';
</script>

<div class="layout">
    <MHeader />

    <picture class="background-smoke">
        <source srcset={avifSmoke} type="image/avif" />
        <source srcset={webpSmoke} type="image/webp" />
        <img src={jpgSmoke} alt="smoke" />
    </picture>

    <slot />
</div>

<style lang="scss">
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-height: 100vh;
    }

    .background-smoke {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: -1;

        background-color: rgba(0, 0, 0, 0.8);

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            opacity: 0.2;
        }
    }
</style>

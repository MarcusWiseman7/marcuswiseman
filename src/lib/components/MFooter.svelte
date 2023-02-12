<footer>
    <div class="tagline">Marcus Wiseman &copy; {new Date().getFullYear()}</div>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        z-index: 1;
        padding: 16px 0;
        color: var(--color-dark);
        background-color: var(--color-light);

        @media (min-width: 1024px) {
            padding: 24px 0;
        }

        .tagline {
            font-size: 14px;
            line-height: 20px;
            text-align: center;
        }
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';

    const weights = [700, 600, 500, 400, 300, 200, 100];

    function getWeightIndices(string: string) {
        const weightIndices = [];
        const chars = string.split('');

        for (let i = 0, j = chars.length; i < j; i++) {
            const weightIndex = Math.round(((weights.length - 1) / (chars.length - 1)) * i);

            weightIndices.push(weightIndex);
        }

        return weightIndices;
    }

    function gradientize(element: HTMLElement) {
        const spanified = [];
        const string = element.innerHTML;
        const splitString = string.split('');
        const letterWeights = getWeightIndices(string);

        for (let i = 0, j = splitString.length; i < j; i++) {
            const charWeight = weights[letterWeights[i]];

            spanified.push('<span style="font-weight: ' + charWeight + ';">' + splitString[i] + '</span>');
        }

        return spanified.join('');
    }

    function renderStrings(elements: NodeListOf<HTMLElement>) {
        for (let i = 0, j = elements.length; i < j; i++) {
            elements[i].innerHTML = gradientize(elements[i]);
        }
    }

    onMount(() => {
        const strings: NodeListOf<HTMLElement> = document.querySelectorAll('.name');
        renderStrings(strings);
    });
</script>

<header>
    <a class="name" href="/">MARCUS WISEMAN</a>
    <a class="talk" href="/contact-me">LET'S TALK</a>
</header>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        padding: 14px;
        z-index: 1;

        @media (min-width: 1024px) {
            padding: 60px;
        }

        .name {
            font-weight: 400;
            font-size: 18px;
            letter-spacing: 8px;

            @media (min-width: 1024px) {
                font-size: 22px;
                letter-spacing: 10px;
            }
        }

        .talk {
            display: none;
            font-size: 18px;
            letter-spacing: 3px;
            font-weight: 400;
            border-bottom: 1px solid #fff;
            align-items: center;

            @media (min-width: 1024px) {
                display: flex;
            }
        }
    }
</style>

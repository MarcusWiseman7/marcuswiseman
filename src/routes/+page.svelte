<script lang="ts">
    // types
    import type { IProject, ITech } from '$lib/ts-interfaces';

    // components
    import trendingIcon from '$lib/assets/icons/trending-right.svg';
    import MProject from '$lib/components/MProject.svelte';
    import MFooter from '$lib/components/MFooter.svelte';

    // images
    import beerLogo from '$lib/assets/icons/logos/beer.svg';
    import svelteLogo from '$lib/assets/icons/logos/svelte.svg';
    import sveltekitLogo from '$lib/assets/icons/logos/sveltekit.svg';
    import vueLogo from '$lib/assets/icons/logos/vue.svg';
    import nuxtLogo from '$lib/assets/icons/logos/nuxt.svg';
    import typescriptLogo from '$lib/assets/icons/logos/typescript.svg';
    import scssLogo from '$lib/assets/icons/logos/sass.svg';
    import sanityLogo from '$lib/assets/icons/logos/sanity.svg';
    import shopifyLogo from '$lib/assets/icons/logos/shopify.svg';
    import githubLogo from '$lib/assets/icons/logos/github.png';
    import linkedinLogo from '$lib/assets/icons/logos/linkedin.png';
    import codeImage from '$lib/assets/images/code.webp';
    import funArrowImage from '$lib/assets/icons/fun-arrow.svg';

    // data
    const techStack: ITech[] = [
        { name: 'svelte', url: 'https://svelte.dev/', icon: svelteLogo, modifiers: ['padding-x'] },
        { name: 'svelteKit', url: 'https://kit.svelte.dev/', icon: sveltekitLogo, modifiers: ['padding-x'] },
        { name: 'vue', url: 'https://vuejs.org/', icon: vueLogo, modifiers: ['padding-y'] },
        { name: 'nuxt', url: 'https://nuxtjs.org/', icon: nuxtLogo, modifiers: ['padding-x'] },
        { name: 'typescript', url: 'https://typescriptlang.org/', icon: typescriptLogo, modifiers: [] },
        { name: 'sass', url: 'https://sass-lang.com/', icon: scssLogo, modifiers: ['padding-y'] },
        { name: 'sanity', url: 'https://sanity.io/', icon: sanityLogo, modifiers: ['bigger-img'] },
        { name: 'shopify', url: 'https://shopify.com/', icon: shopifyLogo, modifiers: ['padding-x'] },
    ];
    const projects: IProject[] = [
        {
            title: 'Abadi Art',
            url: 'abadiart.org/',
            description: 'Abadi Art is a cultural organization, which promotes art for social change',
            image: {
                src: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478430/marcus/abadiart_250_yd9iti.jpg',
                srcset: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478431/marcus/abadiart_500_x70ry2.jpg',
                alt: 'abadiart',
                webp: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478688/marcus/abadiart_500_nih4oj.webp',
                avif: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478687/marcus/abadiart_500_tmmhtj.avif',
            },
        },
        {
            title: 'Find brews',
            url: 'find-brews.com/',
            description:
                'Social app/site, reviews, pictures, blogs, friends. Find, rank, and enjoy beer and kombucha. Currently going through complete redesign...',
            modifiers: ['svg'],
            image: {
                src: beerLogo,
                srcset: beerLogo,
                alt: 'beer',
                webp: '',
                avif: '',
            },
        },
        {
            title: 'Sokol Lipa',
            url: 'sokollipa.cz/',
            description: `My wife's hometown football club featuring our nephew Tomas ;)`,
            image: {
                src: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478431/marcus/sokollipa_250_qz8eop.jpg',
                srcset: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478431/marcus/sokollipa_500_v2rvhx.jpg',
                alt: 'sokollipa',
                webp: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478689/marcus/sokollipa_500_pngxmu.webp',
                avif: 'https://res.cloudinary.com/dqrpaoopz/image/upload/v1667478687/marcus/sokollipa_500_mxstn3.avif',
            },
        },
    ];

    // methods
    const goMyWork = (): void => {
        const el = document.getElementById('my-work');
        if (el) {
            const top = window.scrollY + el?.getBoundingClientRect().top;
            window.scrollTo(0, top);
        }
    };
</script>

<svelte:head>
    <title>Marcus Wiseman | Web Developer in Spain | Vue, Nuxt, Svelte, Node, MongoDB, JavaScript</title>
    <meta
        property="og:title"
        content="Marcus Wiseman | Web Developer in Spain | Vue, Nuxt, Svelte, Node, MongoDB, JavaScript"
    />
    <meta property="og:url" content="https://marcuswiseman.com/" />

    <link rel="canonical" href="https://marcuswiseman.com/" />

    <meta
        name="description"
        content="I'm a remote American web developer living in Spain, specializing in Vue, Nuxt, Svelte, Node, MongoDB, and JavaScript. With years of experience in freelance and full-stack development, I'm passionate about bringing your project to life!"
    />
    <meta
        property="og:description"
        content="I'm a remote American web developer living in Spain, specializing in Vue, Nuxt, Svelte, Node, MongoDB, and JavaScript. With years of experience in freelance and full-stack development, I'm passionate about bringing your project to life!"
    />

    <meta
        name="keywords"
        content="web developer, Vue, Nuxt, Svelte, Node, MongoDB, JavaScript, Spain, freelance, full-stack development"
    />
    <meta
        property="og:keywords"
        content="web developer, Vue, Nuxt, Svelte, Node, MongoDB, JavaScript, Spain, freelance, full-stack development"
    />
</svelte:head>

<main id="main">
    <div class="introduction">
        <h1 class="introduction__title">I create websites.</h1>

        <div class="introduction__about">
            <p>Hey there!</p>
            <p>
                I'm Marcus Wiseman, a remote American web developer currently living the dream in Spain! I've been
                slinging code for the past 8 years, with expertise in Vue, Nuxt, Svelte, SvelteKit, Sass/SCSS, Node,
                MongoDB, and JavaScript.
            </p>
            <p>
                When I'm not busy coding up a storm, you can find me exploring the beautiful streets of Spain or trying
                out the latest tapas joint. And don't get me started on the wine! As they say, "work hard, play harder",
                am I right?
            </p>
        </div>

        <div class="introduction__see-my-work" on:click={goMyWork} on:keypress={goMyWork}>
            <div class="introduction__see-my-work__circle" />
            <p>SEE MY WORK</p>
            <img src={trendingIcon} alt="Trending right" />
        </div>
    </div>
</main>

<section id="my-work" class="my-work section">
    <!-- projects -->
    <div class="my-work__section">
        <h4 class="my-work__section__title">My projects</h4>
        <div class="my-work__projects">
            {#each projects as project}
                <MProject {project} />
            {/each}
        </div>
    </div>

    <div class="my-work__section">
        <p class="my-work__section__text">
            I'm a bit of a coding chameleon, always looking to learn new skills and stay on top of the latest tech
            trends. From working on personal projects to developing international corporate websites, I've done it all!
            If you're looking for a web developer who's passionate about what they do and loves to tackle new
            challenges, then you've come to the right place.
        </p>
    </div>

    <!-- tech stack -->
    <div class="my-work__section">
        <h4 class="my-work__section__title">My favorite tech</h4>
        <div class="my-work__tech">
            {#each techStack as techItem}
                <a
                    class={`my-work__tech__item ${techItem.modifiers.map((m) => 'my-work__tech__item--' + m)}`}
                    href={techItem.url}
                    target="_blank"
                >
                    <img src={techItem.icon} alt={techItem.name} />
                </a>
            {/each}
        </div>
    </div>

    <div class="my-work__section">
        <p class="my-work__section__text">
            So if you're ready to bring your project to life with a fun-loving and experienced web developer, then let's
            do this! Together, we'll create something truly amazing that we can both be proud of. <a
                href="/contact-me"
                class="link">LET'S TALK!</a
            >
        </p>
    </div>

    <!-- contact info -->
    <div class="my-work__section">
        <h4 class="my-work__section__title">My social links</h4>
        <div class="my-work__social__links">
            <a href="https://github.com/MarcusWiseman7" target="_blank">
                <img src={githubLogo} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/marcus-wiseman" target="_blank">
                <img src={linkedinLogo} alt="LinkedIn" />
            </a>
        </div>
    </div>
</section>

<section class="section no-padding image-container">
    <picture class="code-image">
        <img src={codeImage} alt="Code" />
    </picture>

    <div class="caption-container">
        <img src={funArrowImage} alt="Fun arrow" />
        <p class="caption-text">Look behind the scenes ;)</p>
    </div>
</section>

<MFooter />

<style lang="scss">
    main {
        position: fixed;
        top: 0;
        left: 0;
        height: calc(100vh - 60px);
        width: 100%;
        padding: 60px 16px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (min-width: 1024px) {
            padding: 0;
            height: 100vh;
        }

        .introduction {
            height: inherit;
            width: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 50px;

            @media (min-width: 600px) {
                gap: 50px;
            }

            @media (min-width: 1024px) {
                width: 66.666667%;
                max-width: 1024px;
                gap: 100px;
            }

            &__title {
                font-size: 38px;
                font-weight: 400;
                letter-spacing: 1px;

                @media (min-width: 1024px) {
                    font-size: 68px;
                }
            }

            &__about {
                letter-spacing: 1px;
                font-size: 16px;
                display: flex;
                flex-direction: column;
                gap: 10px;

                @media (min-width: 600px) {
                    font-size: 18px;
                    gap: 20px;
                }
            }

            &__see-my-work {
                position: relative;
                height: 60px;
                display: flex;
                align-items: center;
                padding-left: 26px;
                letter-spacing: 6px;
                font-size: 14px;
                cursor: pointer;

                &__circle {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                    background-color: var(--color-accent);
                    z-index: -1;
                }

                img {
                    height: 30px;
                }
            }
        }
    }

    .section {
        margin-top: 100vh;
        background-color: var(--color-dark);
        color: var(--color-light);
        z-index: 1;
        padding: 40px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        @media (min-width: 1024px) {
            padding: 80px 0;
        }

        &.no-padding {
            padding: 0;
        }
    }

    .my-work {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        &__section {
            width: 100%;

            &__title {
                font-size: 28px;
                margin-bottom: 10px;
                text-align: center;
            }

            &__text {
                font-size: 22px;
            }

            .link {
                color: var(--color-accent);
                border-bottom: 1px solid var(--color-accent);
            }
        }

        @media (min-width: 1024px) {
            gap: 80px;

            &__section {
                width: 66.666667%;
                max-width: 1024px;

                &__title {
                    font-size: 42px;
                }
            }
        }

        &__projects {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;

            @media (min-width: 1024px) {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        &__tech {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;

            &__item {
                width: 140px;
                height: 60px;
                background-color: rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s;
                border-radius: var(--rounded);

                &:hover {
                    transform: translateY(-5px);
                    transition: transform 0.3s;
                }

                img {
                    max-height: 40px;
                    width: auto;
                }

                &--padding-y {
                    padding: 8px 0;
                }

                &--padding-x {
                    padding: 0 10px;
                }

                &--bigger-img {
                    img {
                        max-height: 70px;
                    }
                }

                &--smaller-img {
                    img {
                        max-height: 30px;
                    }
                }
            }
        }

        &__social {
            &__links {
                display: flex;
                justify-content: center;
                gap: 30px;

                img {
                    height: 40px;
                }
            }
        }
    }

    .image-container {
        position: relative;

        .code-image {
            img {
                width: 100%;
                max-width: 100%;
            }
        }

        .caption-container {
            position: absolute;
            top: -78px;
            right: 0;
            display: flex;
            align-items: center;
            color: var(--color-dark);
            font-weight: 600;
            font-size: 18px;
            padding: 0 20px;
            width: 100%;
            justify-content: flex-end;
            background-color: var(--color-light);

            @media (min-width: 600px) {
                font-size: 22px;
            }

            img {
                padding-bottom: 30px;
                margin-right: 10px;
                rotate: 160deg;
            }
        }
    }
</style>

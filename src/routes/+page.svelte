<script lang="ts">
    // types
    import type { IProject, ITech } from '$lib/ts-interfaces';

    // components
    import trendingIcon from '$lib/assets/icons/trending-right.svg';
    import MProject from '$lib/components/MProject.svelte';

    // images
    import pSrc from '$lib/assets/images/2.jpg';
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
    import MFooter from '$lib/components/MFooter.svelte';
    import codeImage from '$lib/assets/images/code.webp';
    import funArrowImage from '$lib/assets/icons/fun-arrow.svg';
    import { onMount } from 'svelte';

    // data
    let monitoringScroll = false;
    let stickyClass = false;
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
            description: 'Social app/site, reviews, pictures, blogs, friends. Find, rank, and enjoy beer and kombucha',
            image: {
                src: pSrc,
                srcset: pSrc,
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

    // const checkWindowSize = (): void => {
    //     if (window.innerWidth < 600) {
    //         setupScrolling();
    //         monitoringScroll = true;
    //     } else if (monitoringScroll) {
    //         removeScrolling();
    //         monitoringScroll = false;
    //     }
    // };

    // const setupScrolling = (): void => {
    //     document.addEventListener('scroll', onScroll, { passive: true });
    // };

    // const removeScrolling = (): void => {
    //     document.removeEventListener('scroll', onScroll);
    // };

    // const onScroll = (): void => {
    //     const mainEl = document.getElementById('main');

    //     if (mainEl) {
    //         const bottom = mainEl.getBoundingClientRect().bottom;
    //         console.log('bottom, window.innerHeight :>> ', bottom, window.innerHeight);
    //         if (bottom <= window.innerHeight + 20) {
    //             mainEl.classList.add('sticky');
    //         } else {
    //             mainEl.classList.remove('sticky');
    //         }
    //         // if (document.documentElement.scrollHeight >= mainEl.scrollTop + mainEl.clientHeight) {
    //         //     mainEl.classList.add('sticky');
    //         //     // stickyClass = true;
    //         // } else {
    //         //     mainEl.classList.remove('sticky');
    //         //     // stickyClass = false;
    //         // }
    //     }
    // };

    // onMount(() => {
    //     // checkWindowSize();
    //     document.addEventListener('scroll', onScroll, { passive: true });
    // });
</script>

<!-- <svelte:body on:resize={() => checkWindowSize()} /> -->

<main id="main">
    <div class="introduction">
        <h1 class="introduction__title">I create websites.</h1>

        <p class="introduction__about">
            <span>Hey there!</span>
            <span>
                I'm Marcus Wiseman, a remote American web developer currently living the dream in Spain! I've been
                slinging code for the past 8 years, with expertise in Vue, Nuxt, Svelte, SvelteKit, Sass/SCSS, Node,
                MongoDB, and JavaScript.
            </span>
            <span>
                I'm a bit of a coding chameleon, always looking to learn new skills and stay on top of the latest tech
                trends. From working on personal projects to developing international corporate websites, I've done it
                all! If you're looking for a web developer who's passionate about what they do and loves to tackle new
                challenges, then you've come to the right place.
            </span>
            <span>
                When I'm not busy coding up a storm, you can find me exploring the beautiful streets of Spain or trying
                out the latest tapas joint. And don't get me started on the wine! As they say, "work hard, play harder",
                am I right?
            </span>
            <span>
                So if you're ready to bring your project to life with a fun-loving and experienced web developer, then
                let's do this! Together, we'll create something truly amazing that we can both be proud of.
            </span>
        </p>

        <div class="introduction__see-my-work" on:click={goMyWork} on:keypress={goMyWork}>
            <div class="introduction__see-my-work__circle" />
            <span>SEE MY WORK</span>
            <img src={trendingIcon} alt="Trending right" />
        </div>
    </div>
</main>

<section id="my-work" class="my-work section">
    <!-- projects -->
    <h5 class="my-work__section-title">Some of my projects</h5>
    <div class="my-work__projects">
        {#each projects as project}
            <MProject {project} />
        {/each}
    </div>

    <!-- tech stack -->
    <h5 class="my-work__section-title">My favorite tech</h5>
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

    <!-- contact info -->
    <h4 class="my-work__social__title">My social links</h4>
    <div class="my-work__social__links">
        <a href="https://github.com/MarcusWiseman7" target="_blank">
            <img src={githubLogo} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/marcus-wiseman" target="_blank">
            <img src={linkedinLogo} alt="LinkedIn" />
        </a>
    </div>
</section>

<section class="section no-padding image-container">
    <picture class="code-image">
        <img src={codeImage} alt="Code" />
    </picture>

    <div class="caption-container">
        <img src={funArrowImage} alt="Fun arrow" />
        <p class="caption-text">Some of this site's code ;)</p>
    </div>
</section>

<MFooter />

<style lang="scss">
    main {
        width: 100%;
        display: flex;
        padding: 0 14px;
        justify-content: center;

        // @media (min-width: 600px) {
        //     padding: 60px 14px 10px;
        // }

        @media (min-width: 1024px) {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            padding: 0;
        }

        .introduction {
            height: inherit;
            width: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;

            @media (min-width: 600px) {
                gap: 50px;
            }

            @media (min-width: 1024px) {
                width: 66.666667%;
                max-width: 1024px;
                gap: 100px;
            }

            &__title {
                font-size: 32px;
                font-weight: 400;
                letter-spacing: 1px;

                @media (min-width: 600px) {
                    font-size: 38px;
                }

                @media (min-width: 1024px) {
                    font-size: 68px;
                }

                span {
                    font-size: 30px;
                    font-weight: 600;
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
        color: var(--color-accent);
        z-index: 1;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        @media (min-width: 600px) {
            padding: 40px 14px;
        }

        @media (min-width: 1024px) {
            padding: 80px 0;
        }

        &.no-padding {
            padding: 0;
        }
    }

    .my-work {
        &__section-title {
            font-size: 32px;
            margin-bottom: 50px;
        }

        &__projects {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;
            margin-bottom: 50px;

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
            &__title {
                font-size: 28px;
                margin: 50px 0 10px 0;
            }

            &__links {
                display: flex;
                justify-content: center;
                gap: 30px;

                img {
                    height: 40px;
                }
            }
        }

        @media (min-width: 1024px) {
            &__projects {
                width: 66.666667%;
                max-width: 1024px;
                gap: 60px;
            }

            &__tech {
                width: 66.666667%;
                max-width: 1024px;
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

    // .sticky {
    //     position: fixed;
    //     bottom: 20px;
    // }
</style>

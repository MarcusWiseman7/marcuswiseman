<script lang="ts">
    // types
    import type { IProject, ITech } from '$lib/ts-interfaces';

    // components
    import trendingIcon from '$lib/assets/icons/trending-right.svg';
    import MProject from '$lib/components/MProject.svelte';

    // images
    import pSrc from '$lib/assets/images/3.jpg';
    import svelteLogo from '$lib/assets/icons/logos/svelte.svg';
    import sveltekitLogo from '$lib/assets/icons/logos/sveltekit.svg';
    import vueLogo from '$lib/assets/icons/logos/vue.svg';
    import nuxtLogo from '$lib/assets/icons/logos/nuxt.svg';
    import typescriptLogo from '$lib/assets/icons/logos/typescript.svg';
    import scssLogo from '$lib/assets/icons/logos/sass.svg';
    import sanityLogo from '$lib/assets/icons/logos/sanity.svg';
    import githubLogo from '$lib/assets/icons/logos/github.png';
    import linkedinLogo from '$lib/assets/icons/logos/linkedin.png';

    // data
    const techStack: ITech[] = [
        { name: 'svelte', url: 'https://svelte.dev/', icon: svelteLogo, modifiers: ['padding-x'] },
        { name: 'svelteKit', url: 'https://kit.svelte.dev/', icon: sveltekitLogo, modifiers: ['padding-x'] },
        { name: 'vue', url: 'https://vuejs.org/', icon: vueLogo, modifiers: ['padding-y'] },
        { name: 'nuxt', url: 'https://nuxtjs.org/', icon: nuxtLogo, modifiers: ['padding-x'] },
        { name: 'typescript', url: 'https://typescriptlang.org/', icon: typescriptLogo, modifiers: [] },
        { name: 'sass', url: 'https://sass-lang.com/', icon: scssLogo, modifiers: ['padding-y'] },
        { name: 'sanity', url: 'https://sanity.io/', icon: sanityLogo, modifiers: ['bigger-img'] },
    ];
    const projects: IProject[] = [
        {
            title: 'Abadi Art',
            url: 'abadiart.org/',
            description:
                'Abadi Art is a cultural organization, which promotes art for social change. Through activities including exhibitions, projects and involving communities and artists. Through its work Abadi Art also seeks to demonstrate that a deep engagement with social issues and communities has the ability to enrich art. It is with good reason that community art and art for social change constitute one of the most important and exciting trends in the art world today. Just as art can subvert existing social norms, an engagement with socially engaged art can allow a transformation of the very meaning of what is art, who is an artist and what are the materials an artist works with. People centred art could include for example a range of materials, including themselves, their homes and everyday objects from in their daily lives. The inclusion of representations of everyday life can often be experienced as a simple but powerful source of connection between marginalized communities and the audience. Socially engaged art promoted by us also enables artists who might otherwise work as individuals on their own to be part of spaces in which shared creative energy flows.',
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
            description: 'Social app/site, reviews, pictures, blogs, friends, find rank and enjoy beer and kombucha',
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
            description: `My wife's hometown football club, Sokol Lipa, featuring our nephew Tomas and fans and supporters from the whole family ;) from the village of Lipa, Czech Republic`,
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
            const top = el?.getBoundingClientRect().top;
            window.scrollTo(0, top);
        }
    };
</script>

<main>
    <div class="introduction">
        <h1 class="introduction__title">I create websites.</h1>
        <!-- I build impactful websites for interesting projects. -->

        <p class="introduction__about">
            I believe that websites should be interesting, personal, and unique. <br /><br /> I work with you to make
            sure your website is exactly what you need—whether that's a simple landing page or a full-on e-commerce
            website with multiple shopping carts and payment options. <br /><br /> I specialize in custom projects that
            give my clients the feeling of luxury and exclusivity, from simple sites to full online stores. My clients
            are small businesses who don't have the time or resources to manage their own website, but don't want
            something generic or cookie-cutter either. They're looking for something that will stand out from their
            competitors and make them feel like their company is top-notch.
            <a href="/contact-me" class="introduction__about__link">Let's talk</a>
        </p>

        <div class="introduction__see-my-work" on:click={goMyWork} on:keypress={goMyWork}>
            <div class="introduction__see-my-work__circle" />
            <span>SEE MY WORK</span>
            <img src={trendingIcon} alt="Trending right" />
        </div>
    </div>
</main>

<section id="my-work" class="my-work">
    <!-- projects -->
    <div class="my-work__projects">
        {#each projects as project}
            <MProject {project} />
        {/each}
    </div>

    <!-- tech stack -->
    <h5 class="my-work__tech__title">My favorite tech</h5>
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
        <a href="https://github.com/MarcusWiseman7/" target="_blank">
            <img src={githubLogo} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/marcus-wiseman/" target="_blank">
            <img src={linkedinLogo} alt="LinkedIn" />
        </a>
    </div>
</section>

<style lang="scss">
    main {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        padding: 0 14px;
        display: flex;
        justify-content: center;

        @media (min-width: 1024px) {
            padding: 0;
        }

        .introduction {
            height: inherit;
            width: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-shadow: #000 1px 0 3px;
            gap: 50px;

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

                span {
                    font-size: 30px;
                    font-weight: 600;
                }
            }

            &__about {
                letter-spacing: 1px;
                font-size: 18px;

                &__link {
                    border-bottom: 1px solid #fff;
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
                    background-color: lightblue;
                    z-index: -1;
                }

                img {
                    height: 30px;
                }
            }
        }
    }

    .my-work {
        margin-top: 100vh;
        width: 100%;
        background-color: black;
        z-index: 1;
        padding: 40px 14px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__projects {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 50px;
            margin-bottom: 50px;
        }

        &__tech {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;

            &__title {
                font-size: 32px;
                margin-bottom: 20px;
            }

            &__item {
                width: 140px;
                height: 60px;
                background-color: rgba(255, 255, 255, 0.07);
                display: flex;
                align-items: center;
                justify-content: center;

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
            padding: 80px 0;

            &__projects {
                width: 66.666667%;
                max-width: 896px;
                gap: 100px;
            }

            &__tech {
                width: 66.666667%;
                max-width: 896px;
            }
        }
    }
</style>

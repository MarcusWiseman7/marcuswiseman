<script lang="ts">
    // types
    import type { IProject } from '$lib/ts-interfaces';

    // props
    export let project: IProject;
</script>

<div class={`card ${project.modifiers ? project.modifiers.map((m) => 'card--' + m).join(' ') : ''}`}>
    <div class="front">
        <picture class="front__image">
            <source srcset={project.image.avif} type="image/avif" />
            <source srcset={project.image.webp} type="image/webp" />
            <img src={project.image.src} srcset={project.image.srcset} alt={project.image.alt} />
        </picture>
    </div>

    <div class="back">
        <a href={'https://' + project.url} target="_blank" class="back__content">
            <h2 class="back__title">{project.title}</h2>

            <p class="back__description">
                {project.description}
            </p>

            <p class="back__check-it-out">
                Check it out <span class="back__url">{project.url.slice(0, -1)}</span>
            </p>
        </a>
    </div>
</div>

<style lang="scss">
    .card {
        width: 100%;
        max-width: calc(100vw - 32px);
        aspect-ratio: 1.618;
        perspective: 1000px;
        letter-spacing: 1px;

        .front,
        .back {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            backface-visibility: hidden;
            transition: transform 1.2s ease;
            border-radius: var(--rounded);
        }

        .front {
            z-index: 2;
            transform: rotateY(0deg);
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

            &__image {
                width: 100%;
                height: 100%;

                img {
                    height: 100%;
                    width: 100%;
                    border-radius: var(--rounded);
                }
            }
        }

        &--svg .front__image {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: auto;
                height: 75%;
            }
        }

        .back {
            transform: rotateY(180deg);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
            background-color: var(--color-light);
            color: var(--color-dark);

            &__content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
            }

            &__title {
                font-size: 32px;
            }

            &__description {
                font-size: 18px;
                font-weight: 300;
                padding: 0 10px;
                text-align: justify;
                padding: 0 20px;
            }

            &__check-it-out {
                font-size: 18px;
            }

            &__url {
                border-bottom: 1px solid var(--color-light);
                width: fit-content;
            }
        }

        &:hover {
            .front {
                transform: rotateY(-180deg);
            }

            .back {
                transform: rotateY(0deg);
            }
        }
    }
</style>

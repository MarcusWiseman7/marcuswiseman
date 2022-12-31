<script lang="ts">
    // types
    import type { IProject } from '$lib/ts-interfaces';

    // props
    export let project: IProject;

    // data
    let clamped = true;

    // methods
    const toggleClamp = (): void => {
        clamped = !clamped;
    };
</script>

<div class="project">
    <div class="project__info">
        <a href={'https://' + project.url} target="_blank"><h2 class="project__title">{project.title}</h2></a>
        <p
            class={`project__description ${clamped ? 'project__description--clamped' : ''}`}
            on:click={toggleClamp}
            on:keypress={toggleClamp}
        >
            {project.description}
        </p>

        <p class="project__check-it-out">
            Check it out <a class="project__url" href={'https://' + project.url} target="_blank"
                >{project.url.slice(0, -1)}</a
            >
        </p>
    </div>

    <a href={'https://' + project.url} target="_blank">
        <picture class="project__image">
            <source srcset={project.image.avif} type="image/avif" />
            <source srcset={project.image.webp} type="image/webp" />
            <img src={project.image.src} srcset={project.image.srcset} alt={project.image.alt} />
        </picture>
    </a>
</div>

<style lang="scss">
    .project {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 30px;
        letter-spacing: 1px;

        @media (min-width: 1024px) {
            flex-direction: row;
            justify-content: space-between;
        }

        &__info {
            display: flex;
            flex-direction: column;
            gap: 18px;

            @media (min-width: 1024px) {
                max-width: 60%;
            }
        }

        &__title {
            font-size: 32px;
        }

        &__description {
            font-size: 18px;
            font-weight: 300;
            padding: 0 10px;
            cursor: pointer;

            &--clamped {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
        }

        &__check-it-out {
            font-size: 18px;
        }

        &__url {
            border-bottom: 1px solid #fff;
            width: fit-content;
        }

        &__image {
            display: flex;
            justify-content: center;

            img {
                max-height: 250px;
                width: auto;
            }
        }
    }
</style>

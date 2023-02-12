<script lang="ts">
    // types
    import type { IMessage, IContactPayload, IContactErrors } from '$lib/ts-interfaces';

    // components
    import MFooter from '$lib/components/MFooter.svelte';
    import errorIcon from '$lib/assets/icons/error.svg';

    // helpers
    import { appMessages, loading } from '$lib/stores';
    import { goto } from '$app/navigation';

    // data
    const payload: IContactPayload = {
        name: '',
        email: '',
        message: '',
    };
    const errors: IContactErrors = {
        email: '',
        message: '',
    };
    const requiredMsg = 'Please fill this out';
    const invalidEmailMsg = 'Please enter a valid email address';

    $: formOK = payload.email && !errors.email && payload.message;

    // success/error app messages
    const successMsg: IMessage = {
        message: `You've started a conversation! Please check your email for a reply from me!`,
        timeout: 6000,
        type: 'success',
        id: Date.now(),
    };
    const errorMsg: IMessage = {
        message: 'Sorry, there was an error submitting the form, please try again...',
        timeout: 6000,
        type: 'error',
        id: Date.now(),
    };

    // methods
    const checkInput = (type: string): void => {
        const value = payload[type as keyof IContactPayload];

        if (type === 'email' && !!value && typeof value === 'string') {
            errors.email = !/^\S+@\S+\.\S+$/.test(value) ? invalidEmailMsg : '';
        } else if (!!!value) {
            errors[type as keyof IContactErrors] = requiredMsg;
        } else {
            errors[type as keyof IContactErrors] = '';
        }
    };
    const onInput = (type: string): void => {
        if (errors[type as keyof IContactErrors]) {
            checkInput(type);
        }
    };
    const handleSubmit = async (): Promise<void> => {
        if (!formOK) return;

        try {
            loading.set(true);

            // set up form payload
            const formData = new FormData();
            for (const property in payload) {
                formData.append(property, payload[property as keyof IContactPayload]);
            }

            const response = await fetch('?/submission', {
                method: 'POST',
                body: formData,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            loading.set(false);

            if (result.type === 'success') {
                goto('/');
                appMessages.update((a: IMessage[]) => [...a, successMsg]);
            } else {
                appMessages.update((a: IMessage[]) => [...a, errorMsg]);
            }
        } catch (err) {
            console.warn('Error submitting form :>> ', err);
        }
    };
</script>

<div class="page">
    <form on:submit|preventDefault={handleSubmit}>
        <h1 class="title">Let's talk!</h1>

        <label for="name">Name:</label>
        <input id="name" type="text" bind:value={payload.name} />

        <label for="email" class={errors.email ? 'error' : ''}>Email:</label>
        <input
            id="email"
            type="email"
            class={errors.email ? 'error' : ''}
            bind:value={payload.email}
            on:input={() => onInput('email')}
            on:blur={() => checkInput('email')}
        />
        {#if errors.email}
            <div class="input__error-msg">
                <img src={errorIcon} alt="error" height="22" />
                <span>{errors.email}</span>
            </div>
        {/if}

        <label for="message" class={errors.message ? 'error' : ''}>Message:</label>
        <textarea
            id="message"
            class={errors.message ? 'error' : ''}
            bind:value={payload.message}
            on:input={() => onInput('message')}
            on:blur={() => checkInput('message')}
        />
        {#if errors.message}
            <div class="input__error-msg">
                <img src={errorIcon} alt="error" height="22" />
                <span>{errors.message}</span>
            </div>
        {/if}

        <button type="submit" disabled={!formOK}>Send</button>
    </form>
</div>

<MFooter />

<style lang="scss">
    .page {
        min-height: max-content;
        width: 100%;
        padding: 10vh 14px 30px;

        @media (min-width: 1024px) {
            width: 66.666667%;
            max-width: 896px;
            padding: 15vh 0 30px;
        }
    }

    form {
        max-width: 600px;
        margin: 0 auto;
        padding: 1em;
        border: 1px solid #ccc;
        color: var(--color-dark);
        background-color: var(--color-dark);
        border-radius: var(--rounded);

        h1 {
            color: var(--color-light);
            text-align: center;
            font-size: 32px;
        }

        label {
            display: block;
            margin: 0.7em 0 0.3em 0.5em;
            font-weight: bold;
            color: var(--color-light);

            &.error {
                color: var(--color-error);
            }
        }

        input,
        textarea {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ccc;
            padding: 0.5em;
            font-size: 16px;
            background-color: var(--color-light);
            border-radius: var(--rounded);

            &:focus {
                outline: none;
                border-color: #666;
            }

            &.error {
                border: 1px solid var(--color-error);
            }
        }

        textarea {
            min-height: 150px;
        }

        button[type='submit'] {
            display: block;
            width: 100%;
            margin-top: 1em;
            padding: 0.5em;
            background-color: var(--color-accent);
            color: var(--color-dark);
            font-size: 16px;
            border: none;
            cursor: pointer;
            border-radius: var(--rounded);

            &:hover {
                background-color: darken(#add8e6, 20%);
            }

            &:disabled {
                cursor: not-allowed;
            }
        }

        .input {
            &__error-msg {
                font-size: 16px;
                line-height: 1;
                color: var(--color-error);
                display: flex;
                align-items: center;
                gap: 4px;
                margin-top: 8px;

                img {
                    height: 22px;
                }
            }
        }
    }
</style>

import { writable, type Writable } from 'svelte/store';
import type { IMessage } from './ts-interfaces';

export let appMessages: Writable<IMessage[]> = writable([]);
export let loading = writable<boolean>(false);
import { writable } from 'svelte/store';
export let color = writable(0);
color.set("black");

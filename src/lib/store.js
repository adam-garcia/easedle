import { writable } from 'svelte/store';
export let playbackSpeed = writable(3);
export let playingStatus = writable("Stop");
export let animation = writable(0);
export let animationProps = writable(null);
export let guessedFamily = writable(0);
export let guessedPennerFunc = writable(0);
export let guessedPennerInOut = writable(0);
export let previousGuesses = writable([]);
export let newGame = writable(false);

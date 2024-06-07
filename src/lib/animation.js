import {animationProps, selectedDate} from '$lib/store.js';
import anime from "animejs";
import { get } from 'svelte/store'
import {randomLcg} from "d3-random";

export const LINEAR = {
  family: 'Linear',
  props: null,
  easing: 'linear'
}
// h/t https://stackoverflow.com/a/43053803
const cartesian =
  (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
export const PENNER = cartesian(
  [
    'In',
    'Out',
    'InOut',
    'OutIn'
  ],
  [
    'Quad',
    'Cubic',
    'Quart',
    'Quint',
    'Sine',
    'Expo',
    'Circ',
    'Back',
    'Bounce',
  ]
).map((el) => {
  return {
    family: 'Penner',
    props: {
      type: el[0],
      func: el[1]
    },
    easing: 'ease' + el.join('')
  }
})

export const generateAnimationProps = function() {
  let easings = [].concat(LINEAR, PENNER)
  let today = get(selectedDate)
  return easings[Math.floor(randomLcg(today)() * (easings.length - 1))]
}

export const newAnimation = function(playbackSpeed) {
  return anime({
    targets: '#circle',
    translateX: 440 - 70,
    direction: 'alternate',
    loop: true,
    easing: get(animationProps).easing,
    duration: 1000 - (playbackSpeed * 75),
    delay: 1000,
    endDelay: 1000
  })
}

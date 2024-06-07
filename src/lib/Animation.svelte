<script>
  import {playbackSpeed, playingStatus, animation, animationProps, selectedDate} from '$lib/store.js';
  import { newAnimation, generateAnimationProps } from '$lib/animation.js'
  import { onMount } from 'svelte'
  onMount(() => {
    animationProps.update(() => generateAnimationProps())
    let anim = newAnimation($playbackSpeed);
    animation.update(() => anim);
    selectedDate.subscribe(() => {
      $animation.set('#circle', {translateX: () => 0})
      animationProps.update(() => generateAnimationProps())
      $animation.pause();
      let anim = newAnimation($playbackSpeed);
      animation.update(() => anim);
      console.log($animation)
      $animation.reset();
      $animation.play();
    })
  })

</script>
<div class="container">
  <div class="row">
    <div class="column column-100">
      <svg viewBox="0 0 440 70">
        <circle cx="35" cy="35" r="35" fill="#9b4dca" id="circle"></circle>
      </svg>
    </div>
  </div>
</div>

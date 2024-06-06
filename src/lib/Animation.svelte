<script>
  import {playbackSpeed, playingStatus, animation, animationProps} from '$lib/store.js';
  import { newAnimation, generateAnimationProps } from '$lib/animation.js'
  import { onMount } from 'svelte'
  onMount(() => {
    animationProps.update(() => generateAnimationProps())
    let anim = newAnimation($playbackSpeed);
    animation.update(() => anim);
  })

</script>
<div class="container">
  <div class="row">
    <div class="column column-100">
      <svg viewBox="0 0 440 70">
        <circle cx="35" cy="35" r="35" color="red" id="circle"></circle>
      </svg>
    </div>
  </div>
</div>

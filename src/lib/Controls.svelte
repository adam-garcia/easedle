<script>
  import {playbackSpeed, playingStatus, animation, newGame} from '$lib/store.js';
  import { newAnimation } from '$lib/animation.js'
  function togglePlay(e) {
    if ($animation.paused) {
      $animation.play()
    } else {
      $animation.pause()
    }
    playingStatus.update((status) => status == "Play" ? "Stop" : "Play")
    e.target.blur()
  }
  function updateAnimationSpeed() {
    $animation.pause()
    $animation.reset()
    animation.update(() => newAnimation($playbackSpeed));
    $animation.play()
  }
</script>
<div class="container">
  <div class="row">
    <div class="column">
      <div id="controlPanel">
        <div>
          <button on:click={togglePlay}>{$playingStatus}</button>
        </div>
        <div>
          <label for="playbackSpeed">Playback Speed</label>
          <input type="range" bind:value={$playbackSpeed} on:change={updateAnimationSpeed} min=1 max=5>
        </div>
      </div>

    </div>
  </div>
</div>

<style>
  #controlPanel {
    display: flex;
  }
  #controlPanel > * {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
</style>

<style>
@import './styles/guess.css';
</style>

<script>
  import { guessedFamily, guessedPennerFunc, guessedPennerInOut, animationProps, animation, selectedDate } from '$lib/store'
  import { LINEAR, PENNER } from '$lib/animation.js'
  let cannotSubmit = true
  let showPenner = true;
  let previousGuesses = {}
  previousGuesses[$selectedDate] = []
  let newGame = false;
  selectedDate.subscribe(() => {
    previousGuesses[$selectedDate] = previousGuesses[$selectedDate] || []
    previousGuesses = previousGuesses
  })
  function updateSubmissionAllowance() {
    cannotSubmit = !$guessedFamily
    showPenner = $guessedFamily == 'Penner'
  }
  function handleSubmit() {
    let correctFamily = $guessedFamily == $animationProps.family
    if ($guessedFamily != $animationProps.family) {
      logAnswer(correctFamily, false, false)
    }
    else {
      if ($animationProps.family == 'Linear') {
        logAnswer(correctFamily, false, false)
        handleSuccess()
      } else if ($animationProps.family == 'Penner') {
        let correctInOut = $guessedPennerInOut == $animationProps.props.type
        let correctFunc = $guessedPennerFunc == $animationProps.props.func
        if (correctFunc && correctInOut) {
          logAnswer(correctFamily, correctInOut, correctFunc)
          handleSuccess()
        } else {
          logAnswer(correctFamily, correctInOut, correctFunc)
        }
      }
    }
  }
  function handleSuccess() {
    newGame = true;
    $animation.pause();
  }
  function logAnswer(correctFamily, correctInOut, correctFunc) {
    previousGuesses[$selectedDate].push(
      {
        family: {
          correct: correctFamily,
          value: $guessedFamily
        },
        params: {
          type: {
            correct: correctInOut,
            value: $guessedFamily == 'Linear' ? '-' : $guessedPennerInOut
          },
          func: {
            correct: correctFunc,
            value: $guessedFamily == 'Linear' ? '-' : $guessedPennerFunc
          }
        }
      }
    )
    previousGuesses = previousGuesses;
  }
  function composeClassForGuess(previousGuess, attr, contentType) {
    let status = undefined;
    if (attr == 'family') {
      status = previousGuess.family.correct ? 'success' : 'failure'
    } else {
      if (previousGuess.family.value == 'Linear') {
        status = 'na'
      }
      status = previousGuess.params[attr].correct ? 'success' : 'failure'
    }
    return status
  }
  function goToNextDay() {
    newGame = false;
    $animation.pause()
    guessedFamily.update(() => 0)
    guessedPennerFunc.update(() => 0)
    guessedPennerInOut.update(() => 0)
    selectedDate.update((date) => {
      return date.addDays(1)
    })
    $animation.play()
  }
  const families = Array.from(new Set([].concat(LINEAR, PENNER).map(f => f.family)))
  const pennerFuncs = Array.from(new Set(PENNER.map(d => d.props.func)))
  const pennerInOuts = Array.from(new Set(PENNER.map(d => d.props.type)))

</script>


<div class="container">
  <div class="row">
    <div class="column" id="form">
      <form on:submit|preventDefault={handleSubmit}>
        <label for="family">Family</label>
        <select id="family" bind:value={$guessedFamily} on:change={updateSubmissionAllowance}>
          {#each families as family, i}
            <option value={family}>{family}</option>
          {/each}
        </select>
        {#if showPenner}
        <label for="pennerInOut">In/Out</label>
        <select bind:value={$guessedPennerInOut}>
          {#each pennerInOuts as pennerInOut}
            <option value={pennerInOut}>{pennerInOut}</option>
          {/each}
        </select>
        <label for="pennerFunc">Function</label>
        <select bind:value={$guessedPennerFunc}>
          {#each pennerFuncs as pennerFunc}
            <option value={pennerFunc}>{pennerFunc}</option>
          {/each}
        </select>
        {/if}
        <button disabled={cannotSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
    <div class="column">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Family</th>
            <th>In/Out</th>
            <th>Function</th>
          </tr>
        </thead>
        {#each previousGuesses[$selectedDate] as previousGuess, i}
        <tr>
          <td>{i + 1}</td>
          <td class={composeClassForGuess(previousGuess, 'family')}>
            {previousGuess.family.value}
          </td>
          <td class={composeClassForGuess(previousGuess, 'type')}>
          {previousGuess.params.type.value}
          </td>
          <td class={composeClassForGuess(previousGuess, 'func')}>
          {previousGuess.params.func.value}
          </td>
        </tr>
        {/each}
      </table>
    </div>
  </div>
</div>

<!-- newGame -->
{#if newGame}
  <div class="overlay">
    <div class="overlay-content">
      <h1>🎉</h1>
      <h3 class="w-100 centered">You did it!</h3>
      <div>
        <button type="button" class="button button-lg" on:click={goToNextDay}>New Game</button>
      </div>
    </div>
  </div>
{/if}

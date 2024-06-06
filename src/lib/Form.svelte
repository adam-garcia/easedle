<style>
@import './styles/guess.css';
</style>

<script>
  import { guessedFamily, guessedPennerFunc, guessedPennerInOut, animationProps } from '$lib/store'
  import { LINEAR, PENNER } from '$lib/animation.js'
  import { invalidateAll } from '$app/navigation';
  let cannotSubmit = true
  let showPenner = true;
  let previousGuesses = []
  function updateSubmissionAllowance() {
    cannotSubmit = !$guessedFamily
    showPenner = $guessedFamily == 'Penner'
  }
  function handleSubmit() {
    checkAnswers()
  }
  function handleSuccess() {
    alert('You did it!')
  }
  function handleFailure() {
  }
  function logAnswer(correctFamily, correctInOut, correctFunc) {
    previousGuesses.push(
      {
        family: {
          correct: correctFamily,
          value: $guessedFamily
        },
        params: {
          type: {
            correct: correctInOut,
            value: $guessedPennerInOut
          },
          func: {
            correct: correctFunc,
            value: $guessedPennerFunc
          }
        }
      }
    )
    previousGuesses = previousGuesses;
  }
  function checkAnswers() {
    let correctFamily = $guessedFamily == $animationProps.family
    if ($guessedFamily != $animationProps.family) {
      logAnswer(correctFamily, false, false)
      handleFailure()
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
          handleFailure()
        }
      }
    }
  }
  function composeClassForGuess(previousGuess, attr) {
    if (attr == 'family') {
      return previousGuess.family.correct ? 'success' : 'failure'
    } else {
      if (previousGuess.family.value == 'Linear') return 'na'
      console.log(previousGuess.params[attr])
      return previousGuess.params[attr].correct ? 'success' : 'failure'
    }
  }
  const families = Array.from(new Set([].concat(LINEAR, PENNER).map(f => f.family)))
  const pennerFuncs = Array.from(new Set(PENNER.map(d => d.props.func)))
  const pennerInOuts = Array.from(new Set(PENNER.map(d => d.props.type)))

</script>


<div class="container">
  <div class="row">
    <div class="column">
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
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Family</th>
        <th>In/Out</th>
        <th>Function</th>
      </tr>
    </thead>
    {#each previousGuesses as previousGuess, i}
    <tr>
      <td>{i + 1}</td>
      <td class={composeClassForGuess(previousGuess, 'family')}></td>
      <td class={composeClassForGuess(previousGuess, 'type')}></td>
      <td class={composeClassForGuess(previousGuess, 'func')}></td>
    </tr>
    {/each}
  </table>
</div>

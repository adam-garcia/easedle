<script>
  import { DateInput } from 'date-picker-svelte'
  import { selectedDate } from '$lib/store.js'
  // https://stackoverflow.com/a/563442
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
  function incrementDate(e) {
    e.target.blur()
    selectedDate.update((date) => {
      return date.addDays(1)
    })
  }
  function decrementDate(e) {
    e.target.blur()
    selectedDate.update((date) => {
      return date.addDays(-1)
    })
  }
</script>

<div class="selected-date">
  <button class="button" type="button button-outline" on:click={decrementDate}>&larr;</button>
  <DateInput format='MM/dd/yyyy' bind:value={$selectedDate}/>
  <button class="button" type="button button-outline" on:click={incrementDate}>&rarr;</button>
</div>

<style>
  .selected-date {
    display: flex;
    flex-direction: inline;
    justify-content: center;
  }
  .selected-date button {
    font-size: 2rem;
    line-height: 2rem;
  }
</style>

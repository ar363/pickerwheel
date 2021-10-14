<script>
  import { inps } from "./stores";

  const addInp = () => {
    inps.update((init) => [{ value: "", selected: true }, ...init]);
  };

  const removeInp = (id) => {
    inps.update((init) => {
      let updatedInps = [];
      init.forEach((item, index) => {
        if (index !== id) {
          updatedInps.push(item);
        }
      });
      return updatedInps;
    });
  };

  inps.subscribe((value) => {
    localStorage.setItem("inps", JSON.stringify(value));
  });

  let sel;
  let showSel = false;
  let isSpinning = false;

  const spinWheel = () => {
    isSpinning = true;
    setTimeout(() => {
      isSpinning = false;
      let selectedInps = $inps.filter((i) => i.selected == true);

      let selInt = Math.floor(Math.random() * selectedInps.length);
      sel = selectedInps[selInt];
      showSel = true;
    }, 400)
  };

  const hideChoice = () => {
    inps.update((init) => {
      let updatedInps = [];
      let alreadyHidden = false;
      init.forEach((item) => {
        if (
          item.selected === false ||
          item.value !== sel.value ||
          alreadyHidden
        ) {
          updatedInps.push(item);
        } else {
          updatedInps.push({ value: item.value, selected: false });
          alreadyHidden = true;
        }
      });
      return updatedInps;
    });
  };
</script>

<div class="container">
  <nav class="nav">
    <a href="https://github.com/ar363/pickerwheel/blob/main/README.md" class="nav__link">About</a>
    <a href="https://github.com/ar363/pickerwheel/" class="nav__link">Github Repo</a>
  </nav>
  <h1 class="page-title">Picker Wheel Thingy</h1>
  <button class="btn-primary" on:click={spinWheel}>Spin</button>
  <hr />
  <div class="flex-bw">
    <h2>
      Inputs
      <small style="display: block; margin-top: 0.25rem;"
        >( {$inps.filter((i) => i.selected == true).length}/{$inps.length} selected
        )</small
      >
    </h2>
    <button class="btn-secondary" on:click={addInp}>+ Add Input</button>
  </div>
  <div class="inputs">
    {#each $inps as inp, index}
      <div class="inputs__opt">
        <input
          bind:checked={$inps[index].selected}
          type="checkbox"
          name=""
          id=""
          class="checkbox"
        />
        <input bind:value={$inps[index].value} type="text" class="input" />
        <button class="btn-icon-danger" on:click={() => removeInp(index)}
          >&#10006;</button
        >
      </div>
    {/each}
  </div>
</div>

{#if showSel}
  <div class="full-modal {isSpinning ? 'spinning' : ''}">
    <div class="container">
      <p>Selected Option</p>
      <h1 class="spinning-indicator">Spinning...</h1>
      <h1 class="modal-ans">
        {#if sel}
          {#if sel.value}
            {sel.value}
          {:else}
            <i>blank option</i>
          {/if}
        {:else}
          <i>all choices are hidden :/</i>
        {/if}
      </h1>
      {#if sel}
        <div class="btn-list">
          <button
            class="btn-secondary btn-secondary--inverse"
            on:click={(e) => {
              // @ts-ignore
              e.target.style.backgroundColor = "hsla(0, 0%, 100%, 15%)";
              setTimeout(() => {
                // @ts-ignore
                e.target.style.backgroundColor = "hsla(0, 0%, 100%, 0%)";
              }, 150);
              showSel = false;
            }}>Close</button
          >
          <button
            class="btn-secondary btn-secondary--inverse"
            on:click={(e) => {
              // @ts-ignore
              e.target.style.backgroundColor = "hsla(0, 0%, 100%, 15%)";
              spinWheel();
              setTimeout(() => {
                // @ts-ignore
                e.target.style.backgroundColor = "hsla(0, 0%, 100%, 0%)";
              }, 150);
            }}>Spin Again</button
          >
          <button
            class="btn-primary btn-primary--inverse"
            on:click={(e) => {
              // @ts-ignore
              e.target.style.backgroundColor = "hsla(0, 0%, 100%, 85%)";
              hideChoice();
              spinWheel();
              setTimeout(() => {
                // @ts-ignore
                e.target.style.backgroundColor = "hsla(0, 0%, 100%, 100%)";
              }, 150);
            }}>Hide Choice and Spin Again</button
          >
        </div>
      {:else}
        <div class="btn-list">
          <button
            class="btn-secondary btn-secondary--inverse"
            on:click={(e) => {
              // @ts-ignore
              e.target.style.backgroundColor = "hsla(0, 0%, 100%, 15%)";
              setTimeout(() => {
                // @ts-ignore
                e.target.style.backgroundColor = "hsla(0, 0%, 100%, 0%)";
              }, 150);
              showSel = false;
            }}>Close</button
          >
          <button
            class="btn-primary btn-primary--inverse"
            on:click={(e) => {
              // @ts-ignore
              e.target.style.backgroundColor = "hsla(0, 0%, 100%, 15%)";
              setTimeout(() => {
                // @ts-ignore
                e.target.style.backgroundColor = "hsla(0, 0%, 100%, 0%)";
              }, 150);
              inps.update((init) => {
                let updatedInps = [];
                init.forEach((element) => {
                  updatedInps.push({ ...element, selected: true });
                });
                return updatedInps;
              });
              showSel = false;
            }}>Select All Options and Close</button
          >
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  hr {
    border: 1px solid #dedede;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  small {
    font-weight: 400;
    font-size: 0.85rem;
  }

  .container {
    font-family: "Inter", sans-serif;
  }

  .container {
    max-width: 640px;
    margin: 0 auto;
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 600;
  }

  .nav {
    display: flex;
    gap: 1.5rem;
  }

  .nav__link {
    text-decoration: none;
    color: #0051b1;
  }

  .btn-primary {
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }

  .btn-primary--inverse {
    background-color: #fff;
    color: #000;
    border: 1px solid #fff;
  }

  .btn-secondary {
    background-color: transparent;
    font-size: 1rem;
    border: 1px solid #000;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 600;
    transition: 0.3s all ease;
  }

  .btn-secondary--inverse {
    border: 1px solid #fff;
    color: #fff;
  }

  .flex-bw {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .inputs__opt {
    display: flex;
    gap: 1rem;
  }

  .input {
    width: 100%;
    background-color: transparent;
    border: 1px solid #999;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
  }

  .checkbox {
    width: 36px;
    height: 36px;
    position: relative;
    top: 0;
  }

  .btn-icon-danger {
    width: 34px;
    height: 30px;
    margin-top: 2px;
    background-color: #ffa0a0;
    color: #000;
    border: none;
    border-radius: 0.25rem;
  }

  .full-modal {
    position: fixed;
    z-index: 9;
    background-color: #000;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .modal-ans {
    font-size: 4rem;
  }

  .btn-list {
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .btn-list button {
    padding: 1rem;
  }

  .full-modal.spinning {
    background-color: hsl(0, 100%, 40%);
  }

  .full-modal.spinning p {
    display: none;
  }

  .spinning-indicator {
    display: none;
    font-size: 4rem;
  }

  .full-modal.spinning .modal-ans, .full-modal.spinning .btn-list {
    display: none;
  }

  .full-modal.spinning .spinning-indicator {
    display: block;
  }
</style>

<script lang="ts">
  import { checkAll } from "./utils/common";
  import { g2p } from "./utils/g2p";
  let inputText = "";
  let result = "";
  let history: string[] = [];

  function processText() {
    let input = inputText.replaceAll(/[\.\?!,'"]/g, '');
    input = input.replaceAll(" ", "").trim();
    if (!checkAll(input)) {
      result = "한글이 아닌 문자가 포함되어 있습니다.";
      return;
    }
    input = input.normalize("NFD");

    let { text, logs } = g2p(input);
    text = text.normalize("NFC");
    result = `한글 여부 테스트: ${text}`;
    history = logs;
  }
</script>

<h1>간단한 한국어 G2P</h1>

<div>
  <input
    type="text"
    bind:value={inputText}
    placeholder="텍스트를 입력하세요"
  />
  <button on:click={processText}>한글 여부 테스트</button>
</div>

<div>
  {#if result}
    <p>{result}</p>
  {/if}
</div>

{#if history.length > 0}
    <div>
        <h3>Process Logs:</h3>
        <ol>
            {#each history as log, index}
                <li class="logs">{log}</li>
            {/each}
        </ol>
    </div>
{/if}

<style>
  div {
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  p {
    font-size: 1.2rem;
  }

  .logs {
    text-align: left;
  }
</style>

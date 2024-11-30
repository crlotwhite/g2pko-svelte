<script lang="ts">
  import { isHangul, composeAll, decomposeAll } from "./utils/common";
  import { g2p } from "./utils/g2p";
  let inputText = "";
  let result = "";

  function processText() {
    let output = g2p(decomposeAll(inputText));
    result = `한글 여부 테스트: ${output}`;
    console.log(`${inputText} => ${output}`);
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
    color: #333;
  }
</style>

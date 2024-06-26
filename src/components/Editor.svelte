<script lang="ts">
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import { getWorker } from "../lib/monaco";
  import type { File, Project } from "../lib/projects";

  export const readOnly = true;
  export let project: Project;

  let editor: monaco.editor.IStandaloneCodeEditor;
  let current: File;
  const states = {};

  window.MonacoEnvironment = { getWorker };

  async function getCode(filename: string): Promise<string> {
    const text = await (
      await fetch(`/projects/${project.name}/${filename}`)
    ).text();

    return new Promise((resolve) => resolve(text));
  }

  async function changeTab(file: File): Promise<void> {
    const code = await getCode(file.name);

    current = file;
    states[current.name] = editor.saveViewState();

    const model = monaco.editor.createModel(code, file.language);
    editor.setModel(model);
    editor.restoreViewState(states[current.name]);
    editor.focus();
  }

  onMount(async () => {
    if (!project.files?.length) return;

    editor = monaco.editor.create(document.getElementById("monaco"), {
      readOnly,
      minimap: {
        enabled: false,
      },
    });
    changeTab(project.files[0]);
  });
</script>

<div class="editor">
  {#if project.files?.length}
    <ul class="tabs">
      {#each project.files as file}
        <li>
          <button
            class="tab"
            class:active={file.name === current?.name}
            on:click={() => changeTab(file)}>{file.name}</button
          >
        </li>
      {/each}
    </ul>
  {:else}
    <span>
      The code can be found in the <a
        href="https://github.com/kitcat-dev/demos/tree/main/public/projects/{project.name}"
        target="_blank">repository</a
      >.</span
    >
  {/if}
  <div id="monaco" />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #monaco {
    flex-grow: 1;
  }

  .tabs {
    display: flex;

    margin-bottom: 3px;
  }

  .tab {
    background-color: gainsboro;
    background-clip: padding-box;
    border: none;
    padding: 5px;
    margin-right: 3px;
    cursor: pointer;

    border-bottom: 3px solid transparent;
  }

  .tab.active {
    border-color: tomato;
  }
</style>

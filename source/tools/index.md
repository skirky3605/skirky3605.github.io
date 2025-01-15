---
title: 小工具
description: 各种各样的实用小工具
---
{% raw %}
<div id="vue-app">
  <settings-group>
    <template #header>
      <h3 id="settings-group" class="unset">设置组</h3>
    </template>
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/settings_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="settings-card" class="unset">设置卡片</h4>
      </template>
      <template #description>
        这是一个设置卡片
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
      <button>按钮</button>
    </settings-card>
    <settings-button href="javascript:void(0)">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/settings_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="settings-button" class="unset">设置按钮</h4>
      </template>
      <template #description>
        这是一个设置按钮
      </template>
    </settings-button>
  </settings-group>
</div>

<template id="svg-host-template">
  <div class="svg-host" v-html="innerHTML"></div>
</template>

<template id="settings-presenter-template">
  <div class="settings-presenter">
    <div class="header-root">
      <div class="icon-holder" v-check-solt="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel">
        <span v-check-solt="$slots.header">
          <slot name="header"></slot>
        </span>
        <span class="description" v-check-solt="$slots.description">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter" v-check-solt="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<template id="settings-card-template">
  <div class="settings-card">
    <div class="content-grid">
      <settings-presenter class="presenter">
        <template #icon>
          <slot name="icon"></slot>
        </template>
        <template #header>
          <slot name="header"></slot>
        </template>
        <template #description>
          <slot name="description"></slot>
        </template>
        <slot></slot>
      </settings-presenter>
    </div>
  </div>
</template>

<template id="settings-button-template">
  <a class="settings-button">
    <div class="content-grid">
      <settings-presenter class="presenter">
        <template #icon>
          <slot name="icon"></slot>
        </template>
        <template #header>
          <slot name="header"></slot>
        </template>
        <template #description>
          <slot name="description"></slot>
        </template>
        <slot></slot>
      </settings-presenter>
      <div class="action-icon-holder">
        <slot name="action-icon">
          <svg-host
            src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
        </slot>
      </div>
    </div>
  </a>
</template>

<template id="settings-group-template">
  <div class="settings-group">
    <div class="header-presenter" v-check-solt="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="items-presenter" v-check-solt="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  createApp({
    data() {
    }
  }).directive("check-solt",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const solt = binding.value;
        if (solt !== binding.oldValue) {
          function setDisplay(value) {
            if (value) {
              if (element.style.display === "none") {
                element.style.display = '';
              }
            }
            else {
              element.style.display = "none";
            }
          }
          if (typeof solt === "function") {
            let value = solt();
            if (value instanceof Array) {
              value = value[0];
              if (typeof value === "object") {
                if (typeof value.type === "symbol") {
                  value = value.children;
                  if (value instanceof Array) {
                    setDisplay(value.length);
                    return;
                  }
                }
                else {
                  setDisplay(true);
                  return;
                }
              }
            }
          }
          setDisplay(false);
        }
      }
    }
  ).component("svg-host", {
    template: "#svg-host-template",
    props: {
      src: String
    },
    data() {
      return {
        innerHTML: null
      }
    },
    watch: {
      src(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getSVGAsync(newValue).then(svg => this.innerHTML = svg);
        }
      }
    },
    methods: {
      async getSVGAsync(src) {
        if (src) {
          try {
            return await fetch(src)
              .then(response => response.text());
          }
          catch (ex) {
            console.error(ex);
          }
        }
        return '';
      }
    },
    mounted() {
      this.getSVGAsync(this.src).then(svg => this.innerHTML = svg);
    }
  }).component("settings-presenter", {
    template: "#settings-presenter-template"
  }).component("settings-card", {
    template: "#settings-card-template"
  }).component("settings-button", {
    template: "#settings-button-template",
    mounted() {
      if (typeof pjax !== "undefined") {
        pjax.attachLink(this.$refs.anchor);
      }
    }
  }).component("settings-group", {
    template: "#settings-group-template"
  }).mount("#vue-app");
</script>

<style>
  #vue-app * {
    --settings-card-padding: 16px;
  }

  #vue-app .stack-vertical {
    display: flex;
    flex-direction: column;
  }

  #vue-app .stack-horizontal {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #vue-app h6.unset,
  #vue-app h5.unset,
  #vue-app h4.unset,
  #vue-app h3.unset,
  #vue-app h2.unset,
  #vue-app h1.unset {
    margin-top: unset;
    margin-bottom: unset;
    font-weight: unset;
    font-family: unset;
    font-size: unset;
    line-height: unset;
  }

  .svg-host {
    display: flex;
  }

  .settings-presenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-presenter * {
    --settings-card-description-font-size: var(--caption-text-block-font-size);
    --settings-card-header-icon-max-size: 20px;
    --settings-card-header-icon-margin: 0 20px 0 2px;
    --settings-card-vertical-header-content-spacing: 8px 0 0 0;
  }

  .settings-presenter div.header-root {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .settings-presenter div.icon-holder {
    max-width: var(--settings-card-header-icon-max-size);
    max-height: var(--settings-card-header-icon-max-size);
    margin: var(--settings-card-header-icon-margin);
    fill: currentColor;
  }

  .settings-presenter div.header-panel {
    display: flex;
    flex-direction: column;
    margin: 0 24px 0 0;
  }

  .settings-presenter span.description {
    font-size: var(--settings-card-description-font-size);
    color: var(--text-fill-color-secondary);
  }

  .settings-presenter div.content-presenter {
    display: grid;
  }

  .settings-presenter a.text-button {
    font-weight: bold;
    text-decoration: unset;
  }

  @media (max-width: 600px) {
    .settings-presenter {
      flex-flow: column;
      justify-content: unset;
      align-items: unset;
    }

    .settings-presenter div.header-panel {
      margin: unset;
    }

    .settings-presenter div.content-presenter {
      margin: var(--settings-card-vertical-header-content-spacing);
    }
  }

  .settings-card {
    display: block;
    box-sizing: border-box;
    background: var(--card-background-fill-color-default);
    color: var(--text-fill-color-primary);
    border: 1px solid var(--card-stroke-color-default);
    border-radius: var(--control-corner-radius);
  }

  .settings-card .presenter {
    padding: var(--settings-card-padding);
  }

  .settings-button {
    cursor: pointer;
    display: block;
    box-sizing: border-box;
    background: var(--card-background-fill-color-default);
    color: var(--text-fill-color-primary);
    border: 1px solid var(--card-stroke-color-default);
    border-radius: var(--control-corner-radius);
    text-decoration: inherit;
  }

  .settings-button:hover {
    background: var(--control-fill-color-secondary);
    color: var(--text-fill-color-primary);
  }

  .settings-button:active {
    background: var(--control-fill-color-tertiary);
    color: var(--text-fill-color-secondary);
  }

  .settings-button * {
    --settings-button-padding: 16px 0 16px 16px;
  }

  .settings-button .presenter {
    padding: var(--settings-button-padding);
    flex: 1;
  }

  .settings-button div.content-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-button div.action-icon-holder {
    width: 32px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    fill: currentColor;
  }

  .settings-group * {
    --body-strong-text-block-font-size: var(--body-text-block-font-size);
  }

  .settings-group div.header-presenter {
    margin: 1rem 0 6px 1px;
    font-size: var(--body-strong-text-block-font-size);
    font-weight: bold;
    color: var(--text-fill-color-primary);
  }

  .settings-group div.items-presenter {
    display: flex;
    flex-direction: column;
    row-gap: 0.3rem;
  }
</style>
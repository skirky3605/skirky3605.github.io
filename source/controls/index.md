---
title: 控件
description: 控件预览
---
{% raw %}
<div id="vue-app">
  <div class="vertical-div">
    <div class="group-div">
      按钮：
      <div class="horizontal-div">
        <button>按钮</button>
        <button class="accent">按钮</button>
        <button disabled>按钮</button>
        <button class="accent" disabled>按钮</button>
      </div>
    </div>
    <div class="group-div">
      输入：
      <div class="horizontal-div">
        <input type="button" value="按钮" :disabled="isDisabled" />
        <input type="checkbox" v-model="isDisabled" />
        <input type="color" :disabled="isDisabled" />
        <input type="date" :disabled="isDisabled" />
        <input type="datetime" value="日期" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="datetime-local" :disabled="isDisabled" />
        <input type="email" value="邮箱" :disabled="isDisabled" />
        <input type="file" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="hidden" :disabled="isDisabled" />
        <input type="image" :disabled="isDisabled" />
        <input type="month" :disabled="isDisabled" />
        <input type="number" value="123" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="password" value="密码" :disabled="isDisabled" />
        <input type="radio" :disabled="isDisabled" />
        <input type="range" :disabled="isDisabled" />
        <input type="reset" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="search" value="搜索" :disabled="isDisabled" />
        <input type="submit" :disabled="isDisabled" />
        <input type="tel" value="电话" :disabled="isDisabled" />
        <input type="text" value="文本" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="time" :disabled="isDisabled" />
        <input type="url" value="网址" :disabled="isDisabled" />
        <input type="week" :disabled="isDisabled" />
      </div>
    </div>
    <div class="group-div">
      文本框：
      <div class="horizontal-div">
        <textarea>文本框</textarea>
        <textarea disabled>文本框</textarea>
      </div>
    </div>
    <div class="group-div">
      选项框：
      <div class="horizontal-div">
        <select>
          <option>选项1</option>
          <option>选项2</option>
          <option>选项3</option>
        </select>
        <select disabled>
          <option>选项1</option>
          <option>选项2</option>
          <option>选项3</option>
        </select>
      </div>
    </div>
  </div>
</div>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  createApp({
    data() {
      return {
        isDisabled: false
      }
    }
  }).mount("#vue-app");
</script>

<style>
  #vue-app .vertical-div {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  #vue-app .group-div {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
  }

  #vue-app .horizontal-div {
    display: flex;
    column-gap: 4px;
  }
</style>
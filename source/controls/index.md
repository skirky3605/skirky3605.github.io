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
        <input type="checkbox" value="单选" v-model="isDisabled" />
        <input type="color" value="颜色" :disabled="isDisabled" />
        <input type="date" value="日期" :disabled="isDisabled" />
        <input type="datetime" value="日期" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="datetime-local" value="日期" :disabled="isDisabled" />
        <input type="email" value="邮箱" :disabled="isDisabled" />
        <input type="file" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="hidden" value="隐藏" :disabled="isDisabled" />
        <input type="image" value="图片" :disabled="isDisabled" />
        <input type="month" value="月份" :disabled="isDisabled" />
        <input type="number" value="123" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="password" value="密码" :disabled="isDisabled" />
        <input type="radio" value="选项" :disabled="isDisabled" />
        <input type="range" value="范围" :disabled="isDisabled" style="padding: 0;" />
        <input type="reset" value="重置" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="search" value="搜索" :disabled="isDisabled" />
        <input type="submit" value="提交" :disabled="isDisabled" />
        <input type="tel" value="电话" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="text" value="文本" :disabled="isDisabled" />
        <input type="time" value="时间" :disabled="isDisabled" />
        <input type="url" value="网址" :disabled="isDisabled" />
      </div>
      <div class="horizontal-div">
        <input type="week" value="周" :disabled="isDisabled" />
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
      meter：
      <div class="horizontal-div">
        <meter value="0.5" min="0" max="1"></meter>
      </div>
    </div>
    <div class="group-div">
      进度条：
      <div class="horizontal-div">
        <progress value="50" max="100"></progress>
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
    <div class="group-div">
      权限：
      <div class="horizontal-div">
        <permission type="camera"></permission>
        <permission type="microphone"></permission>
      </div>
    </div>
  </div>
</div>
{% endraw %}

> 引用

`code`

<mark>mark</mark>

<kbd>kbd</kbd>

<a>123<code>456</code></a>

```html
<code>code</code>
<mark>mark</mark>
<kbd>kbd</kbd>
```

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
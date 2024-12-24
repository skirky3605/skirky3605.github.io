---
title: 余额计算器
description: 在线计算余额
---
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  .container {
    max-width: 400px;
    margin: 0 auto;
  }

  label,
  input,
  button,
  .result {
    display: block;
    margin: 10px 0;
  }

  input,
  button {
    padding: 10px;
    font-size: 1rem;
  }
</style>

<label for="hexInput">输入16进制字符串:</label>
<input type="text" id="hexInput" placeholder="至少输入16位16进制字符串" />
<button onclick="calculateBalance()">计算余额</button>
<span class="result" id="result"></span>

<script>
  function calculateBalance() {
    const input = document.getElementById('hexInput').value.trim();
    const resultDiv = document.getElementById('result');
    // 校验输入是否为有效的16进制且长度至少为16位
    if (input.length < 16) {
      resultDiv.textContent = "请输入至少16位有效的16进制字符串！";
      resultDiv.style.color = "red";
      return;
    }
    // 只取前16位
    const validInput = input.slice(9, 25);
    // 模拟 System.arraycopy 的功能
    // 假设从索引9开始，复制16个字节
    const sourceArray = input.match(/.{1,2}/g).map(hex => parseInt(hex, 16)); // 转为字节数组
    const targetArray = sourceArray.slice(9, 9 + 16); // 提取从索引9开始的16个字节
    // 模拟取 info[3] 和 info[2] 的值
    const byte2 = targetArray.slice(12, 14);
    const byte3 = targetArray.slice(14, 16);
    // 将16进制转换为整数并计算
    const combinedHex = byte3 + byte2; // 拼接为完整的16进制数
    const hexToInt = parseInt(combinedHex, 16);
    const doubleValue = (hexToInt / 100).toFixed(2); // 转换为小数并保留两位小数
    // 输出结果
    resultDiv.textContent = `余额为：${doubleValue}`;
    resultDiv.style.color = "green";
  }
</script>
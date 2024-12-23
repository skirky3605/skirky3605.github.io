---
title: Password Generator
description: 生成密码的在线工具
---
<script>
  function intToHex(value) {
    // 将整数转换为两位十六进制字符串
    return (value & 0xFF).toString(16).toUpperCase().padStart(2, '0');
  }
  function hexStringToBytes(hexString) {
    // 将十六进制字符串转换为字节数组
    let byteArray = [];
    for (let i = 0; i < hexString.length; i += 2) {
      byteArray.push(parseInt(hexString.substr(i, 2), 16));
    }
    return byteArray;
  }
  function calculatePassword(cardId) {
    let cardIdBytes = hexStringToBytes(cardId); // 将十六进制字符串转换为字节数组
    let result = "0A";
    // 对每个字节进行按位取反并转换为十六进制
    cardIdBytes.forEach(byte => {
      let reversedByte = byte ^ 0xFF; // 按位取反
      result += intToHex(reversedByte);
    });
    result += "81"; // 添加末尾的 "81"
    return result;
  }
  function generatePassword() {
    // 获取输入的十六进制字符串
    let cardId = document.getElementById("cardId").value;
    // 调用计算密码的函数
    let password = calculatePassword(cardId);
    // 显示计算结果
    document.getElementById("passwordResult").innerText = "计算后的密码: " + password;
  }
</script>

<label for="cardId">请输入十六进制卡片ID:</label>
<input type="text" id="cardId" placeholder="例如: 15C5AE1F6108040003D0BAE87CEF1B90">
<button onclick="generatePassword()">生成密码</button>

<p id="passwordResult"></p>
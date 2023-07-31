// script.js

document.addEventListener("DOMContentLoaded", function() {
  // 获取头像元素
  const avatar = document.getElementById("avatar");

  // 设置头像的初始位置（遮住 ID）
  avatar.style.left = "50%";
  avatar.style.transform = "translateX(-50%)";

  // 等待一段时间后，添加动画
  setTimeout(function() {
    avatar.style.transition = "left 1s ease-out";
    avatar.style.left = "25%"; // 向左移动到25%的位置
  }, 0); // 等待1秒后开始动画，这个时间可以根据需要调整
});

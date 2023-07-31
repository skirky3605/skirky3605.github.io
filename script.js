// 生成随机颜色，确保两种颜色的差异明显
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color1, color2;
    do {
        color1 = '#';
        color2 = '#';
        for (let i = 0; i < 6; i++) {
            color1 += letters[Math.floor(Math.random() * 16)];
            color2 += letters[Math.floor(Math.random() * 16)];
        }
    } while (Math.abs(parseInt(color1, 16) - parseInt(color2, 16)) < 0x333333); // 确保两种颜色的差异明显

    return [color1, color2];
}

// 应用随机渐变颜色
function applyRandomGradient() {
    const links = document.querySelectorAll('.articles a.random-link');
    links.forEach(link => {
        const [randomColor1, randomColor2] = getRandomColor();
        const gradient = `linear-gradient(135deg, ${randomColor1}, ${randomColor2})`;

        link.style.background = gradient;
    });
}

// 页面加载完毕后生成并应用随机渐变颜色
window.addEventListener('load', () => {
    applyRandomGradient();
});

// 当窗口大小改变时重新生成并应用随机渐变颜色（可选）
window.addEventListener('resize', () => {
    applyRandomGradient();
});

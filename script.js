function getCdnLink() {
    const url = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    
    const githubRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/blob\/([\w-]+)\/(.+\.mp4)$/;
    if (!githubRegex.test(url)) {
        result.innerHTML = 'URL GitHub không hợp lệ. Phải là link /blob/ đến tệp .mp4.';
        copyButton.style.display = 'none';
        return;
    }

    try {
        const match = url.match(githubRegex);
        const user = match[1];
        const repo = match[2];
        const branch = match[3];
        const path = match[4];
        const cdnUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${path}`;
        result.innerHTML = `Link CDN: <a href="${cdnUrl}" target="_blank">${cdnUrl}</a>`;
        copyButton.style.display = 'inline-block';
        copyButton.setAttribute('data-link', cdnUrl);
    } catch (error) {
        result.innerHTML = 'Lỗi tạo link CDN, vui lòng thử lại';
        copyButton.style.display = 'none';
    }
}

function copyLink() {
    const copyButton = document.getElementById('copyButton');
    const link = copyButton.getAttribute('data-link');
    navigator.clipboard.writeText(link).then(() => {
        alert('Đã sao chép link!');
    }).catch(error => {
        console.log('Lỗi sao chép:', error);
    });
}

function clearInput() {
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    
    urlInput.value = '';
    result.innerHTML = '';
    copyButton.style.display = 'none';
}

const music = document.getElementById('backgroundMusic');
const speakerIcon = document.getElementById('speakerIcon');
let isPlaying = false;
let isMuted = false;

function toggleMusic() {
    if (!isPlaying && !isMuted) {
        music.play().then(() => {
            isPlaying = true;
            speakerIcon.textContent = '🔊';
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}

function toggleSpeaker() {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        isMuted = true;
        speakerIcon.textContent = '🔇';
    } else {
        music.play().then(() => {
            isPlaying = true;
            isMuted = false;
            speakerIcon.textContent = '🔊';
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}



document.addEventListener('mousemove', toggleMusic);
document.addEventListener('touchstart', toggleMusic);
document.addEventListener('touchend', toggleMusic);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.speaker-button')) {
        toggleMusic();
    }
});

window.addEventListener('load', () => {
    const bgImage = new Image();
    bgImage.src = 'https://raw.githubusercontent.com/tongtrankien1605/tongtrankien1605/main/global/image/city-night.jpg';
    bgImage.onload = () => console.log('Ảnh nền tải thành công');
    bgImage.onerror = () => console.log('Lỗi tải ảnh nền, kiểm tra link');
});
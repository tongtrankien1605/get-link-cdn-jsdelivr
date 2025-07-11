// Khởi tạo trạng thái nhạc nền
const music = document.getElementById('backgroundMusic');
const speakerIcon = document.getElementById('speakerIcon');
let isPlaying = false;
let isMuted = false;

function getCdnLink() {
    const githubLink = document.getElementById('urlInput').value.trim();
    const resultElement = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    // Biểu thức chính quy để phân tích link GitHub
    const rawPattern = /https?:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/;
    const nonRawPattern = /https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/;

    let user, repo, branch, path, cdnUrl;

    // Kiểm tra link raw
    const rawMatch = githubLink.match(rawPattern);
    // Kiểm tra link không raw
    const nonRawMatch = githubLink.match(nonRawPattern);

    if (rawMatch) {
        user = rawMatch[1];
        repo = rawMatch[2];
        branch = rawMatch[3];
        path = rawMatch[4];
    } else if (nonRawMatch) {
        user = nonRawMatch[1];
        repo = nonRawMatch[2];
        branch = nonRawMatch[3];
        path = nonRawMatch[4];
    } else {
        resultElement.innerHTML = 'Link GitHub không hợp lệ. Vui lòng dùng link raw hoặc blob.';
        copyButton.style.display = 'none';
        return;
    }

    // Tạo link CDN
    if (branch) {
        cdnUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${path}`;
    } else {
        cdnUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}/${path}`;
    }

    // Hiển thị kết quả và nút sao chép
    resultElement.innerHTML = `Link CDN: <a href="${cdnUrl}" target="_blank">${cdnUrl}</a>`;
    copyButton.style.display = 'inline-block';
    copyButton.setAttribute('data-link', cdnUrl); // Lưu link để sao chép
}

// Xóa nội dung ô nhập
function clearInput() {
    document.getElementById('urlInput').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('copyButton').style.display = 'none';
}

// Sao chép link CDN
function copyLink() {
    const copyButton = document.getElementById('copyButton');
    const link = copyButton.getAttribute('data-link');
    navigator.clipboard.writeText(link).then(() => {
        alert('Đã sao chép link CDN!');
    }).catch(err => {
        console.error('Lỗi khi sao chép:', err);
    });
}

// Dán từ clipboard
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('urlInput').value = text;
        document.getElementById('result').innerHTML = '';
        document.getElementById('copyButton').style.display = 'none';
        // alert('Đã dán URL!');
    } catch (error) {
        console.log('Lỗi dán từ clipboard:', error);
        alert('Không thể dán từ clipboard. Vui lòng dán thủ công.');
    }
}

// Điều khiển nhạc nền khi tương tác
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

// Điều khiển nút loa
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

// Sự kiện tương tác để phát nhạc
document.addEventListener('mousemove', toggleMusic);
document.addEventListener('touchstart', toggleMusic);
document.addEventListener('touchend', toggleMusic);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.speaker-button')) {
        toggleMusic();
    }
});

// Kiểm tra tải ảnh nền
window.addEventListener('load', () => {
    const bgImage = new Image();
    bgImage.src = 'https://cdn.jsdelivr.net/gh/tongtrankien1605/tongtrankien1605@main/global/image/city-night.jpg';
    bgImage.onload = () => console.log('Ảnh nền tải thành công');
    bgImage.onerror = () => console.log('Lỗi tải ảnh nền, kiểm tra link');
    // Ẩn nút dán nếu clipboard API không được hỗ trợ
    if (!navigator.clipboard || !navigator.clipboard.readText) {
        document.querySelector('.paste-button').style.display = 'none';
    }
});
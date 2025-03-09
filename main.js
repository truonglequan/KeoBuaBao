let playerScore = 0;  
let compScore = 0;     

function getComputerChoice() {
    const comp = Math.random();  // Tạo số ngẫu nhiên từ 0 đến 1
    if (comp < 0.34) return 'scissors';  // 34% khả năng chọn "kéo"
    if (comp >= 0.34 && comp < 0.67) return 'paper';  // 33% khả năng chọn "bao"
    return 'rock';  // 33% khả năng chọn "đá"
}

function getResult(comp, player) {
    if (player === comp) return 'Hòa!';  // Nếu hai lựa chọn giống nhau thì hòa
    if (player === 'scissors') return (comp === 'paper') ? 'Bạn thắng!' : 'Bạn thua!';  
    // Nếu người chơi chọn kéo: thắng nếu máy chọn giấy, thua nếu máy chọn đá
    if (player === 'paper') return (comp === 'scissors') ? 'Bạn thua!' : 'Bạn thắng!';
    // Nếu người chơi chọn giấy: thắng nếu máy chọn đá, thua nếu máy chọn kéo
    if (player === 'rock') return (comp === 'paper') ? 'Bạn thua!' : 'Bạn thắng!';
    // Nếu người chơi chọn đá: thắng nếu máy chọn kéo, thua nếu máy chọn giấy
}

function updateScore(result) {
    if (result === 'Bạn thắng!') {
        playerScore += 1;  // Tăng điểm người chơi nếu thắng
    } else if (result === 'Bạn thua!') {
        compScore += 1;  // Tăng điểm máy nếu người chơi thua
    }
}

function checkWinner() {
    if (playerScore >= 5) {  // Nếu người chơi đạt 5 điểm
        displayWinner("Bạn đã thắng trò chơi!");  // Hiển thị thông báo thắng
    } else if (compScore >= 5) {  // Nếu máy đạt 5 điểm
        displayWinner("Bạn đã thua trò chơi!");  // Hiển thị thông báo thua
    }
}

function displayWinner(message) {
    const winnerPopup = document.getElementById('winnerPopup');  // Lấy phần tử hiển thị kết quả
    const winnerMessage = document.getElementById('winnerMessage');  

    winnerMessage.textContent = message;  // Cập nhật nội dung thông báo
    winnerPopup.style.display = 'flex';  // Hiển thị thông báo
}

function resetGame() {
    playerScore = 0;  // Reset điểm người chơi
    compScore = 0;  // Reset điểm máy
    document.querySelector('.player-score').textContent = playerScore;
    document.querySelector('.computer-score').textContent = compScore;

    const winnerPopup = document.getElementById('winnerPopup');
    winnerPopup.style.display = 'none';  // Ẩn cửa sổ thông báo
}

function randomPicture() {
    const compImg = document.querySelector('.computer-img');  // Lấy ảnh của máy
    const img = ['scissors', 'paper', 'rock'];  // Mảng chứa các hình ảnh
    let i = 0;  
    const start = new Date().getTime();  // Lấy thời gian bắt đầu
    const intervalId = setInterval(function() {
        if (new Date().getTime() - start > 1000) {  
            clearInterval(intervalId);  // Dừng hiệu ứng sau 1 giây
            return;
        }
        compImg.setAttribute('src', 'img/' + img[i++] + '.png');  // Thay đổi hình ảnh mỗi 100ms
        if (i === img.length) {
            i = 0;  // Quay lại hình đầu tiên nếu hết danh sách
        }
    }, 100);
}

const choices = document.querySelectorAll('.player-area ul li img');  // Lấy danh sách ảnh người chơi có thể chọn

choices.forEach(function(img) {
    img.addEventListener('click', function() {  // Khi người chơi nhấn vào ảnh
        const computerChoice = getComputerChoice();  // Máy chọn ngẫu nhiên
        const playerChoice = img.className;  // Lấy lựa chọn của người chơi

        const result = getResult(computerChoice, playerChoice);  // Xác định kết quả

        randomPicture();  // Chạy hiệu ứng hình ảnh ngẫu nhiên
        setTimeout(function() {
            const compImg = document.querySelector('.computer-img');
            compImg.setAttribute('src', 'img/' + computerChoice + '.png');  // Cập nhật hình ảnh máy

            updateScore(result);  // Cập nhật điểm số

            document.querySelector('.player-score').textContent = playerScore;
            document.querySelector('.computer-score').textContent = compScore;

            checkWinner();  // Kiểm tra xem có ai thắng chưa

            const info = document.querySelector('.info');
            info.innerHTML = result;  // Hiển thị kết quả
        }, 1000);
    });
});

const restartButton = document.getElementById('restartGameBtn');
restartButton.addEventListener('click', resetGame);  // Khi nhấn nút restart, trò chơi sẽ reset

function updateScore(result) {
    const playerScoreElement = document.querySelector('.player-score');
    const computerScoreElement = document.querySelector('.computer-score');
    
    // Tạo phần tử hiệu ứng điểm +1
    const pointElement = document.createElement('span');
    pointElement.textContent = '+1';
    pointElement.classList.add('point-animation');
    
    // Nếu kết quả là hòa thì không làm gì cả
    if (result === 'Hòa!') {
        return;
    }

    // Xác định ai được cộng điểm
    let targetElement;
    if (result === 'Bạn thắng!') {
        playerScore += 1;  // Tăng điểm người chơi nếu thắng
        targetElement = playerScoreElement;  // Gán hiệu ứng vào điểm người chơi
    } else if (result === 'Bạn thua!') {
        compScore += 1;  // Tăng điểm máy nếu người chơi thua
        targetElement = computerScoreElement;  // Gán hiệu ứng vào điểm máy
    }

    // Thêm phần tử hiệu ứng vào trang
    document.body.appendChild(pointElement);

    // Lấy vị trí của điểm cần cập nhật
    const targetPosition = targetElement.getBoundingClientRect();
    
    // Đặt vị trí ban đầu của hiệu ứng +1
    pointElement.style.left = `${targetPosition.left + targetPosition.width / 2 - 20}px`;
    pointElement.style.top = `${targetPosition.top + targetPosition.height / 2 - 20}px`;

    // Cập nhật điểm số sau 1 giây (khi hiệu ứng hoàn thành)
    setTimeout(function() {
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = compScore;
    }, 1000);

    // Xóa hiệu ứng +1 sau 1 giây
    setTimeout(function() {
        pointElement.remove();
    }, 1000);
}

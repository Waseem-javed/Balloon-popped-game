
	let colors = ['red','yellow','green','violet','blue'];
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let body = document.body;
	let scores = document.querySelectorAll('.score');
	let num = 0;
	let total = 10;
	let currentBalloon = 0;
	let gameOver = false;
	let totalShadow = document.querySelector('.total-shadow');
	let startGameButton = document.querySelector('.startGame');

	function createBalloon(){
	let div = document.createElement('div');
	let rand = Math.floor(Math.random() * colors.length);
	div.className = 'balloon balloon-'+colors[rand]; 

	rand = Math.floor(Math.random() * (windowWidth- 100))
	div.style.left = rand + 'px';
	div.dataset.number = currentBalloon;
	currentBalloon++;
	body.appendChild(div);
	animateBalloon(div);
	}


function animateBalloon(element){
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	let interval = setInterval(frame,12 - Math.floor(num / 10) + random);
	function frame(){
		if(pos>=(windowHeight +200) && (document.querySelector('[data-number="'+element.dataset.number+'"]') !== null)){
			clearInterval(interval);
			gameOver = true;
		}else{
			pos++;
			element.style.top = windowHeight - pos + 'px';
		}
	}
}

function deleteBalloon(element){
	element.remove();
	num++;
	updateScore();
	playBallSound(); 
}

function playBallSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}

function updateScore(){
	for (var i = 0; i < scores.length; i++) {
		scores[i].textContent = num;
	}
}


function startGame(){
	restartGame();
	let timeout = 0;
	let loop = setInterval(function(){
		timeout = Math.floor(Math.random() * 600 - 100)
		if(!gameOver && num !== total){
		createBalloon();	
		}else if(num !== total){
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
			document.querySelector('.bg-audio').pause();
		}else{
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
			document.querySelector('.bg-audio').pause();
		}
	},800 + timeout)
}


function restartGame(){
	let removeAll = document.querySelectorAll('.balloon');
	for (var i =0 ;i< removeAll.length; i++) {
		removeAll[i].remove();
	}
	gameOver = false;
	num = 0;
	updateScore();
}

document.addEventListener('click',function(event){
	if(event.target.classList.contains('balloon')){	
	deleteBalloon(event.target)	
	}
});

document.querySelector('.restart').addEventListener('click',function(){
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.lose').style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	startGame();
	document.querySelector('.bg-audio').play();
})

document.querySelector('.cancel').addEventListener('click',function(){
	totalShadow.style.display = 'none';
	document.querySelector('.bg-audio').play();
})

startGameButton.addEventListener('click',function(){
	startGame();
	document.querySelector('.bg-audio').play();
	document.querySelector('.start-game-window').style.display = 'none';
});

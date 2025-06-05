document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const flipButtons = document.querySelectorAll('.flip-button');
    const musicButton = document.querySelector('.music-button');
    const sparkleButton = document.querySelector('.sparkle-button');
    const audio = document.getElementById('birthday-music');
    const video = document.getElementById('birthday-video');
    const sparklesContainer = document.querySelector('.sparkles');    // Initialize background video and audio
    if (video) {
        video.play();
        let opacity = 0;
        video.style.opacity = opacity;
        const fadeInterval = setInterval(() => {
            if (opacity < 0.15) {
                opacity += 0.01;
                video.style.opacity = opacity;
            } else {
                clearInterval(fadeInterval);
            }
        }, 50);
    }    // Make interactive elements stop propagation
    const allButtons = document.querySelectorAll('.interactive-elements button, .cake-container button');
    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });    // Card flip functionality
    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            card.classList.toggle('is-flipped');
            addSparkles();
            
            // Play music when card is opened (when flipping to front or back)
            if (!isPlaying) {
                setTimeout(() => {
                    fadeIn(audio);
                    musicButton.textContent = '🎵 Pause Music';
                    musicButton.classList.add('active');
                    isPlaying = true;
                }, 500); // Delay music start to sync with animation
            }
        });
    });// Enhanced music functionality
    let isPlaying = false;
    audio.volume = 0.7;
    
    function fadeIn(audio) {
        let volume = 0;
        audio.volume = volume;
        audio.play();
        
        const fadeInterval = setInterval(() => {
            if (volume < 0.7) {
                volume += 0.1;
                audio.volume = volume;
            } else {
                clearInterval(fadeInterval);
            }
        }, 100);
    }
    
    function fadeOut(audio) {
        let volume = audio.volume;
        
        const fadeInterval = setInterval(() => {
            if (volume > 0.1) {
                volume -= 0.1;
                audio.volume = volume;
            } else {
                audio.pause();
                audio.volume = 0.7;
                clearInterval(fadeInterval);
            }
        }, 100);
    }

    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            fadeOut(audio);
            musicButton.textContent = '🎵 Play Birthday Music';
            musicButton.classList.remove('active');
        } else {
            fadeIn(audio);
            musicButton.textContent = '🎵 Pause Music';
            musicButton.classList.add('active');
            
            // Enhanced celebration animation
            card.classList.add('celebrate');
            addSparkles();
            setTimeout(() => {
                card.classList.remove('celebrate');
            }, 1000);
        }
        isPlaying = !isPlaying;
    });

    // Enhanced sparkle functionality
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
        sparkle.style.opacity = '0';
        sparklesContainer.appendChild(sparkle);
        
        // Fade in
        setTimeout(() => sparkle.style.opacity = '1', 10);
        
        // Fade out and remove
        setTimeout(() => {
            sparkle.style.transition = 'all 0.5s ease-out';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0) rotate(360deg)';
            setTimeout(() => sparkle.remove(), 500);
        }, 1500);
    }

    function addSparkles() {
        for (let i = 0; i < 15; i++) {
            setTimeout(createSparkle, i * 100);
        }
    }    sparkleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        addSparkles();
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 1000);
    });

    // Cake and wish functionality
    const cake = document.querySelector('.cake');
    const candle = document.querySelector('.candle');
    const wishButton = document.querySelector('.wish-button');
    
    let isWishMade = false;
    
    function blowOutCandle() {
        if (!isWishMade) {
            candle.textContent = '💨';
            isWishMade = true;
            addSparkles();
            
            // Celebration effects
            setTimeout(() => {
                addHearts();
                releaseBalloons();
                card.classList.add('celebrate');
                setTimeout(() => {
                    card.classList.remove('celebrate');
                    candle.textContent = '🕯️';
                    isWishMade = false;
                }, 3000);
            }, 500);
        }
    }

    wishButton.addEventListener('click', blowOutCandle);
    cake.addEventListener('click', blowOutCandle);

    // Hearts functionality
    const heartsButton = document.querySelector('.hearts-button');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
        heart.style.setProperty('--tr', (Math.random() * 360) + 'deg');
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }

    function addHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 100);
        }
    }    heartsButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        addHearts();
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 1000);
    });

    // Balloons functionality
    const balloonButton = document.querySelector('.balloon-button');
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
        balloon.style.setProperty('--tr', (Math.random() * 360) + 'deg');
        
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 8000);
    }

    function releaseBalloons() {
        for (let i = 0; i < 15; i++) {
            setTimeout(createBalloon, i * 200);
        }
    }    balloonButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        releaseBalloons();
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 1000);
    });

    // Background Animation
    function createBackgroundElement(emoji) {
        const element = document.createElement('div');
        element.className = 'background-float';
        element.textContent = emoji;
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = '110vh';
        element.style.setProperty('--float-duration', (Math.random() * 5 + 10) + 's');
        element.style.setProperty('--float-distance', (Math.random() * 20 + 80) + 'vh');
        element.style.setProperty('--float-x', (Math.random() * 40 - 20) + 'vw');
        element.style.setProperty('--rotation', (Math.random() * 720 - 360) + 'deg');
        document.body.appendChild(element);

        setTimeout(() => element.remove(), 15000);
    }

    function addBackgroundElements() {
        const elements = ['🎂', '🎈', '🎊', '🎉'];
        createBackgroundElement(elements[Math.floor(Math.random() * elements.length)]);
    }

    // Start continuous background animation
    setInterval(addBackgroundElements, 2000);    // Enhanced initial animation
    setTimeout(() => {
        addSparkles();
        setTimeout(addHearts, 500);
        setTimeout(releaseBalloons, 1000);
        card.classList.add('celebrate');
        setTimeout(() => card.classList.remove('celebrate'), 2000);
    }, 1000);
});

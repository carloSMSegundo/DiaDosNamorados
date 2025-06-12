// ========== Configuração da tela inicial ==========
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const questionScreen = document.getElementById('questionScreen');
const mainContent = document.getElementById('mainContent');
const message = document.getElementById('message');
const heartsContainer = document.getElementById('hearts');

// Bloqueia rolagem durante a tela inicial
document.body.classList.add('block-scroll');

// Criar corações flutuantes
function createHearts() {
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');
        
        // Posição e animação aleatórias
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
    }
}

// Fazer o botão "Não" fugir
function moveButton() {
    const buttonWidth = btnNo.offsetWidth;
    const buttonHeight = btnNo.offsetHeight;

    const maxX = Math.max(0, window.innerWidth - buttonWidth - 20); // margem de segurança
    const maxY = Math.max(0, window.innerHeight - buttonHeight - 20);

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    btnNo.style.position = 'fixed'; // garante que seja relativo à viewport
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;

    // Adicionar animação de tremor
    btnNo.style.animation = 'shake 0.5s';
    setTimeout(() => {
        btnNo.style.animation = '';
    }, 500);
}


// Configurar eventos
btnYes.addEventListener('click', function() {
    // Mostrar mensagem
    message.style.opacity = '1';
    message.style.transition = 'opacity 0.5s';
    
    // Animação de transição
    questionScreen.style.animation = 'disappear 2s forwards';
    
    setTimeout(() => {
        questionScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';

        document.body.classList.remove('block-scroll');
        
        // Iniciar a página principal
        initMainPage();
    }, 800);
});

btnNo.addEventListener('mouseover', () => {
  const x = Math.random() * 500;
  const y = Math.random() * 500;
  btnNo.style.position = 'absolute';
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
});

btnNo.addEventListener('touchstart', () => {
  const x = Math.random() * 500;
  const y = Math.random() * 500;
  btnNo.style.position = 'absolute';
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
});

btnNo.addEventListener('click', () => {
  const x = Math.random() * 500;
  const y = Math.random() * 500;
  btnNo.style.position = 'absolute';
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
});


// ========== Configuração da página principal ==========
function initMainPage() {
    // Configuração da data de início (13 de julho de 2020)
    const startDate = new Date('2020-07-13T00:00:00');
    
    // URLs das fotos para o carrossel (substitua por suas próprias URLs)
const photos = [
    'images/foto_1.jpg',
    'images/foto_2.jpg',
    'images/foto_3.jpg',
    'images/foto_4.jpg',
    'images/foto_5.jpg',
    'images/foto_6.jpg'
];
    
    // Configuração do carrossel
    let currentIndex = 0;
    const carousel = document.getElementById('carousel');
    const indicatorsContainer = document.getElementById('indicators');
    let carouselInterval;
    
    // Funções de navegação do carrossel
    function goToSlide(index) {
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar indicadores
        document.querySelectorAll('.indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % photos.length;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        goToSlide(currentIndex);
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    // Criar itens do carrossel
    function initCarousel() {
        photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.style.backgroundImage = `url('${photo}')`;
            carousel.appendChild(item);
            
            // Criar indicadores
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.dataset.index = index;
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        // Adicionar event listeners para os botões
        document.querySelector('.carousel-nav.prev').addEventListener('click', prevSlide);
        document.querySelector('.carousel-nav.next').addEventListener('click', nextSlide);
        
        // Iniciar carrossel automático
        startCarousel();
        
        // Pausar carrossel quando o mouse estiver sobre ele
        carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carousel.addEventListener('mouseleave', startCarousel);
    }
    
    // Atualizar o contador de tempo
    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;
        
        // Cálculo dos componentes de tempo
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Formatação do texto do timer
        let timerText = `${years} ano${years !== 1 ? 's' : ''}`;
        
        if (days > 0) timerText += `, ${days} dia${days !== 1 ? 's' : ''}`;
        if (hours > 0) timerText += `, ${hours} hora${hours !== 1 ? 's' : ''}`;
        if (minutes > 0) timerText += `, ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
        if (seconds > 0) timerText += ` e ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
        
        document.getElementById('timer').textContent = timerText;
    }
    
    // Inicializar a página principal
    initCarousel();
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Iniciar a tela inicial
createHearts();
const obstacle = document.getElementById('obstacle')
const passage = document.getElementById('passage')
const bird = document.getElementById('bird')
let flap = 0

passage.addEventListener('animationiteration', () => {
    let holePosition = -((Math.random() * 650) + 200);
    passage.style.top = holePosition + 'px';
});

setInterval(function birdPosition() {
    const currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
    if (flap === 0 && currentTop < 900) {
        bird.style.top = (currentTop + 15) + 'px';
    }
}, 30);


function fly() {
    flap = 1;
    let flapCount = 0;
    const flapInterval = setInterval(function() {
        let currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
        if (currentTop > 30) {
            bird.style.top = (currentTop - 22) + 'px'
        };
        if (flapCount > 3) {
            clearInterval(flapInterval);
            flap = 0;
            flapCount = 0;
        }
        flapCount++; 
    }
        , 30);
}

document.addEventListener('keypress', event => {
    if (event.code === 'Space') {
      fly()
    }
  })



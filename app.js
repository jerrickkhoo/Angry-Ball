const obstacle = document.getElementById('obstacle1')
const passage = document.getElementById('passage')
const bird = document.getElementById('bird')
let points = document.getElementById('points')
let score = 0


bird.style.display = "none";

function gravity(){
setInterval(function() {
    const currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
    if (currentTop < 630) {
        bird.style.top = (currentTop + 2) + 'px';
        // console.log(currentTop)
    }
}, 1)
}


function startPage() {

    bird.style.display = 'block';

    const start = document.getElementById("start");
        start.style.display = "none";
    

    const space = document.getElementById("space");
        space.style.display = "none";

    const title = document.querySelector("h1");
        title.style.display = "none";

    const angryBall = document.querySelector("#angryBall");
    angryBall.style.display = "none";
    
}

function start() {
    document.querySelector("#passage").classList.add('animated')
    document.querySelector("#obstacle1").classList.add('animated')
    // document.querySelector("#game").classList.add('background')


    passage.addEventListener('animationiteration', () => {
        let holePosition = -((Math.random() * 500) + 200);
        passage.style.top = holePosition + 'px';
        score++;
        points.innerText = 'Score: ' + score

    });




    function fly() {
        let flapCount = 0;
            const flapInterval = setInterval(function () {
                let currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
                if (currentTop > 30) {
                    bird.style.top = (currentTop - 25) + 'px'
                };
                if (flapCount > 3) {
                    clearInterval(flapInterval);
                    flapCount = 0;
                }
                flapCount++;
            }
                , 15);
    }

    document.addEventListener('keypress', event => {
        if (event.code === 'Space') {
            fly()
        }
    })


    setInterval(function lose() {
        const currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'))
        const passageTop = parseInt(window.getComputedStyle(passage).getPropertyValue('top'))
        const nTop = -(700 - currentTop)

        if ((currentTop >= 630) || ((obstacleLeft < 70) && (obstacleLeft > -250) && ((nTop <= passageTop) || (nTop > passageTop + 200))) ) {
            document.getElementById("obstacle1").classList.remove("animated")
            document.getElementById("passage").classList.remove("animated")
            alert('Game Over! Your score is ' + score + '! Close this to restart.')
            restart()
        }
    }, 15);

    
}

function restart() {
    score = 0
    points.innerText = 'Score: ' + score
    bird.style.top = 150 + 'px'
    document.getElementById("obstacle1").classList.add("animated")
    document.getElementById("passage").classList.add("animated")
}

document.querySelector('#start').addEventListener('click', event => {
    startPage()
    start()
    setTimeout(gravity,800);
})




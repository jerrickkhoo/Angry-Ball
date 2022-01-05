const obstacle = document.getElementById('obstacle1')
const passage = document.getElementById('passage')
const bird = document.getElementById('bird')
let points = document.getElementById('points')
let score = 0

points.innerText = 'Score: ' + score


function startPage() {
    const start = document.getElementById("start");
    if (start.style.display === "none") {
      start.style.display = "block";
    } else {
      start.style.display = "none";
    }

    const space = document.getElementById("space");
    if (space.style.display === "none") {
      space.style.display = "block";
    } else {
      space.style.display = "none";
    }
  }

function start() {
    document.querySelector("#passage").classList.add('animated')
    document.querySelector("#obstacle1").classList.add('animated')

    passage.addEventListener('animationiteration', () => {
        let holePosition = -((Math.random() * 700) + 200);
        passage.style.top = holePosition + 'px';
        score++;
        points.innerText = 'Score: ' + score
    });

    setInterval(function gravity() {
        const currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))

        if (currentTop < 860) {
            bird.style.top = (currentTop + 2) + 'px';
            console.log(currentTop)
        }
    }, 1)

    
    function fly() {
        let flapCount = 0;
        const flapInterval = setInterval(function () {
            let currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
            if (currentTop > 30) {
                bird.style.top = (currentTop - 27) + 'px'
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

}


setInterval(function lose() {
    const currentTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'))
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'))
    const passageTop = parseInt(window.getComputedStyle(passage).getPropertyValue('top'))
    const nTop = -(900 - currentTop)

    if ((currentTop >= 860) || ((obstacleLeft < 50) && (obstacleLeft > -250) && ((nTop <= passageTop) || (nTop > passageTop + 225)))) {
        alert('Game Over! Your score is ' + score + '!')
        // document.getElementById("obstacle1").classList.remove("animated")
        // document.getElementById("passage").classList.remove("animated")
        document.location.reload()
    }
}, 15);


document.addEventListener('keypress', event => {
    if (event.code === 'Enter') {
        startPage()
        start();
        lose();
    }
})




(function() {
    let canvas = document.getElementById('game'),
        context = canvas.getContext('2d');

    let chrono = document.getElementById('chrono');
    let chronoValue = chrono.querySelector('.chrono-value');
    let chronoValueSeconds = chrono.querySelector('.chrono-seconds-value');
    let chronoValueInt = parseInt(chronoValue.innerHTML);
    let chronoValueSecondsInt = parseInt(chronoValueSeconds.innerHTML);
    let chronoRun = false;
    let timeoutID;

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('click', launchGame, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /**
         * Your drawings need to be inside this function otherwise they will be reset when
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff();
    }
    resizeCanvas();

    function drawStuff() {
        // do your drawing stuff here
    }

    function launchGame() {
        launchChrono();
    }
    function launchChrono() {
        timeoutID = window.setTimeout(increaseChronoValue, 10);
        window.removeEventListener('click', launchGame, false);
        window.addEventListener('click', () => {window.clearTimeout(timeoutID)}, false)
    }
    function increaseChronoValue() {
        chronoValueInt += 1;
        chronoValue.innerHTML = (chronoValueInt < 10 ? '0' : '') + chronoValueInt.toString();
        /*On test si la valeur après la virgule est égale à 60 pour augmenter la valeur des secondes de 1*/
        if(chronoValueInt === 60) {
            chronoValueInt = 0;
            chronoValue.innerHTML = "00";
            chronoValueSecondsInt ++;
            chronoValueSeconds.innerHTML = chronoValueSecondsInt.toString();
        }
        timeoutID = window.setTimeout(increaseChronoValue, 10);
    }
})();
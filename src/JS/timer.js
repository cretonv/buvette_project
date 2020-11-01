(function() {
    let chrono = document.getElementById('chrono');
    let chronoValue = chrono.querySelector('.chrono-value');
    let chronoValueSeconds = chrono.querySelector('.chrono-seconds-value');
    let chronoValueInt = parseInt(chronoValue.innerHTML);
    let chronoValueSecondsInt = parseInt(chronoValueSeconds.innerHTML);
    let chronoRun = false;
    let timeoutID;

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
        console.log(chronoValue.innerHTML);
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
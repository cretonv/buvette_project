(function() {
    let canvas = document.getElementById('game'),
        ctx = canvas.getContext('2d');

    /*--------------------------------------------------------*/
    /* PARTIE VARIABLES */
    /*--------------------------------------------------------*/

    /**
     * Variables générales
     */
    let gameRunning = false;    // Variable permettant de savoir si le jeu est lancé

    /**
     * Variables utilisés pour le fonctionnement du chronomètre
     */
    let chrono = document.getElementById('chrono');
    let chronoValue = chrono.querySelector('.chrono-value');
    let chronoValueSeconds = chrono.querySelector('.chrono-seconds-value');
    let chronoValueInt = parseInt(chronoValue.innerHTML);
    let chronoValueSecondsInt = parseInt(chronoValueSeconds.innerHTML);
    let chronoRun = false;
    let timeoutID;

    /**
     * Variables utilisés pour l'affichage des éléments sur le canvas (tout les différents 'marqueurs'
     */
    let playerMarquer = new Image();
    playerMarquer.src = './assets/images/vinc-projet.png';

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    /**
     * Ajout des écouteurs d'évènements faisant fonctionner le jeu
     */
    window.addEventListener('click', launchGame, false);
    document.onmousemove = handleMouseMove;

    /*--------------------------------------------------------*/
    /* PARTIE FONCTIONS */
    /*--------------------------------------------------------*/

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

    /**
     * Fonction lancant le jeu et tout appellant toutes les fonctions nécéssaires
     */
    function launchGame() {
        gameRunning = true;
        ctx.drawImage(playerMarquer, (window.event.clientX - 57.5), (event.pageY - 57.5), 115, 115);
        launchChrono();
    }

    /**
     * Fonctions utiles au fonctionnement du chrono
     */
    function launchChrono() {
        timeoutID = window.setTimeout(increaseChronoValue, 10);
        window.removeEventListener('click', launchGame, false);
        window.addEventListener('click', () => {window.clearTimeout(timeoutID); gameRunning = false;}, false)
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

    /**
     * La fonction suivante va nous permettre de traquer le marqueur du joeur et afficher le marqueur en fonction de la nouvelle position
     * @param event
     */
    function handleMouseMove(event) {
        let eventDoc, doc, body;

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        if(gameRunning) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(playerMarquer, (event.pageX - 57.5), (event.pageY - 57.5), 115, 115);
        }
    }
})();
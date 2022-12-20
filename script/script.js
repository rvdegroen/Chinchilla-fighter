console.log("dover");

//variabelen------------------------------------------------------------------------------

var //mist variabelen imgs: playerImgEl, playerImgArray, bodyBg, 

    //variabelen van de player 
    playerDivEl = document.querySelector(".divPlayer1"),
    playerHpProgressEl = document.getElementById("health1"),
    fleeImgEl = document.querySelector(".playerFlee"),

    //variabelen van de enemy
    enemyDivEl = document.querySelector(".divPlayer2"),
    enemyHpProgressEl = document.getElementById("health2"),

    //variabelen van img attack van player & enemy
    attackImg = document.querySelector(".attackImg"),
    attackImgArray = ["./images/playerAttack.svg", "./images/enemyAttack.svg"],

    //variabelen van user interface
    coinsDivEl = document.querySelector(".coinBalk"), //ipv coinpel, coinimg en
    coinsPEl = document.querySelector(".coins"),

    gameKnoppenDivEl = document.querySelector(".divButtons"),
    fightButtonEl = document.querySelector(".fight"),
    healButtonEl = document.querySelector(".heal"),
    fleeButtonEl = document.querySelector(".flee"),

    //variabelen van menu
    menuDivEl = document.querySelector(".menuDiv"),
    menuButtonEl = document.querySelector("button.menuButton"),
    menuH1El = menuTekst = document.querySelector("h1"),

    //variabelen van de game zelf om het te laten werken
    gameTekstPel = document.querySelector(".gameTekst"), //laat zien wat er gebeurd
    randomGetal, //randomgetal getal tussen 10-30
    gewonnen;

//bestaande variabelen aanpassen
coinsPEl.textContent = 400; //aantal coins
attackImg.classList.add("hidden");

//functies-----------------------------------------------------------------------------------

//verberg functies
function verbergAttackEnemyImg() {
    attackImg.classList.add("hidden");
    attackImg.setAttribute("src", attackImgArray[0]);
}

function verbergAttackPlayerImg() {
    attackImg.classList.add("hidden");
    attackImg.setAttribute("src", attackImgArray[1]);
}

function verbergMenu() {
    menuDivEl.classList.add("hidden");
}

function verbergGame() {
    playerDivEl.classList.add("hidden");
    enemyDivEl.classList.add("hidden");
    gameKnoppenDivEl.classList.add("hidden");
    coinsDivEl.classList.add("hidden");
}

function verbergGameTekst() {
    gameTekstPel.classList.add("hidden");
}

function verbergFleeImg() {
    fleeImgEl.classList.add("hidden");
}

//"verschijn" functies
function showAttackEnemyImg() {
    attackImg.classList.remove("hidden");
    attackImg.setAttribute("src", attackImgArray[0]);
    setTimeout(verbergAttackEnemyImg, 1000);
}

function showAttackPlayerImg() {
    attackImg.classList.remove("hidden");
    attackImg.setAttribute("src", attackImgArray[1]);
    setTimeout(verbergAttackPlayerImg, 1000);
}

function showMenu() {
    menuDivEl.classList.remove("hidden");
}

function showGame() {
    playerDivEl.classList.remove("hidden");
    enemyDivEl.classList.remove("hidden");
    gameKnoppenDivEl.classList.remove("hidden");
    coinsDivEl.classList.remove("hidden");
}

function showGameTekst() {
    gameTekstPel.classList.remove("hidden");
}

function showFleeImg() {
    fleeImgEl.classList.remove("hidden");
}

//functies startscherm en eindscherm
function startGame() {
    verbergMenu();
    verbergFleeImg();
    showGame();
}

function eindScherm() {
    showMenu();
    verbergGame();
    verbergGameTekst();
}

//functie om de knoppen enabled te maken, meer bedoelt voor de settimeout
function buttonsEnabled() {
    fightButtonEl.disabled = false;
    healButtonEl.disabled = false;
    fleeButtonEl.disabled = false;
}

//resets de "game (values)", bedoelt voor het eindscherm, zodat je het spel opnieuw kan spelen
function resetGameProgress() {
    enemyHpProgressEl.value = 100;
    playerHpProgressEl.value = 100;

    //de coins moet ook nog 
    coinsPEl.textContent = 400;

    //als je wint en de enemy heeft je niet aangevallen dan worden de buttons niet enabled, dus wil je deze wel nog enablen, door disabled false te maken
    buttonsEnabled();
}

//om het spel te spelen de volgende functies: 
//checks of de player heeft gewonnen of niet 
function checkPlayerWin(enemyHp) {
    if (enemyHp <= 0) {
        return true;

    } else {
        return false;
    }
}

//checks of de enemy heeft gewonnen of niet 
function checkEnemyWin(playerHp, coins) {
    if (playerHp <= 0) {
        return true;

    } else if (coins <= 0) {
        return true;

    } else {
        return false;
    }
}

//functie bepaalt welke tekst je krijgt te zien afhankelijk of je hebt gewonnen of niet
function endGame(playerHp, enemyHp, coins) {

    if (playerHp <= 0) {
        eindScherm();
        //als je dood bent, dan kan het zijn dat je attackImg nog ziet, vanwege settimeout, vandaar classlist.add("hidden")
        attackImg.classList.add("hidden");
        menuH1El.textContent = ("Je hebt verloren!");
        menuButtonEl.innerText = ("Opnieuw spelen");
        resetGameProgress();

    } else if (enemyHp <= 0) {
        eindScherm();
        //als de enemy dood is, dan kan het zijn dat je attackImg nog ziet, vanwege settimeout, vandaar classlist.add("hidden")
        attackImg.classList.add("hidden");
        menuH1El.textContent = ("Je hebt gewonnen!");
        menuButtonEl.innerText = ("Opnieuw spelen");
        resetGameProgress();

    } else if (coins <= 0) {
        eindScherm();
        menuH1El.textContent = ("Je hebt verloren!");
        menuButtonEl.innerText = ("Opnieuw spelen");
        resetGameProgress();
    }

}

//functies met de knoppen---------------------------------------------------------------------

//vecht knop
function fight() {
    //tijdens de aanval kan je niet op de buttons klikken
    fightButtonEl.disabled = true;
    healButtonEl.disabled = true;
    fleeButtonEl.disabled = true;

    //je ziet de attack van jou naar de enemy
    showAttackEnemyImg();

    //betalen omdat je op de button heb geklikt
    console.log(coinsPEl);
    coinsPEl.textContent = coinsPEl.textContent - 50;

    //random nummer dat bepaalt met hoeveel waarde je aanvult tussen de 10-30
    randomGetal = Math.random() * (30 - 10) + 10;
    randomGetal = Math.floor(randomGetal);
    enemyHpProgressEl.value = enemyHpProgressEl.value - randomGetal;

    //in-game tekst, zodat de spelet weet wat er gebeurd
    console.log("Je valt aan met " + randomGetal);
    gameTekstPel.textContent = ("Je valt aan met ") + randomGetal + (" schade");
    showGameTekst();

    //checken of ik heb gewonnen true of false is
    gewonnen = checkPlayerWin(enemyHpProgressEl.value);

    //als ik heb gewonnen dan wordt endgame uitgevoerd, zo niet dan gaat de enemy vechten
    if (gewonnen === true) {
        endGame(playerHpProgressEl.value, enemyHpProgressEl.value, parseInt(coinsPEl.textContent));
    } else {
        setTimeout(enemyFight, 1000);
    }
}

function enemyFight() {
    //je ziet de attack van de enemy naar jou
    showAttackPlayerImg();

    //random nummer dat bepaalt met hoeveel waarde je aanvult tussen de 10-30
    randomGetal = Math.random() * (30 - 10) + 10;
    randomGetal = Math.floor(randomGetal);
    playerHpProgressEl.value = playerHpProgressEl.value - randomGetal;

    //in-game tekst, zodat de speler weet wat er gebeurd
    console.log("Je wordt aangevallen", randomGetal);
    gameTekstPel.textContent = ("Je wordt aangevallen met ") + randomGetal + (" schade");
    gameTekstPel.classList.remove("hidden");

    //na 1000 ms van de aanval kan je op de buttons weer klikken
    setTimeout(buttonsEnabled, 1000)

    //checken of ik heb gewonnen true of false is
    //parseInt maakt een nummer van eens string en zat niet bij de lesstof
    gewonnen = checkEnemyWin(playerHpProgressEl.value, parseInt(coinsPEl.textContent));

    //als de enemy heeft gewonnen wordt endgame uitgeveord anders gebeurd er niks
    if (gewonnen === true) {
        endGame(playerHpProgressEl.value, enemyHpProgressEl.value, parseInt(coinsPEl.textContent));
    }
}

//heal knop
function heal() {
    //tijdens de aanval kan je niet op de buttons klikken
    fightButtonEl.disabled = true;
    healButtonEl.disabled = true;
    fleeButtonEl.disabled = true;

    //betalen omdat je op de button heb geklikt
    console.log(coinsPEl);
    coinsPEl.textContent = coinsPEl.textContent - 50;

    //random nummer dat bepaalt met hoeveel waarde je aanvult tussen de 20-40
    randomGetal = Math.random() * (40 - 20) + 20;
    randomGetal = Math.floor(randomGetal);
    playerHpProgressEl.value = playerHpProgressEl.value + randomGetal;

    //in-game tekst, zodat de spelet weet wat er gebeurd
    console.log("Je healed met " + randomGetal);
    gameTekstPel.textContent = ("Je healed met ") + randomGetal;
    showGameTekst();

    //aangeroepen functies enemy fight nadat je heal
    setTimeout(enemyFight, 1000);
}

//flee knop
function flee() {
    eindScherm();
    menuH1El.textContent = ("Je hebt verloren!");
    menuButtonEl.innerText = ("Opnieuw spelen");
    fleeImgEl.classList.remove("hidden");
    resetGameProgress();
}


//functies aanroepen-------------------------------------------------------------------------
//opstarten van game: je ziet de ui en de characters niet, alleen het menu
verbergGame();
verbergGameTekst();
verbergFleeImg();

//eventlisteners-----------------------------------------------------------------------------
//"start game" button, waardoor je de functie startGame aanroept
menuButtonEl.addEventListener("click", startGame);

//game buttons
fightButtonEl.addEventListener("click", fight);
healButtonEl.addEventListener("click", heal);
fleeButtonEl.addEventListener("click", flee);
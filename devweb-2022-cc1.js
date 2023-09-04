"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");


let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function game(_evt){
  //Si le nombre d'essaies === aux nombres d'essai max auquelle l'utilisateur est autoriser alors stopper la partie.
  if(nbGuesses === maxGuesses){
    $guessBtn.toggleAttribute("disabled", true)
    $startBtn.toggleAttribute("disabled", false)
    $output.innerHTML += `<br> Votre nombre d'essai a été épuisé. <br> La réponse était ${secretNumber}. `;
    nbGuesses = 0;
  }
  else {
    if (($numUsr.value) === "" ){
      $output.innerHTML += `<br>  Veuillez rentrer un numéro. `;
    }
    else if (Number($numUsr.value) < secretNumber){
      $output.innerHTML += `<br>  ${$numUsr.value} est trop petit. `;
      nbGuesses +=1;
    }

    else if (Number($numUsr.value) > secretNumber){
      $output.innerHTML += `<br>  ${$numUsr.value} est trop grand.`;
      nbGuesses +=1;
    }
    
    else if (Number($numUsr.value) === secretNumber){
      $output.innerHTML += `<br>  Bravo ${$numUsr.value}  est le numero secret.`;
      $guessBtn.toggleAttribute("disabled", true)
      $startBtn.toggleAttribute("disabled", false)
      nbGuesses = 0;
    }
    }
  }


function launchGame(_evt) {
    secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
    maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
    $output.innerHTML="La partie commence vous avez "+ maxGuesses + " essaie";
    $guessBtn.toggleAttribute("disabled", false)
    $startBtn.toggleAttribute("disabled", true)
    $guessBtn.addEventListener("enter", game)
    $guessBtn.addEventListener("click", game)
}
$startBtn.addEventListener("click", launchGame);
$startBtn.addEventListener("enter", launchGame);

function addCow(evt) {
    let rotator = (Math.random()*1);
    const $img = document.createElement('img');
    $img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg');
    $img.style.position = 'absolute'; 
    $img.height = 50;
    $img.width = 50;
    console.debug(evt.x, evt.y);
    $img.style.transform= `rotate(${rotator}turn)`;
    const adjustedX = evt.clientX + window.scrollX;
    const adjustedY = evt.clientY + window.scrollY;

    $img.style.left = `${adjustedX}px`;
    $img.style.top = `${adjustedY}px`;
    evt.target.appendChild($img); 
}


function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);

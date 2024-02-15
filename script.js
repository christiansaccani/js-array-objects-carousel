/*
Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito e un semplice ciclo for che concatena un template literal. 
Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile.
Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1, ma costruito dinamicamente attraverso JavaScript.
*/


// bersagliamo lo slider
// tramite un ciclo for prendiamo ogni indirizzo delle immagini dall'array
// per ognuno di essi andremo a creare un elemento img dentro lo slider

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
console.log(images);


// bersagliamo lo slider
const sliderElement = document.getElementById("slider");
const thumbElement = document.getElementById("thumbnail");


// tramite un ciclo for prendiamo ogni indirizzo delle immagini dall'array di oggetti
images.forEach(element => {
    sliderElement.innerHTML += `    
    <section class="slide">

        <img src="./${element.image}" alt="immagine 1">

        <div class="details">

            <h3 class="title">
                ${element.title}
            </h3>

            <div class="text">
                ${element.text}
            </div>
        
        </div>
        
    </section>
    `;
});

images.forEach((element, index) => {
    const newPicElement = document.createElement('img');
    newPicElement.src = element.image;
    thumbElement.append(newPicElement);

    newPicElement.addEventListener("click", function() {
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.remove("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.remove("activeThumb");

        slideNumber = index + 1;

        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.add("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.add("activeThumb");
    })
});

function foward() {
    if (slideNumber < images.length) {

        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.remove("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.remove("activeThumb");

        // - aumento il contatore di 1
        slideNumber++;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.add("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.add("activeThumb");

        console.log(slideNumber);

    } else {

        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.remove("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.remove("activeThumb");

        // resetto la variabile che mi conta l'immagine a cui sono arrivato
        slideNumber = 1;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.add("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.add("activeThumb");
    }       
}

function backward() {
    if (slideNumber > 1) {
        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.remove("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.remove("activeThumb");

        // - diminuisco il contatore di 1
        slideNumber--;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.add("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.add("activeThumb");

        console.log(slideNumber);

    } else {

        // - prendo l'immagine attuale e le rimuovo la classe "active"  
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.remove("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.remove("activeThumb");

        // - metto il valore di slideNumebr = alla posizione dell'ultima immagine
        slideNumber = images.length;

        // - prendo l'immagine con il nuovo contatore e le aggiungo la classe "active"
        document.querySelector(`#slider .slide:nth-of-type(${slideNumber})`).classList.add("active");
        document.querySelector(`#thumbnail img:nth-of-type(${slideNumber})`).classList.add("activeThumb");

    }
}

document.querySelector("#slider .slide:nth-of-type(1)").classList.add("active");
document.querySelector("#thumbnail img:nth-of-type(1)").classList.add("activeThumb");

// -  salvo un contatore della slide
let slideNumber = 1;

// -  QUANDO premo la freccia SU
document.querySelector("#up-arrow").addEventListener("click", function() {

    backward(); 
});

document.querySelector("#down-arrow").addEventListener("click", function() {

    foward(); 
});

document.getElementById("autoplay").addEventListener("click", startAutoplay);
document.getElementById("stop").addEventListener("click", stopAutoPlay);
document.getElementById("reverse").addEventListener("click", startReverseplay);

let intervallo; // dichiarazione globale del timer

function startAutoplay() {
    clearInterval(intervallo); // per fermare il timer corrente, se presente
    intervallo = setInterval(foward, 3000);
}

function startReverseplay() {
    clearInterval(intervallo); // per fermare il timer corrente, se presente
    intervallo = setInterval(backward, 3000);
}

function stopAutoPlay() {
    clearInterval(intervallo);
    intervallo = null; // per reimpostare il timer a null quando viene fermato
    console.log("Stopped");
}
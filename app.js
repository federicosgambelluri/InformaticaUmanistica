// Funzione per impostare la copertina attiva e le vicine
function aggiornaCoverFlow(index) {
    const covers = document.querySelectorAll(".carousel .cover");
    covers.forEach((cover, i) => {
        cover.classList.remove("active", "left", "right");
        if (i === index) {
            cover.classList.add("active");
        } else if (i === index - 1) {
            cover.classList.add("left");
        } else if (i === index + 1) {
            cover.classList.add("right");
        }
    });
}

// Imposta l'indice iniziale e aggiorna la visualizzazione
let currentIndex = 0;
aggiornaCoverFlow(currentIndex);

// Funzione per cambiare copertina
function cambiaCover(direction) {
    const covers = document.querySelectorAll(".carousel .cover");
    currentIndex += direction;

    // Gestione degli estremi per far scorrere in loop
    if (currentIndex < 0) {
        currentIndex = covers.length - 1;
    } else if (currentIndex >= covers.length) {
        currentIndex = 0;
    }

    aggiornaCoverFlow(currentIndex);
}

// Eventi di click sulle frecce
document.querySelectorAll('.arrows button').forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.textContent === '⬅️' ? -1 : 1;
        cambiaCover(direction);
    });
});

// Eventi di tastiera per navigare tra le copertine
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        cambiaCover(1); // Scorri a destra
    } else if (event.key === "ArrowLeft") {
        cambiaCover(-1); // Scorri a sinistra
    }
});

// Funzione per caricare i dati dal file JSON
async function caricaDaJSON() {
    try {
        const response = await fetch('vinili.json');
        if (!response.ok) throw new Error('Errore nel caricamento dei vinili.');
        let vinili = await response.json();

        // Carica i vinili dal Local Storage
        const viniliLocal = JSON.parse(localStorage.getItem('vinili')) || [];
        vinili = vinili.concat(viniliLocal);

        visualizzaVinili(vinili);
        caricaCoverFlow(vinili);
    } catch (error) {
        alert(error.message);
    }
}

// Funzione per caricare le copertine nel Cover Flow
function caricaCoverFlow(vinili) {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = ''; // Pulisci le copertine esistenti

    vinili.forEach(vinile => {
        const coverPath = `images/cover${vinile.Codice}.png`;
        console.log(`Caricamento copertina: ${coverPath}`); // Debug
        const coverDiv = document.createElement('div');
        coverDiv.classList.add('cover');
        coverDiv.style.backgroundImage = `url('${coverPath}')`;

        // Verifica se l'immagine esiste
        const img = new Image();
        img.src = coverPath;
        img.onload = () => {
            carousel.appendChild(coverDiv);
            aggiornaCoverFlow(currentIndex);
        };
        img.onerror = () => {
            console.error(`Immagine non trovata: ${coverPath}`);
        };
    });
}

// Funzione per visualizzare i vinili nella tabella
function visualizzaVinili(vinili) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; // Pulisci la tabella prima di aggiungere i nuovi dati

    vinili.forEach(vinile => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${vinile.Codice || ""}</td>
            <td>${vinile.Titolo || ""}</td>
            <td>${vinile["Artista-Gruppo"] || ""}</td>
            <td>${vinile["Anno di Pubblicazione"] || ""}</td>
            <td>${vinile.Genere || ""}</td>
            <td>${vinile.Pollici || ""}</td>
            <td>${vinile.RPM || ""}</td>
            <td>${vinile.Paese || ""}</td>
            <td>${vinile["Casa Discografica"] || ""}</td>
            <td>${vinile.Prezzo || ""}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per aggiungere un vinile manualmente
function aggiungiVinile() {
    const nuovoVinile = {
        Codice: document.getElementById("codice").value,
        Titolo: document.getElementById("titolo").value,
        "Artista-Gruppo": document.getElementById("artista").value,
        "Anno di Pubblicazione": document.getElementById("anno").value,
        Genere: document.getElementById("genere").value,
        Pollici: document.getElementById("pollici").value,
        RPM: document.getElementById("rpm").value,
        Paese: document.getElementById("paese").value,
        "Casa Discografica": document.getElementById("etichetta").value,
        Prezzo: document.getElementById("prezzo").value
    };

    // Validazione di base (opzionale)
    if (!nuovoVinile.Codice || !nuovoVinile.Titolo) {
        alert("Codice e Titolo sono obbligatori.");
        return;
    }

    // Carica i vinili dal Local Storage
    const viniliLocal = JSON.parse(localStorage.getItem('vinili')) || [];

    // Aggiungi il nuovo vinile
    viniliLocal.push(nuovoVinile);
    localStorage.setItem('vinili', JSON.stringify(viniliLocal));

    // Carica i vinili dal JSON
    fetch('vinili.json')
        .then(response => response.json())
        .then(viniliJSON => {
            const viniliTotali = viniliJSON.concat(viniliLocal);
            visualizzaVinili(viniliTotali);
            caricaCoverFlow(viniliTotali);
            // Resetta il modulo
            document.getElementById("formVinile").reset();
        })
        .catch(error => {
            alert('Errore nel caricamento dei vinili.');
            console.error(error);
        });
}

// Carica i dati al caricamento della pagina
window.onload = caricaDaJSON;

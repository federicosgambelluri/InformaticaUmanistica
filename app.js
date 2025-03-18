let viniliTotali = []; // Array che contiene tutti i vinili
let elementiPerPagina = 10; // Numero di elementi per pagina
let paginaCorrente = 1; // Pagina attualmente visualizzata

// Funzione per caricare i dati dal file JSON
async function caricaDaJSON() {
    try {
        const response = await fetch('vinili.json');
        if (!response.ok) throw new Error('Errore nel caricamento dei vinili.');
        let vinili = await response.json();

        // Carica i vinili dal Local Storage
        const viniliLocal = JSON.parse(localStorage.getItem('vinili')) || [];
        vinili = vinili.concat(viniliLocal);

        // Ordina i vinili in ordine alfabetico per 'Artista-Gruppo'
        vinili.sort((a, b) => a["Artista-Gruppo"].localeCompare(b["Artista-Gruppo"]));

        viniliTotali = vinili; // Salva i vinili totali
        visualizzaVinili(); // Chiama visualizzaVinili senza parametri
        caricaCarosello();
    } catch (error) {
       // alert(error.message);
    }
}

// Funzione per visualizzare i vinili nella tabella
function visualizzaVinili() {
    const vinili = viniliTotali;
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; // Pulisce la tabella prima di aggiungere i nuovi dati

    // Calcola gli indici per la paginazione
    const startIndex = (paginaCorrente - 1) * elementiPerPagina;
    const endIndex = startIndex + elementiPerPagina;
    const viniliDaMostrare = vinili.slice(startIndex, endIndex);

    viniliDaMostrare.forEach(vinile => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${vinile.Codice || ""}</td>
            <td><a href="disco.html?title=${encodeURIComponent(vinile.Titolo)}" class="titolo-disco-link">${vinile.Titolo || ""}</a></td>
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

    // Aggiorna i controlli di paginazione
    mostraPaginazione();
}

// Funzione per visualizzare i vinili nella tabella
function visualizzaViniliConCopertina() {
    const vinili = viniliTotali;
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; // Pulisce la tabella prima di aggiungere i nuovi dati

    // Calcola gli indici per la paginazione
    const startIndex = (paginaCorrente - 1) * elementiPerPagina;
    const endIndex = startIndex + elementiPerPagina;
    const viniliDaMostrare = vinili.slice(startIndex, endIndex);

    viniliDaMostrare.forEach(vinile => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${vinile.Path || 'images/default-cover.jpg'}" alt="${vinile.Titolo}" class="small-cover"></td>
            <td>${vinile.Codice || ""}</td>
            <td><a href="disco.html?title=${encodeURIComponent(vinile.Titolo)}" class="titolo-disco-link">${vinile.Titolo || ""}</a></td>
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

    // Aggiorna i controlli di paginazione
    mostraPaginazioneConCopertina();
}

// Funzione per mostrare i controlli di paginazione con copertura
function mostraPaginazioneConCopertina() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ""; // Pulisce i pulsanti di paginazione

    const totalPages = Math.ceil(viniliTotali.length / elementiPerPagina);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('pagina');
        if (i === paginaCorrente) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', function () {
            paginaCorrente = i;
            visualizzaViniliConCopertina(); // Visualizza i vinili con la copertura
        });
        paginationContainer.appendChild(btn);
    }
}

// Funzione per mostrare i controlli di paginazione
function mostraPaginazione() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ""; // Pulisce i pulsanti di paginazione

    const totalPages = Math.ceil(viniliTotali.length / elementiPerPagina);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('pagina');
        if (i === paginaCorrente) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', function () {
            paginaCorrente = i;
            visualizzaVinili();
        });
        paginationContainer.appendChild(btn);
    }
}

// Funzione per aggiungere un vinile manualmente
function aggiungiVinile() {
    const nuovoVinile = {
        Codice: document.getElementById("codice").value.trim(),
        Titolo: document.getElementById("titolo").value.trim(),
        "Artista-Gruppo": document.getElementById("artista").value.trim(),
        "Anno di Pubblicazione": document.getElementById("anno").value.trim(),
        Genere: document.getElementById("genere").value.trim(),
        Pollici: document.getElementById("pollici").value.trim(),
        RPM: document.getElementById("rpm").value.trim(),
        Paese: document.getElementById("paese").value.trim(),
        "Casa Discografica": document.getElementById("etichetta").value.trim(),
        Prezzo: document.getElementById("prezzo").value.trim()
    };

    // Validazione di base
    if (!nuovoVinile.Codice || !nuovoVinile.Titolo) {
        alert("Codice e Titolo sono obbligatori.");
        return;
    }

    // Carica i vinili dal Local Storage
    const viniliLocal = JSON.parse(localStorage.getItem('vinili')) || [];

    // Verifica se il vinile con lo stesso codice esiste già
    const esiste = viniliLocal.some(v => v.Codice === nuovoVinile.Codice);
    if (esiste) {
        alert("Un vinile con questo codice esiste già.");
        return;
    }

    // Aggiungi il nuovo vinile
    viniliLocal.push(nuovoVinile);
    localStorage.setItem('vinili', JSON.stringify(viniliLocal));

    // Aggiorna viniliTotali
    viniliTotali.push(nuovoVinile);

    // Ordina i vinili in ordine alfabetico per 'Artista-Gruppo'
    viniliTotali.sort((a, b) => a["Artista-Gruppo"].localeCompare(b["Artista-Gruppo"]));

    // Visualizza i vinili
    visualizzaVinili();

    // Resetta il modulo
    document.getElementById("formVinile").reset();
}

// Funzione per resettare la collezione (rimuove i vinili dal Local Storage)
function resetVinili() {
    if (confirm("Sei sicuro di voler resettare la collezione aggiunta manualmente?")) {
        localStorage.removeItem('vinili');
        caricaDaJSON(); // Ricarica la collezione originale
        alert("Collezione resettata.");
    }
}


if (window.location.pathname.endsWith('disco.html')) {

    // Funzione per ottenere i parametri dall'URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Recupera il parametro 'title' dall'URL
    const titolo = getQueryParam('title');

    if (titolo) {
        // Carica i dati dei vinili dal JSON
        fetch('vinili.json')
            .then(response => response.json())
            .then(vinili => {
                // Carica i vinili dal Local Storage
                const viniliLocal = JSON.parse(localStorage.getItem('vinili')) || [];
                vinili = vinili.concat(viniliLocal);

                // Cerca il disco con il titolo corrispondente
                const disco = vinili.find(v => v.Titolo === titolo);

                if (disco) {
                    document.getElementById('titolo-disco').textContent = disco.Titolo;

                    // Se hai un'immagine specifica per il disco, aggiorna l'attributo 'src'
                    // Ad esempio, se le immagini sono nominate con il codice del disco:
                    document.getElementById('copertina-disco').src = 'images/' + disco.Titolo + '.jpg';

                    // Aggiorna l'attributo 'alt' per l'immagine
                    document.getElementById('copertina-disco').alt = 'Copertina di ' + disco.Titolo;

                    // Crea una descrizione del disco
                    const descrizione = `
                            <p><strong>Artista/Gruppo:</strong> ${disco["Artista-Gruppo"] || 'N/A'}</p>
                            <p><strong>Anno di Pubblicazione:</strong> ${disco["Anno di Pubblicazione"] || 'N/A'}</p>
                            <p><strong>Genere:</strong> ${disco.Genere || 'N/A'}</p>
                            <p><strong>Paese:</strong> ${disco.Paese || 'N/A'}</p>
                            <p><strong>Casa Discografica:</strong> ${disco["Casa Discografica"] || 'N/A'}</p>
                            <p><strong>Prezzo:</strong> ${disco.Prezzo || 'N/A'} €</p>
                        `;
                    document.getElementById('descrizione-disco').innerHTML = descrizione;
                } else {
                    document.getElementById('titolo-disco').textContent = 'Disco non trovato';
                    document.getElementById('descrizione-disco').textContent = 'Spiacente, il disco richiesto non è disponibile.';
                }
            })
            .catch(error => {
                console.error('Errore nel caricamento dei vinili:', error);
                document.getElementById('titolo-disco').textContent = 'Errore';
                document.getElementById('descrizione-disco').textContent = 'Si è verificato un errore durante il caricamento dei dati del disco.';
            });
    } else {
        document.getElementById('titolo-disco').textContent = 'Nessun disco selezionato';
        document.getElementById('descrizione-disco').textContent = 'Nessun disco è stato specificato.';
    }
}


// Funzione per caricare il carosello delle copertine
function caricaCarosello() {
    const carouselInner = document.querySelector('#albumCarousel .carousel-inner');
    carouselInner.innerHTML = ''; // Pulisce il contenuto esistente

    const itemsPerSlide = 3; // Numero di elementi per slide
    const totalItems = viniliTotali.length;

    // Calcola il numero di slide necessarie
    const numSlides = Math.ceil(totalItems / itemsPerSlide);

    for (let i = 0; i < numSlides; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        if (i === 0) {
            carouselItem.classList.add('active');
        }

        // Crea un container per gli elementi di questa slide
        const row = document.createElement('div');
        row.classList.add('row');

        // Aggiunge gli elementi per questa slide
        for (let j = i * itemsPerSlide; j < (i * itemsPerSlide) + itemsPerSlide && j < totalItems; j++) {
            const vinile = viniliTotali[j];

            const col = document.createElement('div');
            col.classList.add('col-12', 'col-sm-6', 'col-md-4'); // Adatta in base al responsive design

            // Crea l'elemento immagine
            const img = document.createElement('img');
            img.src = 'images/' + vinile.Titolo + '.jpg'; // Assicurati che il nome del file corrisponda
            img.alt = vinile.Titolo;
            img.classList.add('img-fluid');

            // Gestisce l'errore se l'immagine non esiste
            img.onerror = function() {
                this.src = 'images/default-cover.jpg'; // Immagine di default
            };

            col.appendChild(img);
            row.appendChild(col);
        }

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);
    }
}



function salvaCommento() {

    const commento = document.getElementById("campo-commento").value.trim();
    if (commento) {
       // localStorage.setItem("commentoDisco", commento);
        document.getElementById("commento-salvato").innerText = commento;
        document.getElementById("campo-commento").style.display = "none";
        document.getElementById("btn-commento").style.display = "none";

    } else {
        document.getElementById("commento-salvato").innerText = "Inserisci un commento prima di salvare.";
    }
}


// Carica i dati al caricamento della pagina
//window.onload = caricaDaJSON;

// Carica i dati al caricamento della pagina
window.onload = function() {
    caricaDaJSON().then(() => {
        if (window.location.pathname.includes("collezione.html")) {
            visualizzaViniliConCopertina(); // Popola collezione.html
        } else {
            visualizzaVinili(); // Popola index.html
        }
    });
};


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

    } catch (error) {
        alert(error.message);
    }
}


// Funzione per visualizzare i vinili nella tabella
function visualizzaVinili(vinili) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ""; // Pulisce la tabella prima di aggiungere i nuovi dati

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

    // Carica i vinili dal JSON e dal Local Storage
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

// Funzione per resettare la collezione (rimuove i vinili dal Local Storage)
function resetVinili() {
    if (confirm("Sei sicuro di voler resettare la collezione aggiunta manualmente?")) {
        localStorage.removeItem('vinili');
        caricaDaJSON(); // Ricarica la collezione originale
        alert("Collezione resettata.");
    }
}

// Carica i dati al caricamento della pagina
window.onload = caricaDaJSON;

# LP Library - Collezione di Vinili

LP Library è un progetto web che consente di gestire e catalogare una collezione di vinili, offrendo un'interfaccia digitale semplice e accessibile. Questo strumento permette agli appassionati di vinili di organizzare i propri dischi con dettagli come titolo, artista, anno, genere, etichetta e altro, mantenendo viva la cultura del vinile in un'era dominata dalla musica digitale.

## Obiettivo
Creare un archivio digitale che aiuti gli utenti a catalogare, descrivere e organizzare i propri vinili, offrendo anche la possibilità di aggiungere dettagli personalizzati. Il progetto è pensato per collezionisti amatoriali, con un design semplice e intuitivo.

## Funzionalità
- **Catalogazione digitale dei vinili**: Permette agli utenti di aggiungere, visualizzare e ricercare vinili in base a vari criteri.
- **Accessibilità**: Compatibile con dispositivi desktop e mobile, con un design responsive.
- **Multiutenza**: In futuro, il sistema supportarà la gestione multiutente per famiglie o gruppi di collezionisti.
- **Interfaccia semplice**: Piattaforma facile da usare senza la complessità di marketplace o comunità.

## Tecnologie Utilizzate
- HTML5
- CSS3 (Bootstrap per la realizzazione del carosello)
- JavaScript (per la gestione della visualizzazione delle immagini e interazioni)
- JSON (per il caricamento dei vinili)
- Librerie esterne: W3Schools HOW TO, Bootstrap

## Caratteristiche
1. **Gestione Collezione**: Aggiungi, modifica, visualizza dischi in un'interfaccia user-friendly.
2. **Funzioni di Navigazione**: Breadcrumb, Timeline, Paginazione, Filtri avanzati.
3. **Interfaccia Visiva**: Design pulito con una palette di colori neutri, perfetto per una navigazione fluida.

## Benchmark
Il progetto si ispira a piattaforme come [Discogs](https://www.discogs.com) e [MusicBrainz](https://musicbrainz.org), ma si distingue per la sua semplicità e focus sulla gestione privata dei vinili.

### Punti di Forza:
- Interfaccia intuitiva e semplice.
- Personalizzazione avanzata della catalogazione.
- Design responsivo e accessibile.

### Limiti:
- Mancanza di un sistema di backend (i dati sono salvati nella cache del browser).
- Non supporta l'integrazione con backend complessi in questa versione.

## Usabilità
- **Design Responsivo**: Ottimizzato per una navigazione facile su desktop e dispositivi mobili.
- **Colore e Tipografia**: Palette di colori chiari con accenti vivaci per migliorare la leggibilità.
- **Icone e Font**: Utilizzo di icone intuitive e font sans-serif (Arial) per una buona leggibilità.

## Componenti del Progetto
- **W3Schools HOW TO / Bootstrap**: Componenti come carousel, accordion, tab, table, e cards per una navigazione interattiva.
- **Funzionalità di Navigazione**: Paginazione, breadcrumb e timeline per migliorare l'esperienza utente.

## Servizi Futuri
- **Ascolto degli Album**: Integrazione con piattaforme come YouTube, Spotify o Apple Music per ascoltare i dischi direttamente dalla pagina.
- **Espansioni**: Possibilità di integrare API come Discogs o MusicBrainz per automatizzare la catalogazione.

## Installazione
1. Clona il repository:
    ```bash
    git clone https://github.com/tuo-username/lp-library.git
    ```
2. Apri `index.html` nel tuo browser.

## Licenza
Distribuito sotto la Licenza MIT. Vedi il file LICENSE per ulteriori dettagli.

---

> *Nota*: I vinili presenti al caricamento della pagina sono caricati da un file JSON, mentre i dischi aggiunti tramite il form vengono memorizzati nella cache del browser, in quanto la versione gratuita del servizio di hosting (GitHub) non supporta backend tradizionali.

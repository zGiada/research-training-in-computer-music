# A New Sunrise for Speech Therapy: Development of SoundRise 2.0 Application

![SoundRise Logo](./public/soundRise-presentation.png)

SoundRise é un'applicazione educativa con lo scopo di aiutare persone, in particolar modo bambini e adolescenti, nel loro percorso di apprendimento vocale. Pensata per essere utilizzata come supporto aggiuntivo a un percorso di logopedia per giovani pazienti con difficoltà uditive e di comunicazione, unisce il mondo della tecnologia ed educazione, con un occhio di riguardo all'inclusività.
Un simpatico sole rappresenta le caratteristiche tonali e timbriche della voce dell'utente. Quando viene emesso un vocalizzo, il sole si sveglia e sorride, e, in base all'**altezza** della nota, all'**intensità** e al **timbro**, cambia la sua _posizione verticale_, la sua _dimensione_ e il suo _colore_, tutto in tempo reale. Questo sistema visivo aiuta a comprendere come funziona la propria voce.

## Perché SoundRise?

L'applicazione è nata dalla necessità di offrire uno strumento pratico e accessibile per i bambini che stanno lavorando su competenze di comunicazione, specialmente coloro che trovano difficoltà a sentire o distinguere correttamente i suoni vocalici. Dopo essere stata testata in contesti educativi e durante eventi come 'Science4All', SoundRise si è dimostrata un valido aiuto per molti bambini e i loro insegnanti.

## Come usare SoundRise

- **Accedi all'applicazione:** L'app è stata distribuita su Firebase e può essere utilizzata direttamente da qualsiasi dispositivo connesso a Internet. Visita [SoundRise su Firebase](https://soundrise-82999.web.app/) per accedere all'app.
- **Inizia a usare l'applicazione:** Una volta raggiunta questa pagina, dal menu basta scegliere la voce "RUN APP". Dopo aver premuto PLAY, l'utente può iniziare a pronunciare dei vocalizzi e vedere in tempo reale i cambiamenti del sole.

## Usabilità

Stiamo testando l'usabilità dell'applicazione e vorremmo il tuo feedback! Per partecipare, compila il nostro modulo su Google per aiutarci a migliorare SoundRise: [Test Usabilità SoundRise](https://forms.gle/R1S2vfRgDT1DWsCW6).

## Features

- **Riconoscimento vocale in tempo reale:** L'app utilizza un sistema avanzato di riconoscimento vocale per identificare e visualizzare le vocali pronunciate dagli utenti.
- **Interfaccia user-friendly:** Un design semplice e colorato, ottimizzato per i bambini, che facilita l'interazione.
- **Accessibilità su più dispositivi:** SoundRise è accessibile da qualsiasi browser connesso a Internet, sia su desktop che su dispositivi mobili.

## Tecnologie utilizzate

- **Web Audio API:** Per l'elaborazione audio e il riconoscimento della voce.
- **React:** libreria Javascript front-end per la creazione di interfacce utente.
- **Next.js:** framework JavaScript back-end per applicazioni React, e consente il rendering automatico lato server.
- **Firebase:** Utilizzato per il deploy e l'hosting dell'applicazione.

## Developers... Getting Started!

Prima di avviare l'applicazione, assicurati di avere installato le seguenti dipendenze:

- **Node.js** (versione >= 14)  
  Puoi scaricarlo da [Node.js](https://nodejs.org/).
- **npm** (viene installato insieme a Node.js)  
  Oppure, in alternativa, puoi usare **yarn** o **pnpm**.

Verifica se Node.js e npm sono installati correttamente eseguendo questi comandi nel terminale:

```bash
node -v
npm -v
```

Se vuoi usare yarn o pnpm:

- **Yarn** or **Pnpm**
  Puoi installarlo globalmente eseguendo:

```bash
npm install -g yarn
# or
npm install -g pnpm
```

## Installazione

Dopo aver installato Node.js e npm (o yarn/pnpm), segui questi passaggi per avviare l'applicazione:

1. Clona la repository:

```bash
git clone https://github.com/zGiada/research-training-in-computer-music.git
```

2. Entra nella directory del progetto:

```bash
cd research-training-in-computer-music
```

3. Installa le dipendenze:

```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Avvia il server di sviluppo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Apri http://localhost:3000 nel tuo browser per visualizzare l'applicazione.

## Licenza

Questo progetto è distribuito sotto la licenza **GNU General Public License v3.0**. Per maggiori informazioni, consulta il testo completo della licenza disponibile al seguente link:  
[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.txt)

## Contatti

Per ulteriori informazioni o domande sul progetto, puoi contattare:

- **Dott.ssa Giada Zuccolo**: [zuccologia@dei.unipd.it](mailto:zuccologia@dei.unipd.it)
- **Dott. Andrea Franceschini**: [andrea.franceschini@dei.unipd.it](mailto:andrea.franceschini@dei.unipd.it)
- **Dott. Alessandro Fiordelmondo**: [fiordelmondo@dei.unipd.it](mailto:fiordelmondo@dei.unipd.it)
- **Prof. Sergio Canazza**: [canazza@dei.unipd.it](mailto:canazza@dei.unipd.it)

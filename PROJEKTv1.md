## Cel projektu
Celem pierwszego etapu projektu jest stworzenie aplikacji pozwalającej na operacje CRUD na pojedynczej *tabeli* bazy danych, tzn. aplikacja powinna pozwalać na:
- odczyt wszystkich dokumentów (wyświetlenie ich)
- dodawanie nowych dokumentów do bazy danych
- usuwanie dokumentów
- edytowanie już istniejących dokumentów, z możliwością anulowania i zatwierdzania zmian

### Model:

Na lekcjach korzystaliśmy z interfejsu który kształtował model w naszej aplikacji:
```ts
// book.model.ts
export interface Book {
  _id? :string,
  _rev?: string,
  autor :string,
  tytul :string,
  rok_wydania :string
}
```
W projekcie należy również stworzyć model pojedynczego rekordu z bazy danych. Powinien on posiadać minimum 4 właściwości (oprócz pól `_id` oraz `_rev`), obojętnie jakiego typu. Więc np. jeżeli ktoś by chciał tworzyć projekt dot. gier mógłby stworzyć następujący interfejs:
```ts
// game.model.ts
export interface Gra {
  _id? :string,
  _rev? :string,
  nazwa :string,
  platforma : "PC" | "PlayStation 4" | "XBOX One",
  rok_wydania :string,
  studio :string
}
```
### Wymagane narzędzia:
- **CouchDB** lub inna nierelacyjna baza danych
- paczka `node` do komunikacji z bazą danych (dla CouchDB jest to `nano`)
- **Serwer frontendowy: Angular**, najlepiej w wersji 17. Aby zainstalować daną wersję paczki używamy `npm i @angular/cli@17.0.0`
- **Serwer backendowy: Express** oraz inne paczki dla backendu:
  - `body-parser`
  - `colors`
  - `cors`
  - `dotenv`
  - wspomniany już `nano` lub inne narzędzie do komunikacji z bazą danych

> Jeżeli ktoś zna bardzo dobrze inne frameworki, np. React, Vue, Django, może wykonać projekt za pomocą innych technologii. Warto jednak pamiętać że w przyszłości będzie trzeba rozszerzyć aplikacje o kolejne funkcjonalności które mogą być trudne do zrealizowania w innych frameworkach.

> Przy użyciu innych frameworków należy pamiętać o zachowaniu podziału aplikacji na 2 osobne serwery np. Django jako backend, React lub Vue jako frontend


## Struktura projektu

1. Tworzymy ręcznie folder główny aplikacji:

```bash
~/ $ mkdir Projekt
```

2. Za pomocą CLI (*command line interface*) Angulara tworzymy projekt o nazwie `frontend` wewnątrz folderu głównego:
```bash
~/Projekt/ $ ng new frontend --no-standalone
```
> Gdy narzędzie `ng` spyta nas o to, jaki rodzaj arkuszy stylów chcemy używać, zaznaczamy **CSS** i wciskamy `Enter` (chyba że ktoś chce np. `SCSS`. lub `SASS`). Następnie gdy spyta o **SSR** i **SSG** (renderowanie aplikacji po stronie serwera, generowanie statycznych wersji stron), wciskamy `N` oraz `Enter`

> Gdy jest to pierwsze uruchomienie polecenia `ng`, prawdopodobnie spyta się jeszcze, czy chcemy przesyłać anonimową telemetrię do autorów Angulara. Tu odpowiadamy jak chcemy.

3. Tworzymy ręcznie folder dla serwera backendowego:
```bash
~/Projekt/ mkdir backend
```

4. Inicjujemy projekt `node` wewnątrz folderu `backend`

```bash
~/Projekt/backend/ $ npm init
```

5. Instalujemy wymagane dla backendu paczki

```bash
~/Projekt/backend/ $ npm i body-parser colors express cors dotenv nano
```

6. Tworzymy plik serwera backendowego:

```bash
- Dla Windows -
C:\Projekt\backend> copy nul "app.js"

- Dla POSIX -
~/Projekt/backend $ touch app.js
```

7. Tworzymy plik `.env` w folderze `backend` (można stworzyć tak samo jak w punkcie 6) i wypełniamy go danymi logowania do bazy danych:

```dotenv
DB_LOGIN = "admin"
DB_PASSWORD = "admin"
```

(oczywiście jeżeli ktoś podczas instalacji CouchDB podał inne dane logowania należy je tu wpisać zamiast `admin`)

8. Do pliku `app.js` dodajmy linie kodu które pobierają dane z pliku `.env`, importują wymagane paczki, łączą nas z bazą danych. Dodatkowo możemy stworzyć też pętlę nasłuchującą ruch sieciowy

```js
// app.js
require('dotenv').config()

const nano = require('nano')(`http://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@localhost:5984`)
const colors = require('colors')
const bodyParser = require('body-parser')

const express = require('express')
const cors = require('cors')

const DB_NAME = 'NAZWA_BAZY_DANYCH'
const PORT = 5555
const app = express()

app.use(cors())
app.use(bodyParser.json())

const DB = nano.use(DB_NAME)

app.listen(PORT, () => {
  console.log(`Serwer działa na adresie http://localhost:${PORT}`.underline.blue)
})
```

9. Uruchamiamy oba serwery i sprawdzamy czy wszystko działa:

```bash
- Dla frontendu -
~/Projekt/frontend $ ng serve

- Dla backendu -
~/Projekt/backend $ node app.js
```
10. Tworzymy:
- komponenty Angulara `ng g c nazwaKomponentu` 
- usługę do rozmawiania z backendem `ng c s nazwaUsługi`
- obsługiwacze żądań w `app.js`
### Struktura

```
Projekt/
  L frontend/
  |   L .angular/
  |   L .vscode/
  |   L .editorconfig
  |   L .gitignore
  |   L node_modules/
  |   L angular.json
  |   L package.json
  |   L package-lock.json
  |   L README.md
  |   L tsconfig.app.json
  |   L tsconfig.json
  |   L tsconfig.spec.json
  |   L src/
  |       L app/
  |       |   L app.component.css
  |       |   L app.component.html
  |       |   L app.component.spec.ts
  |       |   L app.component.ts
  |       |   L app.module.ts
  |       |   L app-routing.module.ts
  |       |
  |       L assets/
  |       L favicon.ico
  |       L index.html
  |       L main.ts
  |       L style.css
  |   
  L backend/
      L node_modules/
      L .env
      L app.js
      L package.json
      L package-lock.json
```

## Ocenianie

Podczas oddawania projektu oceniane będą dwa aspekty, teoretyczny oraz praktyczny. Będę zadawał pytania dotyczące działania Waszej aplikacji, a Waszym zadaniem będzie się *obronić*. Ocena za aplikacje pójdzie na pracownie, a odpowiedź ustna na nie-pracownie.



### Na ocenę 3

- Działająca aplikacja fullstack pozwalająca na odczyt danych

### Na ocenę 4

- Działająca aplikacja fullstack pozwalająca na odczyt i dodawanie nowych dokumentów

### Na ocenę 5

- Działająca aplikacja fullstack pozwalająca na wszystkie operacje CRUD + jakiś *ładny* CSS. Można (a nawet zalecam, najbardziej Bootstrapa bo pytają o niego na teoretycznym) używać frameworków CSS.


## Termin

### Dla zespołów 3 osobowych
```
04.04.2024
```
### Dla zespołów 2 osobowych
```
11.04.2024
```
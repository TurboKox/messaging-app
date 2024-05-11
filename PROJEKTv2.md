## Cel projektu
Celem drugiego etapu projektu jest dodanie możliwości przesyłania plików oraz uwierzytelnianie i tworzenie użytkowników. Dodatkowo, należy autoryzować żądania dodawania nowych przedmiotów, tj. tylko zalogowany użytkownik może dodawać nowe przedmioty.

### Modyfikacja backendu

#### Nowe paczki

```bash
npm i multer jsonwebtoken argon2
```

`multer` - warstwa pośrednicza zajmująca się obsługą plików <br>
`jsonwebtoken` - mechanizm autoryzacji polegający na wygenerowaniu tokenów JSON i sprawdzeniu czy są one wewnątrz żądania (np. żądania dodawania nowej książki) <br>
`argon2` - kodowanie i dekodowanie haseł użytkowników <br>

#### Nowy plik i folder

- folder `uploads` - do tego folderu należy zapisywać przekazywane przez użytkowników multimedia (tylko `JPEG` i `PNG`)
- plik `user.interface.js` - plik posiadający połączenie z bazą użytkowników oraz funkcje pomocnicze (np. dodawanie nowego dokumentu - użytkownika, wyszukiwanie po nazwie czy użytkownik już istnieje itp.)

#### Konfiguracja

- Po zaimportowaniu wszystkich paczek `npm` za pomocą funkcji `require` należy skonfigurować paczkę `multer` oraz `jsonwebtoken`. Należy wskazać do którego folderu mają być zapisywane pliki, pod jaką nazwą oraz jakie rozszerzenia plików są akceptowalne (tylko `JPEG` i `PNG`). <br> Pliki mają być zapisywane w folderze `uploads` pod własnymi nazwami. Struktura nazwy pliku to: `sygnaturaCzasowaUNIX_oryginalnaNazwaPliku.rozszerzeniePliku` np. `1713860978_ostatniezyczenie.png`

- Dla JWT należy stworzyć ciąg znaków będący *sekretem*. Za jego pomocą podpisujemy tokeny JSON aby potem, w procesie uwierzytelniania sprawdzić, czy przesłany token został wygenerowany przez nasz serwer.

#### Nowe endpointy

`POST` na `/api/v1/login` - obsługa logowania użytkownika <br>
`POST` na `/api/v1/register` - obsługa rejestracji użytkownika <br>

<hr>

### Modyfikacja frontendu

Po stronie frontendu został dodany *store*, jest to mechanizm pozwalający na przechowywanie globalnych informacji o stanie aplikacji. W nim będziemy zapisywać infromacje o tym, czy użytkownik jest zalogowany. Pozwoli to nam na autoryzacje po stronie klienta oraz automatyzację procesu zapisywania tokenu w pamięci przeglądarki.

#### Nowe paczki

```bash
ng add @ngrx/store@latest
```

Polecenie to doda do projektu angular bibliotekę NgRx odpowiedzialną za mechanizm magazynu.

#### Nowe pliki i foldery

- folder `magazyn` - w nim zapiszemy wszystkie komponenty wymagane w NgRx (akcje, selektory i reduktory)
  - plik `user-state.model.ts` - model opisujący jaki stan aplikacji chcemy zapisać. W naszym wypadku jest to jedna właściwość `czyZalogowany` o typie `boolean`
  - plik `user-actions.ts` - opisuje jakie akcje mogą być użyte by zmienić stan aplikacji (w naszym wypadku tylko 2 - logowanie i wylogowanie)
  - plik `user-reducers.ts` - faktyczne funkcje przyjmujące aktualny stan i wypluwające stan po modyfikacji. przy logowaniu `czyZalogowany` będzie ustawiony na `true`, przy wylogowaniu ustawiamy na `false`
  - plik `user-selectors.ts` - zapisujemy w nim funkcje które z magazynu wyłuskują dane. U nas jest to 1 selektor który zwraca wartosć `czyZalogowany`

- folder `user` - w nim zapiszemy wszystkie komponenty dot. użytkownika tj. komponenty logowania, rejestracji i wylogowania
  - folder `user-login`
  - folder `user-logout`
  - folder `user-register`

Na początku tworzymy folder `user` a następnie za pomocą polecenia `ng generate component <nazwa>` tworzymy komponenty `user-login`, `user-register` oraz `user-logout` i przenosimy je do folderu `user`

- plik `auth.service.ts` - to usługa odpowiedzialna za wszystkie żądania dotyczące użytkownika. Wewnątrz tego pliku zapisujemy funkcje wysyłające żądania rejestracji, logowania oraz aktywujące akcje wylogowania

#### Modyfikacja istniejących plików

- plik `api.service.ts`
  - należy z nagłówków HTTP usunąć nagłówek `Content-Type`, od teraz dane będą wysyłane jako `form-data`
  - należy sprawdzić czy istnieje zapisany token przed próbą dodania przedmiotu (walidacja po stronie klienta)

- plik `app-routing.module.ts`
  - do tablicy `routes` 


## Termin

### Dla zespołów 3 osobowych
```
14.05
```

### Dla zespołów 2 i 1 osobowych

```
21.05
```



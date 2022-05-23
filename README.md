<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Main Goals

- [ ] Integracja z API google translator
- [ ] Przetłumaczenie pól obiektu poprzez API googla translatora podany w requestBody
- [ ] Zapis wszystkich danych we wskazanym języku w formie pliku js o nazwie tego języka (dla angielskiego będzie to en.json)
- [ ] W response zwrócić kompletny obiekt z tekstami

## Optional Goals

- [ ] Jeśli przy zapytaniu o tłumaczenie na język angielski istnieje już plik en.json to jego zawartość jest zwracana w response
- [ ] Funkcja translate nie powinna zmieniać struktury danych językowych oraz powinna tłumaczyć cały obiekt jednocześnie

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

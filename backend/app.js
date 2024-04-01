require('dotenv').config()

const nano = require('nano')(`http://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@127.0.0.1:5984`)
const colors = require('colors')
const bodyParser = require('body-parser')

const express = require('express')
const cors = require('cors')

const DB_NAME = 'messagingapp'
const PORT = 5555
const app = express()

app.use(cors())
app.use(bodyParser.json())


const DB = nano.use(DB_NAME)

app.get('/api/v1/konwersacja', (req, res) => {
  DB.list({include_docs: true}, (error, dane) => {
    if(error) {
      res.status(500).json({error: `Internal Server Error: ${error.message}`})
      return
    }

    const wszystkieDokumenty = dane.rows.map(wiersz => wiersz.doc)
    res.status(200).json(wszystkieDokumenty)
  })
})
app.post('/api/v1/dodaj', (req, res) => {
  var obecna_data = new Date();
  var dd = String(obecna_data.getDate()).padStart(2, '0');
  var mm = String(obecna_data.getMonth() + 1).padStart(2, '0');
  var yyyy = obecna_data.getFullYear();
  obecna_data = mm + '/' + dd + '/' + yyyy;

  const dokument = {
    tresc_wiadomosci: req.body.tresc_wiadomosci,
    data_wyslania_wiadomosci: obecna_data,
    status_wiadomosci: "wysłana",
    status_dostepnosci: "niedostępny",
    nazwa_uzytkownika: "user1"
  }
  
  DB.insert(dokument, (err, body) => {
    if(err) {
      res.status(500).json({error: `Internal Server Error: ${err.message}`})
      return
    }
    
    console.log(`Dodano książkę ${dokument.tytul}`.green)
    res.status(200).json({message: 'Dokument dodany'})
  })
})

app.listen(PORT, () => {
  console.log(`Serwer działa na adresie http://localhost:${PORT}`.underline.blue)
})

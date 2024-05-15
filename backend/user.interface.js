require('dotenv').config()
const nano = require('nano')(`http://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@localhost:5984`)

const DB_NAME = 'uzytkownicy'

const DB = nano.use(DB_NAME)

async function createUser(user) {
  try {
    const response = await DB.insert(user)
    return response
  } catch(e) {
    throw new Error(`Błąd przy tworzeniu użytkownika: ${e}`)
  }
}
async function findUserByUsername(login) {
  try {
    const odpowiedz = await DB.find({selector: {login: login}})
    if(odpowiedz.docs.length === 0) {
      return null;
    }
    return odpowiedz.docs[0]
  } catch(e) {
    throw new Error(`Błąd przy szukaniu użytkownika: ${e}`)
  }
}

module.exports = { createUser, findUserByUsername }
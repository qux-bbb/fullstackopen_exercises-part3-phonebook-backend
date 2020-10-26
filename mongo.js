const mongoose = require('mongoose')

if ( process.argv.length!==3 && process.argv.length!==5 ) {
  console.log('give password as argument')
  console.log('or give password, name, number as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.9gxez.mongodb.net/person-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}else{
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
  })
}
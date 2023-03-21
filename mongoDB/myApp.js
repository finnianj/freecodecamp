require('dotenv').config();
let mongoose = require("mongoose")
const mongo = process.env.MONGO_URI

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let finn = new Person({
    name: 'Finn',
    age: 26,
    favoriteFoods: ["Pizza", "Pasta"]
  });

  finn.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data);
    done(null, data)
  });
};

arrayOfPeople = [{
  name: 'Smokey',
  age: 13,
  favoriteFoods: ["Meat", "Biscuits"]
},
  {
  name: 'Nick',
  age: 25,
  favoriteFoods: ["Slurp", "Gulp"]
},
  {
  name: 'Cristopher',
  age: 95,
  favoriteFoods: ["Crackers", "Burgers"]
}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
      if (err) return console.error(err);
      console.log(data);
      done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.error(err);
    console.log(data);
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
      if (err) return console.error(err);
      console.log(data)
      done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data) {
      if (err) return console.error(err);
      console.log(data)
      done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

   Person.findById(personId, (err, person) => {
     console.log(person)
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      console.log(updatedPerson)
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true, runValidators: true}, function(err, data) {
      if (err) return console.error(err);
      console.log(data)
      done(null, data)
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, function(err, data) {
        if (err) return console.error(err);
        console.log(data)
        done(null, data);
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, data) {
      if (err) return console.error(err);
      console.log(data)
      done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var findQuery = Person.find({ favoriteFoods: foodToSearch })
  findQuery.sort({ name: 1 })
          .limit(2)
          .select({ age: 0 })
          .exec(function(err, data) {
              if (err) return console.error(err);
              console.log(data)
              done(null, data);
          })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

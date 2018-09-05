const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  gender: { type: String, enum: ['male', 'female']},
  name: new mongoose.Schema({
    title: { type: String },
    first: { type: String },
    last: { type: String },
  }, { _id: false }),
  location: new mongoose.Schema({
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    coordinates: new mongoose.Schema({
      latitude: { type: String },
      longitude: { type: String },
    }, { _id: false }),
    timezone: new mongoose.Schema({
      offset: { type: String },
      description: { type: String },
    }, { _id: false }),
  }, { _id: false }),
  email: { type: String },
  login: new mongoose.Schema({
    uuid: { type: String },
    username: { type: String },
    password: { type: String },
    salt: { type: String },
    md5: { type: String },
    sha1: { type: String },
    sha256: { type: String },
  }, { _id: false }),
  dob: new mongoose.Schema({
    date: { type: Date },
    age: { type: Number },
  }, { _id: false }),
  registered: new mongoose.Schema({
    date: { type: Date },
    age: { type: Number },
  }, { _id: false }),
  phone: { type: String },
  cell: { type: String },
  id: new mongoose.Schema({
    name: { type: String },
    value: { type: String },
  }, { _id: false }),
});

module.exports = mongoose.model('Member', MemberSchema);

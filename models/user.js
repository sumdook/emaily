const mongoose = require("mongoose");
const { Schema } = mongoose;
var bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  credits: { type: Number, default: 0 }
});

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model("users", userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  // Define your schema fields here
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl:{
    type:String,
  }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10)
   
    const hashPassword = await bcrypt.hash(user.password, salt);
  
    user.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }

})

// Create the model
const User = mongoose.model('user', userSchema);
module.exports = User;
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please tell us your name!"],
    },

    email: {
      type: String,
      require: [true, "pls provide your email"],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, "pls provide a valid email"],
    },

    password: {
      type: String,
      require: [true, "pls provide a password"],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      require: [true, "pls confirm your password "],
      validate: {
        //  this only works on create and save!!!!

        validator: function (el) {
          return el === this.password;
        },
        message: "passwords are not matching",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // only run this function if  password was actually modififed
  if (!this.isModified("password")) return next();
  //   hash the password with the cost of 12
  // console.log("hello");
  this.password = await bcrypt.hash(this.password, 12);

  // delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;

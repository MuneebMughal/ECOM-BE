const bcrypt = require("bcrypt");
const gen = async () => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
};
gen();
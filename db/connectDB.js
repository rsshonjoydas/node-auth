const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/node-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('database connection successfully'))
  .catch((err) => console.log(err));

const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');
const answers = require('./routes/api/quizzes');
const app = express();
const db = require('./config/keys_dev').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/routes/api/users', users);
app.use('/routes/api/questions', questions);
app.use('/routes/api/quizzes', answers);


// Handling 404
app.use((req, res) => {
	res.status(404).send({ err: 'We can not find what you are looking for' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));

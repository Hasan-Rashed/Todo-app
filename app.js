const express = require('express');
require('dotenv').config()
require('./models/db')
const User = require('./models/user')
const userRouter = require('./routes/user')


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);


// start test
const test = async (email, password) => {
    const user = await User.findOne({ email: email});
    const result = await user.comparePassword(password);

    console.log(result);
}
test('fazlerabby@gmail.com', 'rabby12');

// end test


app.get('/test', (req, res) => {
    res.send('Hello');
})


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to backend zone!'
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})


// mongodb+srv://Rashed:<password>@todo.gd83pym.mongodb.net/?retryWrites=true&w=majority

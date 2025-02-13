require("dotenv").config();
const express = require('express');
const connectDB = require("./db");
const app = express();

const userRoutes = require("./routes/userRoutes")
const todoRoutes = require("./routes/todoRoutes")

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => res.send('Todo backend'))

app.use('/api/user', userRoutes);

app.use('/api/todo', todoRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const productRoutes = require('./Routes/product');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public/'));
app.use(cors());
app.use(cookieParser());


app.set('view-engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/product', productRoutes);

mongoose.connect(process.env.DATA_URL, {useNewUrlParser: false});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Database connected'));

app.get('/', (req, res) => {
    res.redirect('/auth/login')
})

// app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.get('/health', (req, res) => {
    res.send('ok')
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`)
});
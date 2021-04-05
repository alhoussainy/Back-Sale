const express = require('express')
const app = express();
const passport = require('passport');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' })
const bodyparser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');




passport.use(require('./config/passport').localstrategie)
passport.use(require('./config/passport').JwtStrategy)
mongoose.set('useFindAndModify', false)
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/api/vente', routes)
require('./config/dataBase')

const port = process.env.PORT
app.listen(port, () => {
    console.log("server start");
})
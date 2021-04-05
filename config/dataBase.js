
const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://haidara:azerty@cluster0.7fzwf.mongodb.net/sample_supplies",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("database connected");
        else console.log("erreur de connection à la base ");
    }


)
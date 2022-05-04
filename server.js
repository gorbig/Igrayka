const express = require('express')
const mongoose = require('mongoose')
const regRoutes = require('./router/regRouter')
const port = 3000
const app = express()
app.use(express.json())
app.use("/reg",regRoutes)


app.set('view engine', 'ejs')
app.set('views', './')

app.use('/css',express.static(__dirname +'/css'));
app.use('/image', express.static(__dirname+"/image"));
app.use('/js', express.static(__dirname+"/js"));

app.use("/", require("./routes/"));
app.use("/arrivals", require("./routes/arrivals"));
app.use("/blogs", require("./routes/blogs"));
app.use("/index", require("./routes/index"));


const start = async () => {
    try{
        await mongoose.connect('mongodb+srv://user:user@cluster1.vrdur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(port, () =>
            console.log(`App listening at http://localhost:${port}`)
        );}
    catch (e) {
        console.log(e)
    }

}
start()
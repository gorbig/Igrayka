const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const path = require('path')
const ProductRoute = require('./router/productRouter');
const regRoutes = require('./router/regRouter')
const PORT = process.env.PORT || 5000
const app = express()

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/reg",regRoutes)
app.use('/product', ProductRoute)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


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
        await mongoose.connect('mongodb+srv://user:user@cluster0.6c0yg.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () =>
            console.log(`App listening at http://localhost:${PORT}`)
        );}
    catch (e) {
        console.log(e)
    }

}
start()
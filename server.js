const express = require('express')
const app = express()
const port = 3000

app.use('/css',express.static(__dirname +'/css'));
app.use('/image', express.static(__dirname+"/image"))
app.use('/js', express.static(__dirname+"/js"))

app.use("/", require("./routes/"));
app.use("/arrivals", require("./routes/arrivals"));
app.use("/blogs", require("./routes/blogs"));
app.use("/index", require("./routes/index"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
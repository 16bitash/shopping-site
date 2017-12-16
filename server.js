const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({dest: './api/img'});
const path = require("path");
const PORT = process.env.PORT || require("./config.json").SERVER.PORT;

const routes = {
    admin: require('./api/admin').route
};

const app = express();

app.use(express.static(path.join(__dirname, 'public_costomer')));
app.use('/administrator', express.static(path.join(__dirname, 'public_admin')));
app.use('/api/img', express.static(path.join(__dirname, 'api', 'img')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.single('image'));

app.use('/admin', routes.admin);

app.listen(PORT, () => {
    console.log("Yo dawg! Server's at http://localhost:" + PORT);
});
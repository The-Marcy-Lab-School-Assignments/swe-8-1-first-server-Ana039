const express = require("express");
const app = express();
const path = require("path")


const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
};

const routeToHw = path.join(__dirname, "../hw/dist")
const serveStatic = express.static(routeToHw)


app.use(logRoutes);
app.use(serveStatic)


const serveJoke = (req, res, next) => {
    res.send({joke: "When I wrote this code, only me and God knew how it works. Now only God knows"})
}
app.get('/api/joke',serveJoke)


const servePicture = (req, res, next) => {
res.send({SRC: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KcQUEkOQ1LoMDHkMZ-Yymw.jpeg' })
}
app.get('/api/picture', servePicture)

const serveRolls = (req, res, next) => {
    let quantity = req.query.quantity;
    quantity = isNaN(quantity) || quantity <= 0 ? 1 : parseInt(quantity);
    const rolls = [];
    for (let i = 0; i < quantity; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        rolls.push(roll);
    }
    res.send({ rolls });
}

app.get('/api/rollDie', serveRolls)



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})
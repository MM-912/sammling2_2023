import express from 'express'

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));

const data = ["Har du hørt om han som ikke likte kaffe? – Han syntes ikke det var noe å trakte etter…", "Vet du hva moren til Pinocchio var? – Trebarnsmor…", "Man kan si mye rart om Sveits, men en ting er i hvert fall sikkert. – Flagget er et stort pluss…"];


server.get("/", function (request, respons, next) {
    respons.status(200).send('Vår vitse server').end();
});

server.get("/joke/", function (request, respons, next) {

    const joke = displayJoke();
    respons.status(200).send(joke).end();

});

server.get("/jokes/", function (request, respons, next) {

    respons.status(200).send(data.join("\n\n")).end();

});



server.post("/joke/", express.text(), function (request, respons, next) {

    const joke = request.body;
    data.push(joke);
    respons.status(200).end();

})


function displayJoke(index = -1) {
    let jokeIndex = index;
    if (jokeIndex < 0) {
        jokeIndex = Math.floor(Math.random() * (data.length - 0 + 1) + 0);
    }
    const joke = data[jokeIndex];

    return joke;
}

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
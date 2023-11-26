import 'dotenv/config'
import express from 'express'
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: process.env.DATABASE_HOST,
    port: 5432,
    database: process.env.DATABASE_NAVN,
    user: process.env.DATABASE_BRUKER,
    password: process.env.DATABASE_PASSORD,
    ssl: true
})

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));

const data = await getJokesFromDB();


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


server.post("/joke/", express.text(), async function (request, respons, next) {
    const joke = request.body;
    await addJokeToDB(joke);
    respons.status(200).end();
})

server.post("/jokes/", express.text(), async function (request, respons, next) {
    let jokes = request.body;
    jokes = jokes.split("\n\n");

    for (const joke of jokes) {
        if (joke != "") {
            await addJokeToDB(joke);
        }
    }
    respons.status(200).end();
})

async function addJokeToDB(joke) {
    await client.connect() // Åpner db tilkoblin
    try {
        // Sender til databasen
        const res = await client.query('INSERT INTO "public"."Jokes"("joke") VALUES($1) RETURNING "id"', [joke]);
        // Ser hva vi fikk fra databasen.
        console.log(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end() // Stenger DB tilkobling.
    }

    data.push(joke);
}

async function getJokesFromDB() {

    let rows = [];
    await client.connect() // Åpner db tilkoblin
    try {
        // Sender til databasen
        const res = await client.query('Select * from "public"."Jokes"',);
        // Ser hva vi fikk fra databasen.
        rows = res.rows;
    } catch (err) {
        console.error(err);
    } finally {
        await client.end() // Stenger DB tilkobling.
    }

    rows = rows.map(obj => { return obj.joke })
    return rows;

}



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
    console.log('Database host', process.env.DATABASE_HOST);
});
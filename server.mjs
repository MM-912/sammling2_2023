import express from 'express'

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));

server.get("/", function (request, respons, next) {

    respons.status(200).send('Klase med bananer').end();

});

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
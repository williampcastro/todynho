var resitfy = require('restify');
var _ = require('lodash');
var mysql = require('mysql');

var conn = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ec021'
}


// lista todos os elementos do bd
getAll = (req, resp, next) => {

    //Definindo o formato da response
    resp.setHeader('Content-Type', 'application/json');
    resp.charSet('UTF-8');

    //colocar  função para pegar os elementos do banco 

    resp.send(todinhos);
    next();
}

addTody = (req, resp, next) => {
    //Definindo o formato da response
    resp.setHeader('Content-Type', 'application/json');
    resp.charSet('UTF-8');

    let data = req.body;

    tody = {
        lote: data.lote,
        conteudo: data.conteudo,
        validade: data.validade
    }

    console.log("==========CONECTANDO COM O BANCO==========");
    var connection = mysql.createConnection(conn);
    connection.connect()

    var addQuery = "INSERT INTO toddy (lote, conteudo, validade)"
        + "VALUES('" + tody.lote + "', '" + tody.conteudo + "', '" + tody.validade + "');";

    console.log(addQuery);

    connection.query(addQuery, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err)
        }
    })

    resp.send(tody);
    
    connection.end();

    next();
}

// update = (req, resp, next) => {
//     //Definindo o formato da response
//     resp.setHeader('Content-Type', 'application/json');
//     resp.charSet('UTF-8');


//     resp.send("Soma = " + soma.toString());
//     next();
// }

// addTody = (req, resp, next) => {
//     //Definindo o formato da response
//     resp.setHeader('Content-Type', 'application/json');
//     resp.charSet('UTF-8');


//     resp.send("Soma = " + soma.toString());
//     next();
// }

// remove(id){

//     _.remove(todinhos, o => {
//         return o.id == id;
//      });
// }

var server = resitfy.createServer({
    name: 'Todinho v1.0'
});

server.use(resitfy.plugins.bodyParser());

server.get('/all', getAll);
server.post('/add', addTody);
// server.post('/update', update);
// server.post('/del', remove);

var port = process.env.PORT || 6000;

server.listen(port, () => {
    console.log("%s rodando", server.name);
})


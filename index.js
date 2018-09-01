var resitfy = require('restify');
var  _ =  require ( 'lodash' );

var todinhos = [
    {
        id: 1,
        lote: "Lote",
        conteudo: "Conteudo",
        validade: "Validade"
    },
    {
        id: 2,
        lote: "Lote",
        conteudo: "Conteudo",
        validade: "Validade"
    }
];

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

    let todinho = [] ;
    let data = req.body;
    todinho = [{
        id : parseInt(data.id),
        lote : data.lote,
        conteudo : data.conteudo,
        validade : data.validade
    }]

    // console.log(todinho);
    // console.log(todinhos);

    todinhos = _.concat(todinhos,todinho);

    resp.send(todinhos);
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


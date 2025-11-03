import express, {static as static_} from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

import { engine } from 'express-handlebars';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup, serve} from 'swagger-ui-express';
import swaggerOptions from './../swagger.config';
import { Server } from 'http';
import socketIo, { Server as SocketServer } from 'socket.io';



import routes from './app/routes';


const PORT = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//app.use(express.static(path.join(__dirname, 'views')));

app.use('/static', static_(path.join(__dirname, '..', 'public')))

app.use(routes)


app.get('', (req, res) =>{
    //res.send('api works')
    //res.sendFile(__dirname + '/views/index.html')
    //const nombre = 'putito';
    //res.sendFile(path.join(__dirname, 'views','index.html'))
    //res.render('index', {nombre});
    res.render('index', {
        nombre: 'Hola',
        usuarios: [{nombre: 'Usuario 1'}, {nombre: 'Usuario 2'}, {nombre: 'Usuario 3'}]
    });
})

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/swagger', serve, setup(swaggerDocs));

 const server: Server = app.listen(PORT, () =>{
    console.log(`app is running in port: ${PORT}`)
})

const io = new SocketServer(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('se creo una nueva conexion');

    socket.emit('confirmacion');

    socket.on('messageSent', (datos) => {
        // socket.broadcast.emit('messageReceived', datos);
        io.emit('messageReceived', datos);
        socket.data.usuario = {} // para el evento del usuario se unio y cuando se salga que lo muestre
    })

    // socket.join('sala1');

    // socket.broadcast.emit('evento', { datos })

    socket.on('disconnect', () => {
        console.log('se desconecto un usuario')
    })

    });

// io.to('sala1').emit('evento', {})

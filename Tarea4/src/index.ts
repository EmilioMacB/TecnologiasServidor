import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import routes from './routes'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//  MIDDLEWARES para que el req.body no quede vacio
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use('/', routes); 

app.listen(PORT, () => {
    console.log(`🎄🎄🎄🎄🎄🎄🎄 Servidor corriendo en http://localhost:${PORT}🎄🎄🎄🎄🎄🎄🎄`);
});
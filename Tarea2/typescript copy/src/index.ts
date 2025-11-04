// server.ts
import express, { static as static_ } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import { engine } from 'express-handlebars';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup, serve } from 'swagger-ui-express';
import swaggerOptions from './../swagger.config';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import routes from './app/routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/static', static_(path.join(__dirname, '..', 'public')));
app.use(routes);

app.get('', (req, res) => {
  res.render('index', {
    nombre: 'Hola',
    usuarios: [{ nombre: 'antonio' }, { nombre: 'juan' }, { nombre: 'pedro' }]
  });
});

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/swagger', serve, setup(swaggerDocs));

const server: Server = app.listen(PORT, () => {
  console.log(`app is running in port: ${PORT}`);
});

const io = new SocketServer(server, {
  cors: {
    origin: '*'
  }
});

const userState = new Map<string, { name?: string; roomId?: string }>();

io.on('connection', (socket) => {
  console.log('Nueva conexión:', socket.id);

  userState.set(socket.id, {});

  function leaveCurrentRoom(reason?: 'leave' | 'logout' | 'disconnect') {
    const st = userState.get(socket.id);
    if (!st || !st.roomId) return;
    const roomId = st.roomId;
    const name = st.name || 'Usuario';
    socket.leave(roomId);
    socket.to(roomId).emit('systemMessage', {
      type: 'leave',
      name,
      timestamp: new Date().toISOString()
    });
    socket.emit('roomLeft');
    st.roomId = undefined;
  }

  socket.on('joinRoom', ({ roomId, name }: { roomId: string; name: string }) => {
    if (!roomId || !name) return;
    const st = userState.get(socket.id) || {};
    // Si ya estaba en otra sala, salir primero
    if (st.roomId) {
      leaveCurrentRoom();
    }
    st.name = name;
    st.roomId = roomId;
    userState.set(socket.id, st);
    socket.join(roomId);
    socket.emit('roomJoined', { roomId });
    socket.to(roomId).emit('systemMessage', {
      type: 'join',
      name,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('leaveRoom', () => {
    leaveCurrentRoom('leave');
  });

  socket.on('sendMessage', ({ message }: { message: string }) => {
    const st = userState.get(socket.id);
    if (!st || !st.roomId || !st.name || !message) return;
    const payload = {
      name: st.name,
      message,
      timestamp: new Date().toISOString(),
      senderId: socket.id
    };
    io.to(st.roomId).emit('messageReceived', payload);
  });

  socket.on('logout', () => {
    leaveCurrentRoom('logout');
    // limpiar nombre del usuario en servidor
    userState.set(socket.id, {});
    socket.emit('loggedOut');
  });

  socket.on('disconnect', () => {
    const st = userState.get(socket.id);
    if (st && st.roomId && st.name) {
      socket.to(st.roomId).emit('systemMessage', {
        type: 'leave',
        name: st.name,
        timestamp: new Date().toISOString()
      });
    }
    userState.delete(socket.id);
  });
});

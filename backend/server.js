const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});

app.use(cors());
app.use(bodyParser.json());

require('./routes/pollRoutes')(app, io);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    "Node server Runing"
    // `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
    //   .bgBlue.white
  );
});

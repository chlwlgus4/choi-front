function Chat() {
    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    const port = 3001;

    server.listen(port, () => {
        console.log('서버 실행 완료', 'http://localhost:' + port);
    })

    app.use('/public', express.static('./public'))
    app.get('/', (req, res) => {
        res.redirect(302, '/public')
    });

    function socketServerStart() {
        const socketIo = require('socket.io');
        const io = socketIo.listen(server);

        io.on('connection', (socket) => {
            console.log('사용자 접속 : ' + socket.client.id);

            socket.on('chat-msg', (msg) => {
                console.log('message : ' + msg);
                io.emit('chat-msg', msg);
            })
        });
    }

}

export default Chat;
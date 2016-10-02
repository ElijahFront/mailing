var SMTPServer = require('smtp-server').SMTPServer;
var server = new SMTPServer({
    secure:false,
    authMethods:'LOGIN',
    onAuth:function (auth, session, callback) {
        if (auth.username !== "user" || auth.password !== "password"){
            return callback(new Error('Invalid username or password'));
        } else {
            console.log("a new client has logged in");
            callback(null, {user:11});
        }

    },
    // onConnect: function (session, callback) {
    //    
    //     console.log("a new client has logged in");
    //     console.log(session);
    //     return callback()
    //    
    // },
    allowInsecureAuth:true,
    banner:"Hello there!",
    
    onRcptTo: function(address, session, callback){
        console.log(address);
        return callback(); // Accept the address
    },
    onClose:function () {
        console.log("Client has left");
        server.close(function () {
            console.log("The server has been shut down")
        })
    }


});

server.listen(4650, function () {
    console.log("listening");
});


module.exports = server;
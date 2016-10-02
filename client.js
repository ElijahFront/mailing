var SMTPConnection = require('smtp-connection');
var connection = new SMTPConnection({
    port:4650,
    secure:false,
    authMethod:'LOGIN',
    ignoreTLS:true
    //name:"Ilya"
});

connection.connect(function () {
    console.log("Connection has established");

    connection.login({
        user:"user",
        pass:"password"
    }, function(error){
        if (error){
            console.warn("Error logging in: "+error)
        } else {
            console.log("logged in");
            connection.send({
                from:"ilya@mail.ru",
                to:["cuprum19930@gmail.com", "cuprumski@yandex.ru"]
            }, "Hello world!", function (err, info) {
                if (err){
                    console.warn("An error has occurred: "+ err);
                    connection.quit();
                } else{
                    console.log("Message has been sent! Info: \n"+ info.accepted);
                    connection.quit()
                }
            })
        }
    });
});

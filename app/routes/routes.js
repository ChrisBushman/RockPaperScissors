module.exports = function(app) {
    app.get('*', (req, res) => {
        res.sendFile( appRoot + '/app/client/index.html');
    });
    // Example of post request
    /*
    app.post('/cards', (req, res) => {
        console.log("Title: " + req.body.title);
        console.log("Body: " + req.body.body)
        res.send('Hello')
    });
    */
};
module.exports = (app) => {
    app.get('*', (req, res) => {
        res.sendFile( appRoot + '/app/client/index.html');
    });
};
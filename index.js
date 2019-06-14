const application = require('./config/custom-express')();

application.then(app => {
    app.listen(3000, () => {
        console.log('\n\nServer listen *:3000');
    });
}).catch(error => console.log('\n\nError in initialize server', error));


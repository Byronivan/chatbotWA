const app = require('./src/app');
async function init(){
    await app.listen((process.env.PORT || 3000));
    console.log('Server on port 3000.')
}

init();
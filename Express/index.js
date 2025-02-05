import express from 'express';
import Joi from 'joi';
import helmet from 'helmet'
import morgan from 'morgan';
import config from 'config'
import log from './middlewares/logger.js';
import authentication from './middlewares/authentication.js';
import debug from 'debug';
import course from './routes/courses.js';


// const startupDebugger = debug('app:startup');
// const dbDebugger = debug('app:db');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended : true}));
// app.use(express.static('public'));
// app.use(log);
// app.use(authentication);
// app.use(helmet());
app.use('/api/courses', course);
// to set NODE_ENV to producton: export NODE_ENV=production

// export DEBUG=app:startup
// export DEBUG=app:db, app = startup (for multiple)

// // or direct call: DEBUG=app:db nodemon index.js
// console.log(`Application name: ${config.get('name')}`)
// console.log(`Mail server name: ${config.get('mail.host')}`)
// console.log(`Mail password: ${config.get('mail.password')}`)

// if(app.get('env')=='development'){
//     app.use(morgan('tiny'));
//     // console.log('Morgan Enabled.....')
//     startupDebugger("Morgan Enabled.......");
// }

// dbDebugger("Dabase connected.");



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at ${port}.......`);
});
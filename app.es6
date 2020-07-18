import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import Authrouter from './routes/AuthRouter'
import RegistrationRouter from './routes/RegistrationRouter'
import indexRouter from './routes/infermedica.es6';
import StatRouter from './routes/statForms';
import UsersRouter from './routes/usersRouter.es6';

const app = express();


app.use(useragent.express());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true ,limit: '50mb'}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/up', express.static(path.join(__dirname, 'upload')));

app.use(cors({origin: '*'}));

app.use('/auth', Authrouter);


app.all('*', function (req, res, next) {
    req.dir = __dirname;
    /**
     * intercept OPTIONS method
     */
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        req.dir =  path.join(__dirname,'upload');
        next();
    }
});

app.use('/register', RegistrationRouter);
app.use('/stat', StatRouter);
app.use('/user', UsersRouter);
app.use('/', indexRouter);


app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(err);
});

export default app;
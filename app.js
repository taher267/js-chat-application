const cookieParser = require('cookie-parser');
const express = require('express');
const { connect } = require('mongoose');
const loginRouter = require('./router/loginRoute');
const usersRouter = require('./router/usersRoute');
const inboxRoute = require('./router/inboxRoute');
var fs = require('fs');
require('dotenv').config();
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.set('view engine', 'ejs');
connect(process.env.MONGO_CONN_STRING + process.env.DB_NAME)
    .then(() => {
        console.log("Alhamdu Lillah");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }).
    catch(e => console.log(e));
/**
 * routing setup
 */

//login router
app.use("/", loginRouter);

//users router
app.use("/users", usersRouter);

//users router
app.use("/inbox", inboxRoute);

//error handling
app.use(notFoundHandler)
app.use(errorHandler);

const mkdir = () => {

    const UPLOADS_FOLDER = `public/uploads/avatars/`;
    const upArr = UPLOADS_FOLDER.split('/').filter(v => v.length > 0);
    let path = "";
    for (i = 0; i < upArr.length; i++) {
        path = path + `${upArr[i]}/`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        else {
            console.log("Directory already exist");
        }

    }

}

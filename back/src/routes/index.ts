import { Application } from 'express';
import express from 'express';
import user from './user';
import login from './login'

const routes = (app: Application) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ message: "ok"})
    });

    app.use(
        express.json(),
        user,
        login,
    );
}

export default routes;
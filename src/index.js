import {Logger} from "./logger.js";
import express from "express";

export class Application {
    main = async () => {

        const app = express();
        Logger.initLogger();

        app.listen(4000, () => {
            Logger.info('Application listening on port ' + 4000);
        })

        app.get('/', (req, res) => {
            Logger.info(`route: '/', status: 200`)
            res.json({response: 'Root route - success'});
        })

        app.get('/user/:id', (req, res) => {
            if (!req.params.id) {
                res.status(400).json({message: 'Некорректно указан id'})
            }

            const users = {
                1: {
                    name: 'Boris',
                    age: 19
                },
                2: {
                    name: 'Sanya',
                    age: 20,
                },
                3: {
                    name: 'Petr',
                    age: 20,
                }
            };

            if (+req.params.id > (users.length - 1) || users[+req.params.id]) {
                return res.json(users[+req.params.id])
            } else {
                return res.status(400).json({message: 'Не найден пользователь с id: ' + req.params.id});
            }

        });

        app.post('/user', (req, res) => {
            if (!req.body.name) {
                return res.status(400).json({message: 'Не указано имя пользователя'})
            }
            if (!req.body.age) {
                return res.status(400).json({message: 'Не указан возраст'})
            }
            Logger.info(`Created user: ${req.body.name}, ${req.body.age}`)
            return res.json({
                name: req.body.name,
                age: req.body.age,
            })
        })

        app.put('/user/:id', (req, res) => {
            if (!req.body.name) {
                return res.status(400).json({message: 'Не указано имя пользователя'})
            }
            if (!req.body.age) {
                return res.status(400).json({message: 'Не указан возраст'})
            }
            Logger.info(`Updated user: ${req.body.name}, ${req.body.age}`)
            return res.json({
                name: req.body.name,
                age: req.body.age
            });
        })

        app.delete('/user/:id', (req, res) => {
            Logger.err(`error: Database Error #124124`)
            return res.status(400).json({
               messsage: 'error, check logs for more info'
            });
        })

        process.on('unhandledException', (error) => {
            console.log(error);
        })
    }
}

const app = new Application();
app.main().catch(e => {
    console.trace(e);
})

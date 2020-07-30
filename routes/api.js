const express = require('express');
const { Client } = require('pg');

const router = express.Router();

const db = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.HOST,
    ssl: true,    
})

function generate(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


router.get('/', async (req, res) => {
        res.json({
            version: '1.0.0'
        })
})

router.get('/create/key/table', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try {
                await db.query(`CREATE TABLE keys ("key" VARCHAR(255) NOT NULL, "type" VARCHAR(100) NOT NULL, "id" VARCHAR(100), "machineId" VARCHAR(255))`)
                await db.end()
                res.send('Table created').status(200)
            } catch(error) {
                await db.end()
                console.log(error)
                res.send('Failed to create table').status(400)
            }
        } else {
            res.sendStatus(403)
        }
    }
)

router.post('/key', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try {
                if (req.body.key) {
                    let results = await db.query(`select * from keys where key = '${req.body.key}'`);
                    await db.end()
                    res.json(results.rows[0]).status(200)
                }
                if (req.body.userID) {
                    let results = await db.query(`select * from keys where id = '${req.body.userID}'`);
                    await db.end()
                    res.json(results.rows[0]).status(200)
                }
            } catch(error) {
                await db.end()
                console.log(error)
                res.json({ error }).status(400)
            }

        } else {
            res.sendStatus(403)
        }
    }
)



router.get('/list/users', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try {
                let results = await db.query(`select * from keys`);
                await db.end()
                res.json(results.rows).status(200)
            } catch(error) {
                await db.end()
                console.log(error)
                res.json({ error }).status(400)
            }
        } else {
            res.sendStatus(401)
        }
    }
)


router.post('/insert/key', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try{ 
                var key = `${generate(4)}-${generate(4)}-${generate(4)}-${generate(4)}`
                // key : key type : discord id : machine id
                await db.query("insert into keys values ($1,$2,$3,$4)",[key,req.body.type,null,null])
                await db.end();
                res.send({key:key,type:req.body.type,status:'added'}).status(200)
            } catch(error) {
                console.log(error)
                await db.end()
                res.json({ error }).status(400)
            }
        }else{
            res.sendStatus(401)
        }
    }
)

router.post('/reset/machine', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try {
                let results = await db.query(`select * from keys where key = '${req.body.key}'`);
                if (results.rows.length == 0) {
                    await db.end()
                    return res.sendStatus(404)
                }
                await db.query(`update keys set "machineId"=null where key='${req.body.key}'`);
                await db.end()
                res.sendStatus(200)
            } catch(error) {
                console.log(error)
                await db.end()
                res.json({ error }).status(400)
            }

        }else{
            res.sendStatus(401)
        }
    }
)

router.post('/set/machine', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY){ 
            await db.connect()
            try {
                await db.query(`update keys set "machineId"='${req.body.machine}' where key='${req.body.key}'`);
                await db.end()
                res.sendStatus(200).end()
            } catch(error) {
                await db.end()
                console.log(error)
                res.json({ error }).status(400)
            }
        } else {
            res.sendStatus(401)
        }
    }
)


router.post('/bind/user', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try {
                let results = await db.query(`select * from keys where key = '${req.body.key}'`);
                if (results.rows.length == 0) {
                    await db.end()
                    res.sendStatus(400)
                }
                if (results.rows[0].id == null) {
                    await db.query(`update keys set "id"='${req.body.userID}' where key='${req.body.key}'`);
                    await db.end()
                    res.sendStatus(200)
                } else {
                    await db.end()
                    res.json({ error:"user already bound" }).status(400)
                }
            } catch(error) {
                await db.end()
                console.log(error)
                res.json({ error }).status(400)
            }

        } else {
            res.sendStatus(401)
        }
    }
)

router.post('/unbind/user', async (req, res) => {
        if (req.get('apiKey') == process.env.API_KEY) {
            await db.connect()
            try {
                let results = await db.query(`select * from keys where key = '${req.body.key}'`);
                if(results.rows.length == 0){
                    await db.end()
                    res.sendStatus(404).end()
                }
                await db.query(`update keys set "id"=null where key='${req.body.key}'`);
                await db.end()
                res.sendStatus(200).end()
            } catch(error) {
                await db.end()
                console.log(error)
                res.json({ error }).status(400)
            }

        } else {
            res.sendStatus(401)
        }
    }
)

module.exports = router
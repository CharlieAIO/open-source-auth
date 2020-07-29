const express = require('express');
const router = express.Router();
const { Client } = require('pg');

function generate(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


router.get(
    '/',
    async function(req, res){
        res.send('Welcome to the api.').end(200)
    }
)

router.get(
    '/create/key/table',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                await client.query(`CREATE TABLE keys ("key" VARCHAR(255) NOT NULL, "type" VARCHAR(100) NOT NULL, "id" VARCHAR(100), "machineId" VARCHAR(255))`)
                await client.end()
                res.send('Table created').end(200)
            }catch(error){
                await client.end()
                console.log(error)
                res.send('Failed to create table').end(200)
            }


        }else{
            res.sendStatus(403)
        }
    }
)

router.post(
    '/key',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                if(req.body.key){
                    let results = await client.query(`select * from keys where key = '${req.body.key}'`);
                    await client.end()
                    res.json(results.rows[0]).end(200)
                }
                if(req.body.userID){
                    let results = await client.query(`select * from keys where id = '${req.body.userID}'`);
                    await client.end()
                    res.json(results.rows[0]).end(200)
                }
            }catch(error){
                await client.end()
                console.log(error)
                res.json({"error":error}).end(404)
            }

        }else{
            res.sendStatus(403)
        }
    }
)



router.get(
    '/list/users',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                let results = await client.query(`select * from keys`);
                await client.end()
                res.json(results.rows).end(200)
            }catch(error){
                await client.end()
                console.log(error)
                res.json({"error":error}).end(200)
            }


        }else{
            res.sendStatus(403)
        }
    }
)


router.post(
    '/insert/key',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                var key = `${generate(4)}-${generate(4)}-${generate(4)}-${generate(4)}`
                // key : key type : discord id : machine id
                await client.query("insert into keys values ($1,$2,$3,$4)",[key,req.body.type,null,null])
                await client.end();
                res.send({key:key,type:req.body.type,status:'added'}).end(200)
            }catch(error){
                console.log(error)
                await client.end()
                res.json({"error":error}).end(200)
            }
        }else{
            res.sendStatus(403)
        }
    }
)

router.post(
    '/reset/machine',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                let results = await client.query(`select * from keys where key = '${req.body.key}'`);
                if(results.rows.length == 0){
                    await client.end()
                    res.sendStatus(404).end()
                }
                await client.query(`update keys set "machineId"=null where key='${req.body.key}'`);
                await client.end()
                res.sendStatus(200).end()
            }catch(error){
                console.log(error)
                await client.end()
                res.json({"error":error}).end(200)
            }

        }else{
            res.sendStatus(403)
        }
    }
)

router.post(
    '/set/machine',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                await client.query(`update keys set "machineId"='${req.body.machine}' where key='${req.body.key}'`);
                await client.end()
                res.sendStatus(200).end()
            }catch(error){
                await client.end()
                console.log(error)
                res.json({"error":error}).end(200)
            }

        }else{
            res.sendStatus(403)
        }
    }
)


router.post(
    '/bind/user',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                let results = await client.query(`select * from keys where key = '${req.body.key}'`);
                if(results.rows.length == 0){
                    await client.end()
                    res.sendStatus(404).end()
                }
                if(results.rows[0].id == null){
                    await client.query(`update keys set "id"='${req.body.userID}' where key='${req.body.key}'`);
                    await client.end()
                    res.sendStatus(200).end()
                }else{
                    await client.end()
                    res.json({"error":"user already bound"}).end(404)
                }
            }catch(error){
                await client.end()
                console.log(error)
                res.json({"error":error}).end(200)
            }

        }else{
            res.sendStatus(403)
        }
    }
)

router.post(
    '/unbind/user',
    async function(req, res){
        if(req.get('apiKey') == process.env.API_KEY){
            const client = new Client({
                user:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_NAME,
                port:process.env.DB_PORT,
                host:process.env.HOST,
                ssl:true,    
            })
            await client.connect()
            try{
                let results = await client.query(`select * from keys where key = '${req.body.key}'`);
                if(results.rows.length == 0){
                    await client.end()
                    res.sendStatus(404).end()
                }
                await client.query(`update keys set "id"=null where key='${req.body.key}'`);
                await client.end()
                res.sendStatus(200).end()
            }catch(error){
                await client.end()
                console.log(error)
                res.json({"error":error}).end(200)
            }

        }else{
            res.sendStatus(403)
        }
    }
)

module.exports = router
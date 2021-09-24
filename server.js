const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');

// ENV
dotenv.config({ path: './config.env' });

// Init App
const app = express();

// Middelware
app.use(cors());
app.use(express.json());


// DB Connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'reactform'
})


/**
 * @description   New Record
 * @method        POST
 * @access        Public
 */

app.post('/create', (req,res) => {
    const name = req.body.name;
    const email = req.body.email;

    db.query('INSERT INTO user (name, email) VALUES (?,?)',[name,email],
        (err, result) => {
            if (err) {
                console.log(err);
            }else{
                res.send("Values Inserted");
            }
        }
    );

})



/**
 * @description   Get All Record
 * @method        GET
 * @access        Public
 */

app.get('/user', (req,res) => {

    db.query('SELECT * FROM user', (err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })

})



/**
 * @description   Get Particular Record
 * @method        GET ID
 * @access        Public
 */

app.get('/selectUpdate/:id', (req,res) => {

    const id = req.params.id;

    db.query('SELECT * FROM user WHERE ID= ?',id, (err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    })
})




/**
 * @description   Update Record
 * @method        PUT 
 * @access        Public
 */

app.put('/update', (req,res) => {

    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;

    db.query('UPDATE user SET name=?, email=? WHERE ID= ?',[name, email, id], (err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    })
})



/**
 * @description   Delete Record
 * @method        DELETE
 * @access        Public
 */

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;

    db.query("DELETE FROM user WHERE ID= ?",id, (err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})




// PORT 
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log(`SERVER RUNNING ON ${process.env.NODE_ENV} MODE ON PORT ${process.env.PORT}`.bgYellow.bold);
});

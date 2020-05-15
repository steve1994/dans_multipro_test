var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const secretSalt = "XFDrrew3198p";

module.exports = (pool) => {

    router.post('/register', function (req, res) {
        let username = req.body.username
        let password = req.body.password
        let sqlVerify = "SELECT * FROM users WHERE username=$1"
        pool.query(sqlVerify, [username], function (err,response) {
            if (err) {
                res.status(400).json({
                    status : 'failed',
                    message : err
                })
            }
            if (response.rows.length > 0) {
                res.status(400).json({
                    status : 'failed',
                    message : 'User already exist'
                })
            } else {
                if (!username || !password) {
                    res.status(400).json({
                        status : 'failed',
                        message : 'username and password cannot be null'
                    })
                }
                let sqlInsert = "INSERT INTO users(username,password) VALUES ($1, $2)"
                pool.query(sqlInsert, [username, password], function (err,response) {
                    if (err) {
                        res.status(400).json({
                            status : 'failed',
                            message : err
                        })
                    } else {
                        res.status(201).json({
                            status : 'success',
                            message : {username}
                        })
                    }
                })
            }
        })
    })

    router.post('/login', function(req, res) {
        let username = req.body.username
        let password = req.body.password
        let sqlVerify = "SELECT * FROM users WHERE username=$1 AND password=$2"
        pool.query(sqlVerify, [username, password], function (err,response) {
            if (err) {
                res.status(400).json({
                    status : 'failed',
                    token : '',
                    message : err
                })
            } else {
                if (response.rows.length > 0) {
                    if (response.rows[0].token) {
                        res.status(400).json({
                            status : 'failed',
                            token : '',
                            message : 'user unauthorized'
                        })
                    } else {
                        let token = jwt.sign({username,password}, secretSalt);
                        let sqlInsertToken = "UPDATE users SET token=$1 WHERE username=$2 AND password=$3";
                        pool.query(sqlInsertToken, [token, username, password], function (err,response) {
                            if (err) {
                                res.status(400).json({
                                    status : 'failed',
                                    token : '',
                                    message : err
                                })
                            } else {
                                res.status(201).json({
                                    status : 'success',
                                    token
                                })
                            }
                        })
                    }
                } else {
                    res.status(400).json({
                        status : 'failed',
                        token : '',
                        message : 'wrong username and/or password'
                    })
                }
            }
        })
    });

    router.post('/verify', function (req,res) {
        let token = req.body.token;
        if (token) {
            let sqlVerify = "SELECT * FROM users WHERE token=$1";
            pool.query(sqlVerify, [token], function (err,response) {
                if (err) {
                    res.status(400).json({
                        status : 'failed',
                        message : err
                    })
                }
                if (response.rows.length > 0) {
                    res.status(201).json({
                        status : 'success'
                    })
                } else {
                    res.status(400).json({
                        status : 'failed',
                        message : 'token is invalid or session expired'
                    })
                }
            })
        } else {
            res.status(400).json({
                status : 'failed',
                message : 'token should not be empty'
            })
        }

    })

    router.post('/logout', function (req,res) {
        let token = req.body.token;
        let sqlRemoveToken = "UPDATE users SET token='' WHERE token=$1";
        pool.query(sqlRemoveToken, [token], function (err,response) {
            if (err) {
                res.status(400).json({
                    status : 'failed',
                    message : err
                })
            } else {
                res.status(201).json({
                    status : 'success'
                })
            }
        })
    })

    return router;
}

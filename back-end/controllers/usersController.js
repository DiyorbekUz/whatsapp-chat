const fs = require('fs');
let currentDate = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()

module.exports = {
    getUsers: async (req, res, users) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(users))
    },

    getMessages: async (req, res, messages) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(messages))
    },

    getWriteUsers: async (req, res, writeUsers) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(writeUsers))
    },

    addUser: async (req, res, users) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            req.body = new Promise((resolve, reject) =>{
                let str = ''
                req.on('data', (chunk) =>str+= chunk)
                .on('end',() => {
                    try {
                        const value = JSON.parse(str)
                        return resolve(value)
                    } catch (error) {
                        return reject(error)
                    }
                })
            })
    
            res.json = function(value){
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(value))
            }
    
            let body = await req.body
            let obj = {
                user_id: users?.[users.length-1]?.['user_id'] + 1 || 1,
                username: body['username'],
                age: body['age'],
                gender: body['gender'],
                password: body['password'],
                photo_url: body['photo_url'],
                date: currentDate
            }
            users.push(obj)
        }catch(error){
             res.end('Invalid input!')
        }
    },

    sendmessages: async (req, res, messages) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            req.body = new Promise((resolve, reject) =>{
                let str = ''
                req.on('data', (chunk) =>str+= chunk)
                .on('end',() => {
                    try {
                        const value = JSON.parse(str)
                        return resolve(value)
                    } catch (error) {
                        return reject(error)
                    }
                })
            })
    
            res.json = function(value){
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(value))
            }

            if (!messages.length) {
                
            }

            let body = await req.body
            let whoUser = body.who.split('-')
            let count = 0
            messages.forEach(async (e,i) => {
                if ((e.who.split('-')[0] == whoUser[0] || e.who.split('-')[1] == whoUser[0]) && (e.who.split('-')[0] == whoUser[1] || e.who.split('-')[1] == whoUser[1])) {
                    let obj = {
                        username: body.fromUsername,
                        message: body.comment,
                        date: body.date
                    }
                    messages[i]['messages'].push(obj)
                    count = 1
                }
            });

            if (count == 0) {
                let obj = {
                    who: body.who,
                    messages: [
                            {
                                username: body.fromUsername,
                                message: body.comment,
                                date: body.comment
                            },
                        ]
                }

                messages.push(obj)
            }
            
        }catch(error){
             res.end('Invalid input!')
        }
    },


    writeUsers: async (req, res, writeUsers) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            req.body = new Promise((resolve, reject) =>{
                let str = ''
                req.on('data', (chunk) =>str+= chunk)
                .on('end',() => {
                    try {
                        const value = JSON.parse(str)
                        return resolve(value)
                    } catch (error) {
                        return reject(error)
                    }
                })
            })
    
            res.json = function(value){
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(value))
            }
    
            let body = await req.body
            if (!writeUsers.length) {
                let obj = {
                    who: body.who,
                    allChats: [
                        {
                            username: body.username,
                            photo_url: body.photo_url,
                            date: body.date.trim()
                        }
                    ]
                }
                writeUsers.push(obj)
                return
            }

            function checker(array, username){
                let checker = 1
                array.forEach((el, ind) => {
                    if (el.username == username) {
                        checker = 0
                    }
                });

                return checker ? true : false
            }
            let check = 0

            writeUsers.forEach((e,i) => {
                if (e.who == body.who) {
                    check = 1
                    if (checker(e.allChats, body.username) && e.who != body.username) {
                        let obj = {
                            username: body.username,
                            photo_url: body.photo_url,
                            date: body.date
                        }

                        writeUsers[i].allChats.push(obj)
                    }
                }
            });

            if (check == 0) {
                let obj = {
                    who: body.who,
                    allChats: [
                        {
                            username: body.username,
                            photo_url: body.photo_url,
                            date: body.date.trim()
                        }
                    ]
                }
                writeUsers.push(obj)
            }

        }catch(error){
            console.log(error.message)
        }
    },

    
}
module.exports = function(app, db) {
    const users = [
        {username: 'user1', password: 'a1b1' },
        {username: 'user2', password: 'a2b2' },
        {username: 'user3', password: 'a3b3' },
        {username: 'user4', password: 'a4b4' },
    ]
    
    app.get('/users/create', (req, res)=> {
        res.send({status:200, message:"Hello, "});
        
    });
    app.get('/users/read', (req, res)=> {
        res.send({status:200, data:users});
        
    });
    app.get('/users/read/by-username', (req, res)=> {
        users.sort((a, b) => (a.username > b.username) ? 1 : -1) 
        let user = users.map(({ username }) => username)
        res.send({status:200, data:user}); 
    });
    app.get('/users/read/id/:id', (req, res)=> {
        let id = req.params.id;
        const usr = users[id-1];
        if(!usr)res.send({status:404, error:true, message:'the user id does not exist'});
        res.send({status:200, data:usr}); 
    });
    
    app.post('/users/add', (req, res)=> {
            let us = req.body.username;
            let pass = req.body.password;
        
            if(us === '' || pass === '')
            {
                res.status(403).send('you cannot create a username without providing a password') 
            }
            else
            {
                const newuser = {
                    username:us,
                    password:pass,
                };
                users.push(newuser);
                res.send(users);
            }
       
    });
    
    app.put('/users/update/:id', (req, res)=> {
        var ur = req.body.username;
        var pas = req.body.password;
        let idd = req.params.id;
                 if (ur !== ''){
                 users[idd-1].username = ur;
                 }
                if (pas !== ''){ 
                    users[idd-1].password = pas;
                 }   
        res.send(users); 
    });
    
    
    app.delete('/users/delete/:id', (req, res)=> {
        let iddl = req.params.id-1;
        const use = users[iddl];
        users.splice(iddl, 1);
        if(!use)res.status(404).send('the user id does not exist');
        res.send(users);
    });
      
      app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
      });
    };
    Footer
    
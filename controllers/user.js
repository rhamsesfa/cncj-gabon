const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('../models/User')

exports.signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 9)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then( () => res.status(201).json({ message : 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next)=>{
  
    console.log(req.body)
    User.findOne({email: req.body.mailPro})
    .then(user =>{
        //console.log(user.email)
        if (user === null) {
            res.status(401).json({message: 'Paire identifiant / mot de passe incorrecte'});
        } else {
            bcrypt.compare(req.body.passwordPro, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Paire identifiant / mot de passe incorrecte'});
                } 
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ),
                    message:"user connected"
                });
                
            })
            .catch(error =>{
                res.status(500).json({error})
            })
        }
    })
    .catch(error => {
        res.status(500).json({ error })
    })
}
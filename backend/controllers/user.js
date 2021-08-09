const Utilisateur = require('../models/user');
const bcrypt = require('bcrypt');
// const utilisateur = require('../models/utilisateur');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const utilisateur = Utilisateur.create({
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash
            })
                .then(() => res.status(201).json({
                    userId: utilisateur.id,
                    token: jwt.sign(
                        { userId: utilisateur.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ) 
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })
        });
};

exports.login = (req, res, next) => {
    Utilisateur.findOne({ where: { email: req.body.email } })
        .then(utilisateur => {
            if (!utilisateur) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, utilisateur.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: utilisateur.id,
                        token: jwt.sign(
                            { userId: utilisateur.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    Utilisateur.findOne({ where: {id: req.params.id }})
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  };
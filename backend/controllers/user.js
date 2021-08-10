const Utilisateur = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
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
            Utilisateur.create({
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash
            })
                .then((user) => res.status(201).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
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
                        moderator: utilisateur.moderator,
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

exports.getAllUser = (req, res, next) => {
    Utilisateur.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));

};

exports.getOneUser = (req, res, next) => {
    Utilisateur.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    Utilisateur.findOne({ where: { id: req.params.id } })
        .then(user => {
            if (user.img_url) {
                const filename = user.img_url.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Utilisateur.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'user supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                Utilisateur.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'user supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            }

        })
        .catch(error => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    if (req.file) {
        Utilisateur.findOne({ where: { id: req.params.id } })
            .then(user => {
                if (user.img_url) {
                    const filename = user.img_url.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Utilisateur.update({
                            biography: req.body.biography,
                            img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        }, { where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: 'user modifié !' }))
                            .catch(error => res.status(400).json({ error }));
                    });
                } else {
                    Utilisateur.update({
                        biography: req.body.biography,
                        img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    }, { where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'user modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                }

            })
            .catch(error => res.status(404).json({ error }));
    } else {
        Utilisateur.update({ biography: req.body.biography }, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'user modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }

};
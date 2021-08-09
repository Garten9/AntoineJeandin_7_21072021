const Post = require('../models/post');
const User = require('../models/user');
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

exports.getOnePost = (req, res, next) => {
    Sauce.findOne({ id: escapeHtml(req.params.id) })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};


exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));

};

exports.createPost = (req, res, next) => {
    console.log(req.body);
    const post = Post.create({
        message: req.body.message,
        user_id: req.body.userId,
    })
        .then(() => res.status(201).json({ message: "post enregistré" }))
        .catch(error => res.status(400).json({ error }));

};

exports.modifyPost = (req, res, next) => {

    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    if (req.file) {
        Sauce.updateOne({ _id: req.params.id }, {
            name: escapeHtml(sauceObject.name),
            manufacturer: escapeHtml(sauceObject.manufacturer),
            description: escapeHtml(sauceObject.description),
            imageUrl: sauceObject.imageUrl,
            mainPepper: escapeHtml(sauceObject.mainPepper),
            heat: sauceObject.heat,
            userId: escapeHtml(sauceObject.userId),
            _id: req.params.id
        })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    } else {
        Sauce.updateOne({ _id: req.params.id }, {
            name: escapeHtml(sauceObject.name),
            manufacturer: escapeHtml(sauceObject.manufacturer),
            description: escapeHtml(sauceObject.description),
            mainPepper: escapeHtml(sauceObject.mainPepper),
            heat: sauceObject.heat,
            userId: escapeHtml(sauceObject.userId),
            _id: req.params.id
        })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deletePost = (req, res, next) => {
    // Sauce.findOne({ _id: escapeHtml(req.params.id) })
    //     .then(sauce => {
    //         const filename = sauce.imageUrl.split('/images/')[1];
    //         fs.unlink(`images/${filename}`, () => {
    //             Sauce.deleteOne({ _id: req.params.id })
    //                 .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
    //                 .catch(error => res.status(400).json({ error }));
    //         });
    //     })
    //     .catch(error => res.status(500).json({ error }));
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));

};


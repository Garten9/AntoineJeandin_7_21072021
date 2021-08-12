const Post = require('../models/post');
const fs = require('fs');


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
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
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

    if (req.file) {
        Post.create({
            message: escapeHtml(req.body.message),
            user_id: req.body.userId,
            img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
            .then(() => res.status(201).json({ message: "post enregistré" }))
            .catch(error => res.status(400).json({ error }));
    } else {
        Post.create({
            message: escapeHtml(req.body.message),
            user_id: req.body.userId,
        })
            .then(() => res.status(201).json({ message: "post enregistré" }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.modifyPost = (req, res, next) => {
    if (req.file) {
        Post.findOne({ where: { id: req.params.id } })
            .then(post => {
                if (post.img_url) {
                    const filename = post.img_url.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Post.update({
                            message: escapeHtml(req.body.message),
                            img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        }, { where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: 'post modifié !' }))
                            .catch(error => res.status(400).json({ error }));
                    });
                } else {
                    Post.update({
                        message: escapeHtml(req.body.message),
                        img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    }, { where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                }

            })
            .catch(error => res.status(404).json({ error }));
    } else {
        Post.update({ message: escapeHtml(req.body.message) }, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'post modifié !' }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.img_url) {
                const filename = post.img_url.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            }

        })
        .catch(error => res.status(404).json({ error }));
};


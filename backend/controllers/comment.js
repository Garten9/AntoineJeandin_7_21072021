const Comment = require('../models/comment');


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

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));

};

exports.createComment = (req, res, next) => {
    Comment.create({
        message: escapeHtml(req.body.message),
        user_id: req.body.userId,
        post_id: req.body.postId
    })
        .then(() => res.status(201).json({ message: "commentaire enregistré" }))
        .catch(error => res.status(400).json({ error }));

};

exports.deleteComment = (req, res, next) => {

    Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'comment supprimé !' }))
    .catch(error => res.status(400).json({ error }));

};


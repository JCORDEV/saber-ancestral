const category = require('../models').category_model;

module.exports = {
    list(req, res) {
        return category
            .findAll({})
            .then((category) => res.status(200).send(category))
            .catch((error) => { res.status(400).send(error);});
    },
    paginate(req, res) {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const offset = (page - 1) * limit;

        return category.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']]
        })
        .then(({ count, rows }) => {
            res.status(200).send({
                total: count,
                page,
                offset: offset,
                limit: Math.min(limit + offset, count),
                lastPage: Math.ceil(count / limit),
                data: rows
            });
        })
        .catch(error => {
            res.status(400).send(error);
        });
    },
    getById(req, res) {
        return category
            .findByPk(req.params.id)
            .then((category) => {
                if (!category) {
                    return res.status(404).send({
                        message: 'category Not Found',
                    });
                }
                return res.status(200).send(category);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    add(req, res) {
        const { name } = req.body;

        return category
            .create({ name })
            .then((category) => res.status(200).send(category))
            .catch((error) => {
                return res.status(400).send(error)
            });
    },
    update(req, res) {
        const { name } = req.body;
    
        return category
            .findByPk(req.params.id)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'category Not Found',
                    });
                }

                return category
                    .update({
                        name: name || category.name
                    })
                    .then(() => res.status(200).send(category))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => {
                return res.status(400).send(error);
            });
    },
    
    delete(req, res) {
        return category
            .findByPk(req.params.id)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }

                return category
                    .destroy()
                    .then(() => {
                        res.status(204).send(category);
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
const expert = require('../models').expert_model;
const fs = require('fs');
const path = require('path');
const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folderPath = path.join('public/images/experts/');

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            cb(null, folderPath);
        },
        filename: function (req, file, cb) {
            const name = req.body.name + '_' + Date.now();
            const ext = path.extname(file.originalname);
            cb(null, `${name}${ext}`);
        },
        // limits: { fileSize: 5 * 1024 * 1024 }  // Limitar el tamaño del archivo a 5 MB
    })
}).single('image'); 

module.exports = {
    list(req, res) {
        return expert
            .findAll({})
            .then((expert) => res.status(200).send(expert))
            .catch((error) => { res.status(400).send(error);});
    },
    paginate(req, res) {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const offset = (page - 1) * limit;

        return expert.findAndCountAll({
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
        return expert
            .findByPk(req.params.id)
            .then((expert) => {
                if (!expert) {
                    return res.status(404).send({
                        message: 'expert Not Found',
                    });
                }
                return res.status(200).send(expert);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    add(req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send({ error: 'Error al subir la imagen.' });
            }
            
            if (!req.file) {
                return res.status(400).send({ error: 'No se ha subido ninguna imagen.' });
            }

            const { name, expertise_area, contact} = req.body;
            return expert
                .create({
                    name,
                    expertise_area,
                    contact,
                    image: req.file.filename
                })
                .then((expert) => res.status(201).send(expert))
                .catch((error) => res.status(400).send(error));
        });
    },
    update(req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send({ error: 'Error al subir la imagen.' });
            }
    
            const { name, expertise_area, contact} = req.body;
    
            return expert
                .findByPk(req.params.id)
                .then(expert => {
                    if (!expert) {
                        return res.status(404).send({
                            message: 'expert Not Found',
                        });
                    }

                    const newImage = req.file ? req.file.filename : null;

                    if (newImage && expert.image) {
                        const oldImagePath = path.join('public/images/experts/', expert.image);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
    
                    return expert
                    .update({
                        name: name || expert.name,
                        expertise_area: expertise_area || expert.expertise_area,
                        contact: contact || expert.contact,
                        image: newImage || expert.image
                    })
                    .then(() => res.status(200).send(expert))
                    .catch((error) => res.status(400).send(error));
                })
                .catch((error) => res.status(400).send(error));
        });
    },
    delete(req, res) {
        return expert
            .findByPk(req.params.id)
            .then(expert => {
                if (!expert) {
                    return res.status(400).send({
                        message: 'expert Not Found',
                    });
                }
                return expert
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    delete(req, res) {
        return expert
            .findByPk(req.params.id)
            .then(expert => {
                if (!expert) {
                    return res.status(404).send({
                        message: 'Expert Not Found',
                    });
                }

                const imagePath = path.join('public/images/expert/', expert.image);

                return expert
                    .destroy()
                    .then(() => {

                        if (expert.image && fs.existsSync(imagePath)) {
                            fs.unlinkSync(imagePath);
                        }
                        
                        res.status(204).send();
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
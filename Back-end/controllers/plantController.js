const { Op, where } = require('sequelize');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const plant = require('../models').plant_model;
const expert = require('../models').expert_model;
const category = require('../models').category_model;
const plantExpert = require('../models').plant_expert_model;

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folderPath = path.join('public/images/plants/');

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            cb(null, folderPath);
        },
        filename: function (req, file, cb) {
            const scientificName = req.body.scientific_name;
            const ext = path.extname(file.originalname);
            cb(null, `${scientificName}${ext}`);
        },
        // limits: { fileSize: 5 * 1024 * 1024 }  // Limitar el tamaño del archivo a 5 MB
    })
}).single('image'); 

module.exports = {
    list(req, res) {
        return plant
            .findAll({})
            .then((plant) => res.status(200).send(plant))
            .catch((error) => { res.status(400).send(error);});
    },
    paginate(req, res) {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const offset = (page - 1) * limit;
        const categoryIds = req.query.categoryIds ? req.query.categoryIds.split(',').map(Number) : [];
        const searchQuery = req.query.search || '';

        return plant.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
            include: [{
                model: category,
                as: 'category',
                attributes: ['name']
            },{
                model: expert,
                as: 'experts',
                // attributes: ['id', 'name', 'expertise_area', 'contact_info'],
                through: { attributes: [] },
            }],
            where: {
                category_id: {
                  [Op.or]: categoryIds,
                },
                [Op.or]: [
                    { common_name: { [Op.iLike]: `%${searchQuery}%` } },
                    { scientific_name: { [Op.iLike]: `%${searchQuery}%` } },
                    { description: { [Op.iLike]: `%${searchQuery}%` } }
                ]
              },
            distinct: true,
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
    listFull(req, res) {
        return plant
            .findAll({
                include: [{
                    model: category,
                    as: 'category',
                    // attributes: ['name']
                },{
                    model: expert,
                    as: 'experts',
                    through: { attributes: [] }
                }]
            })
            .then((plant) => res.status(200).send(plant))
            .catch((error) => { res.status(400).send(error);});
    },
    getById(req, res) {
        return plant
            .findByPk(req.params.id)
            .then((plant) => {
                if (!plant) {
                    return res.status(404).send({
                        message: 'plant Not Found',
                    });
                }
                return res.status(200).send(plant);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    getFullById(req, res) {
        return plant
            .findByPk(
                req.params.id,
                {
                    include: [{
                        model: category,
                        as: 'category',
                        // attributes: ['name']
                    },{
                        model: expert,
                        as: 'experts',
                        through: { attributes: [] }
                    }]
                }
            )
            .then((plant) => {
                if (!plant) {
                    return res.status(404).send({
                        message: 'plant Not Found',
                    });
                }
                return res.status(200).send(plant);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    getByName(req, res) {
        const { common_name } = req.params;
    
        console.log('Searching for plant with name:', common_name);
        
        return plant
            .findAll({
                where: {
                    common_name: {
                        [Op.like]: `%${common_name}%`
                    }
                }
            })
            .then((plants) => {
                console.log('Found plants:', plants);
                if (plants.length === 0) {
                    return res.status(404).send({
                        message: 'No plants found with that name',
                    });
                }
                return res.status(200).send(plants);
            })
            .catch((error) =>
                res.status(400).send({ message: 'Error retrieving plants', error }));
    },
    getSearch(req, res){
        const { term } = req.params;

        return plant
            .findAll({
                include: [{
                    model: category,
                    as: 'category'
                },{
                    model: expert,
                    as: 'experts',
                    through: { attributes: [] }
                }],
                where: {
                    [Op.or]:
                        isNaN(term) ? [
                            { common_name: { [Op.like]: `%${term}%` } },
                            { scientific_name: { [Op.like]: `%${term}%` } },
                            { habitat: { [Op.like]: `%${term}%` } },
                            { medicinal_uses: { [Op.like]: `%${term}%` } },
                            { preparation_method: { [Op.like]: `%${term}%` } },
                            { benefits: { [Op.like]: `%${term}%` } },
                            { precautions: { [Op.like]: `%${term}%` } },
                            { availability: { [Op.like]: `%${term}%` } },
                        ]:
                        [
                            { id: { [Op.eq]: term } }
                        ]
                    
                }
            })
            .then((plant) => res.status(200).send(plant))
            .catch((error) => { res.status(400).send(error);});
    },
    add(req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send({ error: 'Error al subir la imagen.' });
            }
            if (!req.file) {
                return res.status(400).send({ error: 'No se ha subido ninguna imagen.' });
            }

            const { common_name, scientific_name, description, habitat, medicinal_uses, preparation_method, benefits, precautions, availability, category_id } = req.body;
            return plant
                .create({
                    common_name,
                    scientific_name,
                    description,
                    habitat,
                    medicinal_uses,
                    preparation_method,
                    benefits,
                    precautions,
                    availability,
                    category_id,
                    image: req.file.filename,
                })
                .then((plant) => res.status(200).send(plant))
                .catch((error) => {
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        return res.status(400).send({ error: 'El nombre científico ya existe. Debe ser único.' });
                    }
                    return res.status(400).send(error)
                });
        });
    },
    update(req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send({ error: 'Error al subir la imagen.' });
            }
    
            const { common_name, scientific_name, description, habitat, medicinal_uses, preparation_method, benefits, precautions, availability, category_id } = req.body;
    
            return plant
                .findByPk(req.params.id)
                .then(plant => {
                    if (!plant) {
                        return res.status(404).send({
                            message: 'plant Not Found',
                        });
                    }

                    const newImage = req.file ? req.file.filename : null;

                    if (newImage && plant.image) {
                        const oldImagePath = path.join('public/images/plants/', plant.image);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }

                    return plant
                        .update({
                            common_name: common_name || plant.common_name,
                            scientific_name: scientific_name || plant.scientific_name,
                            description: description || plant.description,
                            habitat: habitat || plant.habitat,
                            medicinal_uses: medicinal_uses || plant.medicinal_uses,
                            preparation_method: preparation_method || plant.preparation_method,
                            benefits: benefits || plant.benefits,
                            precautions: precautions || plant.precautions,
                            availability: availability || plant.availability,
                            category_id: category_id || plant.category_id,
                            image: newImage || plant.image
                        })
                        .then(() => res.status(200).send(plant))
                        .catch((error) => res.status(400).send(error));
                })
                .catch((error) => {
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        return res.status(400).send({ error: 'El nombre científico ya existe. Debe ser único.' });
                    }
                    return res.status(400).send(error);
                });
        });
    },
    
    delete(req, res) {
        return plant
            .findByPk(req.params.id)
            .then(plant => {
                if (!plant) {
                    return res.status(404).send({
                        message: 'Plant Not Found',
                    });
                }

                const imagePath = path.join('public/images/plants/', plant.image);

                return plant
                    .destroy()
                    .then(() => {
                        if (plant.image && fs.existsSync(imagePath)) {
                            fs.unlinkSync(imagePath);
                        }

                        res.status(204).send();
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    addExperts(req, res) {
        const { plantId } = req.params;
        const { expertIds } = req.body;

        return plant.findByPk(plantId)
            .then(Plant => {
                if (!Plant) {
                    return res.status(404).send({ message: 'Plant Not Found' });
                }

                return expert.findAll({
                    where: {
                        id: expertIds
                    }
                })
                .then(Experts => {
                    if (Experts.length !== expertIds.length) {
                        return res.status(404).send({ message: 'One or more Experts Not Found' });
                    }

                    return plantExpert.findAll({
                        where: {
                            plant_id: plantId,
                            expert_id: expertIds
                        }
                    })
                    .then(existingRelations => {
                        if (existingRelations.length > 0) {
                            return res.status(400).send({ message: 'One or more Experts already associated with this Plant' });
                        }

                        return Plant.addExperts(Experts)
                            .then(() => res.status(201).send({ message: 'Experts added to Plant successfully' }))
                            .catch((error) => res.status(400).send({ message: 'Error adding experts', error }));
                    });
                });
            })
            .catch((error) => {
                return res.status(400).send({ message: 'Error finding Plant', error });
            });
    },    
    removeExpert(req, res) {
        const { plantId, expertId } = req.params;

        return Promise.all([
            plant.findByPk(plantId),
            expert.findByPk(expertId)
        ])
        .then(([Plant, Expert]) => {
            if (!Plant) {
                return res.status(404).send({ message: 'Plant Not Found' });
            }
            if (!Expert) {
                return res.status(404).send({ message: 'Expert Not Found' });
            }

            return plantExpert.findOne({
                where: {
                    plant_id: plantId,
                    expert_id: expertId
                }
            })
            .then(existingRelation => {

                if (!existingRelation) {
                    return res.status(400).send({ message: 'No association found between this Plant and Expert' });
                }

                return Plant
                    .removeExpert(Expert)
                    .then(() => res.status(200).send({ message: 'Expert removed from Plant successfully' }))
                    .catch((error) => res.status(400).send({ message: 'Error removing association', error }));
            });
        })
        .catch((error) => {
            return res.status(400).send({ message: 'Error finding Plant or Expert', error });
        });
    },
    updateExperts(req, res) {
        const { plantId } = req.params;
        const { expertIds } = req.body;

        return plant.findByPk(plantId)
            .then(Plant => {
                if (!Plant) {
                    return res.status(404).send({ message: 'Plant Not Found' });
                }

                return expert.findAll({
                    where: {
                        id: expertIds
                    }
                })
                .then(Experts => {
                    if (Experts.length !== expertIds.length) {
                        return res.status(404).send({ message: 'One or more Experts Not Found' });
                    }

                    return Plant.setExperts([])
                        .then(() => {
                            return Plant.addExperts(Experts);
                        })
                        .then(() => res.status(200).send({ message: 'Plant experts updated successfully' }))
                        .catch((error) => res.status(400).send({ message: 'Error updating experts', error }));
                });
            })
            .catch((error) => {
                return res.status(400).send({ message: 'Error finding Plant', error });
            });
    }
};
import Joi from 'joi';

const create = Joi.object({

    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number(),
    imagePath: Joi.string(),
    rating: Joi.number(),
    quantity: Joi.number(),
    inventoryStatus: Joi.string()

});

export default { create };

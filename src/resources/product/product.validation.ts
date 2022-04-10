import Joi from 'joi';

const create = Joi.object({

    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.string().required()

});

export default { create };

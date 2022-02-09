import Joi from 'joi';

const register = Joi.object({
    
    username: Joi.string().max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()

});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default { register, login };

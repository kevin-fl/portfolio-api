const yup = require('yup');

const projectValidator = yup.object().shape({
    name: yup.string().trim().required().min(2).max(1000),
    text: yup.string().min(2).max(1000),
    image: yup.string().required()


});

module.exports = { projectValidator };
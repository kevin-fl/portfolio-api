const yup = require('yup');

const commentaireValidator = yup.object().shape({
    content: yup.string().trim().min(5).max(1000).required(),
    projectId: yup.number().required()
}).required();

module.exports = { commentaireValidator };
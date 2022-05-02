const yup = require('yup');

const newsValidator = yup.object().shape({
    name: yup.string().trim().required().min(2).max(50),
    category: yup.string().required().min(2).max(1000),
    image: yup.string()
});


module.exports = { newsValidator };
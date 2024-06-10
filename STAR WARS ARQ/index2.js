const axios = require('axios');

// Faz uma requisição a um usuarío com um ID expecifico
axios.get('/user?ID=12345')
.then(function (response) {
    // manipula o sucesso da requisição
    console.log(response);
})
.catch(function (error) {
    // manipula erros da requisição
    console.error(error);
})
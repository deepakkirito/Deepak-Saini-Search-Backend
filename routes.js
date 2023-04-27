const routes = require('express').Router();
const {getData, getSearch} = require('./controller');

routes.get('/data', getData);

routes.get('/search', getSearch);

module.exports = routes;
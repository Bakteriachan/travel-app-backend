const express = require('express');

const config = require('../config');
const controller = require('./controller');
const middlewares = require('../middlewares');
const network = require('../network');
const validate = require('../validators');

const app = express();
app.use(express.json())


// query for an specific travel
app.get('/query', (req, res, next) => {
    let query = req.params;
    if (!query.length) query = req.query;
    if (!query) {
        network.error(res, "No query specified", 400);
        return;
    }
    query = validate.travel_query(query);
    controller.query(query)
        .then(data => {
            network.success(res, data || {}, 200);
        })
        .catch(next);
});

// Show travel
app.get('/:id', (req, res, next) => {
    controller.get(req.params.id)
        .then(data => {
            network.success(res, data || {});
        })
        .catch(next);
});

// List travels
app.get('/', (req, res, next) => {
    let limit = 15, page = 0;
    if (!isNaN(Number(req.body.limit))) limit = Number(req.body.limit);
    if (!isNaN(Number(req.body.page))) page = Number(req.body.page);
    controller.list(limit, page)
        .then(data => {
            network.success(res, data || {});
        })
        .catch(next);
});

// Create Travel
app.post('/', middlewares.logged ,(req, res, next) => {
    if (validate.travel(req.body )) {
        controller.insert(req.body)
            .then(data => {
                network.success(res, null, 201);
            })
            .catch(next);
    } else {
        network.error(res, "Invalid data", 400);
    }
})

//Remove travel
app.delete('/:id', middlewares.logged, (req, res, next) => {
    controller.get(req.params.id)
        .then(data => {
            if (!data) {
                network.error(res, "This travel does not exists", 400);
            } else if ( data.username == req.body.username ){
                controller.remove(req.params.id)
                    .then(data => {
                        network.success(res, data, 204);
                    })
                    .catch(next);
            } else {
                network.error(res, "This travel does not belongs to you", 401);
            }
        })
});


app.use(middlewares.errors);

app.listen(config.travels.PORT, () => {
    console.log(`Travels app listening on port ${config.travels.PORT}`);
});
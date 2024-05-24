const express = require('express')
const router = express.Router()

// endpoint:  localhost:3000/api/band will point to artistRoutes

// Destructure artistDao == get only what we need from the dao
// get the bandDao property from the object and rename it dao
// enables scaling of project
const { bandDao: dao } = require('../../daos/dao')

// localhost:3000/api/band
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

// localhost:3000/api/band/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/sort', (req, res)=> {
    dao.sort(req, res, dao.table)
})

// refactored
router.get('/:id', (req, res)=> {
    dao.getInfo(res, dao.table, req.params.id)
})

// post methods; placed after get methods
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res)
})

module.exports = router
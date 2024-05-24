const express = require('express')
const router = express.Router()

// endpoint:  localhost:3000/api/artist will point to artistRoutes

// Destructure artistDao == get only what we need from the dao
// get the artistDao property from the object and rename it dao
// enables scaling of project
const { artistDao: dao } = require('../../daos/dao')

// localhost:3000/api/artist
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

// localhost:3000/api/artist/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/sort', (req, res)=> {
    dao.sort(req, res, dao.table)
})

// replaced .findById with .getInfo; arguments are the same
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
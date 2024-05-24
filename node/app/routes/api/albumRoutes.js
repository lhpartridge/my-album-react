const express = require('express')
const router = express.Router()

// endpoint:  localhost:3000/api/album will point to albumRoutes

const { albumDao: dao } = require('../../daos/dao')

// localhost:3000/api/album
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

// localhost:3000/api/album/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/sort', (req, res)=> {
    dao.sort(req, res, dao.table)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// post methods; placed after get methods
router.post('/create', (req, res)=> {
    dao.create(req, res)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res)
})

module.exports = router
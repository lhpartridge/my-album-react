const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005

const tables = ['album', 'artist', 'band', 'label', 'genre']

// Root route => localhost:3005/api
router.get('/', (req, res) => {
    res.json({
        'Albums': `http://localhost:${PORT}/api/album`,
        'Artists': `http://localhost:${PORT}/api/artist`,
        'Bands': `http://localhost:${PORT}/api/band`,
        'Genres': `http://localhost:${PORT}/api/genre`,
        'Labels': `http://localhost:${PORT}/api/label`
    })
})

// routes
tables.forEach(table => {
    router.use(`/api/${table}`, require(`./api/${table}Routes`))
})

module.exports = router
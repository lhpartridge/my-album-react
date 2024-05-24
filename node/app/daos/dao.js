// dao.js is where all the cool daos meet
const daoCommon = require('./common/daoCommon')

// for each individual dao, create an object for each endpoint
// export all individual daos as a single object

const artistDao = {
    ...daoCommon, 
    ...require('./api/artistDao')
}

const bandDao = {
    ... daoCommon,
    ...require('./api/bandDao')
}

const albumDao = {
    ... daoCommon,
    ...require('./api/albumDao')
}

const labelDao = {
    ...daoCommon,
    ...require('./api/labelDao')
}

const genreDao = {
    ...daoCommon,
    ...require('./api/genreDao')
}

module.exports = {
    artistDao, 
    bandDao,
    albumDao, 
    labelDao,
    genreDao
}
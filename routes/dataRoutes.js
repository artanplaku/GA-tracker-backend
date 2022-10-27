const express = require('express')
const {
    getDatas,
    getData,
    createData,
    deleteData,
    updateData
} = require('../controllers/dataController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.get('/', getDatas)

router.get('/:id', getData)

router.post('/', createData)

router.delete('/:id', deleteData)

router.patch('/:id', updateData)

module.exports = router
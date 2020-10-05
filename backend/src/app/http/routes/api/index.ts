import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('API UP! request from: ' + req.headers['user-agent'])
})

module.exports = router

const path = require('path')
const express = require('express')

// const config = require('./config')

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'


const app = express()
app.disable('x-powered-by')

app.use('/', express.static(path.join(__dirname, '/public')))

if (app.get('env') === 'development') {
  app.set('view cache', false)
} else {
  app.set('view cache', true)
}

// routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')))

app.listen(port, host, () => {
  console.log(`Express listening on ${host}:${port}`)
})

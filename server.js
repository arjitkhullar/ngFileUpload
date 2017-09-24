const express = require('express'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  fs = require('fs'),
  path = require('path'),
  app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
app.use(bodyParser.json())
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/app', express.static(path.join(__dirname, 'app')))
const upload = multer({ //multer settings
  storage: multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
      let dir = path.join(__dirname, 'uploads')
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, `./${dir}/`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
}).single('file')
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      })
      return
    }
    res.json({
      error_code: 0,
      err_desc: null
    })
  })
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'))

})
app.listen('3000', () => {
  console.log('running on 3000...')
})
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const fileModel = require('../models/fileSchema.js');

const app = express.Router();

//config dot env
require('dotenv').config();

// Middleware
app.use(bodyParser.json());

// Mongo URI
const mongoURI = process.env.UPLOAD_URI;

// Create mongo connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const conn = mongoose.createConnection(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

let gridFSBucket;
conn.once('open', async () => {
  gridFSBucket = await new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'newUploads',
  });
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve) => {
      let userfile = req.body.filename;
      const fileInfo = {
        filename: userfile,
        // update the extra infos to save to file here
        metadata: {
          author: req.body.autName,
          authorEmail: req.body.autEmail,
          itiName: req.body.itiName,
          itiDes: req.body.itiDes,
          downloads: 0,
        },
        bucketName: 'newUploads',
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({storage: storage});

//File Upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File Uploaded Successfully');
});

//File Download
app.get('/download', (req, res) => {
  let contentType;
  let filename = req.query.file.toString();
  let id = req.query.id.toString();
  fileModel.find({_id: id}).then((file) => {
    contentType = file[0].contentType;
    //setting response header
    res.set({
      'Accept-Ranges': 'bytes',
      'Content-Disposition': `attachment; filename=${filename}`,
      'Content-Type': `${contentType}`,
    });

    const readstream = gridFSBucket.openDownloadStreamByName(filename);
    readstream.pipe(res);
  });

  if (req.query.fileReader === 'false') {
    // Update download counts of file in database
    fileModel.findById({_id: id}, (err, result) => {
      if (err) return handleError(err);

      const resultMetaCopy = {...result.metadata};
      resultMetaCopy.downloads += 1;
      result.metadata = resultMetaCopy;

      result.save((err) => {
        if (err) return handleError(err);
      });
    });
  }
});

// getting all files from db
app.post('/getFiles', (req, res, next) => {
  var fileObj = {};

  fileModel.find({}).then((files) => {
    files.map((file) => {
      fileObj[file._id] = file;
    });
    return res.json(fileObj);
  });
});

// files/del/:id
// Delete chunks from the db. Used for admins only**
app.post('/del/:id', (req, res) => {
  gridFSBucket.delete(
    new mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return res.status(404).json({err: err.message});
      res.redirect('/');
    },
  );
});

module.exports = app;

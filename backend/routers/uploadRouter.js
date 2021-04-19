import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
import aws from'aws-sdk';
import multerS3 from 'multer-s3';


const uploadRouter = express.Router();


const storage = {

  local:multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
}),
s3:multerS3({
  s3:new aws.S3(),
  bucket:'gazz',
  contentType:multerS3.AUTO_CONTENT_TYPE,
  acl:'public-read',
  key:(req, file, cb) =>{
    cb(null, `${Date.now()}.jpg`);
  },
})
};





const upload = multer({ storage:multerS3({
  s3:new aws.S3(),
  bucket: 'gazz',
  contentType:multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: function (req, file, cb) {
    cb(null, Date.now().toString())
  }
})});

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`https://gazz.s3-sa-east-1.amazonaws.com/${req.file.key}`);
});

export default uploadRouter;
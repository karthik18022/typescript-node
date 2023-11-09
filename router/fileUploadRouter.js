"use strict";
const express2 = require('express');
var router = express2.Router();
const multer = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() });
const { uploadFile } = require('../service/fileUploadService.ts');
router.post('/fileUpload', upload.single('file'), uploadFile);
module.exports = router;

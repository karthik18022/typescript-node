
var fs = require('fs');

exports.uploadFile = (req, res) => {
    const title = req.body.title;
    const file = req.file;
    fs.readFile(file.path, function (err, data) {
        if (err) {
          res.status(500).send('Error reading the file.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        }
      });
   
  
    console.log(title, 'title', title);
    console.log(file);
  
}



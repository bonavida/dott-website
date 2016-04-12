var multer = require('multer');

module.exports = function(router) {
  var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
      cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        var filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        //req.file= './public/uploads/'+filename;

        cb(null, filename);
    }
  });

  var upload = multer({
    storage: storage
  }).single('file');

  router.post('/uploads', function(req, res) {
    upload(req, res, function(err, data) {
      if (err) {
        res.json({success: false, err: err });
        return;
      }
      var url = req.file.destination+req.file.filename;
      url = "/"+url.split('/').slice(2,url.length).join("/");
      res.json({success: true, url:url});
    });
  });
};

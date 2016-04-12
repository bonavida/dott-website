var multer = require('multer');

module.exports = function(router) {
  var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
      cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });

  var upload = multer({
    storage: storage
  }).single('file');

  router.post('/uploads', function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        console.log(err);
        res.json({
          error_code: 1,
          err_desc: err
        });
        return;
      }
      res.json({
        error_code: 0,
        err_desc: null
      });
    });
  });
};

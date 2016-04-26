var Category  = require('../models/category');


module.exports = function(router){

  //Categories
  router.get('/categories', function(req, res, next) {
      Category.find(function(err, categories){
        if(!err){
          if(!categories){
             next();
          }else{
             res.json(categories);
          }
        }else{
          res.status(500).send(err.message);
        }
      });
    }).post('/categories', function(req, res, next) {
      var category = new Category({
        name: req.body.name,
        image: req.body.image
      });
      category.save(function(err, category){
        if(!err){
          if(!category) next();
          res.json(category);
        }else{
          res.send(500, err.message);
        }
      });
    }).get('/categories/:category_id', function(req, res, next) {
      Category.findById(req.params.id, function(err, category){
        if(!err){
          if(!category){
             next();
          }else{
             res.json(category);
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).put('/categories/:category_id', function(req, res, next) {
      Category.findById(req.params.id, function(err, category){
        if(!err){
          if(!category){
             next();
          }else{

            category.name = req.body.name;
            category.image = req.body.image;

            category.save(function(err, category){
              if(!err){
                res.json(category);
              }else{
                res.send(500, err.message);
              }
            });
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).delete('/categories/:category_id', function(req, res, next) {
      Category.findById(req.params.id, function(err, category){
        if(!err){
          if(!category){
             next();
          }else{

            category.remove(function(err){
              if(!err){
                res.status(200).send();
              }else{
                res.send(500, err.message);
              }
            });
          }
        }else{
          res.send(500, err.message);
        }
      });
    });
};

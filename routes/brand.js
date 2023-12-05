var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
/* GET home page. */
router.get('/', async (req, res) => {
  var brands = await BrandModel.find({});
  res.render('brand/index', { title: 'Brand', brands });
});

router.get('/add', (req, res) => {
  res.render('brand/add', { title: "add brand" });
});

router.post('/add', async (req, res) => {
  var brand = req.body;
  await BrandModel.create(brand)
  res.redirect('/brand');
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var brand = await BrandModel.findById(id);
  res.render('brand/add', { title: 'edit brand', brand });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var brand = req.body;
  try {
    await BrandModel.findByIdAndUpdate(id, brand);
    console.log('Update brand succeed');
  } catch (err) {
    console.log('Update failed. Error: ' + err)
  }
  res.redirect('/brand');
})

router.get('/delete/:id', async(req, res) => {
  var id = req.params.id;
  try {
    await BrandModel.findByIdAndDelete(id);
    console.log('Delete brand succeed !');
  } catch (err) {
    console.log('Delete failed. Error: ' + err)
  }
  res.redirect('/brand');
})


module.exports = router;

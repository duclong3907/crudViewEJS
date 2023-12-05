var express = require('express');
var router = express.Router();
const MobileModel = require('../models/MobileModel');
const BrandModel = require('../models/BrandModel');

router.get('/', async (req, res) => {
  // var mobiles = await MobileModel.find({})
  var mobiles = await MobileModel.find({}).populate('brand');
  // console.log(mobiles);
  
  res.render('mobile/index', { title:"mobile", mobiles });
});

router.get('/add', async(req, res) => {
  var brands = await BrandModel.find({})
  var mobile = { _id: '', model: '', image: '', brand: { id: '', name: '' } };
  res.render('mobile/add',{title:"add mobile", brands, mobile });
})

router.post('/add', async(req, res) => {
  var mobile = req.body;
  await MobileModel.create(mobile);
  res.redirect('/mobile');
})

router.get('/edit/:id', async(req, res) => {
  var id = req.params.id;
  var mobile = await MobileModel.findById(id).populate('brand');
  var brands = await BrandModel.find({})
  res.render('mobile/add',{title:"edit mobile", mobile, brands });
})

router.post('/edit/:id', async(req, res) => {
  var id = req.params.id;
  var mobile = req.body;
  try {
    await MobileModel.findByIdAndUpdate(id, mobile);
    console.log('update success')
  } catch (error) {
    console.log("failed")
  }
  res.redirect('/mobile');
})

router.get('/delete/:id', async(req, res) => {
  var id = req.params.id;
  try {
    await MobileModel.findByIdAndDelete(id);
    console.log('delete success')
  } catch (error) {
    console.log("failed")
  }
  res.redirect('/mobile');
})
module.exports = router;

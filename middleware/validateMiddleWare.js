const Product = require('../models/products')

module.exports = (req,res,next)=>{
    const prod = Product.findOne({ code: req.body.code  })

    if (!prod || prod.quantite < parseInt(req.body.quantite)) {
        return res.render('send')
    }
    next()
}
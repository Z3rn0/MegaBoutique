const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProduitSchema = new Schema({
    code: String,
    nom: String,
    prix: Number,
    quantite: Number,
    image: String

})
const Product = mongoose.model('Product',ProduitSchema)
module.exports = Product
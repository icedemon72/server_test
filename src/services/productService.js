import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const addProduct = async (product, country, man, model) => {
    try {
        if(!country) {
            throw new ReferenceError('Greška u odabiru zemlje!');
        } 
        if(!manObj) {
            throw new ReferenceError('Greška u odabiru proizvodjača!');
        } 
        if (!modelObj) {
            throw new ReferenceError('Greška u odabiru tipa modela!');
        } 

        product.country.id = country._id;
        product.manufacturer.id = man._id;
        product.modelType.id = model._id;
    
        let productObj = await Product.findOne({ $and: [ 
            {"name": product.name}, 
            {"variation": product.variation},
            {"year": product.year},
            {"scale": product.scale},
            {"country": product.country},
            {"manufacturer": product.manufacturer}
        ]});
    
        if(productObj) {
            if(!productObj.deleted) {
                throw new ReferenceError('Već postoji ovaj proizvod!');
            } 
            
            await Product.updateOne({"_id": productObj._id}, {"$set" :{"deleted": false}})
            return product;
        } 

        await Product.create(product);
        return product;
        
    } catch (err) {
        return new Error(err);
    }
}

export const deleteProduct = async (id) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            throw new ReferenceError(`'${id}' nije ObjectID!`);
        }
        
        let productObj = await Product.findById(id);

        if(!productObj) {
            throw new ReferenceError('Proizvod ne postoji!');
        }

        productObj.deleted = true;
        await productObj.save();
        return {message: `Proizvod '${productObj.name}${productObj.variation}' je uspešno obrisan!`};
    } catch (err) {
        return new Error(err);
    }
}
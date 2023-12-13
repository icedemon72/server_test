// Proveriti svaki parametar koji se unese
// Napraviti product delete
// Napraviti productBuy
// Dodati user shit

import Product from "../models/productModel.js";
import Manufacturer from "../models/manufacturerModel.js";
import Country from "../models/countryModel.js";
import ModelType from "../models/typeModel.js";
import { addProduct, deleteProduct } from "../services/productService.js";

export const handleAddProduct = async (req, res) => {
    try {
        let product = {
            ...req.body
        }

        const countryObj = await Country.findOne({"name": product.country.name}),
            manObj = await Manufacturer.findOne({"name": product.manufacturer.name}),
            modelObj = await ModelType.findOne({"name": product.modelType.name});

        const productObj = addProduct(product, countryObj, manObj, modelObj);
        return res.status(200).json(productObj);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

// EDIT THIS LATER ON!
// export async function handleEditProduct(req, res) {
//     try {
//         let product = {
//             ...req.body
//         }


//         let productObj = await Product.findById(product._id);

//         if(productObj) {
//             if(product.quantity < 0) {
//                 product.quantity = 0;
//             }

//             productObj = new Product ({
//                 ...productObj._id,
//                 ...product
//             });

//             await productObj.save();
//             console.log("UPDATED!");
//         } else {
//             res.status(500).json({message: 'Proizvod ne postoji!'});
//         }

//     } catch(err) {
//         console.log(err);
//     }
// }

export const handleDeleteProduct = async (req, res) => {
    try {
        const done = deleteProduct(req.body.id);
        return res.status(200).json(done);
    } catch(err) {
        return  res.status(500).send(err.message)
    }
}

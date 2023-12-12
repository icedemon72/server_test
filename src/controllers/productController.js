// Proveriti svaki parametar koji se unese
// Napraviti product delete
// Napraviti productBuy
// Dodati user shit

import Product from "../models/productModel.js";
import Manufacturer from "../models/manufacturerModel.js";
import Country from "../models/countryModel.js";
import ModelType from "../models/typeModel.js";

export async function handleAddProduct(req, res) {
    try {
        let product = {
            ...req.body
        }

        let countryObj = await Country.findOne({"name": product.country.name}),
            manObj = await Manufacturer.findOne({"name": product.manufacturer.name}),
            modelObj = await ModelType.findOne({"name": product.modelType.name});

        // OVO MOZE DA SE FIX, TJ DA SE DRUGACIJE NAPISE
        if(!countryObj || !manObj || !modelObj) {
            res.status(500).json({message: 'Greška u odabiru zemlje, proizvodjača i/ili tipa modela!'});
        } else {
            product.country.id = countryObj._id;
            product.manufacturer.id = manObj._id;
            product.modelType.id = modelObj._id;

            let productObj = await Product.findOne({ $and: [ 
                {"name": product.name}, 
                {"variation": product.variation},
                {"year": product.year},
                {"scale": product.scale},
                {"country": product.country},
                {"manufacturer": product.manufacturer}
            ]});
    
            if(productObj) {
                if(productObj.deleted) {
                    await Product.updateOne({"_id": productObj._id}, {"$set" :{"deleted": false}})
                    res.status(200).json(product);
                } else {
                    res.status(500).json({message: 'Već postoji ovaj proizvod!'});
                }
            } else {
                await Product.create(product);
                res.status(200).json(product);
            }
        }

    } catch (err) {
        console.log(err);
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

export async function handleDeleteProduct(req, res) {
    try {
        let productID = req.body.id;
        let productObj = await Product.findById(productID);

        if(productObj) {
            productObj.deleted = true;
            await productObj.save();
        } else {
            res.status(500).json({message: 'Proizvod ne postoji!'});
        }

    } catch(err) {
        console.log(err);
    }
}

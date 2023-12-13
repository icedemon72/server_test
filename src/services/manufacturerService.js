import mongoose from "mongoose";
import Manufacturer from "../models/manufacturerModel.js";
import Country from "../models/countryModel.js";

export const addManufacturer = async (data) => {
    try {
        const manObj = await Manufacturer.findOne({"name": data.name});
        let body = {};
        if(manObj) {
            throw new ReferenceError(`Proizvodjač '${data.name}' već postoji!`);
        }
        
        if(data.country) {
            const countryObj = await Country.findOne({"name": data.country});
            if(!countryObj) {
                throw new ReferenceError(`Zemlja ${country} ne postoji!`)
            }

            body = {
                "name": data.name,
                "country": {
                    "name": countryObj.name,
                    "id": countryObj._id
                }
            }

        } else {
            body = {
                "name": data.name
            }
        }

        const manufacturer = await Manufacturer.create(body);

        if(!manufacturer) {
            throw new ReferenceError('Greška pri pristupu proizvodjaču!');
        } 
        
        return manufacturer;

    } catch (err) {
        return new Error(err);
    }
}

export const deleteManufacturer = async (id) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            throw new ReferenceError(`'${id}' nije ObjectID!`);
        }

        let manObj = await Manufacturer.findById(id);
        
        if(manObj._id) {
            manObj.active = false;
            await manObj.save();
            return {message: `Proizvodjač '${manObj.name}' je uspešno obrisan!`};
        }

        throw new ReferenceError('Proizvodjač ne postoji!');
    } catch (err) {
        return new Error(err);
    }
}


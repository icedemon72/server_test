import Manufacturer from "../models/manufacturerModel.js";
import Country from "../models/countryModel.js";
// fajl se mora urediti, logika ide u drugi!!!!
export async function handleAddManufacturer(req, res) {
    try {
        let country = req.body.country; 
       
        let countryObj = await Country.findOne({"name": country});
        let manObj = await Manufacturer.findOne({"name": req.body.name});
                
        if(manObj._id) {
            res.status(500).json({message: `Manufacturer '${req.body.name}' already exists!`});
            return
        }

        // IZMENI OVO IZGLEDA KAO NJESRA
        if(countryObj) {
            let body = {
                "name": req.body.name,
                "country": {
                    "name": countryObj.name,
                    "id": countryObj._id
                }
            }
            
            const manufacturer = await Manufacturer.create(body);
            res.status(200).json(manufacturer);
        } else {
            // kasnije popravi ovo, treba da salje poruku nazad
            res.status(500).json({message: `Country '${country}' doesn't exist!`});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

export async function handleDeleteManufacturer(req, res) {
    try {
        let manufacturerID = req.body.id;
        let manObj = await Manufacturer.findById(manufacturerID);
    
        if(manObj) {
            manObj.active = false;
            await manObj.save();
        } else {
            res.status(500).json({message: 'Proizvodjač ne postoji!'});
        }  
    } catch(err) {
        console.log(err);
    }
}
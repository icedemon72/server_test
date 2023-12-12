import { handleAddManufacturer, handleDeleteManufacturer } from './controllers/manufacturerController.js';
import { handleAddProduct, handleDeleteProduct/*, handleEditProduct */} from './controllers/productController.js';
import Country from './models/countryModel.js';
import ModelType from './models/typeModel.js';

export default function (app) {
    app.post('/product', async (req, res) => {
        handleAddProduct(req, res);
    });

    app.get('/product/delete', async (req, res) => {
        handleDeleteProduct(req, res);
    });

    app.post('/product/edit', async (req, res) => {
        handleEditProduct(req, res);
    });

    app.post('/manufacturers', async (req, res) => {
        handleAddManufacturer(req, res);
    });
    
    app.get('/manufacturers/delete', async (req, res) => {
        handleDeleteManufacturer(req, res);
    });
    
    app.post('/countries', async (req, res) => {
        try {
            const country = await Country.create(req.body);
            res.status(200).json(country);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    });

    // app.post('/add', async (req, res) => {
    //     try {
    //         const model = await ModelType.create(req.body);
    //         res.status(200).json(model);
    //     }catch (err){ console.log(err) }
    // } )
}


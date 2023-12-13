import { addManufacturer, deleteManufacturer } from "../services/manufacturerService.js";

export const handleAddManufacturer = async (req, res) => {
    try {
        const done = addManufacturer(req.body);
        return res.status(200).json(done);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const handleDeleteManufacturer = async(req, res) => {
    try {
        const done = await deleteManufacturer(req.body.id);
        return res.send(JSON.stringify(done));
    } catch(err) {
        return res.status(500).send(err.message);
    }
}
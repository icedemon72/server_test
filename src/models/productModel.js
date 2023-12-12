import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
// Country, Manufacturer, 
const productSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, 'Product name is required!']
        },
        variation: {
            type: String,
            required: false,
            default: ''
        },
        description: {
            type: String,
            required: false,
            default: 'Nema opisa'
        },
        scale: {
            type: String,
            required: false,
            default: 'NaN'
        },
        quantity: {
            type: Number, 
            required: [true, 'Quantity is required!'],
            default: 0,
            min: 0
        },
        price: {
            type: Number,
            required: [true, 'Price is required!'],
            min: 0
        },
        image: {
            type: String,
            required: [true, 'Image is required!']
        },
        modelType: {
            name: {
                type: String,
                required: true
            },
            id: {
                type: ObjectId,
                required: true
            }  
        },
        year: {
            type: String,
            required: [true, 'Year is required']
        },
        tags: {
            type: [String],
            required: false,
            default: []
        },
        country: {
            name: {
                type: String, 
                required: true
            },
            id: {
                type: ObjectId,
                required: true
            }
        }, 
        manufacturer: {
            name: {
                type: String,
                required: true
            },
            id: {
                type: ObjectId,
                required: true
            }
        },
        deleted: {
            type: Boolean,
            required: false,
            default: false
        }
    }, 
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
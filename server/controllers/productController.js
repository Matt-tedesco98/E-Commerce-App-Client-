const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const result = await productModel.getAllProducts();
        if (!result.rows.length) {
            return res.status(404).json({error: "No products found"});
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting all products:', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const getProductById = async (req, res) => {
    try {
        const result = await productModel.getProductById(req.params.id);
        if (!result) {
            return res.status(404).json({error: "No products found"});
        }
        return res.json(result);
    } catch (err) {
        console.error('Error getting product by id', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const createProduct = async (req, res) => {
    const {id, name, price, description} = req.body;
    if (!id || !name || !price || !description) {
        return res.status(400).json({error: 'missing required field'});
    }
    try {
        const newProduct = await productModel.createProduct({id, name, price, description});
        res.status(200).json({message: 'Product created', product: newProduct});
    } catch (err) {
        console.error('Error creating product', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const updateProduct = async (req, res) => {
    const {id, name, price, description} = req.body;
    if (!id || !name || !price || !description) {
        return res.status(400).json({error: 'missing required field'});
    }
    try {
        const productUpdate = await productModel.updateProduct(id, {name, price, description});
        res.status(200).json({message: 'Product updated', product: productUpdate});
    } catch (err) {
        console.error('Error updating product', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const productToDelete = await productModel.deleteProduct(id);
        if (!productToDelete) {
            return res.status(404).json({error: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted', product: productToDelete});
    } catch (err) {
        console.error('Error deleting product', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {
    getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
}
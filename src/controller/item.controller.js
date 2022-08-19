const Item = require('../model/item.model');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({success: true, message: "successfully retrieved", data: items});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(400).json({success: false, message: "item not found"});
        res.status(200).json({success: true, message: "successfully retrieved", data: item});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.createItem = async (req, res) => {
    try {
        await Item.create(req.body);
        res.status(201).json({success: true, message: "item created successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(400).json({success: false, message: "item not found"});
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({success: true, message: "item updated successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(400).json({success: false, message: "item not found"});
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "item deleted successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}
const ownerService=require('../services/ownerService');
exports.registerOwner = async (req, res) => {
    try {
        const newOwner = await ownerService.createOwner(req.body);
        res.status(201).json({ success: true, data: newOwner });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
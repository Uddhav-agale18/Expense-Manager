
const TypePayment = require('../model/typeModel')


exports.createType = async (req, res) => {
    try {
        const userId = req.user.id;
        const duplicateEtype = await TypePayment.findOne({
            $and: [
                { etype: req.body.etype }, { userID: userId }
            ]
        })
        console.log("duplicate  etype" + duplicateEtype)
        if (duplicateEtype) {
            return res.status(400).json({ message: "Etype already exist" })
        }

        const etypes = new TypePayment({
            etype: req.body.etype,
            userID: userId
        })
        console.log(etypes)
        await etypes.save();
        res.status(200).json(etypes)

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(500).send(error.message || "internal server error")
    }
}

exports.updateType = async (req, res) => {

    try {
        const id = req.params.id;
        const type = await TypePayment.findById(id)
        if (!type) {
            return res.status(500).json("type not found")
        }
        const result = await TypePayment.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

exports.deleteType = async (req, res) => {
    try {
        const id = req.params.id;
        const type = await TypePayment.findById(id)
        if (!type) {
            return res.status(200).json("type Not Found")
        }
        const result = await TypePayment.findByIdAndDelete(id, { new: true });
        res.status(200).json({ message: "type successfully deleted", data: result })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// exports.getAllTypes = async (req, res) => {
//     try {
//         const type = await TypePayment.find()

//         if (!type) {
//             res.status(404).json({ error: "no data found" })
//         }
//         res.status(200).json(type)
//     } catch (error) {
//         res.status(500).json(error.message)
//     }
// }

exports.getAllTypes = async (req, res) => {
    let page = Number(req.query.page) || 0;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;


    try {
        const userId = req.user.id;

        if (page == 0) {
            const types = await TypePayment.find({ userID: userId });
            return res.status(200).json(types)
        }

        const types = await TypePayment.find({ userID: userId }).skip(skip).limit(limit);
        if (types.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }
        const totalTypes = await TypePayment.countDocuments({ userID: userId });

        res.status(200).json({
            types,
            page: {
                totalTypes,
                totalPages: Math.ceil(totalTypes / limit),
                currentPage: parseInt(page)
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Expense = require('../model/expenseModel')
const User = require('../model/user.model')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.createExpense = async (req, res) => {
    try {
        const { etype, title, desc, date, amount, tags } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const newExpense = new Expense({
            etype,
            title,
            desc,
            date,
            amount,
            tags,
            userID: userId // Reference the user ID here
        });
        await newExpense.save();
        res.status(200).json(newExpense)

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(500).send(error.message || "internal server error")
    }
}

exports.getAllExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const exp = await Expense.find({ userID: userId })

        if (!exp) {
            res.status(404).json({ error: "no data found" })
        }
        res.status(200).json({ message: "load successfully", data: exp })
    } catch (error) {
        res.status(500).json(error.message)
    }
}


// exports.getAllExpense = async (req, res) => {
//     let page = Number(req.query.page) || 1;
//     let limit = Number(req.query.limit) || 5;
//     let skip = (page - 1) * limit;

//     try {
//         // Apply skip and limit directly on the Mongoose query
//         const expenses = await Expense.find().skip(skip).limit(limit);

//         // Check if expenses were found
//         if (expenses.length === 0) {
//             return res.status(404).json({ error: "No data found" });
//         }

//         // Get the total count of documents
//         const totalExpenses = await Expense.countDocuments();

//         res.status(200).json({
//             expenses,
//             totalExpenses,
//             totalPages: Math.ceil(totalExpenses / limit),
//             currentPage: page
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


exports.updateExpense = async (req, res) => {

    try {
        const id = req.params.id;
        const exp = await Expense.findById(id)
        if (!exp) {
            return res.status(500).json("type not found")
        }
        const result = await Expense.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const exp = await Expense.findById(id)
        if (!exp) {
            return res.status(200).json("type Not Found")
        }
        const result = await Expense.findByIdAndDelete(id, { new: true });
        res.status(200).json({ id: result.id })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const exp = await Expense.findById(req.params.id)
        if (exp) {
            res.status(500).json("User Not Found")
        } else {
            res.status(200).json(exp)
        }

    } catch (error) {
        res.status(500).json(error.message)
    }

}


exports.getExpenseMonthly = async (req, res) => {
    try {
        const userId = req.user.id + "";
        // const  userId = "66a0a76536f45045a5da146a";
        const exp = await Expense.aggregate([
            {
                $match: {
                    userID: new ObjectId(`${userId}`)
                }
            },
            {
                $group: {
                    _id: {
                        ab: {
                            $substrCP: ["$date", 0, 7]
                        }
                    },
                    totalAmount: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$isActive", true] },
                                then: "$amount",
                                else: 0
                            }
                        }
                    }
                }
            },
            {
                $sort: {
                    "_id.ab": 1 
                }
            }
        ])

        res.status(200).json({ message: "success", data: exp })

    } catch (error) {
        res.status(500).json(error.message)
    }


}


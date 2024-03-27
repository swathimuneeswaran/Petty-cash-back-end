const IncomeSchema = require("../models/IncomeModel");
const {User}=require("../models/UserModel")

exports.addIncome = async (req, res) => {
    
    const { email,title, amount, category, description} = req.body;


    try{

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const income = new IncomeSchema({
        email,
        title,
        amount: parseFloat(amount), // Convert amount to number
        category,
        description,
        user:user._id// Convert date to Date object
    });

        await income.save();
        console.log(income)
        res.status(200).json({ message: 'Income Added' ,income});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getIncomes = async (req, res) => {
    const { email } = req.params;
    console.log(email);
    // const user = await User.find({ email });
    try {
        // Find all incomes associated with the user ID
        const user = await IncomeSchema.find({ email });
        // const incomes = await IncomeSchema.find({ user: id }).populate("user");
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await IncomeSchema.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

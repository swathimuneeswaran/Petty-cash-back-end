const ExpenseSchema = require("../models/ExpenseModel")
const {User}=require("../models/UserModel")


exports.addExpense = async (req, res) => {
    const {email,title, amount, category, description}  = req.body

    

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const income = new ExpenseSchema({
            email,
            title,
            amount: parseFloat(amount),
            category,
            description,
            user: user._id
        })

        await income.save()
        console.log(income)
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    
}

exports.getExpense = async (req, res) =>{
    const { email } = req.params;
    console.log(email);
    // const user = await User.find({ email });
    try {
        // Find all incomes associated with the user ID
        const user = await ExpenseSchema.find({ email });
       
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    try {
        const income = await ExpenseSchema.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
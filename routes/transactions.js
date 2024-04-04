const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {resetPassword,forgotPassword,signIn,addUser,getAllUsers}=require('../controllers/user');
const router = require('express').Router();



router.post('/add-income',addIncome)
router.get('/get-incomes/:id', getIncomes)
router.delete('/delete-income/:id', deleteIncome)
router.post('/add-expense', addExpense)
router.get('/get-expenses/:id',getExpense)
router.delete('/delete-expense/:id',deleteExpense)
router.post("/signup",addUser);
router.post("/login",signIn);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword)
router.get("/users",getAllUsers)

module.exports = router
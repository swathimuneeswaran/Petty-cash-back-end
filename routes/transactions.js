const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {resetPassword,forgotPassword,signIn,addUser,getAllUsers}=require('../controllers/user');
const router = require('express').Router();
const {verifyUser}=require("../controllers/verify")


router.post('/add-income',verifyUser, addIncome)
router.get('/get-incomes/:email',verifyUser, getIncomes)
router.delete('/delete-income/:id', verifyUser,deleteIncome)
router.post('/add-expense',verifyUser, addExpense)
router.get('/get-expenses/:email',verifyUser, getExpense)
router.delete('/delete-expense/:id', verifyUser,deleteExpense)
router.post("/signup",addUser);
router.post("/login",signIn);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword)
router.get("/users",verifyUser,getAllUsers)

module.exports = router
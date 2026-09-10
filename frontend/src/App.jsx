import { useEffect, useState } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Tabs from "./components/Tabs";
import ExpenseHistory from "./components/ExpenseHistory";
import AddExpenseButton from "./components/AddExpenseButton";

import {getExpenses,addExpense,updateExpense,deleteExpense} from "./components/services/expenseService";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);

      setExpenses([newExpense, ...expenses]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);

      const newExpenses = expenses.filter(
        (expense) => expense._id !== id
      );

      setExpenses(newExpenses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
  };

  const handleUpdateExpense = async (expense) => {
    try {
      const updatedExpense = await updateExpense(
        expense._id,
        expense
      );

      const newExpenses = expenses.map((item) => {
        if (item._id === updatedExpense._id) {
          return updatedExpense;
        }

        return item;
      });

      setExpenses(newExpenses);
      setExpenseToEdit(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Header />

      <div className="p-6">

        <SummaryCards expenses={expenses} />

        <div className="flex justify-between items-center mt-6">

          <Tabs />

          <AddExpenseButton
            onAddExpense={handleAddExpense}
            expenseToEdit={expenseToEdit}
            onUpdateExpense={handleUpdateExpense}
            onCancelEdit={() => setExpenseToEdit(null)}
          />

        </div>

        {loading ? (
          <p className="text-center mt-10">
            Loading expenses...
          </p>
        ) : (
          <ExpenseHistory
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
        )}

      </div>

    </div>
  );
}

export default App;
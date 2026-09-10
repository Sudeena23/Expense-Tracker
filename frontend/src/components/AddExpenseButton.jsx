import { useEffect, useState } from "react";

function AddExpenseButton({
  onAddExpense,
  expenseToEdit,
  onUpdateExpense,
  onCancelEdit
}) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    type: "expense"
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        amount: expenseToEdit.amount,
        description: expenseToEdit.description,
        category: expenseToEdit.category,
        date: expenseToEdit.date
          ? expenseToEdit.date.substring(0, 10)
          : "",
        type: "expense"
      });

      setShowForm(true);
    }
  }, [expenseToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (expenseToEdit) {
      onUpdateExpense({
        ...formData,
        _id: expenseToEdit._id
      });
    } else {
      onAddExpense(formData);
    }

    setFormData({
      amount: "",
      description: "",
      category: "",
      date: "",
      type: "expense"
    });

    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);

    setFormData({
      amount: "",
      description: "",
      category: "",
      date: "",
      type: "expense"
    });

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <>
      {!expenseToEdit && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          + Add Expense
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg mx-4 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              {expenseToEdit ? "Edit Expense" : "Add Expense"}
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="font-semibold text-gray-700 block mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="w-full bg-gray-100 p-3 rounded-lg mb-4 border border-transparent focus:border-black focus:outline-none"
              />

              <label className="font-semibold text-gray-700 block mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="e.g. Grocery shopping"
                className="w-full bg-gray-100 p-3 rounded-lg mb-4 border border-transparent focus:border-black focus:outline-none"
              />

              <label className="font-semibold text-gray-700 block mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-3 rounded-lg mb-4 border border-transparent focus:border-black focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent / Housing">Rent / Housing</option>
                <option value="Other">Other</option>
              </select>

              <label className="font-semibold text-gray-700 block mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-3 rounded-lg mb-6 border border-transparent focus:border-black focus:outline-none"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                >
                  {expenseToEdit ? "Update Expense" : "Add Expense"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddExpenseButton;
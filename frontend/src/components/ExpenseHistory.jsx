import { useState } from "react";

function ExpenseHistory({ expenses, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  let filteredExpenses = expenses.filter((expense) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (expense.description || "").toLowerCase().includes(searchText) ||
      (expense.category || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "" || expense.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "newest") {
    filteredExpenses.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  if (sort === "oldest") {
    filteredExpenses.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  if (sort === "high") {
    filteredExpenses.sort(
      (a, b) => Number(b.amount) - Number(a.amount)
    );
  }

  if (sort === "low") {
    filteredExpenses.sort(
      (a, b) => Number(a.amount) - Number(b.amount)
    );
  }

  const calculatedTotal = filteredExpenses.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
  );

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Expense History</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {filteredExpenses.length} {filteredExpenses.length === 1 ? "expense" : "expenses"}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search expenses by description or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3 flex-1 min-w-[200px] focus:outline-none focus:ring-1 focus:ring-black"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">All Categories</option>
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="newest">Newest Date</option>
          <option value="oldest">Oldest Date</option>
          <option value="high">Highest Amount</option>
          <option value="low">Lowest Amount</option>
        </select>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500">No expenses found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-bold text-red-600">
                      ${Number(expense.amount).toFixed(2)}
                    </td>

                    <td className="p-4 font-medium text-gray-800">
                      {expense.description}
                    </td>

                    <td className="p-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {expense.category}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600 text-sm">
                      {expense.date
                        ? new Date(expense.date).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onEdit(expense)}
                          className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 text-sm font-medium transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(expense._id)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 text-sm font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="bg-gray-100 border-t-2 border-gray-300 font-bold text-gray-900">
                  <td className="p-4 text-left text-red-600 text-lg">
                    ${calculatedTotal.toFixed(2)}
                  </td>
                  <td colSpan="4" className="p-4 text-left text-sm text-gray-700">
                    Total Calculated Expenses ({filteredExpenses.length} {filteredExpenses.length === 1 ? "item" : "items"})
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseHistory;
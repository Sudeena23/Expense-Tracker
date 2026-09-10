function SummaryCards({ expenses }) {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonth = expenses
    .filter((expense) => {
      const date = new Date(expense.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );

  const avgExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const cards = [
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`
    },
    {
      title: "This Month",
      value: `$${thisMonth.toFixed(2)}`
    },
    {
      title: "Average Expense",
      value: `$${avgExpense.toFixed(2)}`
    },
    {
      title: "Total Records",
      value: expenses.length
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white shadow rounded-xl p-6"
        >

          <h3 className="text-gray-500 font-medium">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-3">
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
}

export default SummaryCards;
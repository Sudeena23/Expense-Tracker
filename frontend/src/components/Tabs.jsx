function Tabs() {
  return (
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-gray-200 rounded">Expenses</button>
      <button className="px-4 py-2 hover:bg-gray-100 rounded">Analytics</button>
    </div>
  );
}

export default Tabs;

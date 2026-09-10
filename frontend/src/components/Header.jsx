function Header() {
  return (
    <div className="flex justify-between items-center p-4 my-4">
      <h1 className="text-2xl font-semibold">ExpenseTracker</h1>
      <div className="flex items-center gap-5 text-xl ">
        <span className="text-gray-500" >Welcome, John Doe</span>
        <button className="border px-4 py-1 rounded hover:bg-gray-300">Logout</button>
      </div>
    </div>
  );
}

export default Header;

import { FaRegMoneyBillAlt } from "react-icons/fa";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import { useEffect, useMemo } from "react";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 flex items-center justify-between shadow-lg rounded-b-lg">
        <div className="flex items-center">
          <FaRegMoneyBillAlt className="text-gray-100 text-5xl mr-4 animate-pulse" />
          <h1 className="text-gray-200 text-4xl font-extrabold tracking-wide">
            CONTROL DE GASTOS
          </h1>
        </div>
      </header>
      <main className="bg-gray-200 flex flex-col items-center justify-center min-h-screen gap-8 p-4 font-sans">
        <div className="bg-gray-600 p-8 mx-4 mt-6 rounded-xl shadow-lg max-w-2xl w-full">
          {isValidBudget ? (
            <div className="flex justify-center w-full">
              <BudgetTracker />
            </div>
          ) : (
            <BudgetForm />
          )}
        </div>

        {isValidBudget && (
          <div className="flex flex-col items-center w-full max-w-2xl ">
            <FilterByCategory  />
            <ExpenseList  />
            <ExpenseModal  />
          </div>
        )}
      </main>
    </>
  );
}

export default App;

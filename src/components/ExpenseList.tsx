import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

  return (
    <div className="mt-10 w-screen">   
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold text-center m-5">NO HAY GASTOS</p>
      ) : (
        <>
          <div className="max-w-screen-md mx-auto p-6 m-9 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full rounded-t-lg flex justify-center">
              Gastos
            </h2>
            <div className="flex flex-col items-center w-full">
              {filteredExpenses.map(expense => (
                <ExpenseDetail
                  key={expense.id}
                  expense={expense}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;

import { categories } from "../data/categories";
import { useEffect, useState } from "react";
import type { DraftExpense } from "../types";
import { useBudget } from "../hooks/useBudget";

// Obtener la fecha actual en formato YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: getCurrentDate(), // Establecer la fecha actual como valor predeterminado
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DraftExpense, string>>>({});
  const { dispatch, state } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
    }
  }, [state.editingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: name === "amount" ? parseFloat(value) : value, // Asegurarse de que 'amount' sea un número
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      date: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof DraftExpense, string>> = {};

    if (!expense.expenseName) newErrors.expenseName = "El nombre del gasto es obligatorio.";
    if (!expense.category) newErrors.category = "La categoría del gasto es obligatoria.";
    if (!expense.date) newErrors.date = "La fecha del gasto es obligatoria.";
    if (expense.amount <= 0) newErrors.amount = "El importe del gasto debe ser mayor a 0.";

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (state.editingId) {
        dispatch({
          type: "update-expense",
          payload: { expense: { id: state.editingId, ...expense } },
        });
      } else {
        dispatch({ type: "add-expense", payload: { expense } });
        console.log(state.expenses);
      }
    }
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: getCurrentDate(), // Restablecer la fecha al valor predeterminado (fecha actual)
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 ">
        {state.editingId ? "Actualizar Gasto" : "Nuevo Gasto"}
      </h2>
      <form className="mb-4 pt-4 flex flex-col gap-2 " onSubmit={handleSubmit}>
        <div className="mb-4 pt-4 flex flex-col gap-2">
          <label htmlFor="expenseName" className="block text-gray-700 font-semibold mb-2">
            Nombre del Gasto
          </label>
          <input
            type="text"
            id="expenseName"
            name="expenseName"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Alquiler, Comida, Transporte"
            value={expense.expenseName}
            onChange={handleChange}
          />
          {errors.expenseName && <p className="text-red-500 text-sm mt-1">{errors.expenseName}</p>}
        </div>

        <div className="mb-4 pt-4 flex flex-col gap-2">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div className="mb-4 pt-4 flex flex-col gap-2">
          <label htmlFor="expenseDate" className="block text-gray-700 font-semibold mb-2">
            Fecha
          </label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={expense.date}
            onChange={handleDateChange}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div className="mb-6 pt-4 flex flex-col gap-2">
          <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
            Importe
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Añade importe del gasto"
              value={expense.amount}
              onChange={handleChange}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {state.editingId ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

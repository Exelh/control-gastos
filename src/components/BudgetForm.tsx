import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"



const BudgetForm = () => {

  const [budget, setBudget] = useState(0)
  const { dispatch} = useBudget()

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo (() =>{
    return isNaN(budget) || budget <= 0
  },[budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "add-budget", payload: {budget} })

  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-100 mb-4 text-center">Ingresar Presupuesto</h2>
      <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="budget" className="block text-lg text-gray-700 font-bold mb-2"></label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <span className="px-3 text-2xl text-gray-100 font-semibold">$</span>
              <input
                type="number"
                id="budget"
                name="budget"
                className="w-full p-4 text-2xl text-blue-700 border-0 focus:outline-none focus:ring-0"
                placeholder="Ingrese su presupuesto"
                value={budget}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold text-lg hover: transition duration-300 transform hover:scale-105 disabled:opacity-40"
            disabled={isValid}
          >
            Guardar Presupuesto
          </button>
        </form>
    </div>
  )
}

export default BudgetForm

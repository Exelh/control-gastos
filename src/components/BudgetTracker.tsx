import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import { FaUndoAlt } from 'react-icons/fa';
import AmountDisplay from './AmountDisplay';
import { useBudget } from '../hooks/useBudget';
import { useMemo } from 'react';
import "react-circular-progressbar/dist/styles.css";


const BudgetTracker = () => {
  
  const { state, dispatch } = useBudget();
  
  const totalExpenses = useMemo(() => 
    state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );
  
  const percentage = +(((totalExpenses / state.budget) * 100).toFixed());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className=" p-8 rounded-lg b border-2  max-w-md w-full text-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: 
              percentage === 0 ? "#10b981" : // Verde cuando no hay gastos
              percentage >= 75 ? "#dc2626" : // Rojo si es 75% o más
              percentage >= 50 ? "#f59e0b" : // Amarillo si es entre 50% y 74%
              "#10b981", // Azul si es menos del 50%
            trailColor: "#f5f5f5",
            textSize: "10px",
            textColor: 
              percentage === 0 ? "#10b981" :
              percentage >= 75 ? "#dc2626" :
              percentage >= 50 ? "#f59e0b" :
              "#10b981",
          })}
          text={percentage === 0 ? "100% Disponible" : `${percentage}% Gastado`}
        /> 
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
        <AmountDisplay
          label="Disponible"
          amount={state.budget - totalExpenses}
          percentage={percentage} // Pasar el porcentaje
        />

        <button
          className="flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 shadow-lg"
          onClick={() => dispatch({type: "reset-app"})}
        >
          <FaUndoAlt className="mr-2" />
          Resetear App
        </button>
      </div>
    </div>
  );
}

export default BudgetTracker;

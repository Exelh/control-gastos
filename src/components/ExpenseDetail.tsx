import { useMemo } from "react";
import { Expense } from "../types";
import { categories } from "../data/categories";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import { useBudget } from "../hooks/useBudget";
import 'react-swipeable-list/dist/styles.css';

type ExpenseDetailProps = {
  expense: Expense;
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense]);
  const { dispatch } = useBudget();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction 
          onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })}
         
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
          onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}
          destructive={true}
          
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden text-gray-800">
      <ul className="mb-1">
        <SwipeableList>
          <SwipeableListItem
              maxSwipe={1}
              leadingActions={leadingActions()}
              trailingActions={trailingActions()}
          >
            <li className="flex gap-5 w-full items-center p-6 bg-white hover:bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-500 transition-all duration-200 ease-in-out">
              <div>
                <img
                  src={`/icono_${categoryInfo?.icon}.svg`}
                  alt={categoryInfo?.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">{expense.expenseName}</h3>
                <p className="text-sm">{categoryInfo?.name}</p>
                <p className="text-sm">Fecha: {new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-3xl font-bold text-blue-500">${expense.amount.toFixed(2)}</p>
              </div>
            </li>
          </SwipeableListItem>
        </SwipeableList>
      </ul>
    </div>
  );
};

export default ExpenseDetail;

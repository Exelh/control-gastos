
import { categories } from '../data/categories'; // Asegúrate de importar correctamente las categorías
import { useBudget } from '../hooks/useBudget';


const FilterByCategory = () => {


  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{ 
      dispatch({ type: "add-filter-category", payload: { id: e.target.value } })
   }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-l mx-auto mt-10 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Filtrar por Categoría</h2>
      <form>
        <div className="flex flex-col space-y-4">
        <select 
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={handleChange}
                    >
                        <option value="">-- Todas las Categorias</option>
                        {categories.map(category => (
                            <option 
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
          
        </div>
      </form>
    </div>
  );
};

export default FilterByCategory;

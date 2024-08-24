type AmountDisplayProps = {
  label: string;
  amount: number;
  percentage?: number
};

const AmountDisplay = ({ label, amount, percentage }: AmountDisplayProps) => {
  const getBackgroundClass = () => {
    if (percentage !== undefined) {
      if (percentage < 50) return "bg-green-500 text-white";
      if (percentage >= 50 && percentage < 75) return "bg-yellow-500 text-white";
      if (percentage >= 75 && percentage <= 100) return "bg-red-500 text-white";
      return "bg-red-500 text-white"; // En caso de que el porcentaje exceda el 100%
    }
    return "bg-gray-200 text-gray-800"; // Estilo por defecto si no hay porcentaje
  };

  const backgroundClass = getBackgroundClass();

  return (
    <div className={`${backgroundClass} p-8 rounded-lg shadow-lg text-center w-full`}>
      <h2 className={`text-3xl font-semibold ${backgroundClass}`}>
        {label}
      </h2>
      <p className={`text-5xl font-bold ${backgroundClass}`}>
        ${amount.toLocaleString()}
      </p>
    </div>
  );
};

export default AmountDisplay;

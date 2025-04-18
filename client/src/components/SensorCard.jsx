const SensorCard = ({ title, value, unit, icon, threshold, time }) => {
    
    const numericValue = parseFloat(value);
    let bgColor = "bg-green-500";
  
    if (numericValue < threshold.low) bgColor = "bg-blue-500";
    else if (numericValue > threshold.high) bgColor = "bg-red-500";
  

    let statusColor = "bg-green-500";  // Safe range (Green)
  let statusText = "Safe";

  if (numericValue < threshold.low) {
    statusColor = "bg-blue-500";  // Lower than threshold (Blue)
    statusText = "Low";
  } else if (numericValue > threshold.high) {
    statusColor = "bg-red-500";   // Higher than threshold (Red)
    statusText = "High";
  }
    return (
      <div className={`w-full max-w-xs p-6 text-white rounded-2xl shadow-xl ${bgColor}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-5xl font-bold mb-2">{value ?? "N/A"}<span className="text-2xl">{unit}</span></div>
        <p className="text-sm text-white/80">Normal: {threshold.low}{unit} - {threshold.high}{unit}</p>
        <p className="text-sm text-white/80">Updated at: {time}</p>
        <div className={`text-white mt-6 font-semibold rounded-lg ${statusColor}`}>
        {statusText}
      </div>
      </div>
    
    );
  };

  export default SensorCard
  
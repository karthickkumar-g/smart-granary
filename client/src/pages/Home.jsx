import { useState } from "react";
import Bargraph from "../components/Bargraph";

const Home = () => {
  const [selectedRange, setSelectedRange] = useState("this-week");
  const [selectedDate, setSelectedDate] = useState(null);
  const [chartType, setChartType] = useState('Bar');

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
    setSelectedDate(null); // Reset date selection when switching ranges
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedRange(""); // Reset predefined ranges when selecting a date
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div className="container h-auto mb-10 mt-10 mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between mb-9 gap-6">
        
        {/* Date Range Select */}
        <div className="select-date flex flex-col w-full">
          <label htmlFor="date-select" className="text-lg font-semibold mb-2">
            Select Date Range:
          </label>
          <select
            name="date-select"
            id="date-select"
            onChange={handleRangeChange}
            value={selectedRange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          >
            <option value="this-week">This Week</option>
            <option value="past-week">Past Week</option>
          </select>
        </div>

        {/* Specific Date Picker */}
        <div className="flex flex-col w-full">
          <label htmlFor="date-picker" className="text-lg font-semibold mb-2">
            Select Specific Date:
          </label>
          <input
            type="date"
            id="date-picker"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            onChange={handleDateChange}
            value={selectedDate || ""}
          />
        </div>

        {/* Chart Type Select */}
        <div className="select-chart-type flex flex-col w-full">
          <label htmlFor="chart-type-select" className="text-lg font-semibold mb-2">
            Select Chart Type:
          </label>
          <select
            name="chart-type-select"
            id="chart-type-select"
            onChange={handleChartTypeChange}
            value={chartType}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          >
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
            <option value="Doughnut">Doughnut</option>
          </select>
        </div>

      </div>

      {/* Bargraph Section */}
      <div className="bargraph-section mt-8">
        <h2 className="text-xl font-bold text-center mb-6">Data Overview</h2>
        <div className="p-4 pb-20 bg-white shadow-lg rounded-lg">
          <Bargraph selectedRange={selectedRange} chartType={chartType} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default Home;

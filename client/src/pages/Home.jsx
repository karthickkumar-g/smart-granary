import { useContext, useState } from "react";
import Bargraph from "../components/Bargraph";
import { DataContext } from "../context/DataContext";
import SensorCard from "../components/SensorCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { data } = useContext(DataContext);
  const {deviceId} = useAuth()
  const [selectedRange, setSelectedRange] = useState("this-week");
  const [selectedDate, setSelectedDate] = useState(null);
  const [chartType, setChartType] = useState("Bar");
  const [showToday, setShowToday] = useState(true);

  const handleShowToday = () => {
    setShowToday((prev) => !prev);
  };
  // console.log("Device"+deviceId);
  

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
    setSelectedDate(null);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedRange("");
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const latestFeed = data?.feeds?.[data.feeds.length - 1];

  const temp = latestFeed?.field1 || "N/A";
  const humidity = latestFeed?.field2 || "N/A";
  const gas = latestFeed?.field3 || "N/A";
  const light = latestFeed?.field4 || "N/A";
  const time = latestFeed?.created_at?.split("T")[1]?.split("Z")[0] || "N/A";

  return (
    <div className="container h-auto mb-10 mt-10 mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row my-10 mx-auto justify-center">
        <button
          onClick={handleShowToday}
          className="btn border-black bg-blue-700 px-5 py-2 text-slate-50 rounded-lg"
        >
          {showToday ? "Insights" : "Today"}
        </button>
      </div>
      {!showToday && (
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
            <label
              htmlFor="chart-type-select"
              className="text-lg font-semibold mb-2"
            >
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
      )}
      {/* Bargraph Section */}
      <div className="bargraph-section mt-8">
        <h2 className="text-xl font-bold text-center mb-6">
          Data Overview <span>{showToday ? "(current)" : ""}</span>
        </h2>

        {showToday ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
            {/* Temperature Card */}
            <SensorCard
              title="Temperature"
              value={temp}
              unit="°C"
              icon="🌡️"
              threshold={{ low: 15, high: 30 }}
              time={time}
            />

            {/* Humidity Card */}
            <SensorCard
              title="Humidity"
              value={humidity}
              unit="%"
              icon="💧"
              threshold={{ low: 30, high: 90 }}
              time={time}
            />

            {/* Gas Card */}
            <SensorCard
              title="Gas Level"
              value={gas}
              unit="ppm"
              icon="🧪"
              threshold={{ low: 0, high: 200 }}
              time={time}
            />

            {/* Light Card */}
            <SensorCard
              title="Light Intensity"
              value={light}
              unit="lx"
              icon="💡"
              threshold={{ low: 300, high: 800 }}
              time={time}
            />
          </div>
        ) : (
          <div className="p-4 pb-20 bg-white shadow-lg rounded-lg">
            <Bargraph
              selectedRange={selectedRange}
              chartType={chartType}
              selectedDate={selectedDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

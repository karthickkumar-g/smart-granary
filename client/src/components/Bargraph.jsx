import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Important for Pie/Doughnut charts
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  ArcElement // Registering ArcElement for Pie/Doughnut charts
);

const Bargraph = ({ selectedRange, selectedDate, chartType }) => {
  const datasets = {
    temperature: {
      label: 'Temperature (°C)',
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: {
        'this-week': [18, 22, 17, 19, 20, 21, 25],
        'past-week': [22, 25, 20, 21, 19, 23, 24],
        '2024-09-25': [20, 21, 22, 23, 24, 25, 26],
        '2024-09-26': [18, 19, 20, 21, 22, 23, 24],
        '2024-09-27': [19, 20, 21, 22, 23, 24, 25],
        '2024-09-28': [21, 22, 23, 24, 25, 26, 27],
      },
    },
    gas: {
      label: 'Gas (ppm)',
      backgroundColor: 'rgba(0, 0, 0, 0.43)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: {
        'this-week': [30, 35, 33, 31, 30, 29, 28],
        'past-week': [32, 34, 31, 33, 35, 36, 30],
        '2024-09-25': [29, 28, 27, 26, 25, 24, 23],
        '2024-09-26': [27, 26, 25, 24, 23, 22, 21],
        '2024-09-27': [28, 27, 26, 25, 24, 23, 22],
        '2024-09-28': [26, 25, 24, 23, 22, 21, 20],
      },
    },
    humidity: {
      label: 'Humidity (%)',
      backgroundColor: 'rgba(0, 0, 253, 0.8)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: {
        'this-week': [70, 68, 65, 69, 72, 75, 71],
        'past-week': [60, 65, 64, 63, 68, 70, 66],
        '2024-09-25': [67, 66, 65, 64, 63, 62, 61],
        '2024-09-26': [68, 67, 66, 65, 64, 63, 62],
        '2024-09-27': [69, 68, 67, 66, 65, 64, 63],
        '2024-09-28': [65, 64, 63, 62, 61, 60, 59],
      },
    },
  };

  const getDataForDate = (dataType) => {
    const data = datasets[dataType].data;
    return selectedDate ? data[selectedDate] : data[selectedRange] || [];
  };

  const getOptions = (unit) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: chartType === 'Pie' || chartType === 'Doughnut' ? {} : {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} ${unit}`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} ${unit}`,
        },
      },
    },
  });

  const chartComponents = {
    Bar: Bar,
    Line: Line,
    Pie: Pie,
    Doughnut: Doughnut,
  };

  const ChartComponent = chartComponents[chartType];

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const prepareData = (dataType) => {
    const data = getDataForDate(dataType);
    return {
      labels,
      datasets: chartType === 'Pie' || chartType === 'Doughnut'
        ? [{ data, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'] }]
        : [{ ...datasets[dataType], data }],
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      <div className="bar-graph w-full mb-20 sm:w-4/5 md:w-3/4 lg:w-1/2" style={{ height: '300px' }}>
        <h3 className="text-center font-semibold mb-2">Temperature</h3>
        <ChartComponent data={prepareData('temperature')} options={getOptions('°C')} />
      </div>

      <div className="bar-graph w-full mb-20 sm:w-4/5 md:w-3/4 lg:w-1/2" style={{ height: '300px' }}>
        <h3 className="text-center font-semibold mb-2">Gas Levels</h3>
        <ChartComponent data={prepareData('gas')} options={getOptions('ppm')} />
      </div>

      <div className="bar-graph w-full sm:w-4/5 md:w-3/4 lg:w-1/2" style={{ height: '300px' }}>
        <h3 className="text-center font-semibold mb-2">Humidity</h3>
        <ChartComponent data={prepareData('humidity')} options={getOptions('%')} />
      </div>
    </div>
  );
};

Bargraph.propTypes = {
  selectedRange: PropTypes.string,
  selectedDate: PropTypes.string,
  chartType: PropTypes.string.isRequired,
};

export default Bargraph;

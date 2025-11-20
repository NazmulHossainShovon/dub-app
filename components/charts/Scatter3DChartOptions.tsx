import React from 'react';

interface Scatter3DChartOptionsProps {
  allHeaders: string[];
  selectedNumericColumn: string;
  setSelectedNumericColumn: (value: string) => void;
  selectedNonNumericColumn: string;
  setSelectedNonNumericColumn: (value: string) => void;
  range3: string;
  setRange3: (value: string) => void;
}

const Scatter3DChartOptions: React.FC<Scatter3DChartOptionsProps> = ({
  selectedNumericColumn,
  setSelectedNumericColumn,
  selectedNonNumericColumn,
  setSelectedNonNumericColumn,
  range3,
  setRange3,
}) => {
  return (
    <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* X-axis input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          X-axis
        </label>
        <input
          type="text"
          value={selectedNumericColumn}
          onChange={e => setSelectedNumericColumn(e.target.value)}
          placeholder="Enter X-axis range"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Y-axis input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Y-axis
        </label>
        <input
          type="text"
          value={selectedNonNumericColumn}
          onChange={e => setSelectedNonNumericColumn(e.target.value)}
          placeholder="Enter Y-axis range"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Z-axis input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Z-axis
        </label>
        <input
          type="text"
          value={range3}
          onChange={e => setRange3(e.target.value)}
          placeholder="Enter Z-axis range"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Scatter3DChartOptions;

import React from 'react';

interface Mesh3DChartOptionsProps {
  allHeaders: string[];
  selectedNumericColumn: string; // x coordinates
  setSelectedNumericColumn: (value: string) => void;
  selectedNonNumericColumn: string; // y coordinates
  setSelectedNonNumericColumn: (value: string) => void;
  range3: string; // z coordinates
  setRange3: (value: string) => void;
  range4: string; // i indices
  setRange4: (value: string) => void;
  range5: string; // j indices
  setRange5: (value: string) => void;
  range6: string; // k indices
  setRange6: (value: string) => void;
}

const Mesh3DChartOptions: React.FC<Mesh3DChartOptionsProps> = ({
  selectedNumericColumn,
  setSelectedNumericColumn,
  selectedNonNumericColumn,
  setSelectedNonNumericColumn,
  range3,
  setRange3,
  range4,
  setRange4,
  range5,
  setRange5,
  range6,
  setRange6,
}) => {
  return (
    <div className="md:col-span-7">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* X coordinates input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            X Coordinates
          </label>
          <input
            type="text"
            value={selectedNumericColumn}
            onChange={e => setSelectedNumericColumn(e.target.value)}
            placeholder="Enter X coordinates range"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Y coordinates input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Y Coordinates
          </label>
          <input
            type="text"
            value={selectedNonNumericColumn}
            onChange={e => setSelectedNonNumericColumn(e.target.value)}
            placeholder="Enter Y coordinates range"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Z coordinates input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Z Coordinates
          </label>
          <input
            type="text"
            value={range3}
            onChange={e => setRange3(e.target.value)}
            placeholder="Enter Z coordinates range"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* i indices input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            i Indices
          </label>
          <input
            type="text"
            value={range4}
            onChange={e => setRange4(e.target.value)}
            placeholder="Enter i indices range"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* j indices input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            j Indices
          </label>
          <input
            type="text"
            value={range5}
            onChange={e => setRange5(e.target.value)}
            placeholder="Enter j indices range"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* k indices input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            k Indices
          </label>
          <input
            type="text"
            value={range6}
            onChange={e => setRange6(e.target.value)}
            placeholder="Enter k indices range"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Mesh3DChartOptions;
import React, { useState } from 'react';

interface SurfaceChartOptionsProps {
  allHeaders: string[];
  selectedNumericColumn: string;
  setSelectedNumericColumn: (value: string) => void;
  selectedNonNumericColumn: string;
  setSelectedNonNumericColumn: (value: string) => void;
  range3: string;
  setRange3: (value: string) => void;
  showContours?: boolean;
  setShowContours?: (value: boolean) => void;
}

const SurfaceChartOptions: React.FC<SurfaceChartOptionsProps> = ({
  selectedNumericColumn,
  setSelectedNumericColumn,
  selectedNonNumericColumn,
  setSelectedNonNumericColumn,
  range3,
  setRange3,
  showContours,
  setShowContours,
}) => {
  const [internalShowContours, setInternalShowContours] = useState<boolean>(false);

  // Use the setShowContours prop if available, otherwise use internal state
  const currentShowContours = setShowContours ? showContours : internalShowContours;
  const setCurrentShowContours = setShowContours ? setShowContours : setInternalShowContours;

  return (
    <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* X-axis input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          X-axis Range
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
          Y-axis Range
        </label>
        <input
          type="text"
          value={selectedNonNumericColumn}
          onChange={e => setSelectedNonNumericColumn(e.target.value)}
          placeholder="Enter Y-axis range"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Z-axis (Surface heights) input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Z-axis Range (2D)
        </label>
        <input
          type="text"
          value={range3}
          onChange={e => setRange3(e.target.value)}
          placeholder="Enter Z-axis 2D range"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Show Contours checkbox */}
      <div className="md:col-span-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={currentShowContours}
            onChange={e => setCurrentShowContours(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Show Contours</span>
        </label>
      </div>
    </div>
  );
};

export default SurfaceChartOptions;
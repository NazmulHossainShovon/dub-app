import React from 'react';

interface FunnelChartOptionsProps {
  allHeaders: string[];
  selectedNumericColumn?: string;
  setSelectedNumericColumn: (value: string) => void;
  selectedNonNumericColumn?: string;
  setSelectedNonNumericColumn: (value: string) => void;
}

const FunnelChartOptions: React.FC<FunnelChartOptionsProps> = ({
  allHeaders,
  selectedNumericColumn,
  setSelectedNumericColumn,
  selectedNonNumericColumn,
  setSelectedNonNumericColumn,
}) => {
  return (
    <div className="md:col-span-7">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select X-axis Range:
          </label>
          <input
            type="text"
            value={selectedNumericColumn || ''}
            onChange={e => setSelectedNumericColumn(e.target.value)}
            list="allHeadersX"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Y-axis Range:
          </label>
          <input
            type="text"
            value={selectedNonNumericColumn || ''}
            onChange={e => setSelectedNonNumericColumn(e.target.value)}
            list="allHeadersY"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FunnelChartOptions;

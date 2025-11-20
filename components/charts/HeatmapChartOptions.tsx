import React from 'react';

interface HeatmapChartOptionsProps {
  numericColumns: string[];
  selectedNumericColumn?: string;
  setSelectedNumericColumn: (value: string) => void;
}

const HeatmapChartOptions: React.FC<HeatmapChartOptionsProps> = ({
  numericColumns,
  selectedNumericColumn,
  setSelectedNumericColumn,
}) => {
  return (
    <div className="md:col-span-7">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Numeric Column
      </label>
      <input
        type="text"
        list="numericColumns"
        value={selectedNumericColumn || ''}
        onChange={e => setSelectedNumericColumn(e.target.value)}
        placeholder="Select or type a numeric column"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default HeatmapChartOptions;

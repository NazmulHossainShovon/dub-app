'use client';

import React from 'react';
import ViolinPlotOptions from './ViolinPlotOptions';
import FunnelChartOptions from './FunnelChartOptions';
import ContourChartOptions from './ContourChartOptions';
import HeatmapChartOptions from './HeatmapChartOptions';
import Scatter3DChartOptions from './Scatter3DChartOptions';
import SurfaceChartOptions from './SurfaceChartOptions';
import Mesh3DChartOptions from './Mesh3DChartOptions';
import { ChartConfig } from './types/ChartConfig';

interface ChartTypeSelectorProps {
  config: ChartConfig;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ config }) => {
  const {
    selection: { selectedChartType, setSelectedChartType },
    columns: {
      selectedNumericColumn,
      setSelectedNumericColumn,
      selectedNonNumericColumn,
      setSelectedNonNumericColumn,
    },
    ranges: {
      range3,
      setRange3,
      range4,
      setRange4,
      range5,
      setRange5,
      range6,
      setRange6,
    },
    options: { xAxisTitle, setXAxisTitle, showContours, setShowContours },
    data: { numericColumns, nonNumericColumns, allHeaders },
    chartTypes,
  } = config;
  return (
    <div className="mb-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div className="md:col-span-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chart Type
          </label>
          <select
            value={selectedChartType}
            onChange={e => setSelectedChartType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {chartTypes.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label} ({option.category})
              </option>
            ))}
          </select>
        </div>

        {selectedChartType === 'violin' && setSelectedNumericColumn && (
          <div className="md:col-span-7">
            <ViolinPlotOptions
              numericColumns={numericColumns}
              selectedNumericColumn={selectedNumericColumn || ''}
              setSelectedNumericColumn={setSelectedNumericColumn}
              xAxisTitle={xAxisTitle}
              setXAxisTitle={setXAxisTitle}
            />
          </div>
        )}

        {(selectedChartType === 'funnel' ||
          selectedChartType === 'histogram2dcontour') &&
          setSelectedNumericColumn &&
          setSelectedNonNumericColumn && (
            <FunnelChartOptions
              allHeaders={allHeaders}
              selectedNumericColumn={selectedNumericColumn}
              setSelectedNumericColumn={setSelectedNumericColumn}
              selectedNonNumericColumn={selectedNonNumericColumn}
              setSelectedNonNumericColumn={setSelectedNonNumericColumn}
            />
          )}

        {selectedChartType === 'contour' ||
          (selectedChartType === 'box' && setSelectedNumericColumn && (
            <ContourChartOptions
              numericColumns={numericColumns}
              selectedNumericColumn={selectedNumericColumn}
              setSelectedNumericColumn={setSelectedNumericColumn}
            />
          ))}

        {selectedChartType === 'heatmap' && setSelectedNumericColumn && (
          <HeatmapChartOptions
            numericColumns={numericColumns}
            selectedNumericColumn={selectedNumericColumn}
            setSelectedNumericColumn={setSelectedNumericColumn}
          />
        )}

        {selectedChartType === 'scatter3d' &&
          setSelectedNumericColumn &&
          setSelectedNonNumericColumn &&
          setRange3 && (
            <Scatter3DChartOptions
              allHeaders={allHeaders}
              selectedNumericColumn={selectedNumericColumn || ''}
              setSelectedNumericColumn={setSelectedNumericColumn}
              selectedNonNumericColumn={selectedNonNumericColumn || ''}
              setSelectedNonNumericColumn={setSelectedNonNumericColumn}
              range3={range3 || ''}
              setRange3={setRange3}
            />
          )}

        {selectedChartType === 'surface' &&
          setSelectedNumericColumn &&
          setSelectedNonNumericColumn &&
          setRange3 && (
            <SurfaceChartOptions
              allHeaders={allHeaders}
              selectedNumericColumn={selectedNumericColumn || ''}
              setSelectedNumericColumn={setSelectedNumericColumn}
              selectedNonNumericColumn={selectedNonNumericColumn || ''}
              setSelectedNonNumericColumn={setSelectedNonNumericColumn}
              range3={range3 || ''}
              setRange3={setRange3}
              showContours={showContours}
              setShowContours={setShowContours}
            />
          )}

        {selectedChartType === 'mesh3d' &&
          setSelectedNumericColumn &&
          setSelectedNonNumericColumn &&
          setRange3 &&
          setRange4 &&
          setRange5 &&
          setRange6 && (
            <Mesh3DChartOptions
              allHeaders={allHeaders}
              selectedNumericColumn={selectedNumericColumn || ''}
              setSelectedNumericColumn={setSelectedNumericColumn}
              selectedNonNumericColumn={selectedNonNumericColumn || ''}
              setSelectedNonNumericColumn={setSelectedNonNumericColumn}
              range3={range3 || ''}
              setRange3={setRange3}
              range4={range4 || ''}
              setRange4={setRange4}
              range5={range5 || ''}
              setRange5={setRange5}
              range6={range6 || ''}
              setRange6={setRange6}
            />
          )}
      </div>
    </div>
  );
};

export default ChartTypeSelector;

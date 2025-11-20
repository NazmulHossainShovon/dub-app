import { useEffect } from 'react';

interface UseViolinPlotProps {
  selectedChartType: string;
  numericColumns: string[];
  selectedNumericColumn: string;
  setSelectedNumericColumn: (column: string) => void;
}

const useViolinPlot = ({
  selectedChartType,
  numericColumns,
  selectedNumericColumn,
  setSelectedNumericColumn,
}: UseViolinPlotProps) => {
  useEffect(() => {
    if (selectedChartType === 'violin' && numericColumns.length > 0 && !selectedNumericColumn) {
      setSelectedNumericColumn(numericColumns[0]);
    }
  }, [selectedChartType, numericColumns, selectedNumericColumn, setSelectedNumericColumn]);
};

export default useViolinPlot;
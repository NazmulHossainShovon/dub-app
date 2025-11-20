// Chart configuration types
export interface ChartSelection {
  selectedChartType: string;
  setSelectedChartType: (value: string) => void;
}

export interface ColumnSelection {
  selectedNumericColumn?: string;
  setSelectedNumericColumn?: (value: string) => void;
  selectedNonNumericColumn?: string;
  setSelectedNonNumericColumn?: (value: string) => void;
}

export interface RangeSelection {
  range3?: string;
  setRange3?: (value: string) => void;
  range4?: string;
  setRange4?: (value: string) => void;
  range5?: string;
  setRange5?: (value: string) => void;
  range6?: string;
  setRange6?: (value: string) => void;
}

export interface ChartOptions {
  xAxisTitle?: string;
  setXAxisTitle?: (value: string) => void;
  showContours?: boolean;
  setShowContours?: (value: boolean) => void;
}

export interface DataColumns {
  numericColumns: string[];
  nonNumericColumns: string[];
  allHeaders: string[];
}

export interface ChartConfig {
  selection: ChartSelection;
  columns: ColumnSelection;
  ranges: RangeSelection;
  options: ChartOptions;
  data: DataColumns;
  chartTypes: any[];
}
interface ComparisonData {
  dps1: number;
  dps2: number;
  diff: number;
}

interface ComparisonTableProps {
  data: ComparisonData;
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  // Determine which build is stronger
  const build1IsStronger = data.dps1 > data.dps2;
  const build2IsStronger = data.dps2 > data.dps1;
  const isTie = data.dps1 === data.dps2;

  // Calculate the absolute percentage difference
  const absDiff = Math.abs(data.diff);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">DPS Comparison</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Build</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DPS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vs Other</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Build 1</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-semibold ${build1IsStronger ? 'text-green-600' : build2IsStronger ? 'text-red-600' : 'text-gray-900'}`}>
                  {data.dps1.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm ${data.diff > 0 ? 'text-green-600' : data.diff < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {data.diff > 0 ? '+' : ''}{data.diff.toFixed(2)}%
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Build 2</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-semibold ${build2IsStronger ? 'text-green-600' : build1IsStronger ? 'text-red-600' : 'text-gray-900'}`}>
                  {data.dps2.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm ${-data.diff > 0 ? 'text-green-600' : -data.diff < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {-data.diff > 0 ? '+' : ''}{(-data.diff).toFixed(2)}%
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">Analysis</h3>
        <p className="text-sm text-gray-600">
          {isTie 
            ? "Both builds have identical DPS values." 
            : build1IsStronger 
              ? `Build 1 is stronger with ${absDiff.toFixed(2)}% higher DPS than Build 2.`
              : `Build 2 is stronger with ${absDiff.toFixed(2)}% higher DPS than Build 1.`}
        </p>
      </div>

      {/* Visual representation */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">DPS Comparison</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Build 1: {data.dps1.toLocaleString()}</div>
            <div 
              className={`h-6 rounded ${build1IsStronger ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.max(10, (data.dps1 / (data.dps1 + data.dps2)) * 100)}%` }}
            ></div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Build 2: {data.dps2.toLocaleString()}</div>
            <div 
              className={`h-6 rounded ${build2IsStronger ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.max(10, (data.dps2 / (data.dps1 + data.dps2)) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
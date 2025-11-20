import React from 'react';

interface SheetUrlInputProps {
  sheetUrl: string;
  setSheetUrl: (url: string) => void;
  loading: boolean;
  onFetchData: () => void;
}

const SheetUrlInput: React.FC<SheetUrlInputProps> = ({
  sheetUrl,
  setSheetUrl,
  loading,
  onFetchData,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="sheetUrl" className="block text-sm font-medium mb-2">
        Google Sheet URL:
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="sheetUrl"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          placeholder="Enter Google Sheet URL"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={onFetchData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Generate Chart'}
        </button>
      </div>
    </div>
  );
};

export default SheetUrlInput;
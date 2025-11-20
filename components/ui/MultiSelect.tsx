import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { BuildInput } from '../../types/build';

interface MultiSelectProps {
  label: string;
  name: `equipped.accessories`;
  register: UseFormRegister<BuildInput>;
  errors: FieldErrors<BuildInput>;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MultiSelect({ 
  label, 
  name, 
  register, 
  errors, 
  options,
  value = [],
  onChange
}: MultiSelectProps) {
  const handleCheckboxChange = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter(selected => selected !== item));
    } else {
      onChange([...value, item]);
    }
  };

  // Register the accessories field with React Hook Form
  register(name);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={`${name}-${option}`}
              checked={value.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label 
              htmlFor={`${name}-${option}`} 
              className="ml-2 text-sm text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {errors.equipped?.accessories && (
        <p className="mt-1 text-sm text-red-600">
          {errors.equipped.accessories?.message?.toString()}
        </p>
      )}
    </div>
  );
}
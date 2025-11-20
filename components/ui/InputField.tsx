import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BuildInput } from '../../types/build';

interface InputFieldProps {
  label: string;
  name: keyof BuildInput | `stats.${keyof BuildInput['stats']}` | `equipped.${keyof BuildInput['equipped']}`;
  register: UseFormRegister<BuildInput>;
  errors: FieldErrors<BuildInput>;
  type?: 'number' | 'text';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function InputField({ 
  label, 
  name, 
  register, 
  errors, 
  type = 'text', 
  placeholder = '', 
  min,
  max,
  step 
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          errors[name as keyof BuildInput] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors[name as keyof BuildInput] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name as keyof BuildInput]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
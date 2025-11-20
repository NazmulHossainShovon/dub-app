'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fruits, swords, accessories } from '../lib/data';
import { BuildInput } from '../types/build';
import InputField from './ui/InputField';
import SelectField from './ui/SelectField';
import MultiSelect from './ui/MultiSelect';

// Define the validation schema using Zod
const buildSchema = z
  .object({
    level: z.number().min(1, { message: 'Level must be at least 1' }).max(2550, { message: 'Level cannot exceed 2550' }),
    stats: z.object({
      melee: z.number().min(0).max(100, { message: 'Melee must be between 0 and 100' }),
      defense: z.number().min(0).max(100, { message: 'Defense must be between 0 and 100' }),
      fruit: z.number().min(0).max(100, { message: 'Fruit must be between 0 and 100' }),
      sword: z.number().min(0).max(100, { message: 'Sword must be between 0 and 100' }),
      gun: z.number().min(0).max(100, { message: 'Gun must be between 0 and 100' }),
    }).refine(
      (data) => {
        const total = data.melee + data.defense + data.fruit + data.sword + data.gun;
        return total === 100;
      },
      {
        message: 'Stats must sum to 100%',
        path: ['sum'], // path of error
      }
    ),
    equipped: z.object({
      fruit: z.enum([...fruits] as [string, ...string[]]),
      sword: z.enum([...swords] as [string, ...string[]]),
      accessories: z.array(z.enum([...accessories] as [string, ...string[]])).default([]),
    }),
  })
  .strict();

// Type for the form values (zod inferred) - cast to BuildInput to match our interface
type FormValues = z.infer<typeof buildSchema>;

interface BuildFormProps {
  buildNumber: 1 | 2;
  onSubmit: (data: BuildInput) => void;
  initialData?: BuildInput;
}

export default function BuildForm({ buildNumber, onSubmit, initialData }: BuildFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BuildInput>({
    // Use type assertion to bypass the type mismatch
    resolver: zodResolver(buildSchema) as any,
    defaultValues: initialData || {
      level: 1000,
      stats: {
        melee: 25,
        defense: 25,
        fruit: 25,
        sword: 25,
        gun: 0,
      },
      equipped: {
        fruit: 'None',
        sword: 'None',
        accessories: [],
      },
    },
  });

  // Watch the stats values to calculate total
  const stats = watch('stats');
  const statsTotal = stats.melee + stats.defense + stats.fruit + stats.sword + stats.gun;

  const onSubmitHandler: SubmitHandler<BuildInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmitHandler)} 
      className="space-y-4 p-4 border rounded-lg bg-white shadow-sm"
    >
      <h2 className="text-xl font-bold text-center mb-4">
        Build {buildNumber}
      </h2>
      
      {/* Level Input */}
      <InputField
        label="Level (1-2550)"
        name="level"
        register={register}
        errors={errors}
        type="number"
        min={1}
        max={2550}
        placeholder="Enter character level"
      />

      {/* Stats Section */}
      <div className="border rounded-md p-4">
        <h3 className="font-medium text-gray-700 mb-3">Stats Allocation (must sum to 100%)</h3>
        
        {/* Stats Total Indicator */}
        <div className={`mb-2 text-sm ${statsTotal === 100 ? 'text-green-600' : 'text-red-600'}`}>
          Total: {statsTotal}%
          {statsTotal !== 100 && <span> (must be 100%)</span>}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <InputField
            label="Melee"
            name="stats.melee"
            register={register}
            errors={errors}
            type="number"
            min={0}
            max={100}
            placeholder="%"
          />
          
          <InputField
            label="Defense"
            name="stats.defense"
            register={register}
            errors={errors}
            type="number"
            min={0}
            max={100}
            placeholder="%"
          />
          
          <InputField
            label="Fruit"
            name="stats.fruit"
            register={register}
            errors={errors}
            type="number"
            min={0}
            max={100}
            placeholder="%"
          />
          
          <InputField
            label="Sword"
            name="stats.sword"
            register={register}
            errors={errors}
            type="number"
            min={0}
            max={100}
            placeholder="%"
          />
          
          <InputField
            label="Gun"
            name="stats.gun"
            register={register}
            errors={errors}
            type="number"
            min={0}
            max={100}
            placeholder="%"
          />
        </div>
        
        {(errors.stats as any)?.sum && (
          <p className="mt-1 text-sm text-red-600">
            {(errors.stats as any).sum.message}
          </p>
        )}
      </div>

      {/* Equipped Items */}
      <div className="border rounded-md p-4">
        <h3 className="font-medium text-gray-700 mb-3">Equipped Items</h3>
        
        <SelectField
          label="Fruit"
          name="equipped.fruit"
          register={register}
          errors={errors}
          options={Array.from(fruits)}
          placeholder="Select a fruit"
        />
        
        <SelectField
          label="Sword"
          name="equipped.sword"
          register={register}
          errors={errors}
          options={Array.from(swords)}
          placeholder="Select a sword"
        />
        
        <MultiSelect
          label="Accessories"
          name="equipped.accessories"
          register={register}
          errors={errors}
          options={Array.from(accessories)}
          value={watch('equipped.accessories') || []}
          onChange={(value) => setValue('equipped.accessories', value, { shouldValidate: true })}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Build {buildNumber}
        </button>
        
        <button
          type="button"
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            // Pre-fill with sample data
            setValue('level', buildNumber === 1 ? 2000 : 1800);
            setValue('stats.melee', buildNumber === 1 ? 30 : 25);
            setValue('stats.defense', buildNumber === 1 ? 20 : 25);
            setValue('stats.fruit', buildNumber === 1 ? 25 : 30);
            setValue('stats.sword', buildNumber === 1 ? 20 : 15);
            setValue('stats.gun', buildNumber === 1 ? 5 : 5);
            setValue('equipped.fruit', buildNumber === 1 ? 'Dragon' : 'Phoenix');
            setValue('equipped.sword', buildNumber === 1 ? 'Yama' : 'Enma');
            setValue('equipped.accessories', buildNumber === 1 ? ['Hunter Cape', 'Swan Glasses'] : ['Leather Cap', 'Buster Call']);
          }}
        >
          Load Sample Build {buildNumber}
        </button>
      </div>
    </form>
  );
}
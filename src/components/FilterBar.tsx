import type { ChangeEvent } from 'react';

interface FilterBarProps {
  filters: { search: string; category: string };
  onChange: (next: Partial<FilterBarProps['filters']>) => void;
}

const categories = ['All', 'Product', 'Finance', 'Marketing', 'Developer', 'Wellness'];

export const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ [event.target.name]: event.target.value });
  };

  return (
    <div className="glass-panel flex flex-wrap gap-3 p-4">
      <input
        type="search"
        placeholder="Search by title, city, or organizer"
        className="flex-1 rounded-2xl border border-transparent bg-mist px-4 py-2 focus:border-primary focus:outline-none"
        name="search"
        value={filters.search}
        onChange={handleInput}
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleInput}
        className="rounded-2xl border border-transparent bg-mist px-4 py-2 text-sm focus:border-primary focus:outline-none"
      >
        {categories.map((category) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};


import React, { useState } from 'react';
import useDebounce from 'hooks/useDebounce';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  debounceTime?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  debounceTime = 500,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearch = useDebounce(onSearch, debounceTime);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  
  return (
    <div className="form-control w-full max-w-xs">
      <label className="input input-bordered flex items-center gap-2">
        <input
          className="grow input-ghost border-none w-full"
          onChange={handleChange}
          type="text"
          placeholder="Search"
          value={searchTerm}
          {...props} 
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
      </label>
    </div>
  );
};

export default SearchInput;
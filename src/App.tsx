import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Map from './components/Map';
import { fetchLocation } from './queries/fetchLocation';

function App() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: places = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['places', searchTerm],
    queryFn: () => fetchLocation(searchTerm),
    enabled: Boolean(searchTerm),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <div className='p-4 space-y-4'>
      <form onSubmit={handleSubmit} className='flex gap-2'>
        <input
          type='text'
          value={query}
          placeholder='Recherche un lieu'
          onChange={(e) => setQuery(e.target.value)}
          className='border rounded p-2 w-full'
        />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Search
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error when loading data</div>}
      {places.length > 0 && <Map places={places} />}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import SearchParams from './SearchParams';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Details from './Details';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AdoptPetContext from './AdoptPetContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cachesTime: Infinity,
    },
  },
});

const App = () => {
  const adoptPet = useState(null);
  return (
    <BrowserRouter>
      <AdoptPetContext.Provider value={adoptPet}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AdoptPetContext.Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

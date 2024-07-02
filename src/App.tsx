import { Outlet } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollToTop } from './utils/scrollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;

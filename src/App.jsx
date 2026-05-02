import { useEffect } from 'react';
import { Toaster } from 'sonner';

import PageHeader from './PageHeader';
import Legend from './Legend';
import Grid from './Grid';
import { actions } from './store';

export default function App() {
  useEffect(() => {
    actions.loadFromLocalStorage();
  }, []);

  return (
    <div className="min-h-screen p-6 print:p-0 print:min-h-auto">
      <Toaster
        position="bottom-center"
        visibleToasts={1}
        toastOptions={{
          className: 'font-inter',
        }}
      />
      <PageHeader />
      <Legend />
      <Grid />
    </div>
  );
}

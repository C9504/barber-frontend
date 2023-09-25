import StatusProvider from './contexts/status-context';
import LayoutRoutes from './routes/layout-routes';

function App() {

  return (
    <>
      <StatusProvider>
        <LayoutRoutes />
      </StatusProvider>
    </>
  );
}

export default App;

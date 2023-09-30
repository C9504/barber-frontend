import { ReactKeycloakProvider } from '@react-keycloak/web';
import StatusProvider from './contexts/status-context';
import LayoutRoutes from './routes/layout-routes';
import IdentityProvider from './services/identity-provider';

function App() {

  return (
    <>
      <ReactKeycloakProvider authClient={IdentityProvider}>
        <StatusProvider>
          <LayoutRoutes />
        </StatusProvider>
      </ReactKeycloakProvider>
    </>
  );
  
}

export default App;

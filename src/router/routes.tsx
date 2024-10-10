import { Navigate, createBrowserRouter } from 'react-router-dom';
import PageError from '../pages/sv-error/page-error/PageError.tsx';
import RoutesApp from './RoutesApp.tsx';

// Se declaran las rutas y que componentes renderizan
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/app/main" replace />,
  },
  ...RoutesApp,
  {
    path: '*',
    element: <PageError />,
  }
]);


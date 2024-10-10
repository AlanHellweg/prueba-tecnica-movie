import ReactDOM from 'react-dom/client'
import '../public/css/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes.js'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster closeButton richColors />
    </QueryClientProvider>
  </Provider>
)

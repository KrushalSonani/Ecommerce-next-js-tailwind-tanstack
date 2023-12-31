/**
 * This is layout page 
 */

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './(common)/Header';
import Footer from './(common)/Footer';
const queryClient = new QueryClient();


export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
} 

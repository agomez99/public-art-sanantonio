import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AnimatePresence } from "framer-motion";
import Nav from './components/Navbar'
 
function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode='wait'>
    <Nav />
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}
 
export default MyApp;
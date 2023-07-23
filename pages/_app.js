import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AnimatePresence } from "framer-motion";
 
function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode='wait'>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}
 
export default MyApp;
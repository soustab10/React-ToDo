import "../styles/globals.css";
import { AuthProvider } from "../context/auth";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-600 smooth-transition disable-select font-lato min-h-screen pb-10">
      <AuthProvider>
        <Nav />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;

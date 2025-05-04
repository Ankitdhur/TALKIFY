import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, DB } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Create the context for authentication
const AuthContext = createContext();

// Provider to wrap around components that need authentication access
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);  // Stores authenticated user's data
  const [loading, setLoading] = useState(true);    // Indicates whether auth state is being resolved

  useEffect(() => {
    // Listener that watches for changes in the user's login state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get user document from Firestore
        const docRef = doc(DB, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Update the 'lastseen' timestamp in Firestore
          const timeStamp = new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          await updateDoc(doc(DB, "users", currentUser?.uid), {
            lastseen: timeStamp
          });

          // Extract user info and store it in state
          const { photoURL, name, email, lastseen } = docSnap.data();
          setUserData({ 
            id: currentUser.uid, 
            photoURL, 
            name, 
            email, 
            lastseen 
          });
        }
      }

      // Mark loading as complete after auth check
      setLoading(false);
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

import {db} from "../config/firebase.js";
import {useState, useEffect} from "react";
import {collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

export function Main_Page() {
  const [perfumeList, setPerfumeList] = useState([]);

  const perfumeCollectionRef = collection(db, `Perfume images`);

  useEffect(() => {
    const getPerfumeList = async () => {
      try {
        const data = await getDocs(perfumeCollectionRef);

        const perfumeData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPerfumeList(perfumeData);
      } catch (err) {
        console.error("Firestore fetch error:", err);
      }
    };

    getPerfumeList();
  }, []);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="body">
      <header className="header">
        {!user ? (
          <button className="btn-23" onClick={handleLoginClick}>
            Login
          </button>
        ) : (
          <>
            <p>Welcome, {user.displayName || "Admin"}</p>
            <button className="btn-23" onClick={() => navigate("/Admin")}>
              Go to Admin Page
            </button>
            <button className="btn-23" onClick={() => signOut(getAuth())}>
              Logout
            </button>
          </>
        )}
      </header>

      <p>Atir perfume catalogue</p>
      <div
        className="perfume-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {perfumeList.map(perfume => (
          <div key={perfume.id} className="perfume-item">
            <h3>{perfume.name}</h3>
            <img
              src={perfume.imageURL}
              alt={perfume.name}
              className="perfume-image"
            />
            <p>{perfume.price}$ </p>
            <a
              href={`https://wa.me/87771830883?text=Hello,%20I%20want%20to%20buy%20this%20perfume%20called%20${perfume.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-order">Order</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

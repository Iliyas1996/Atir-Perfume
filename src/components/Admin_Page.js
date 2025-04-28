import {useState} from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import {db, storage} from "../config/firebase";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export function Admin_Page() {
  const [imageUpload, setImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();
  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  const uploadImage = async () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, `${formData.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await setDoc(doc(db, "Perfume images", generateRandomString(20)), {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageURL: downloadURL,
      });

      alert("Image and data uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Please sign in to upload");
    return;
  }

  return (
    <div className="body">
      <p>Please write the name, decription and price of a new perfume here: </p>
      <input
        name="name"
        type="text"
        value={formData.name}
        placeholder="Name..."
        onChange={handleChange}
        className="input"
      />
      <input
        name="description"
        type="text"
        value={formData.description}
        placeholder="Description..."
        onChange={handleChange}
        className="input"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        placeholder="Price..."
        onChange={handleChange}
        className="input"
      />
      <input
        type="file"
        name="file"
        className="btn-23"
        onChange={event => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button
        className="btn-23"
        disabled={
          !formData.name ||
          !formData.description ||
          !formData.price ||
          !imageUpload
        }
        onClick={uploadImage}
      >
        Upload image
      </button>
      <div>
        <button className="btn-23" onClick={() => navigate("/auth")}>
          Logout
        </button>
        <button className="btn-23" onClick={() => navigate("/")}>
          Home Page
        </button>
      </div>
    </div>
  );
}

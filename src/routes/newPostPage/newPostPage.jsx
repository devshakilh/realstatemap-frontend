import { useContext, useEffect, useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import {  useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





function NewPostPage() {
 
  const {  currentUser } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ lat: 23.8103, lng: 90.4125 }); // Default: Dhaka, Bangladesh
  const [city, setCity] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    address: "",
  });
  const navigate = useNavigate()







  // Fetch city name using reverse geocoding
  const fetchCityFromCoordinates = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();

      if (data && data.address && data.address.city) {
        setCity(data.address.city); // Update the city name
      } else {
        setCity("Unknown Location");
      }
    } catch (err) {
      console.error("Error fetching city from coordinates:", err);
    }
  };

  // Handle city input change and fetch coordinates
  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${selectedCity}&format=json&limit=1`
      );
      const data = await res.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) }); // Update the location
      } else {
        console.log("City not found");
      }
    } catch (err) {
      console.error("Error fetching city coordinates:", err);
    }
  };

  // LocationSelector component to handle map click events
  const LocationSelector = () => {
    const map = useMap(); // Access the map instance

    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng }); // Update location based on map click
        await fetchCityFromCoordinates(lat, lng); // Fetch and set city name
      },
    });

    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lng], 13); // Recenter the map when location changes
      }
    }, [location, map]);

    return <Marker position={location} />;
  };








  const handleValidation = (inputs) => {
    const errors = {};
    if (!inputs.title) errors.title = "Title is required";
    if (!inputs.price) errors.price = "Price is required";
    if (!inputs.address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);


    const errors = handleValidation(inputs);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      toast.success("Post created successfully!");
      navigate("/"+res.data.id)
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to create the post.";
    setError(errorMessage);

    // Error toast
    toast.error(errorMessage);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setValidationErrors((prev) => ({ ...prev, [name]: "" })); // Remove validation error
    }
  };


  // const LocationSelector = () => {
  //   useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng;
  //       setLocation({ lat, lng });
  //       fetchCityName(lat, lng); // Fetch city name when location changes
  //     },
  //   });
  //   return <Marker position={location} />;
  // };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
               id="title" name="title" type="text"   value={inputs.title}
               onChange={handleChange}
               style={{ borderColor: validationErrors.title ? "red" : "" }}
              />
               {validationErrors.title && <p className="error">{validationErrors.title}</p>}
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
               id="price" name="price" type="number"   value={inputs.price}
               onChange={handleChange}
               style={{ borderColor: validationErrors.price ? "red" : "" }}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            {/* <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text"  value={city}
               
              
              />
            </div> */}


<div className="item">
            <label htmlFor="city">Search City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={handleCityChange} // Handle city input change
              placeholder="Enter city name"
            />
          </div>


            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            {/* <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div> */}

<div className="maps">
              <label>Location</label>
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationSelector />
              </MapContainer>

            
            <div className="maps-selected-data">
                <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" value= {location.lat} />
                 </div>

              <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" value= {location.lng} />
            </div>
              {/* <p className="selected-location">
                Selected Location: Latitude: {location.lat}, Longitude:{" "}
                {location.lng}
              </p> */}
            </div>


            </div>

            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School-distance</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus-distance</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant-distance</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;


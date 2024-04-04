"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [currentServicePrice, setCurrentServicePrice] = useState();

  const [services, setServices] = useState([]);
  const [salontype, setSalontype] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([]);

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !address || !city || !services || !salontype || !openingTime || !closingTime || !detail || !images) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, email, password, address, password, city, services, salontype, openingTime, closingTime, detail, images
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const handleAddService = () => {
    // setServices([...services,{currentService:currentServicePrice}])
    if (currentService.trim().length == 0 || !currentServicePrice) {
      return;
    }
    setServices((prev) => ([...prev, { [currentService]: currentServicePrice }]))
    setCurrentService("");
    setCurrentServicePrice("");
    // console.log(services);
  }

  return (
    <div className=" grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <textarea
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Address"
          />

          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="City"
          />


          <h3 className="font-bold">Services</h3>

          <div>
            {
              services.length > 0 && services.map((service) => (
                Object.entries(service).map(([key, value]) => (
                  <div className="p-3 rounded bg-gray-300">{key} - {value}</div>
                ))
              ))
            }
          </div>

          <div className="max-w-60">
            <button className={`p-1.5 rounded bg-red-400  hover:bg-red-500 ${services.length==0 ? "hidden" : "block"}`} onClick={()=>setServices([])}>
              Reset Services
            </button>
          </div>


          {/* <div className="flex"> */}
            <input type="text" placeholder="Service" value={currentService} onChange={(e) => { setCurrentService(e.target.value) }} />
            <input type="number" placeholder="Price" min="0" value={currentServicePrice} onChange={(e) => { setCurrentServicePrice(e.target.value) }} />
            <button  className="p-2 bg-green-500 hover:bg-green-600 text-white font-bold max-w-48 rounded" onClick={handleAddService}>Add Service</button>
          {/* </div> */}


          <label for="salontype">Salon Type:</label>
          <select name="salontype" id="salontype" onChange={(e) => setSalontype(e.target.value)}>
            <option value="salon">Salon</option>
            <option value="individual">Individual</option>
          </select>

          <input
            onChange={(e) => setOpeningTime(e.target.value)}
            type="time"
            placeholder="Opening Time (24 hr format)"
          />
          <input 
            onChange={(e) => setClosingTime(e.target.value)}
            type="time"
            placeholder="Closing time (24 hr format)"
          />

          <textarea
            onChange={(e) => setDetail(e.target.value)}
            type="text"
            placeholder="Description"
            style={{ "height": "100px" }}
          />


          <input
            onChange={(e) => setImages(e.target.value)}
            type="file"
            placeholder="Images"
            accept=".png,.jpg"
            multiple
            />


          <button className="bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

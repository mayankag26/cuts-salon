"use client"

import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
// import { ToastContainer, toast } from 'react-toastify';

const UserInfo = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [currentService, setCurrentService] = useState("");
  const [currentServicePrice, setCurrentServicePrice] = useState();

  const [services, setServices] = useState(user.services);
  const [salontype, setSalontype] = useState(user.salontype);
  const [openingTime, setOpeningTime] = useState(user.openingTime);
  const [closingTime, setClosingTime] = useState(user.closingTime);
  const [detail, setDetail] = useState(user.detail);
  const [images, setImages] = useState("");
  const [imagesUrl, setImagesUrl] = useState(user.imagesUrl);
  const [genderServing, setGenderServing] = useState(user.genderServing);

  const router = useRouter();


  // const handleSubmit = async (e) => {
  //   try {
  //     const res = await fetch("api/users/editUser", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         contactNo,
  //         address
  //       }),
  //     });

  //     if (res.ok) {
  //       toast.success("Changes saved successfully", {
  //         autoClose: 1000,
  //         position: "top-right",
  //       })
  //       router.push("/");
  //       // alert("Changes saved successfully")
  //     } else {
  //       console.log("User registration failed.");
  //     }
  //   } catch (error) {
  //     console.log("Error during registration: ", error);
  //   }
  // };

  const handleAddService = (e) => {
    if (currentService.trim().length == 0 || !currentServicePrice) {
      return;
    }
    e.preventDefault();
    setServices((prev) => ([...prev, { [currentService]: currentServicePrice }]))
    setCurrentService("");
    setCurrentServicePrice("");
  }


  return (
    <div className="mx-auto my-4 max-w-2xl md:my-6">
      <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
        <p className="text-xl font-bold text-gray-900">Personal Info</p>
        <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-1 md:space-y-0">


          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                disabled
              ></input>
            </label>
          </div>

          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email address
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                disabled
              ></input>
            </label>
          </div>


          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Addeess
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                id="address"
              ></input>
            </label>
          </div>


          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              City
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                id="city"
              ></input>
            </label>
          </div>


          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Gender Serving
              <select
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setGenderServing(e.target.value)}
                value={genderServing}
                id="genderServing">
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>

            </label>
          </div>


          <div>

            <h3 className="font-bold w-full mb-5">Services</h3>
            <div>
              {
                services.length > 0 && services.map((service) => (
                  Object.entries(service).map(([key, value]) => (
                    <div className="p-3 rounded bg-gray-300">{key} - {value}</div>
                  ))
                ))
              }
            </div>
            <div className="w-full">
              <button className={`mt-5 mb-5 p-1.5 rounded bg-red-400  hover:bg-red-500 ${services.length == 0 ? "hidden" : "block"}`} onClick={() => setServices([])}>
                Reset Services
              </button>
            </div>
            <div>

              <input type="text" placeholder="Service" value={currentService} onChange={(e) => { setCurrentService(e.target.value) }} />
              <input type="number" placeholder="Price" min="0" value={currentServicePrice} onChange={(e) => { setCurrentServicePrice(e.target.value) }} />
              <button className="p-2 bg-green-500 hover:bg-green-600 text-white font-bold max-w-48 rounded" onClick={handleAddService}>Add Service</button>
            </div>

          </div>





          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Salon Type
              <select
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setSalontype(e.target.value)}
                value={salontype}
                id="salontype">
                <option value="Salon">Salon</option>
                <option value="Individual">Individual</option>
              </select>

            </label>
          </div>



          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Opening Time
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="time"
                onChange={(e) => setOpeningTime(e.target.value)}
                value={openingTime}
                id="openingTime"
              ></input>
            </label>
          </div>

          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Closing Time
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="time"
                onChange={(e) => setClosingTime(e.target.value)}
                value={closingTime}
                id="closingTime"
              ></input>
            </label>
          </div>


          <div className="w-full col-span-2">
            <label
              className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Detail
              <textarea
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
                id="detail"
              ></textarea>
            </label>
          </div>





          <div className="col-span-2 grid">
            <button
              type="button"
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={(e) => handleSubmit(e)}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </button>



    </div>



  )
}

export default UserInfo
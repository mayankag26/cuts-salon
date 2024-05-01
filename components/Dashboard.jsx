"use client"

import React from 'react'
import { Trash, Heart } from 'lucide-react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';



export default function Dashboard({ bookings }) {
    // const arr = [...bookings];
    // console.log("fjifbindin ",arr[0]._doc.user);
    // let bookingssorted = bookings.sort((a,b)=>{
    //     return a.queueNo-b.queueNo;
    // })
    const [showActive, setShowActive] = useState(true);
    const [bookingsn, setBookingsn] = useState([...bookings]);
    // console.log({ bookingsn });

    const handleDone = async (clickedBooking) => {
        // console.log("Cliekddd ", clickedBooking);
        const updatedBookings = bookingsn.map(booking => {
            if (booking === clickedBooking) {
                return { ...booking, status: true };
            }
            return booking;
        });
        setBookingsn(updatedBookings);

        try {
            const res = await fetch("api/editStatus", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    clickedBooking
                }),
            });

            if (res.ok) {
                // console.log("Doneee");
                toast.success("Successfullt marked as done", {
                    autoClose: 1000,
                    position: "top-right",
                })
                // router.push("/");
                // alert("Changes saved successfully")
            } else {
                console.log("Mark as done failed.");
            }
        } catch (error) {
            console.log("Error during updating status: ", error);
        }
    }
    // console.log({ bookingsn, showActive })
    return (
        <div className=" mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
            <div>
            <Link className="text-xl mt-3 text-right" href={"/profile"}>
            <span className="underline">Profile</span>
          </Link>
            </div>
            <div className=' flex services flex-row  pt-11 md:flex-row '>
                <div className='barbershop flex space-x-2 mr-6 bg-slate-100 p-4 hover:bg-slate-200' onClick={() => setShowActive(true)}  >
                    <div><button className='text-sm '>Active bookings</button></div></div>
                <div className='barberhome flex space-x-2  bg-slate-100  p-4  hover:bg-slate-200 ' onClick={() => setShowActive(false)}>
                    <div><button className=' text-sm '>Past bookings</button></div></div>
            </div>

            <h2 className="text-3xl font-bold">Your dashboard</h2>
            {/* <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
        praesentium incidunt.
      </p> */}
            <ul className="flex flex-col divide-y divide-gray-200">
                {bookingsn.length > 0 && bookingsn.map((booking) => (
                    !booking.status == showActive ?
                        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                            <div className="flex w-full space-x-2 sm:space-x-4">
                                <div className="flex w-full flex-col justify-between pb-4">
                                    <div className="flex w-full justify-between space-x-2 pb-2">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{booking.user.name}</h3>
                                            <p className="text-sm">{booking.user.email}</p>
                                            <p className="text-sm">{booking.user.contactNo}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">Queue No : {booking.queueNo}</p>
                                        </div>
                                    </div>
                                    {showActive &&
                                        <div className="flex divide-x text-sm">
                                            <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0" onClick={() => handleDone(booking)}>
                                                <Trash size={16} />
                                                <span>Mark as done</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </li> :
                        <></>
                ))}
            </ul>
            <div className="space-y-1 text-right">
                <p>
                    Total amount:
                    <span className="font-semibold"> ₹48,967</span>
                </p>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Back to shop
                </button>
                <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Checkout
                </button>
            </div>
        </div>

    )
}

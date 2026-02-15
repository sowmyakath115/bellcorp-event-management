import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  

  const fetchEvent = useCallback(async () => {
  const { data } = await API.get(`/api/events/${id}`);
  setEvent(data);
}, [id]);
    
useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);


  const handleRegister = async () => {
  try {
    await API.post(`/api/events/${id}/register`);
    fetchEvent();
    alert("Registered successfully!");
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};


  if (!event) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          {event.name}
        </h1>

        <p className="text-gray-600 mb-2">
          Organizer: {event.organizer}
        </p>

        <p className="text-gray-600 mb-2">
          Location: {event.location}
        </p>

        <p className="text-gray-600 mb-2">
          Date: {new Date(event.date).toLocaleString()}
        </p>

        <p className="mb-4">
          {event.description}
        </p>

        <p className="mb-4">
          Seats Available: {event.availableSeats}
        </p>

        <button
  onClick={handleRegister}
  disabled={event.availableSeats <= 0}
  className={`px-6 py-3 rounded-lg text-white transition ${
    event.availableSeats <= 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {event.availableSeats <= 0 ? "Sold Out" : "Register"}
</button>

      </div>
    </div>
  );
}

export default EventDetails;

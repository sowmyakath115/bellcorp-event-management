import { useEffect, useState , useCallback, useContext} from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";



function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const { name } = useContext(AuthContext);

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const navigate = useNavigate();

 const fetchEvents = useCallback(async () => {
  const { data } = await API.get(
    `/api/events?search=${search}&location=${location}&category=${category}&page=${page}&limit=${limit}`
  );
  setEvents(data);
}, [search, location, category, page, limit]);


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]
  );


  const handleRegister = async (id) => {
    try {
      await API.post(`/api/events/${id}/register`);
      fetchEvents();
      alert("Registered successfully!");
    } catch (err) {
  alert(err.response?.data?.message || "Something went wrong");


    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
  {name ? `Welcome, ${name} ` : "Explore Events"}
</h1>


      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/3"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
        </select>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            onClick={() => navigate(`/events/${event._id}`)}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col justify-between border border-gray-100"
          >
            <h2 className="text-xl font-semibold">
              {event.name}
            </h2>

            <p className="text-sm text-gray-400 mb-2">
              {new Date(event.date).toLocaleDateString()}
            </p>

            <p className="text-gray-600">{event.location}</p>

            <p className="text-sm text-gray-500 mb-4">
              Seats: {event.availableSeats}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRegister(event._id);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 PAGINATION MUST BE INSIDE RETURN */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
          px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 transition"
        >
          Previous
        </button>

        <span className="font-medium text-gray-700">
          Page {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className=""
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Events;

import { useEffect, useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/api/users/dashboard");
      setUpcoming(data.upcoming);
      setPast(data.past);
    } catch {
      alert("Login required");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        My Dashboard
      </h1>

      {/* Upcoming */}
      <h2 className="text-xl font-semibold mb-4">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {upcoming.length === 0 && <p>No upcoming events</p>}
        {upcoming.map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <button
  onClick={async () => {
    await API.post(`/api/events/${event._id}/cancel`);
    window.location.reload();
  }}
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  Cancel Registration
</button>

            <h3 className="font-semibold">{event.name}</h3>
            <p>{event.location}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Past */}
      <h2 className="text-xl font-semibold mb-4">
        Past Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {past.length === 0 && <p>No past events</p>}
        {past.map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h3 className="font-semibold">{event.name}</h3>
            <p>{event.location}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

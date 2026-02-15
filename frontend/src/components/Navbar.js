import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Bellcorp Events
      </Link>

      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          Events
        </Link>

        {token && (
          <Link to="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
        )}

        {!token ? (
  <>
    <Link
      to="/login"
      className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
    >
      Register
    </Link>
  </>
) : (

          <button
            onClick={handleLogout}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

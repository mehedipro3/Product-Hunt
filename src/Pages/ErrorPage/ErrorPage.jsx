import { useNavigate } from "react-router-dom";

const ErrorPage = ({ status = 404, message = "Page Not Found" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold">{status}</h1>
      <p className="text-2xl mt-4">{message}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;

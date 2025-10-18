import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const MyProfile = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    image: "",
  });

  // Fetch user info 
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserData(res.data);
          setUpdatedData({
            name: res.data.name,
            image: res.data.photo || "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  //updating user profile
  const handleUpdate = (e) => {
    e.preventDefault();
    axiosSecure
      .patch(`/users/${user.email}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Your profile has been updated.", "success");
          setUserData({ ...userData, ...updatedData });
          setEditMode(false);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update profile", "error");
      });
  };


  if (!userData) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        MY PROFILE
      </h2>

      {/* Profile Display / Edit */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={userData.photo || profilePlaceholder}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />

        {!editMode ? (
          <>
            <h3 className="text-2xl font-semibold">{userData.name}</h3>
            <p className="text-gray-600">{userData.email}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form
            onSubmit={handleUpdate}
            className="w-full max-w-sm mt-4 space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={updatedData.name}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={updatedData.photo}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, image: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

import { useState } from "react";
import Swal from "sweetalert2";
import contactImg from "../../assets/contact-us.jpg";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPublic.post("/contactUs", formData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We received your message and will get back to you shortly.",
          confirmButtonColor: "#2563eb",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again!",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "We couldn’t send your message. Try again later.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Side - Image */}
          <div className="hidden lg:flex justify-center">
            <img
              src={contactImg}
              alt="Contact illustration"
              className="animate-bounce-slow rounded-xl shadow-lg"
            />
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Get in <span className="text-blue-600">Touch</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Have a question or feedback? Fill out the form below, and our team
              will get back to you shortly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

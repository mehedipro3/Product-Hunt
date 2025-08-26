import { Link } from "react-router-dom";
import img from "../../../assets/technology.jpg";
import { IoArrowBackCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(watch("email"));
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="hero-overlay bg-black/70"></div>

      <Link
        to={"/"}
        className="absolute top-5 left-14 text-white text-4xl hover:text-blue-600 transition"
      >
        <IoArrowBackCircle />
      </Link>

      <div className="hero-content flex-col lg:flex-row-reverse text-neutral-content">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 text-base-content p-10 rounded-2xl">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="label text-sm font-semibold">Full Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>

            <div>
              <label className="label text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>

            <div>
              <label className="label text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            <div>
              <label className="label text-sm font-semibold">Photo URL</label>
              <input
                type="text"
                placeholder="https://example.com/your-photo.jpg"
                {...register("photo", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.photo && (
                <span className="text-red-500">Photo URL is required</span>
              )}
              <p className="text-xs mt-1 text-gray-500">
                You can paste an image link (e.g., from{" "}
                <a
                  href="https://imgbb.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary"
                >
                  ImgBB
                </a>
                ).
              </p>
            </div>

         
            <button className="btn bg-blue-600 text-white w-full mt-2">
              Register
            </button>


            <div className="text-center mt-3 text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="link link-hover font-medium">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

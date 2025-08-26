import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/technology.jpg";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { SignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
   // console.log(data.email);
    SignIn(data.email, data.password)
      .then(result => {
        Swal.fire({
          title: "User LogIn Successfully",
          icon: "success",
          draggable: true
        });
        console.log(result.user);
        navigate('/');
      });
      
  };

  return (
    <div
      className="hero min-h-screen relative"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="hero-overlay bg-black/70"></div>

      <Link
        to="/"
        className="absolute top-5 left-4 text-white text-4xl hover:text-blue-600
        transition"
      >
        <IoArrowBackCircle />
      </Link>

      <div className="hero-content text-neutral-content">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 text-base-content p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label text-sm font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <a className="link link-hover">Forgot password?</a>
              <Link to={'/singUp'} className="link link-hover font-medium">
                Create account
              </Link>
            </div>

            <button className="btn bg-blue-600 text-white w-full mt-2">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full flex items-center gap-2 border border-gray-300 bg-white text-black hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

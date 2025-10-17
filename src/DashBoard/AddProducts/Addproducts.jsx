import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const img_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddProduct = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload main image to ImgBB
      // 1️⃣ Create FormData for ImgBB
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // 2️⃣ Upload to ImgBB
      const imgRes = await axiosPublic.post(img_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (!imgRes.data.success) {
        Swal.fire("Error", "Image upload failed", "error");
        return;
      }

      // 2️⃣ Format gallery images
      const galleryUrls = data.gallery
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== "");

      // 3️⃣ Format tags
      const tagsArray = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      // 4️⃣ Construct product object based on your JSON structure
      const newProduct = {
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        image: imgRes.data.data.display_url,
        gallery: galleryUrls,
        tags: tagsArray,
        category: data.category,
        votes: 0,
        owner: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown",
          profileImage:
            user?.photoURL || "https://i.ibb.co/3Y7cN7t/charlie-profile.jpg",
        },
        website: data.website,
        github: data.github,
        pricing: {
          freePlan: data.freePlan === "yes",
          premiumPlan: {
            price: parseFloat(data.premiumPrice) || 0,
            currency: data.currency || "USD",
            features: data.features
              .split(",")
              .map((f) => f.trim())
              .filter((f) => f !== ""),
          },
        },
        status: "pending",
        timestamp: new Date().toISOString(),
        views: 0,
        featured: false,
        reviews: [],
        votedUsers: [],
      };

      // 5️⃣ Save to DB
      const res = await axiosPublic.post("/products", newProduct);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      } else {
        Swal.fire("Error", "Failed to save product", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full"
        />

        {/* Tagline */}
        <input
          {...register("tagline", { required: true })}
          type="text"
          placeholder="Short Tagline"
          className="input input-bordered w-full"
        />

        {/* Description */}
        <textarea
          {...register("description", { required: true })}
          placeholder="Product Description"
          className="textarea textarea-bordered w-full h-24"
        ></textarea>

        {/* Category */}
        <select
          {...register("category", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option>Health & Fitness</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Technology</option>
          <option>Finance</option>
        </select>

        {/* Gallery URLs */}
        <input
          {...register("gallery")}
          type="text"
          placeholder="Gallery image URLs (comma-separated)"
          className="input input-bordered w-full"
        />

        {/* Tags */}
        <input
          {...register("tags")}
          type="text"
          placeholder="Tags (comma-separated)"
          className="input input-bordered w-full"
        />

        {/* Website & GitHub */}
        <input
          {...register("website")}
          type="url"
          placeholder="Website URL"
          className="input input-bordered w-full"
        />
        <input
          {...register("github")}
          type="url"
          placeholder="GitHub URL"
          className="input input-bordered w-full"
        />

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Free Plan Available?</label>
            <select
              {...register("freePlan")}
              className="select select-bordered w-full"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="label">Premium Price</label>
            <input
              {...register("premiumPrice")}
              type="number"
              placeholder="e.g. 9.99"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <input
          {...register("currency")}
          type="text"
          placeholder="Currency (e.g. USD)"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("features")}
          placeholder="Premium Features (comma-separated)"
          className="textarea textarea-bordered w-full h-20"
        ></textarea>

        {/* Main Image Upload */}
        <div>
          <label className="label">Main Image *</label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button className="btn bg-blue-600 text-white w-full mt-4">
          <FaPlus className="mr-2" /> Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

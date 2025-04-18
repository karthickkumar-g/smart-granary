import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingBar from "../utils/LoadingBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const schema = z
  .object({
    email: z.string().min(1, "Enter email.").email("Invalid email format."),
    pass: z
      .string()
      .min(1, "Enter password.")
      .min(4, "Password must be at least 4 characters long."),
    confirmPass: z.string().min(1, "Please confirm your password."),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
    firstName: z
      .string()
      .min(1, "Enter first name.")
      .min(3, "First name must be at least 3 characters long."),
    lastName: z.string().optional(),
    device: z.string().min(1, "Enter device id."),
  })
  .refine((data) => data.pass === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

const Register = () => {
  const [otpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [header, setHeader] = useState("Register"); // State for header text
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      pass: "",
      confirmPass: "",
      device: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios
        .post("/api/register", data)
        .then((res) => console.log("Sent to backend:", res));
      console.log(data);
      setHeader("Registration Successful!");
      setIsAuthenticated(true); // Change header text on successful registration
      navigate("/");
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
      const message =
        error.response?.data?.message || "This email is already taken";
      setError("root", { message });
    }
  };

  return (
    <section className="flex justify-center items-center p-20 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{header}</h2>{" "}
        {/* Display dynamic header */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {!otpSent && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-left font-semibold mb-2"
                >
                  First Name{" "}
                  {errors.firstName && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <div className="text-red-500">{errors.firstName.message}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-left font-semibold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-left font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-left font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumber && (
                  <div className="text-red-500">
                    {errors.phoneNumber.message}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-left font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("pass")}
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.pass && (
                  <div className="text-red-500">{errors.pass.message}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-left font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPass")}
                  placeholder="Confirm your password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPass && (
                  <div className="text-red-500">
                    {errors.confirmPass.message}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="device"
                  className="block text-left font-semibold mb-2"
                >
                  Select Device
                </label>

                <input
                  type="text"
                  {...register("device")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="device"
                  id="device"
                />

                {errors.device && (
                  <div className="text-red-500">Enter device id.</div>
                )}
              </div>
            </>
          )}
          {otpSent && (
            <div>
              <label
                htmlFor="otp"
                className="block text-left font-semibold mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-btn-bg text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isSubmitting ? (
              <LoadingBar size="w-6 h-6" color="border-white-500" />
            ) : otpSent ? (
              "Verify OTP"
            ) : (
              "Register"
            )}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Register;

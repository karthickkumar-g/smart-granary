import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = ({ onClose }) => {
  const { setDeviceId } = useAuth();

  const info = {
    profileImg: "",
    name: "Granary Monitoring",
    email: "granarymonitoring@gmail.com",
    device: "Device 1 : 2919189",
  };

  useEffect(() => {
    const deviceId = info.device.split(":")[1].trim();
    setDeviceId(deviceId);
  }, [info.device, setDeviceId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-60" onClick={onClose}></div>

      <div className="relative z-10 bg-white flex flex-col justify-center rounded-lg shadow-lg p-6 h-80 w-80">
        <div className="profile-container flex flex-col justify-center items-center space-y-4">
          <button
            className="absolute top-3 right-3 font-extrabold text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>

          <div className="profile-img w-20 h-20 rounded-full overflow-hidden">
            <img
              src={info.profileImg}
              alt="ProfileImg"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="profile-name text-gray-600 text-xl font-semibold">
            <span>{info.name}</span>
          </div>

          <div className="profile-email text-sm text-gray-600">
            <span>{info.email}</span>
          </div>

          <div className="device-info text-sm text-gray-600">
            <span>{info.device}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

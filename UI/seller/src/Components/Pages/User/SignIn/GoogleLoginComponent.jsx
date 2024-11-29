import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your backend
      const response = await axios.post(
        `${API_URL}/api/v1/seller/auth/google`,
        {
          credential: credentialResponse.credential,
        }
      );

      if (response) {
        const sellerId = response.data.user.id;
        const sellerName = response.data.user.name;
        const sellerEmail = response.data.user.email;
        const googleId = response.data.user.googleId;
        const sellerPhoto = response.data.user.photo;
        localStorage.setItem("sellerId", sellerId);
        localStorage.setItem("sellerEmail", sellerEmail);
        localStorage.setItem("sellerName", sellerName);
        localStorage.setItem("googleId", googleId);
        localStorage.setItem("sellerPhoto", sellerPhoto);
        navigate("/");
      }
      // Now handle the logged-in state, like saving tokens or redirecting
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => {
        console.error("Login Failed");
      }}
      size="large"
      width={1000}
    />
  );
};

export default GoogleLoginComponent;

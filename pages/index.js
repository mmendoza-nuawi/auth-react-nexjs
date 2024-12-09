import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";

export default function Home() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    console.log("after to login...");

    if (typeof window !== "undefined") {
      console.log("Redirecting to login...");
      loginWithRedirect();
    } else {
      console.error("Login must be called on the client side");
    }
  };
  

  const handleLogout = () => {
    console.log("Redirecting to:", "http://localhost:3000/sigt-callback");
    logout({ returnTo: "http://localhost:3000/signin-callback" });
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Prueba Autenticación OIDC</h1>
        <p>Acceder a login, o logout:</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {!isAuthenticated ? (
            <button style={buttonStyle} onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button style={buttonStyle} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
        <p
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#ccc",
            display: "inline-block",
          }}
        >
          oidc-client app is running!
        </p>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "1px solid #000",
  borderRadius: "5px",
};

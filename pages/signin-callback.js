import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function SigninCallback() {
  const { handleRedirectCallback, isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const processLogin = async () => {
      try {
        // Procesa el callback de Auth0
        await handleRedirectCallback();

        // Obtén los claims del token
        const tokenClaims = await getIdTokenClaims();
        setClaims(tokenClaims);
      } catch (error) {
        console.error("Error processing login:", error);
      }
    };

    processLogin();
  }, [handleRedirectCallback, getIdTokenClaims]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Prueba Autenticación OIDC</h1>
      {!isAuthenticated ? (
        <p>Procesando inicio de sesión...</p>
      ) : (
        <>
          <h2>¡Bienvenido, {user?.nickname || "Usuario"}!</h2>
          <p>
            <strong>Valor de los Claims:</strong>
          </p>
          <pre
            style={{
              textAlign: "left",
              margin: "0 auto",
              padding: "10px",
              background: "#f4f4f4",
              border: "1px solid #ddd",
              width: "80%",
              borderRadius: "5px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(claims, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

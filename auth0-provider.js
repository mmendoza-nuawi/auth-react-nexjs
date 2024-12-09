import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Auth0ProviderWithHistory = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false); // Estado para verificar si estamos en el navegador
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true); // Se asegura de que solo se ejecute en el cliente
  }, []);
  console.log("brower",isBrowser)

  if (!isBrowser) {
    return null; // Evita renderizar el Auth0Provider en el servidor
  }

  return (
    <Auth0Provider
      domain="qaautenticaciondigital.and.gov.co" // Nombre del dominio de Auth0
      clientId="java-OIDCJDKQA" // ClientID actualizado
      authorizationParams={{
        redirect_uri:window.location.origin + "/inicio", // URL de redirección después del login
        post_logout_redirect_uri: "http://localhost:3000", // URL después del logout
        frontchannel_logout_uri: "http://localhost:3000/signout-callback", // Front Channel Logout URI
        scope: "openid profile email", // Permisos solicitados
        audience: "https://api.and.gov.co", // Audiencia objetivo (cambiar según tu API)
      }}
      onRedirectCallback={(appState) => {
        console.log("Redirect successful, returning to the appropriate page");
        router.push(appState?.returnTo || "/"); // Redirige al estado anterior o a la página inicial
      }}
    >
      {children}
    </Auth0Provider>
  );
};

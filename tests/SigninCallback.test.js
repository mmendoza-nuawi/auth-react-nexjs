
import { render, screen, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import SigninCallback from "../SigninCallback";

// Mock de Auth0
jest.mock("@auth0/auth0-react");

describe("SigninCallback Component", () => {
  let mockHandleRedirectCallback;
  let mockGetIdTokenClaims;

  beforeEach(() => {
    mockHandleRedirectCallback = jest.fn();
    mockGetIdTokenClaims = jest.fn();

    // Valores por defecto del mock
    useAuth0.mockReturnValue({
      handleRedirectCallback: mockHandleRedirectCallback,
      getIdTokenClaims: mockGetIdTokenClaims,
      isAuthenticated: false,
      user: null,
    });
  });

  test("renders loading state while not authenticated", () => {
    render(<SigninCallback />);

    // Verifica el mensaje de carga
    expect(screen.getByText("Procesando inicio de sesión...")).toBeInTheDocument();
  });

  test("renders user information when authenticated", async () => {
    // Simula que el usuario está autenticado
    const mockClaims = { sub: "123", email: "user@example.com" };

    mockHandleRedirectCallback.mockResolvedValue();
    mockGetIdTokenClaims.mockResolvedValue(mockClaims);

    useAuth0.mockReturnValue({
      handleRedirectCallback: mockHandleRedirectCallback,
      getIdTokenClaims: mockGetIdTokenClaims,
      isAuthenticated: true,
      user: { nickname: "TestUser" },
    });

    render(<SigninCallback />);

    // Espera que la información de usuario sea renderizada
    await waitFor(() => {
      expect(screen.getByText("¡Bienvenido, TestUser!")).toBeInTheDocument();
    });

    // Verifica que los claims se renderizan
    expect(screen.getByText("Valor de los Claims:")).toBeInTheDocument();
    expect(screen.getByText(JSON.stringify(mockClaims, null, 2))).toBeInTheDocument();
  });

  test("handles errors gracefully during login process", async () => {
    // Simula un error en el callback
    mockHandleRedirectCallback.mockRejectedValue(new Error("Login failed"));

    render(<SigninCallback />);

    // Asegúrate de que no se bloquea el componente
    await waitFor(() => {
      expect(screen.getByText("Procesando inicio de sesión...")).toBeInTheDocument();
    });

    // Verifica que el error se logueó
    expect(mockHandleRedirectCallback).toHaveBeenCalled();
  });
});

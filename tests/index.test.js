import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import Home from '../Home';

// Mock de Auth0
jest.mock('@auth0/auth0-react');

describe('Home Component', () => {
  let mockLoginWithRedirect;
  let mockLogout;

  beforeEach(() => {
    mockLoginWithRedirect = jest.fn();
    mockLogout = jest.fn();

    useAuth0.mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      isAuthenticated: false, // Inicialmente no autenticado
    });
  });

  test('renders the Home component', () => {
    render(<Home />);

    // Verifica que se muestra el título
    expect(screen.getByText('Prueba Autenticación OIDC')).toBeInTheDocument();

    // Verifica que el botón de login aparece
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('calls loginWithRedirect when Login button is clicked', () => {
    render(<Home />);

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });

  test('calls logout when Logout button is clicked', () => {
    // Simula que el usuario está autenticado
    useAuth0.mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      isAuthenticated: true,
    });

    render(<Home />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledWith({
      returnTo: 'http://localhost:3000/signin-callback',
    });
  });

  test('renders the Logout button when authenticated', () => {
    // Simula que el usuario está autenticado
    useAuth0.mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      isAuthenticated: true,
    });

    render(<Home />);

    // Verifica que el botón de logout aparece
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});

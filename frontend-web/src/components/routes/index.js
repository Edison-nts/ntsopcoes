import { HOMEDIR } from '../util/auth';
import Dashboard from '../pages/dashboard';
import UsuarioPerfil from '../pages/usuario/usuario-perfil';

const routes = [
  {
    name: 'dashboard',
    label: 'Dashborard',
    path: `${HOMEDIR}/`,
    element: <Dashboard />,
    exact: true,
    modulo: 'home',
    permit: 1,
    menuOrder: 1,
    menuTitle: 'Dashboard',
  },
  {
    name: 'usuario.perfil',
    label: 'Perfil do usuario',
    path: `${HOMEDIR}/usuario`,
    element: <UsuarioPerfil />,
    exact: true,
    modulo: 'usuario',
    permit: 4,
    menuOrder: 4,
    menuTitle: 'Usuario',
  },
];

export default routes;

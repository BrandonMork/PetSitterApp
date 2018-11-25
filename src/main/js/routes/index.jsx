import Pages from "../layouts/Pages.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import LoginPage from "../views/Pages/LoginPage";
import RegisterPage from "../views/Pages/RegisterPage";

const indexRoutes = [
	{path: '/login', name: 'Login', component: LoginPage},
	{path: '/register', name: 'Register', component: RegisterPage},
	{path: '/pages', name: 'Pages', component: Pages},
	{path: '/', name: 'Home', component: Dashboard}
];

export default indexRoutes;

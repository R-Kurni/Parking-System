import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import HomePage from "../views/HomePage.jsx";
import AddParkingPage from "../views/AddParkingPage.jsx";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/add-parking",
				element: <AddParkingPage />,
			},
		],
	},
]);

export default router;

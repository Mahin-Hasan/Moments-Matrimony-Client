import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import BioDatas from "../pages/BioDatas/BioDatas";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import EditBiodata from "../pages/EditBiodata/EditBiodata";
import ViewBiodata from "../pages/ViewBiodata/ViewBiodata";
import ContactRequest from "../pages/ContactRequest/ContactRequest";
import FavouriteBio from "../pages/FavouriteBio/FavouriteBio";
import AddBiodata from "../pages/AddBiodata/AddBiodata";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'biodatas',
                element: <BioDatas></BioDatas>
            },
            {
                path: 'about',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'contact',
                element: <Contact></Contact>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            // users route
            {
                path: 'addBiodata',
                element: <AddBiodata></AddBiodata>
            },
            {
                path: 'editBiodata',
                element: <EditBiodata></EditBiodata>
            },
            {
                path: 'viewBiodata',
                element: <PrivateRoute><ViewBiodata></ViewBiodata></PrivateRoute>
            },
            {
                path: 'contactRequest',
                element: <ContactRequest></ContactRequest>
            },
            {
                path: 'favouriteBiodata',
                element: <FavouriteBio></FavouriteBio>
            },
            //admin route
        ]
    }
]);
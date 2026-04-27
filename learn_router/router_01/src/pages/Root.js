import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";


function Root(){

    return (
        <div className="root">
            {/* <h4>This is Root layout page. That means it will wrap all pages because things here are required at all pages</h4>
            <nav className="nav-bar">
                <h2>Navbar</h2>
            </nav> */}

            <Navbar/>

            {/* outlet is used to wrap child layout in parent layout. Whatever children is rendered that will have navbar and footer */}
            <Outlet />

            <footer>Routing tutorial, copyrights reserved.</footer>
        </div>
    );
}

export default Root;
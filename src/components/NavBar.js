import React from 'react'
import {Link} from "react-router-dom";
import { BASE_URL } from '../constraints';

function NavBar({ onLogout }) {
    function handleLogout() {
        fetch(BASE_URL+"/logout", {
          method: "DELETE",
        }).then(() => onLogout(null));
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Online Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" onClick={handleLogout}>Logout</a>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar

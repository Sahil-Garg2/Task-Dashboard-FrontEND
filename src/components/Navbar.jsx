import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initMDB, Dropdown , Collapse } from 'mdb-ui-kit/js/mdb.es.min';

function Navbar() {
    const { user, logout } = useAuth();
    useEffect(() => { 
        initMDB({ Dropdown, Collapse });
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid">
                <button
                    data-mdb-collapse-init
                    className="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand mt-2 mt-lg-0" href="#">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                            height="15"
                            alt="MDB Logo"
                            loading="lazy"
                        />
                    </a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* make it conditional */}
                        {!user && (
                            <><li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">Signup</a>
                        </li></>
                        )}
                        
                        
                    </ul>
                </div>
                <div className="d-flex align-items-center">
                    { 
                        user && (
                            <button onClick={logout}>logout</button>
                        )
                    }
                </div>
            </div>

        </nav>
    );
}

export default Navbar;

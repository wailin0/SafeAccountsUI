import React, { Component } from 'react';
import { NavbarBrand, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faAlignLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as LogoSvg } from '../../Assets/logo.svg';
import { OpenNavbarAccountMenu } from '../HelperFunctions.js'
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        // function bindings
        this.navbarLoggedOut = this.navbarLoggedOut.bind(this);
        this.navbarLoggedIn = this.navbarLoggedIn.bind(this);
        this.openSideMenu = this.openSideMenu.bind(this);
    }

    render() {
        var contents = !this.props.AppState.loggedIn
            ? this.navbarLoggedOut()
            : this.navbarLoggedIn();

        return contents;
    }

    // whether we return the name or logo
    RenderNameOrIcon(marginLeft="0px") {
        if (this.props.AppState.device_mode === localStorage.getItem("DESKTOP_MODE"))
            return <NavbarBrand tag={Link} to="/" style={{ color: "#FFF" }}>Safe Accounts</NavbarBrand>;
        else
            return <NavbarBrand tag={Link} to="/" style={{ marginLeft: marginLeft }}><LogoSvg id="svg_navmenu_logo" fill="#000" /></NavbarBrand>;
    }

    // html for a basic navbar when logged out
    navbarLoggedOut() {

        return (
            <div id="div_navbar" style={{ height: this.props.height }}>
                <div className="div_navbar_items">
                    {this.RenderNameOrIcon()}
                    <NavLink id="navlinks" tag={Link} to="/login">Login</NavLink>
                    <NavLink id="navlinks" tag={Link} to="/signup">Sign Up</NavLink>
                </div>
            </div>
        );
    }

    // html for a basic navbar when loggedIn
    navbarLoggedIn() {
        // only render the searchbar in this component on desktop
        const RenderOpenSideBar = () => {
            if (this.props.AppState.device_mode === localStorage.getItem("MOBILE_MODE"))
                return (
                    <FontAwesomeIcon id="sidebar_menu_icon" onClick={this.openSideMenu} icon={faAlignLeft} size="2x"/>
                );
        }

        return (
            <div id="div_navbar" style={{ height: this.props.height }}>
                <div className="div_navbar_items">
                    {RenderOpenSideBar()}
                    {this.RenderNameOrIcon("10px")}
                    <FontAwesomeIcon id="icon_user" icon={faUser} onClick={() => OpenNavbarAccountMenu(this.props.SetAppState)}/>
                </div>
            </div>
        );
    }

    // closes side menu on mobile... 
    openSideMenu() {
        document.getElementById("icon_close_sidebar").style.display = "block";
        document.getElementById("icon_add_folder").style.display = "inline";
        document.getElementById("div_SafeSideBar").style.border = "1px solid black"; // make it not invisible to add back the border
        document.getElementById("div_SafeSideBar").style.width = "250px"; // this makes it open from the right
    }
}

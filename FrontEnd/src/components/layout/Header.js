import React ,{Fragment} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,NavItem,NavLink,NavbarText
} from "reactstrap"
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {isEmpty,get} from "lodash"

const Header =(props)=>{
    const login = get(props.login,'users',[])
    const register = get(props.register,'users',[])
    return(
        <Navbar color='dark' light expand='md'>
            <NavbarBrand  className='text-white'>
               BACANCY
            </NavbarBrand>
            <NavbarText className='text-white'>
                {
                    props.user ? props.user.email : ""
                }
            </NavbarText>
            <NavbarToggler />
            <Collapse navbar>
                <Nav className='ml-auto' navbar>
                    {
                        !isEmpty(login) || !isEmpty(register)? (
                            <NavItem>
                                <NavLink tag={Link} to='/home' className='text-white'>
                                Logout
                            </NavLink>
                            </NavItem>
                        ) : (
                            <Fragment>
                            <NavItem>
                                <NavLink tag={Link} to='/signin' className='text-white'>
                                Signin
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/signup' className='text-white'>
                                Signup
                            </NavLink>
                            </NavItem>
                            </Fragment>
                        )
                    }
                </Nav>
            </Collapse>
        </Navbar>
    )
}

const mapStateToProps= (state)=>{
    return{
        login: state.login,
        register: state.register
    }
}
export default connect(mapStateToProps,null)(Header)

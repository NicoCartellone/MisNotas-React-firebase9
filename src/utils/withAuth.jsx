import React, { useContext, useMemo } from "react";
// import dynamic from "next/dynamic";
import { UserContext } from "/src/context/UserProvider";
import Login from "/src/pages/Login";

import { Suspense } from "react";
/**
 * WithAuth HOC
 * component to check
 * React FC
 */
// const NavBarComponent = dynamic(() => import("./NavBar"), { ssr: false });

function withAuth(Component) {
  /**
   * Check if shop user is authenticated
   */
  const Auth = (props) => {
    const { user } = useContext(UserContext);
    const loading = <h1>loading</h1>;
    // If user is logged in, return original component
    return useMemo(() => {
      return user ? (
        <Suspense fallback={loading}>
          {/* <NavBarComponent /> */}
          <Component {...props} />
        </Suspense>
      ) : (
        <Login />
      );
    }, [user, props]);
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;

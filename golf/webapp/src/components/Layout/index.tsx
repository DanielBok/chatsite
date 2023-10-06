import { UserContextProvider } from "@/context/user-context";
import { Grid, Container } from "@radix-ui/themes";
import React from "react";
import Header from "./Header";

const Layout = ({children}: React.PropsWithChildren) => {
  return (
    <UserContextProvider>
      <Grid>
        <Header/>
        <Grid>
          <Container>
            {children}
          </Container>
        </Grid>
      </Grid>
    </UserContextProvider>
  );
};

export default Layout;
"use client";

import { useLogin } from "@/components/Layout/Header/hooks";
import { Cross1Icon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Grid, TextField } from "@radix-ui/themes";
import React, { useState } from "react";

const LoginHandler = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {trigger, error} = useLogin();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <div className="m-4 cursor-pointer underline underline-offset-4 hover:text-emerald-600">
          Login
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title className="border-b-gray-300 border-b mb-6 pb-2">
          <Flex justify="between" align="center">
            <div className="text-2xl font-bold text-emerald-600">Login</div>
            <AlertDialog.Cancel className="cursor-pointer">
              <Cross1Icon className="text-red-700" style={{width: 25, height: 25}}/>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Title>

        <Grid columns="1" gapY="4">
          <Flex gap="4" direction="column">

            <TextField.Root>
              <TextField.Slot>
                <PersonIcon height="16" width="16"/>
              </TextField.Slot>
              <TextField.Input
                placeholder="Username"
                className="text-base"
                size="3"
                autoFocus={true}
                value={username}
                onChange={e => setUsername(e.target.value || "")}
                onKeyDown={e => e.key === "Enter" && loginUser()}
              />
            </TextField.Root>

            <TextField.Root>
              <TextField.Slot>
                <LockClosedIcon height="16" width="16"/>
              </TextField.Slot>
              <TextField.Input
                placeholder="Password"
                className="text-base"
                size="3"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value || "")}
                onKeyDown={e => e.key === "Enter" && loginUser()}
              />
            </TextField.Root>

            <Grid columns="2">
              <Flex justify="start">
                <ErrorMessage error={error}/>
              </Flex>
              <Flex justify="end">
                <Button
                  className="cursor-pointer"
                  color="teal"
                  onClick={loginUser}
                >
                  Login
                </Button>
              </Flex>
            </Grid>

          </Flex>
        </Grid>

      </AlertDialog.Content>
    </AlertDialog.Root>
  );

  async function loginUser() {
    await trigger({username, password});
  }
};

const ErrorMessage: React.FC<{ error?: string }> = ({error}) => {
  if (!error) return null;

  return <div className="text-red-700">
    {error}
  </div>;
};

export default LoginHandler;
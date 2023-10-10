"use client";
import React, { useEffect } from "react";


type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({error, reset}: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div>Error</div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
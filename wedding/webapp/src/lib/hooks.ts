"use client";

export function useIsMobile() {
  const {userAgent} = window.navigator;
  return !!userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
}
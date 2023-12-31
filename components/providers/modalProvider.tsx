"use client";
import useHasMounted from "@/hooks/useHasMounted";
import React from "react";
import CardModal from "../modals/cardModal";
import ProModal from "../modals/proModal";

const ModalProvider = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;

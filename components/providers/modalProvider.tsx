"use client";
import useHasMounted from "@/hooks/useHasMounted";
import React from "react";
import CardModal from "../modals/cardModal";

const ModalProvider = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return <CardModal />;
};

export default ModalProvider;

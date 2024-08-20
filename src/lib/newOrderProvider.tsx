"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useWebSocket } from "@/lib/hooks/useWebSocket";

interface NewOrderContextType {}

const NewOrderContext = createContext<NewOrderContextType | undefined>(
  undefined,
);

export const NewOrderProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();

  const handleNewOrder = () => {
    toast({
      title: "New Order",
      description: "A new order has been placed.",
    });
  };

  // Set up the WebSocket connection
  useWebSocket("ws://localhost:8000/ws", handleNewOrder);

  return (
    <NewOrderContext.Provider value={{}}>{children}</NewOrderContext.Provider>
  );
};

// Optional: Create a custom hook to consume the context if needed
// export const useNewOrder = () => {
//   const context = useContext(NewOrderContext);
//   if (context === undefined) {
//     throw new Error("useNewOrder must be used within a NewOrderProvider");
//   }
//   return context;
// };

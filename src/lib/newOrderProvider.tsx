"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { useQueryClient } from "@tanstack/react-query";

interface NewOrderContextType {}

const NewOrderContext = createContext<NewOrderContextType | undefined>(
  undefined,
);

export const NewOrderProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleNewOrder = () => {
    toast({
      className:
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      title: "New Order",
      description: "A new order has been placed.",
      variant: "destructive",
    });
    queryClient.invalidateQueries({
      queryKey: ["orders"],
      refetchType: "all",
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

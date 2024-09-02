"use client";

import React from "react";

type NewOrderEvent = {
  event: "new_order";
};

type WebSocketMessage = NewOrderEvent;

export const useWebSocket = (url: string, execFn: () => void) => {
  React.useEffect(() => {
    let attempts = 0;
    let socket: WebSocket | null = null;

    const connect = () => {
      socket = new WebSocket(url);

      socket.onopen = () => {
        // console.log("WebSocket connection established.");
        attempts = 0;
      };

      socket.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          if (data.event === "new_order") {
            execFn();
          }
        } catch (error) {
          // console.error("Failed to parse WebSocket message:", error);
        }
      };

      socket.onclose = () => {
        // console.log("WebSocket connection closed.");
        // Implement retry logic here
        if (attempts < 5) {
          attempts++;
          // console.log(`Attempting to reconnect... (${attempts})`);
          setTimeout(connect, 1000);
        }
      };

      socket.onerror = (error) => {
        // console.error("WebSocket error:", error);
        socket?.close();
      };
    };

    connect();

    return () => {
      socket?.close();
    };
  }, [url, execFn]);
};

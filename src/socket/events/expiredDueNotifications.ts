import { io } from "../..";

const expiredNotifications = () => {
  let expiredDueNotifications = io.of("/expiredDueNotifications");

  // Listening for connections on the namespace
  expiredDueNotifications.on("connection", (socket) => {
    console.log(
      "User connected with expiredDueNotifications namespace:",
      socket.id
    );

    socket.on("disconnect", () => {
      console.log(
        "User disconnected from expiredDueNotifications namespace:",
        socket.id
      );
    });
  });
  return expiredDueNotifications;
};

export { expiredNotifications };

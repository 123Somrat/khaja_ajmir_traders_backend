import socketAuthenticationMiddleware from "./authenticationMiddleware";

const socketMiddleware = (io: any) => {
  return io.engine.use(socketAuthenticationMiddleware);
};

export default socketMiddleware;

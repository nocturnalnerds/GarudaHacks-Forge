import { Server, ServerCredentials } from "@grpc/grpc-js";
import { ChatBotService, IChatBotServer } from "./proto/chatbot_grpc_pb";
import { ChatMessage } from "./proto/chatbot_pb";

const rooms: Record<string, { prompt: string; history: string[] }> = {};

const ChatBotImpl: IChatBotServer = {
  ChatStream: (call) => {
    call.on("data", (msg: ChatMessage) => {
      const roomId = msg.getRoomId();
      const userInput = msg.getContent();
      const userId = msg.getUserId();

      if (!rooms[roomId]) {
        rooms[roomId] = {
          prompt: `You are AI helper in room: ${roomId}`,
          history: [],
        };
      }

      const room = rooms[roomId];
      room.history.push(`User (${userId}): ${userInput}`);

      const response = new ChatMessage();
      response.setRoomId(roomId);
      response.setUserId("bot");
      response.setRole("bot");
      response.setContent(`${room.prompt} - you said: "${userInput}"`);

      room.history.push(response.getContent());
      call.write(response);
    });

    call.on("end", () => call.end());
  },
};

function startServer() {
  const server = new Server();
  server.addService(ChatBotService, ChatBotImpl);
  server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
    console.log("gRPC server running on port 50051");
    server.start();
  });
}

startServer();

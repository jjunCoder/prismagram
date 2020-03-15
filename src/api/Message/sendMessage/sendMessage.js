import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      let getTo;
      if (roomId === undefined) {
        if (toId !== user.id) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, { id: toId }]
            }
          });
        } else {
          throw Error("Same user");
        }
      } else {
        room = await prisma.room({ id: roomId });
        getTo = room.participants.filter(
          participant => participant.id !== user.id
        )[0];
      }
      if (room === null) {
        throw Error("Room not found");
      }

      return prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};

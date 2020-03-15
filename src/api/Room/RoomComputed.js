import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: room => {
      return prisma.room({ id: room.id }).participants();
    },
    messages: room => {
      return prisma.room({ id: room.id }).messages();
    }
  }
};

import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    from: ({ id }) => {
      return prisma.message({ id }).from();
    },
    to: ({ id }) => {
      return prisma.message({ id }).to();
    }
  }
};

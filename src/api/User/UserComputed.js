import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullname: parent => {
      return `${parent.firstname} ${parent.lastname}`;
    },
    isFollowing: (otherUser, _, { request }) => {
      const { user } = request;
      try {
        return prisma.$exists.user({
          AND: [{ id: otherUser.id }, { followers_some: { id: user.id } }]
        });
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};

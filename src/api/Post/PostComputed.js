import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: parent => {
      return prisma.files({ where: { post: { id: parent.id } } });
    },
    isLiked: (post, _, { request }) => {
      const { user } = request;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: post.id
            }
          }
        ]
      });
    },
    likeCount: post => {
      return prisma
        .likesConnection({
          where: { post: { id: post.id } }
        })
        .aggregate()
        .count();
    }
  }
};

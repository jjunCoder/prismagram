import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
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

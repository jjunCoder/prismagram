import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const _user = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return { user: _user, posts };
        }
    }
}

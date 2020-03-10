import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullname: parent => {
            return `${parent.firstname} ${parent.lastname}`;
        },
        amIFollowing: async (parent, __, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                const exists = await prisma.$exists.user({
                    where: {
                        AND: [
                            { id: parentId },
                            { followers_some: [user.id] }
                        ]
                    }
                });
                return exists;
            } catch (error) {
                return false;
            }

        },
        itsMe: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
}
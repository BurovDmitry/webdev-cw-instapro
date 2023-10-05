import { getTimeDistance } from "./get-time-distance.js";

export function mapPosts(post) {
    return post.map(post => ({
        ...post,
        createdAt: getTimeDistance(post.createdAt),
        likeText: ((post.likes?.length === 0) ? '0' : post.likes[0].name) + ((post.likes?.length >= 2) ? ` и еще ${post.likes?.length - 1}` : '')
    }))
}
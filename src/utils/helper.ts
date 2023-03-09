export type Post = { id: string; body: string; isUnread: boolean };

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getUnreadPosts(): Post["id"][] {
  const posts = localStorage.getItem("posts");
  return JSON.parse(posts ?? "[]");
}

export function setUnreadPosts(postIds: Post["id"][]) {
  localStorage.setItem("posts", JSON.stringify(postIds));
}

export function emptyUnreadPosts() {
  setUnreadPosts([]);
}

export function addUnreadPost(postId: Post["id"]) {
  const posts = getUnreadPosts();
  posts.push(postId);
  setUnreadPosts([...new Set(posts)]);
}

export async function fakeSendPosts(posts: Post["id"][]) {
  console.log(`Sent ${posts.length} posts`);
  await sleep(300);
  return posts;
}

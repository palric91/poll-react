import { useState } from "react";

import Posts from "./components/Posts";
import useInterval from "./hooks/useInterval";
import {
  emptyUnreadPosts,
  fakeSendPosts,
  getUnreadPosts,
} from "./utils/helper";

function App() {
  // local state for posts (normally this would be in redux store)
  const [posts, setPosts] = useState([
    { id: crypto.randomUUID(), body: "Post 1", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 2", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 3", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 4", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 5", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 6", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 7", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 8", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 9", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 10", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 11", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 12", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 13", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 14", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 15", isUnread: false },
    { id: crypto.randomUUID(), body: "Post 16", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 17", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 18", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 19", isUnread: true },
    { id: crypto.randomUUID(), body: "Post 20", isUnread: true },
  ]);

  useInterval(() => {
    // Fetch unread posts from local storage
    const unreadPosts = getUnreadPosts();

    // If there are unread posts, send them to server
    if (unreadPosts.length > 0) {
      // Update redux store with new unread posts (currently local state used for simplicity)
      setPosts((posts) =>
        posts.map((post) => ({
          ...post,
          isUnread: unreadPosts.includes(post.id) ? false : post.isUnread,
        }))
      );

      // Delete unread posts from local storage
      console.log("Unread posts: ", unreadPosts);
      emptyUnreadPosts();

      fakeSendPosts(unreadPosts).then((posts) => {
        // ...Update redux store with new unread posts
      });
    }
  }, 1_500);

  return (
    <div className="App">
      <h1>Post polling test</h1>
      <button
        onClick={() => {
          setPosts((posts) => [
            ...posts,
            {
              id: crypto.randomUUID(),
              body: `Post ${posts.length + 1}`,
              isUnread: true,
            },
          ]);
        }}
      >
        Add new post
      </button>
      <Posts posts={posts} />
    </div>
  );
}

export default App;

import { Post } from "../utils/helper";

import PostComponent from "./Post";

type PostsProps = {
  posts: Post[];
};

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          isUnread={post.isUnread}
          postId={post.id}
          body={post.body}
        />
      ))}
    </>
  );
};

export default Posts;

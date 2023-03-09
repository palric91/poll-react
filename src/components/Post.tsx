import React from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { addUnreadPost } from "../utils/helper";

type PostProps = {
  postId: string;
  body: string;
  isUnread: boolean;
};

const Post = ({ postId, body, isUnread }: PostProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: false,
  });
  const isVisible = !!entry?.isIntersecting;

  // Push post to unread posts array if it's visible and hasn't been read yet
  if (isVisible && isUnread) {
    addUnreadPost(postId);
  }

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "1rem",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
      ref={ref}
    >
      <p>
        {isUnread ? <span style={{ color: "red" }}>NEW!!! </span> : ""}
        {body}
      </p>
    </div>
  );
};

export default Post;

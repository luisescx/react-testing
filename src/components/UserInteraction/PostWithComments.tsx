import { useState } from "react";

type Comment = {
  content: string;
};

type PostWithCommentProps = {
  content: string;
  user: string;
};

let nextId = 0;

export function PostWithComment({ content, user }: PostWithCommentProps) {
  const [comment, setComment] = useState("");
  const [comments] = useState<Comment[]>([]);

  return (
    <div>
      <div data-testid="post-container">
        <h2>{user}:</h2>
        <p>{content}</p>
      </div>
      <div data-testid="comment-container">
        <input
          data-testid="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={() => {
            comments.push({
              content: comment,
            });
            setComment("");
          }}
        >
          Comment
        </button>
        <div data-testid="post-comment-container">
          {comments.map((comment) => {
            return <p key={nextId++}>{comment.content}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

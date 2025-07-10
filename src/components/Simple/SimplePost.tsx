type SimplePostProps = {
  content: string;
  user: string;
  likesBy?: string[];
};

export function SimplePost({ content, user, likesBy }: SimplePostProps) {
  return (
    <div data-testid="post-container">
      <h2>{user}:</h2>
      <p>{content}</p>

      {likesBy && likesBy.length > 0 && (
        <div data-testid="likes-container">
          <h3>Likes by:</h3>

          <ul>
            {likesBy?.map((like, index) => (
              <li key={`${like}-${index}`}>{like}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

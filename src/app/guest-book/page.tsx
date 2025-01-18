"use client"
import SignIn from '~/components/sign-in'
import { useState } from 'react';
import { api } from '~/trpc/react';

export default function GuestBook() {
  const [content, setContent] = useState("");
  const createCommentMutation = api.comments.createComment.useMutation();
  const { data: comments, isLoading, isError } = api.comments.getAllComments.useQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      await createCommentMutation.mutateAsync({ content });
      setContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  if (isLoading) return <div>Loading comments...</div>;
  if (isError) return <div>Error loading comments</div>;

  return (
    <div>
      <SignIn />
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

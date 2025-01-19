"use client"
import SignIn from "~/components/sign-in";
import { useState } from "react";
import { api } from "~/trpc/react";
import { formatDate } from '~/lib//format';

export default function GuestBook() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createCommentMutation = api.comments.createComment.useMutation({
    onSuccess: () => {
      commentsQuery.refetch();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const commentsQuery = api.comments.getAllComments.useQuery();
  const { data: comments, isLoading, isError } = commentsQuery;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);

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
    <div className="px-4 py-1 custom-scroll"
      style={{
        maxHeight: "600px",
        overflowY: "auto",
      }}
    >
      <div className="flex justify-between items-center border">
        <SignIn />:
        <form onSubmit={handleSubmit} className="border w-full max-w-6xl">
          <div className="flex items-center justify-between">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Leave a message"
              required
              className="bg-gray-900  max-w-2xl resize-none h-6 focus:outline-none focus:border-transparent"
            />
            <button
              className="px-14 bg-gray-400 text-gray-800 flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="loader w-6 h-6 border-4 border-t-transparent border-gray-800 rounded-full animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>

      <div>
        {comments && comments.length > 0 ? (
          [...comments].reverse().map((comment) => (
            <div className="flex gap-2 items-start justify-between" key={comment.id}>
              <p className="lowercase">{comment.createdByName}</p>:
              <p className="w-full max-w-5xl break-words">{comment.content}</p>
              <p>{formatDate(comment.createdAt)}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

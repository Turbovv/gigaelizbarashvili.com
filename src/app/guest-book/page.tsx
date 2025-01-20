"use client"
import SignIn from "~/components/sign-in";
import { useState } from "react";
import { api } from "~/trpc/react";
import { formatDate } from '~/lib/format';
import LikeButton from "~/components/like"; 
import { X } from "lucide-react";
import { useSession } from "next-auth/react";

export default function GuestBook() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession()
  

  const createCommentMutation = api.comments.createComment.useMutation({
    onSuccess: () => {
      commentsQuery.refetch();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const deleteCommentMutation = api.comments.deleteComment.useMutation({
    onSuccess: () => {
      commentsQuery.refetch();
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

  const handleDelete = async (commentId: number) => {
    try {
      await deleteCommentMutation.mutateAsync({ commentId });
    } catch (error) {
      console.error("Error deleting comment or like:", error);
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
      <div className="flex justify-between items-center mb-2">
        {session ? (
          <p className="lowercase">{session?.user?.name}</p>
        ) : (
          <p className="w-40">guest </p>
        )}:
        {/* <SignIn />: */}
        <form onSubmit={handleSubmit} className="w-full max-w-6xl">
          <div className="flex items-center justify-between">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={session ? "Leave a message" : "Sign in to leave a message"}
              required
              disabled={!session}
              className="bg-gray-900  w-full resize-none h-7 focus:outline-none focus:border-transparent"
            />
            <button
              className="px-11 bg-gray-400 text-gray-800 flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="loader w-6 h-6 border-4 border-t-transparent border-gray-800 rounded-full animate-spin"></div>
              ) : session ? "Submit" : <SignIn />}
            </button>
          </div>
        </form>
      </div>

      <div>
        {comments && comments.length > 0 ? (
          [...comments].reverse().map((comment) => (
            <div className="flex gap-2 items-start justify-between" key={comment.id}>
              <p className="lowercase">{comment.createdByName}</p>:
              <p className="w-full max-w-4xl break-words">{comment.content}</p>
              <div className="flex items-center gap-2">
                <LikeButton commentId={comment.id} />
               {session ? (
                 <button
                 onClick={() => handleDelete(comment.id)}
                 className="text-gray-400"
               >
                 <X className="w-[14px]" />
               </button>
               ): (
                <p></p>
               ) }
                <p>{formatDate(comment.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

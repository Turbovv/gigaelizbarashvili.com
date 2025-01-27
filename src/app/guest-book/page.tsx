"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import CommentForm from "~/components/comments/comment-form";
import CommentList from "~/components/comments/comment-list";

export default function GuestBook() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

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
    <>
      <CommentForm
        content={content}
        setContent={setContent}
        loading={loading}
        handleSubmit={handleSubmit}
        session={session}
      />
      <CommentList comments={comments} session={session} handleDelete={handleDelete} />
    </>
  );
}
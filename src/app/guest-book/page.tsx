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
    <>
      <form className='mb-2 flex flex-col gap-2 text-sm lg:px-6 lg:flex-row lg:items-center max-lg:p-2' onSubmit={handleSubmit}>
        <p className='truncate lg:w-36 text-[#898989] '>
          <span className='text-[#5de4c7]'>~</span>/{session ? session?.user?.name?.toLowerCase().replace(/\s/g, '-') : 'guest'}
        </p>
        <p className='hidden lg:block text-[#898989]'>:</p>
        <input
          name='desc'
          id='desc'
          type='text'
          className='flex-1 bg-transparent placeholder-opacity-50 caret-[#5de4c7] placeholder:text-[#898989]/90 focus:border-transparent focus:outline-none focus:ring-0'
          placeholder={session ? 'Leave a message' : 'Sign in to leave a message'}
          autoFocus
          required
          minLength={3}
          maxLength={140}
          autoComplete='off'
          disabled={!session}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {session ? (
          <button
            className="bg-gray-400 text-gray-800 flex items-center justify-center lg:w-40 p-1"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="loader w-6 h-6 border-4 border-t-transparent border-gray-800 rounded-full animate-spin"></div>
            ) : "Submit"}
          </button>
        ) : (
          <SignIn />
        )}
      </form>
      <ul className='flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0 max-lg:p-2'>
        {comments && comments.length > 0 ? (
          [...comments].reverse().map((comment) => (
            <li key={comment.id} className='flex flex-col lg:items-center gap-1 py-1 lg:flex-row lg:px-6 lg:gap-2 lg:border-y-0 lg:py-0 group'>
              {comment && comment.createdByName && (
                <p className='flex-1 truncate lg:w-36 lg:flex-none text-[#898989]'>
                  <span className='text-[#5de4c7]'>~</span>/{comment.createdByName.toLowerCase().replace(/\s/g, '-')}
                </p>
              )}
              <p className='block lg:hidden text-[#898989]'>{comment.content}</p>
              <p className='hidden lg:block text-[#898989]'>:</p>
              <p className='hidden flex-1 lg:block text-[#898989]'>{comment.content}</p>
              {session && (
                <div className='flex items-center'>
                  <div className="gap-x-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    
                  <LikeButton commentId={comment.id} />
                  </div>
                  {comment.createdById === session?.user.id && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-gray-400"
                    >
                      <X className="w-[14px] text-[#898989]" />
                    </button>
                  )}
                </div>
              )}
              <p className='hidden lg:block text-[#898989] text-base '>
                {formatDate(comment.createdAt).replace(/\//g, '-').replace(',', '')}
              </p>
            </li>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
    </>
  );
}
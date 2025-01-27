import CommentItem from "./comment-item";

export default function CommentList({ comments, session, handleDelete }: any) {
  return (
    <ul className='flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0 max-lg:p-2'>
      {comments && comments.length > 0 ? (
        [...comments].reverse().map((comment) => (
          <CommentItem key={comment.id} comment={comment} session={session} handleDelete={handleDelete} />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </ul>
  );
}
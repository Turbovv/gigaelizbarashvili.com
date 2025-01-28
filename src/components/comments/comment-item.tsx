import { formatDate } from '~/lib/format';
import LikeButton from "~/components/like";
import { X } from "lucide-react";

export default function CommentItem({ comment, session, handleDelete }: any) {
  return (
    <li className='flex flex-col lg:items-center gap-1 py-1 lg:flex-row lg:px-6 lg:gap-2 lg:border-y-0 lg:py-0 group'>
      {comment && comment.createdByName && (
        <p className='flex-1 truncate lg:w-32 lg:flex-none text-[#898989]'>
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
          {comment.createdById === session.user.id && (
            <button onClick={() => handleDelete(comment.id)} className="text-gray-400">
              <X className="w-[14px] text-[#898989]" />
            </button>
          )}
        </div>
      )}
      <p className='hidden lg:block text-[#898989] text-base '>
        {formatDate(comment.createdAt).replace(/\//g, '-').replace(',', '')}
      </p>
    </li>
  );
}
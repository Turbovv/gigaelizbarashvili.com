import SignIn from "~/components/sign-in";

export default function CommentForm({ content, setContent, loading, handleSubmit, session }: any) {
  return (
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
  );
}
"use client"
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function LikeButton({ commentId }: { commentId: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const { data: session } = useSession();
  const { data, isLoading, refetch } = api.likes.getLikes.useQuery({ postId: commentId });

  useEffect(() => {
    if (data) {
      setLiked(data.likes > 0);
      setLikeCount(data.likes);
    }
  }, [data]);

  const toggleLike = api.likes.toggleLike.useMutation({
    onSuccess: () => refetch(),
    onError: () => {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? (prev ?? 0) - 1 : (prev ?? 0) + 1));
    },
  });

  const handleLike = async () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? (prev ?? 0) - 1 : (prev ?? 0) + 1));

    try {
      await toggleLike.mutateAsync({ postId: commentId });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (!session) {
    return null;
  }

  if (isLoading || likeCount === null) {
    return <div className="text-[#898989]">Loading...</div>;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-[#898989]">{likeCount}</span>
      <button onClick={handleLike}>
        <Heart
          className={`w-4 h-4 transition-colors ${
            liked ? "fill-[#898989] text-[#898989]" : "fill-none text-gray-500"
          }`}
        />
      </button>
    </div>
  );
}

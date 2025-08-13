import { CommentData } from "../data/comments";

interface CommentProps {
  comment: CommentData;
  isLast?: boolean;
}

export default function Comment({ comment, isLast = false }: CommentProps) {
  return (
    <div className={`${isLast ? 'pb-6' : 'border-b pb-6'}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 font-bold text-sm">{comment.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{comment.author}</span>
            <span className="text-gray-500 text-sm">{comment.date}</span>
          </div>
          <p className="text-gray-700">
            {comment.content}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <button className="text-sm text-gray-500 hover:text-gray-700">Reply</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">Like</button>
          </div>
        </div>
      </div>
    </div>
  );
}
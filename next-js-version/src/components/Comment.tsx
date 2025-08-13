import { CommentData } from "../data/comments";

interface CommentProps {
  comment: CommentData;
  isLast?: boolean;
}

export default function Comment({ comment, isLast = false }: CommentProps) {
  return (
    <div className={isLast ? 'comment-container-last' : 'comment-container'}>
      <div className="comment-content">
        <div className="comment-avatar">
          <span className="comment-avatar-text">{comment.avatar}</span>
        </div>
        <div className="comment-body">
          <div className="comment-header">
            <span className="comment-author">{comment.author}</span>
            <span className="comment-date">{comment.date}</span>
          </div>
          <p className="comment-text">
            {comment.content}
          </p>
          <div className="comment-actions">
            <button className="comment-action-button">Reply</button>
            <button className="comment-action-button">Like</button>
          </div>
        </div>
      </div>
    </div>
  );
}
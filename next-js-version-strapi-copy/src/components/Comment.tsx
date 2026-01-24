"use client";
import { useState } from "react";
import { CommentData } from "../data/comments";
import CommentForm from "./CommentForm";

interface CommentProps {
  comment: CommentData;
  isLast?: boolean;
}

export default function Comment({ comment, isLast = false }: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleReplySubmit = (data: { name: string; email: string; comment: string }) => {
    console.log('Reply submitted:', data);
    // Handle reply submission logic here
    setShowReplyForm(false);
  };

  const handleReplyCancel = () => {
    setShowReplyForm(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

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
            <button 
              className="comment-action-button hover:text-green-500 hover:underline transition-colors"
              onClick={handleReply}
            >
              Reply
            </button>
            <button 
              className={`comment-action-button hover:text-green-500 hover:underline transition-colors flex items-center gap-1 ${
                isLiked ? 'text-red-500' : ''
              }`}
              onClick={handleLike}
            >
              {isLiked ? 'Liked' : 'Like'}
              {isLiked && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 256 256" 
                  className="w-4 h-4 fill-red-500"
                >
                  <path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
          {showReplyForm && (
            <div className="mt-4">
              <CommentForm 
                onSubmit={handleReplySubmit}
                onCancel={handleReplyCancel}
                placeholder="Write your reply here..."
                submitButtonText="Post Reply"
                showCancelButton={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
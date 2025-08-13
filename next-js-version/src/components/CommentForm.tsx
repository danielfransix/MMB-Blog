"use client";
import { useState } from "react";
import Image from "next/image";

interface CommentFormProps {
  onSubmit?: (data: { name: string; email: string; comment: string }) => void;
  onCancel?: () => void;
  placeholder?: string;
  submitButtonText?: string;
  showCancelButton?: boolean;
}

type CommentFormStatus = 'idle' | 'success' | 'error';

export default function CommentForm({ 
  onSubmit, 
  onCancel, 
  placeholder = "Write your comment here...", 
  submitButtonText = "Post Comment",
  showCancelButton = false 
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [formStatus, setFormStatus] = useState<CommentFormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate comment submission
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random success/failure for demo purposes
      // In real implementation, this would be your actual API call
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (isSuccess) {
        setFormStatus('success');
        // Call the original onSubmit if provided
        if (onSubmit) {
          onSubmit({ name, email, comment });
        }
        // Reset form on success
        setName("");
        setEmail("");
        setComment("");
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const resetForm = () => {
    setFormStatus('idle');
    setName("");
    setEmail("");
    setComment("");
  };

  // Success State
  if (formStatus === 'success') {
    return (
      <div className="comment-form flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <Image
            src="/img/success.svg"
            alt="Success"
            width={60}
            height={60}
            className="w-15 h-15"
          />
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold text-green-600">Comment Posted Successfully!</h4>
            <p className="text-gray-600 text-sm">Your comment has been added and is now visible.</p>
          </div>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px] text-sm"
          >
            Add Another Comment
          </button>
        </div>
      </div>
    );
  }

  // Error State
  if (formStatus === 'error') {
    return (
      <div className="comment-form flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <Image
            src="/img/failure.svg"
            alt="Error"
            width={60}
            height={60}
            className="w-15 h-15"
          />
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold text-red-600">Comment Failed to Post</h4>
            <p className="text-gray-600 text-sm">There was an error posting your comment. Please try again.</p>
          </div>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px] text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Default Form State
  return (
    <form onSubmit={handleSubmit} className="comment-form flex flex-col gap-1">
      <div className="flex flex-col sm:flex-row gap-1">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-[2px]"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-[2px]"
        />
      </div>
      
      <div 
        className="flex items-start gap-1 w-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-500 hover:border-green-500 transition-colors rounded-[2px]"
        onClick={(e) => {
          const textarea = e.currentTarget.querySelector('textarea');
          if (textarea && e.target !== e.currentTarget.querySelector('.image-upload')) {
            textarea.focus();
          }
        }}
      >
        <div 
          className="image-upload w-12 h-12 border-2 border-black hover:border-green-500 transition-colors cursor-pointer flex items-center justify-center m-2 flex-shrink-0 text-black hover:text-green-500 rounded-[2px] bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            // Handle image upload
            console.log('Image upload clicked');
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 5h6"></path>
            <path d="M19 2v6"></path>
            <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            <circle cx="9" cy="9" r="2"></circle>
          </svg>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          required
          rows={4}
          className="flex-1 px-4 py-2 focus:outline-none resize-none border-none"
        />
      </div>
      
      <div className="flex flex-row items-center gap-1 mb-4 flex-wrap">
        <input
          type="checkbox"
          id="save-info"
          className="rounded"
        />
        <label htmlFor="save-info" className="text-sm text-gray-600">
          Save my name and email in this browser for the next time I comment.
        </label>
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px]"
        >
          {submitButtonText}
        </button>
        {showCancelButton && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors rounded-[2px]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
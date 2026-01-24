"use client";

import { useState } from "react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="newsletter-container">
      <h3 className="newsletter-title">Subscribe to Make me Beautiful</h3>
      
      {isSubscribed ? (
        <div className="newsletter-success">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="newsletter-input"
          />
          <button
            type="submit"
            className="newsletter-submit-button"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
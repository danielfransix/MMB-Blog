"use client";
import { useState } from "react";

interface ContactFormProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ContactForm({ 
  title = "Get In Touch", 
  description = "Have a question, suggestion, or just want to say hello? We'd love to hear from you!",
  className = ""
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className={`contact-form-master-container ${className}`}>
      <div className="contact-form-header">
        <h2 className="page-title-main">{title}</h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-[2px]"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-[2px]"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-[2px]"
            placeholder="What's this about?"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-[2px] resize-none"
            placeholder="Tell us what's on your mind..."
          />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px] font-medium"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
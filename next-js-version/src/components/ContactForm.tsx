"use client";
import { useState } from "react";
import Image from "next/image";

interface ContactFormProps {
  title?: string;
  description?: string;
  className?: string;
}

type FormStatus = 'idle' | 'success' | 'error';

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
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
    // Simulate form submission
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random success/failure for demo purposes
      // In real implementation, this would be your actual API call
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      
      if (isSuccess) {
        setFormStatus('success');
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const resetForm = () => {
    setFormStatus('idle');
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  // Success State
  if (formStatus === 'success') {
    return (
      <div className={`contact-form-master-container ${className}`}>
        <div className="contact-form-header">
          <h2 className="page-title-main">{title}</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <Image
            src="/img/success.svg"
            alt="Success"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-green-600">Message Sent Successfully!</h3>
            <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
          </div>
          <button
            onClick={resetForm}
            className="px-6 py-2 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px] font-medium"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  // Error State
  if (formStatus === 'error') {
    return (
      <div className={`contact-form-master-container ${className}`}>
        <div className="contact-form-header">
          <h2 className="page-title-main">{title}</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <Image
            src="/img/failure.svg"
            alt="Error"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-red-600">Message Failed to Send</h3>
            <p className="text-gray-600">There was an error sending your message. Please try again.</p>
          </div>
          <button
            onClick={resetForm}
            className="px-6 py-2 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px] font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Default Form State
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
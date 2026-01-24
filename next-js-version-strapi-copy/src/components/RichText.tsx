'use client';

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

interface RichTextProps {
  content: BlocksContent;
}

export default function RichText({ content }: RichTextProps) {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        code: ({ children }) => (
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm overflow-x-auto my-4 border border-gray-200 dark:border-gray-700">
            <code className="font-mono text-gray-800 dark:text-gray-200">{children}</code>
          </pre>
        ),
      }}
      modifiers={{
        code: ({ children }) => (
          <code className="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded-md font-mono text-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
            {children}
          </code>
        ),
      }}
    />
  );
}


import assert from 'assert';

// Mock data structures matching Strapi format
const mockRichText = [
  {
    type: 'paragraph',
    children: [
      { type: 'text', text: 'This is some ' },
      { type: 'text', text: 'bold', bold: true },
      { type: 'text', text: ' text about music.' }
    ]
  }
];

const mockArticleWithTitleMatch = {
  id: 1,
  title: 'The History of Music',
  excerpt: 'A short summary.',
  blocks: []
};

const mockArticleWithBodyMatch = {
  id: 2,
  title: 'Another Article',
  excerpt: 'Something else.',
  blocks: [
    {
      __component: 'shared.rich-text',
      body: mockRichText
    }
  ]
};

const mockArticleNoMatch = {
  id: 3,
  title: 'Coding 101',
  excerpt: 'Learn to code.',
  blocks: [
    {
      __component: 'shared.rich-text',
      body: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Just some coding content.' }]
        }
      ]
    }
  ]
};

// --- Logic to Test (Copied/Adapted from page.tsx) ---

function extractTextFromRichText(nodes: any[]): string {
  if (!nodes || !Array.isArray(nodes)) return '';
  
  return nodes.map(node => {
    if (node.text) {
      return node.text;
    }
    if (node.children) {
      return extractTextFromRichText(node.children);
    }
    return '';
  }).join(' ');
}

function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks.map(block => {
    if (block.__component === 'shared.rich-text' && block.body) {
      return extractTextFromRichText(block.body);
    }
    return '';
  }).join(' ');
}

function filterArticles(articles: any[], query: string) {
  const searchLower = query.toLowerCase();
  return articles.filter((post: any) => {
    if (post.title?.toLowerCase().includes(searchLower)) return true;
    if (post.excerpt?.toLowerCase().includes(searchLower)) return true;
    if (post.blocks) {
      const bodyText = extractTextFromBlocks(post.blocks);
      if (bodyText.toLowerCase().includes(searchLower)) return true;
    }
    return false;
  });
}

// --- Tests ---

console.log('Running Search Logic Tests...');

try {
  // Test 1: Extract text from Rich Text
  const extractedText = extractTextFromRichText(mockRichText);
  console.log(`Extracted Text: "${extractedText}"`);
  assert(extractedText.includes('music'), 'Failed to extract "music" from rich text');
  assert(extractedText.includes('bold'), 'Failed to extract "bold" from rich text');
  console.log('✅ Text Extraction Test Passed');

  // Test 2: Filter by Title
  const resultsTitle = filterArticles([mockArticleWithTitleMatch, mockArticleNoMatch], 'Music');
  assert.strictEqual(resultsTitle.length, 1, 'Should find 1 article by title');
  assert.strictEqual(resultsTitle[0].id, 1, 'Should find correct article id 1');
  console.log('✅ Title Search Test Passed');

  // Test 3: Filter by Body (Dynamic Zone)
  const resultsBody = filterArticles([mockArticleWithBodyMatch, mockArticleNoMatch], 'music');
  assert.strictEqual(resultsBody.length, 1, 'Should find 1 article by body text');
  assert.strictEqual(resultsBody[0].id, 2, 'Should find correct article id 2');
  console.log('✅ Body/Dynamic Zone Search Test Passed');

  // Test 4: No Match
  const resultsNone = filterArticles([mockArticleWithTitleMatch, mockArticleWithBodyMatch], 'banana');
  assert.strictEqual(resultsNone.length, 0, 'Should find 0 articles');
  console.log('✅ No Match Test Passed');

  console.log('🎉 All Tests Passed Successfully!');

} catch (error) {
  console.error('❌ Test Failed:', error);
  process.exit(1);
}

#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

console.log('🔧 Fixing all apostrophes in JSX...');

// Files with apostrophe issues
const filesToFix = [
  'app/conditions/page.tsx',
  'app/confidentialite/page.tsx',
  'app/a-propos/page.tsx',
  'app/aide/page.tsx',
  'app/partage/[id]/share-page-client.tsx',
  'app/parti/[id]/page.tsx',
  'app/questionnaire/page.tsx',
  'app/resultats/page.tsx',
  'components/existing-responses-modal.tsx',
  'components/share-modal.tsx',
  'components/site-footer.tsx',
  'components/site-header.tsx',
  'components/ui/top-match-modal.tsx'
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix common French apostrophes in JSX text content
    // Pattern matches text between > and < that contains apostrophes
    content = content.replace(/>([^<]*)'([^<]*)</g, (match, before, after) => {
      // Don't replace if it's inside a JSX attribute (contains = or ")
      if (before.includes('=') || before.includes('"') || after.includes('=') || after.includes('"')) {
        return match;
      }
      return `>${before}&apos;${after}<`;
    });
    
    // Fix quotes in JSX text content
    content = content.replace(/>([^<]*)"([^<]*)"([^<]*)</g, (match, before, middle, after) => {
      if (before.includes('=') || after.includes('=')) {
        return match;
      }
      return `>${before}&quot;${middle}&quot;${after}<`;
    });
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed apostrophes in ${file}`);
  }
});

console.log('🎉 All apostrophes fixed!');
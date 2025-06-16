#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Starting final ESLint fixes...');

// 1. Fix apostrophes in all JSX files
const jsxFiles = glob.sync('./{app,components}/**/*.{tsx,ts}');
jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Replace unescaped apostrophes in JSX text with &apos;
  let fixed = content.replace(/(\w)\s*'(\w)/g, "$1&apos;$2");
  fixed = fixed.replace(/(\w)'(\w)/g, "$1&apos;$2");
  fixed = fixed.replace(/(\w)'s\b/g, "$1&apos;s");
  fixed = fixed.replace(/n'(\w)/g, "n&apos;$1");
  fixed = fixed.replace(/l'(\w)/g, "l&apos;$1");
  fixed = fixed.replace(/d'(\w)/g, "d&apos;$1");
  
  // Replace unescaped quotes in JSX text
  fixed = fixed.replace(/"([^"]*)"(?=[^<>]*>)/g, '&quot;$1&quot;');
  
  if (fixed !== content) {
    fs.writeFileSync(file, fixed);
    console.log(`✅ Fixed apostrophes in ${file}`);
  }
});

// 2. Fix specific issues
const specificFixes = {
  'app/api/results/route.ts': [
    { find: "import { ResponsesAPI } from '@/lib/api/responses'", replace: "// import { ResponsesAPI } from '@/lib/api/responses' // Unused import removed" },
    { find: "politicalPosition", replace: "_politicalPosition" },
    { find: "as any", replace: "as unknown" }
  ],
  'app/partage/[id]/page.tsx': [
    { find: "import type { Party } from '@/lib/boussole-data'", replace: "// import type { Party } from '@/lib/boussole-data' // Unused import" }
  ],
  'app/partage/[id]/share-page-client.tsx': [
    { find: "import { partiesData } from '@/lib/boussole-data'", replace: "// import { partiesData } from '@/lib/boussole-data' // Unused" },
    { find: "import { calculateUserPoliticalPosition } from '@/lib/political-map-calculator'", replace: "// import { calculateUserPoliticalPosition } from '@/lib/political-map-calculator' // Unused" }
  ]
};

Object.entries(specificFixes).forEach(([file, fixes]) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    fixes.forEach(({ find, replace }) => {
      content = content.replace(find, replace);
    });
    fs.writeFileSync(file, content);
    console.log(`✅ Applied specific fixes to ${file}`);
  }
});

console.log('🎉 Final fixes completed!');
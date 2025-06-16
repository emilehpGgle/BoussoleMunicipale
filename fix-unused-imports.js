#!/usr/bin/env node
const fs = require('fs');

console.log('🔧 Fixing unused imports...');

// List of files and their fixes
const fixes = [
  {
    file: 'app/parti/[id]/page.tsx',
    changes: [
      { find: /, agreementLabels/, replace: '' }
    ]
  },
  {
    file: 'app/profil/page.tsx',
    changes: [
      { find: /import Link from "next\/link"\n/, replace: '' },
      { find: /, useEffect/, replace: '' },
      { find: /import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@\/components\/ui\/select"\n/, replace: '' },
      { find: /import { RadioGroup, RadioGroupItem } from "@\/components\/ui\/radio-group"\n/, replace: '' },
      { find: /import { Checkbox } from "@\/components\/ui\/checkbox"\n/, replace: '' },
      { find: /, CardDescription, CardTitle/, replace: '' },
      { find: /, ArrowLeft, X/, replace: '' }
    ]
  },
  {
    file: 'app/questionnaire/page.tsx',
    changes: [
      { find: /, CardContent, CardHeader, CardTitle/, replace: '' },
      { find: /, ArrowRight, Home, ChevronRight/, replace: '' },
      { find: /, agreementLabels, importanceDirectLabels/, replace: '' },
      { find: /, ImportanceOptionKey/, replace: '' },
      { find: /import { ColoredText, HighlightText } from "@\/components\/ui\/colored-text"\n/, replace: '' },
      { find: /import { GlowSection } from "@\/components\/ui\/subtle-glow"\n/, replace: '' }
    ]
  },
  {
    file: 'app/resultats/page.tsx',
    changes: [
      { find: /, Mail, Twitter, Facebook, Instagram, Linkedin, Download, LinkIcon, MessageCircle/, replace: '' },
      { find: /, ImportanceOptionKey/, replace: '' },
      { find: /import { sendResultsByEmail } from "@\/lib\/email-service"\n/, replace: '' }
    ]
  },
  {
    file: 'components/share-modal.tsx',
    changes: [
      { find: /, CardDescription/, replace: '' },
      { find: /import { X } from "lucide-react"\n/, replace: '' },
      { find: /import { partiesData } from "@\/lib\/boussole-data"\n/, replace: '' },
      { find: /import Link from "next\/link"\n/, replace: '' },
      { find: /, TopParty/, replace: '' }
    ]
  },
  {
    file: 'components/ui/subtle-glow.tsx',
    changes: [
      { find: /, Transition/, replace: '' }
    ]
  },
  {
    file: 'components/ui/top-match-modal.tsx',
    changes: [
      { find: /, DialogHeader, DialogTitle/, replace: '' },
      { find: /, CardContent, CardHeader/, replace: '' }
    ]
  },
  {
    file: 'lib/api/profiles.ts',
    changes: [
      { find: /export interface UserProfileUpdate[^}]*}\n\n/, replace: '' }
    ]
  },
  {
    file: 'lib/api/results.ts',
    changes: [
      { find: /export interface UserResultUpdate[^}]*}\n\n/, replace: '' }
    ]
  },
  {
    file: 'lib/api/responses.ts',
    changes: [
      { find: /, ImportanceOptionKey/, replace: '' }
    ]
  }
];

fixes.forEach(({ file, changes }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    changes.forEach(({ find, replace }) => {
      const newContent = content.replace(find, replace);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    });
    
    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed imports in ${file}`);
    }
  }
});

console.log('🎉 Unused imports fixed!');
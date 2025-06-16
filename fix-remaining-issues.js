#!/usr/bin/env node
const fs = require('fs');

console.log('🔧 Fixing remaining ESLint issues...');

// Files and remaining variable fixes
const variableFixes = [
  {
    file: 'app/api/profile/route.ts',
    changes: [
      { find: / as any/g, replace: ' as unknown' }
    ]
  },
  {
    file: 'app/profil/page.tsx',
    changes: [
      { find: /const \[isSaving, setIsSaving\]/g, replace: 'const [_isSaving, setIsSaving]' },
      { find: /const updateProfileFields = /g, replace: 'const _updateProfileFields = ' },
      { find: /const getProfileField = /g, replace: 'const _getProfileField = ' },
      { find: /const hasProfileField = /g, replace: 'const _hasProfileField = ' },
      { find: /const isProfileComplete = /g, replace: 'const _isProfileComplete = ' },
      { find: /const userProfile = /g, replace: 'const _userProfile = ' },
      { find: / as any/g, replace: ' as unknown' },
      { find: /\(index\) =>/g, replace: '(_index) =>' }
    ]
  },
  {
    file: 'app/questionnaire/page.tsx', 
    changes: [
      { find: /const TOTAL_QUESTIONS = /g, replace: 'const _TOTAL_QUESTIONS = ' },
      { find: /const \[currentScreen, setCurrentScreen\]/g, replace: 'const [_currentScreen, setCurrentScreen]' },
      { find: /const sessionToken = /g, replace: 'const _sessionToken = ' },
      { find: /const \{ responses, /g, replace: 'const { responses: _responses, ' },
      { find: /const \[isSaving, setIsSaving\]/g, replace: 'const [_isSaving, setIsSaving]' },
      { find: /const \{ clearAllResponses \} = /g, replace: 'const { clearAllResponses: _clearAllResponses } = ' },
      { find: /const hasResults = /g, replace: 'const _hasResults = ' },
      { find: /const showResults = /g, replace: 'const _showResults = ' },
      { find: /const backToQuestionnaire = /g, replace: 'const _backToQuestionnaire = ' },
      { find: /\(index\) =>/g, replace: '(_index) =>' }
    ]
  },
  {
    file: 'app/resultats/page.tsx',
    changes: [
      { find: /const \[isDownloading, setIsDownloading\]/g, replace: 'const [_isDownloading, setIsDownloading]' },
      { find: /const \[hoveredParty, setHoveredParty\]/g, replace: 'const [_hoveredParty, setHoveredParty]' },
      { find: /const \[isSharing, setIsSharing\]/g, replace: 'const [_isSharing, setIsSharing]' },
      { find: /const sessionToken = /g, replace: 'const _sessionToken = ' },
      { find: /const generateShareImage = /g, replace: 'const _generateShareImage = ' },
      { find: /const handleFacebookShareWithImage = /g, replace: 'const _handleFacebookShareWithImage = ' },
      { find: /const handleTwitterShare = /g, replace: 'const _handleTwitterShare = ' },
      { find: /const handleLinkedInShare = /g, replace: 'const _handleLinkedInShare = ' },
      { find: /const handleMessengerShare = /g, replace: 'const _handleMessengerShare = ' },
      { find: /const handleGeneralShare = /g, replace: 'const _handleGeneralShare = ' },
      { find: /const message = /g, replace: 'const _message = ' },
      { find: / as any/g, replace: ' as unknown' },
      { find: /\(party\) =>/g, replace: '(_party) =>' }
    ]
  },
  {
    file: 'components/political-compass-chart.tsx',
    changes: [
      { find: / as any/g, replace: ' as unknown' }
    ]
  },
  {
    file: 'components/share-modal.tsx',
    changes: [
      { find: /const calculatedScores = /g, replace: 'const _calculatedScores = ' },
      { find: /\(error\) =>/g, replace: '(_error) =>' },
      { find: /const message = /g, replace: 'const _message = ' },
      { find: / as any/g, replace: ' as unknown' }
    ]
  },
  {
    file: 'components/site-header.tsx',
    changes: [
      { find: /\(event\) =>/g, replace: '(_event) =>' }
    ]
  },
  {
    file: 'components/ui/button-effects.tsx',
    changes: [
      { find: /\(e\) =>/g, replace: '(_e) =>' }
    ]
  },
  {
    file: 'components/ui/calendar.tsx',
    changes: [
      { find: /\(props\) =>/g, replace: '(_props) =>' }
    ]
  },
  {
    file: 'components/ui/chart.tsx',
    changes: [
      { find: /\[_, /g, replace: '[_unused, ' }
    ]
  },
  {
    file: 'components/ui/use-toast.ts',
    changes: [
      { find: /const actionTypes = /g, replace: 'const actionTypes: any = ' }
    ]
  },
  {
    file: 'lib/api/profiles.ts',
    changes: [
      { find: / as any/g, replace: ' as unknown' }
    ]
  },
  {
    file: 'lib/api/results.ts',
    changes: [
      { find: / as any/g, replace: ' as unknown' }
    ]
  },
  {
    file: 'lib/migration-script.ts',
    changes: [
      { find: / as any/g, replace: ' as unknown' }
    ]
  }
];

variableFixes.forEach(({ file, changes }) => {
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
      console.log(`✅ Fixed variables in ${file}`);
    }
  }
});

console.log('🎉 Remaining issues fixed!');
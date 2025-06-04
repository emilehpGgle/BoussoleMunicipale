# Project Requirements Document (PRD)
# Provincial Electoral Compass

## 1. Introduction

### 1.1 Document Purpose
This Project Requirements Document (PRD) defines the functional and technical specifications necessary for developing a "electoral compass" web application for provincial elections. It will serve as the main reference for the development team.

### 1.2 Project Scope
Development of an interactive web application allowing voters to compare their political opinions with the positions of parties and candidates during provincial elections, with enhanced features compared to the reference model (boussoleelectorale.com).

### 1.3 Definitions and Acronyms
- **PRD**: Project Requirements Document
- **API**: Application Programming Interface
- **UX/UI**: User Experience/User Interface
- **PWA**: Progressive Web Application
- **EMB**: Electoral Management Body

## 2. General Description

### 2.1 Project Context
The application aims to provide provincial voters with an interactive tool allowing them to better understand their political positioning and compare their opinions with those of competing parties and candidates. It draws inspiration from the existing Electoral Compass while offering significant improvements adapted to the provincial context.

### 2.2 Target Users
- Provincial voters of all ages
- Journalists and media covering elections
- Researchers and political analysts
- Educators and educational institutions
- Political parties and candidates

### 2.3 Operational Environment
- Web application accessible on computers, tablets, and smartphones
- Compatibility with modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for adaptation to different screen sizes
- Optimization for use with variable internet connection

## 3. Functional Requirements

### 3.1 Questionnaire Module

#### 3.1.1 Questionnaire Creation and Management
- **F1.1**: The system must allow the creation of a questionnaire containing between 20 and 30 questions.
- **F1.2**: Each question must be able to be associated with one or more thematic categories (economy, environment, health, etc.).
- **F1.3**: The system must support a 5-level Likert scale for responses (Strongly disagree to Strongly agree).
- **F1.4**: The system must allow the addition of a "No opinion" option for each question.
- **F1.5**: The system must allow administrators to modify the questionnaire.

#### 3.1.2 Question Weighting
- **F1.6**: Users must be able to assign an importance level to each question (Very important, Important, Not very important).
- **F1.7**: The system must incorporate this weighting in the final positioning calculation.

#### 3.1.3 Progress and Saving
- **F1.8**: The system must display a progress bar while the user answers the questionnaire.
- **F1.9**: The system must allow the user to temporarily save their responses and resume later (via cookie or user account).
- **F1.10**: The system must provide a summary of responses before final submission.

### 3.2 Party Positioning Module

#### 3.2.1 Position Database
- **F2.1**: The system must maintain a database of official party positions on each question.
- **F2.2**: Each position must be associated with verifiable sources (links to documents, statements, etc.).
- **F2.3**: The system must allow positions to be updated in case of changes during the campaign.

#### 3.2.2 Positioning Methodology
- **F2.4**: The system must implement an algorithm to calculate the distance between user positions and those of parties.
- **F2.5**: The system must take into account question weighting in this calculation.
- **F2.6**: The system must allow the use of different distance metrics (Euclidean, Manhattan, etc.).

#### 3.2.3 Methodological Transparency
- **F2.7**: The system must provide a clear explanation of the methodology used.
- **F2.8**: The system must allow the user to consult the sources used to determine party positions.
- **F2.9**: The system must clearly indicate when a position is extrapolated or uncertain.

### 3.3 Results Visualization Module

#### 3.3.1 Positioning Graph
- **F3.1**: The system must generate a two-dimensional graph (socio-economic and socio-cultural axes) showing the positioning of the user and parties.
- **F3.2**: The system must allow the user to zoom and explore the graph.
- **F3.3**: The system must display clear labels for each party and for the user.

#### 3.3.2 Concordance Table
- **F3.4**: The system must generate a table showing the percentage of concordance between the user and each party.
- **F3.5**: The system must allow filtering this table by theme.
- **F3.6**: The system must display a ranking of parties from closest to furthest from the user's positions.

#### 3.3.3 Thematic Visualizations
- **F3.7**: The system must generate specific graphs for each theme (economy, environment, etc.).
- **F3.8**: The system must allow direct comparison between the user and a specific party across all questions.
- **F3.9**: The system must generate a visualization of questions where the user agrees/disagrees with each party.

### 3.4 Provincial Contextualization Module

#### 3.4.1 Regional Adaptation
- **F4.1**: The system must allow filtering results by provincial constituency.
- **F4.2**: The system must display a map of the province with constituencies.
- **F4.3**: The system must allow the integration of demographic and electoral data by region.

#### 3.4.2 Provincial Issues
- **F4.4**: The system must provide contextual explanations on issues specific to the province.
- **F4.5**: The system must allow comparison of positions on specifically provincial competencies.
- **F4.6**: The system must integrate historical data on previous provincial elections.

#### 3.4.3 Provincial Parties
- **F4.7**: The system must manage regional or provincial parties without federal equivalents.
- **F4.8**: The system must distinguish positions of provincial parties from those of their federal counterparts.
- **F4.9**: The system must allow analysis of coalitions and alliances specific to the provincial context.

### 3.5 Educational Module

#### 3.5.1 Explanatory Cards
- **F5.1**: The system must provide an explanatory card for each question in the questionnaire.
- **F5.2**: Each card must include the context, issues, and different possible positions.
- **F5.3**: Cards must include references and sources for further exploration.

#### 3.5.2 Educational Resources
- **F5.4**: The system must offer educational resources on the provincial political system.
- **F5.5**: The system must include a glossary of political terms used.
- **F5.6**: The system must offer interactive quizzes on the provincial electoral system.

#### 3.5.3 Comparative Analysis
- **F5.7**: The system must allow direct comparison between two or more parties.
- **F5.8**: The system must provide an analysis of the main differences between parties.
- **F5.9**: The system must allow exploration of historical party positions on key issues.

### 3.6 Sharing and Community Module

#### 3.6.1 Results Sharing
- **F6.1**: The system must allow sharing results on social networks.
- **F6.2**: The system must generate shareable images summarizing the user's results.
- **F6.3**: The system must allow sending results by email.

#### 3.6.2 Comparison with Other Users
- **F6.4**: The system must allow anonymous comparison of results with the average of other users.
- **F6.5**: The system must allow the creation of comparison groups (family, friends, colleagues).
- **F6.6**: The system must generate anonymized aggregated statistics by region, age, etc.

#### 3.6.3 Forums and Discussions
- **F6.7**: The system must integrate moderated discussion forums on electoral issues.
- **F6.8**: The system must allow users to submit questions to candidates.
- **F6.9**: The system must facilitate the organization of virtual debates based on aggregated results.

### 3.7 Administration Module

#### 3.7.1 Content Management
- **F7.1**: The system must provide an administration interface to manage the questionnaire.
- **F7.2**: The system must allow updating party positions.
- **F7.3**: The system must allow management of educational resources.

#### 3.7.2 Moderation
- **F7.4**: The system must provide moderation tools for forums and discussions.
- **F7.5**: The system must allow management of inappropriate content reports.
- **F7.6**: The system must allow temporary or permanent suspension of problematic user accounts.

#### 3.7.3 Analytics
- **F7.7**: The system must provide usage statistics (number of users, completion rate, etc.).
- **F7.8**: The system must allow export of anonymized data for analysis.
- **F7.9**: The system must generate periodic reports on platform usage.

## 4. Non-functional Requirements

### 4.1 Performance

- **NF1.1**: Initial application loading time must not exceed 3 seconds on a standard connection.
- **NF1.2**: Response time for calculation and display of results must not exceed 2 seconds.
- **NF1.3**: The system must be able to support at least 10,000 simultaneous users.
- **NF1.4**: The database must be able to store data from several million users.
- **NF1.5**: Visualizations must display in less than 1 second after results calculation.

### 4.2 Security

- **NF2.1**: All communications must be encrypted via HTTPS.
- **NF2.2**: Users' personal data must be stored in an encrypted manner.
- **NF2.3**: The system must implement protection against CSRF, XSS, and SQL injection attacks.
- **NF2.4**: The system must allow two-factor authentication for administrator accounts.
- **NF2.5**: The system must log all administrative actions for audit.

### 4.3 Reliability

- **NF3.1**: The system must have 99.9% availability during the electoral period.
- **NF3.2**: The system must include automatic data backup mechanisms.
- **NF3.3**: The system must be able to recover automatically after a failure without data loss.
- **NF3.4**: The system must gracefully handle load spikes during televised debates or media events.
- **NF3.5**: The system must maintain data integrity in case of interruption during questionnaire submission.

### 4.4 Accessibility

- **NF4.1**: The application must comply with WCAG 2.1 level AA standards.
- **NF4.2**: The interface must be compatible with screen readers.
- **NF4.3**: The application must offer a high-contrast mode for visually impaired users.
- **NF4.4**: The application must allow complete keyboard navigation.
- **NF4.5**: Videos and audio content must include subtitles and transcriptions.

### 4.5 Usability

- **NF5.1**: The user interface must be intuitive and not require prior training.
- **NF5.2**: The questionnaire must be completable in less than 15 minutes by an average user.
- **NF5.3**: The application must provide contextual help at each step.
- **NF5.4**: The application must be tested with representative users of different levels of digital competence.
- **NF5.5**: The application must offer a consistent experience across all supported devices and browsers.

### 4.6 Multilingualism

- **NF6.1**: The application must be available in French (default language) and English.
- **NF6.2**: All application content must be fully translated into both official languages.
- **NF6.3**: The user interface must allow easy switching between languages at any time.
- **NF6.4**: The default language must be French, with an explicit option to switch to English.
- **NF6.5**: The application must allow future addition of other languages, particularly Indigenous languages depending on the province.
- **NF6.6**: Language switching must be possible at any time without data loss.
- **NF6.7**: All educational resources must be available in both official languages.
- **NF6.8**: The system must automatically detect the user's preferred language while respecting the priority of French.
- **NF6.9**: Results and visualizations must automatically adapt to the selected language.
- **NF6.10**: The content management system must facilitate translation maintenance.

### 4.7 Legal Compliance

- **NF7.1**: The application must comply with provincial laws on personal data protection.
- **NF7.2**: The application must respect provincial electoral rules regarding the campaign period.
- **NF7.3**: The application must include clear legal notices and terms of use.
- **NF7.4**: The application must obtain explicit user consent for data collection.
- **NF7.5**: The application must allow users to exercise their rights of access, rectification, and erasure of data.

## 5. Technical Architecture

### 5.1 General Architecture

The application will be developed as a progressive web application (PWA) with a layered architecture:

1. **Presentation layer**: Responsive user interface
2. **Application layer**: Business logic and data processing
3. **Data layer**: Storage and data management
4. **Services layer**: API and external integrations

### 5.2 Recommended Technologies

#### 5.2.1 Frontend
- **Framework**: React.js with TypeScript
- **UI Library**: Tailwind CSS with shadcn/ui components
- **Visualization**: D3.js and Recharts for interactive graphs
- **State**: Redux or Context API for state management
- **Tests**: Jest and React Testing Library
- **Internationalization**: i18next for translation management

#### 5.2.2 Backend
- **Framework**: Flask (Python)
- **API**: RESTful with OpenAPI documentation
- **Authentication**: JWT for user sessions
- **Validation**: Pydantic for data validation
- **Tests**: Pytest for unit and integration tests
- **Internationalization**: Flask-Babel for server-side translation management

#### 5.2.3 Database
- **Main**: MySQL for structured data
- **Cache**: Redis for temporary data and sessions
- **Search**: Elasticsearch for advanced search (optional)
- **Migration**: Alembic for migration management

#### 5.2.4 Infrastructure
- **Deployment**: Docker and Docker Compose
- **CI/CD**: GitHub Actions or GitLab CI
- **Hosting**: AWS, Azure, or GCP
- **CDN**: Cloudflare for distribution optimization
- **Monitoring**: Prometheus and Grafana

### 5.3 Data Model

#### 5.3.1 Main Entities
- **Users**: Profile information, preferences, results
- **Questions**: Text, category, metadata
- **Parties**: Name, logo, description, positions
- **Responses**: User-question-response linkage
- **Resources**: Educational content, media, references
- **Translations**: Storage of translated strings for all supported languages

#### 5.3.2 Relationships
- A user can answer multiple questions
- A question belongs to one or more categories
- A party has a position on each question
- A resource can be linked to multiple questions or parties
- Each textual element is linked to its translations in different languages

#### 5.3.3 Simplified Schema
```
users (id, email, password_hash, creation_date, preferences, language_preference)
questions (id, category_id, importance, order)
questions_translations (id, question_id, language, text)
categories (id)
categories_translations (id, category_id, language, name, description)
parties (id, logo_url)
parties_translations (id, party_id, language, name, description)
party_positions (id, party_id, question_id, position, source_url)
user_responses (id, user_id, question_id, response, importance)
resources (id, type, url)
resources_translations (id, resource_id, language, title, content)
resource_links (id, resource_id, entity_id, entity_type)
```

## 6. External Interfaces

### 6.1 Integrations with External Systems

#### 6.1.1 Social Networks
- **Facebook API**: Results sharing, authentication
- **Twitter API**: Results sharing, authentication
- **LinkedIn API**: Results sharing, authentication

#### 6.1.2 Electoral Data Sources
- **Provincial electoral bodies API**: Data on constituencies, candidates
- **Open data API**: Historical electoral results, demographic data
- **Media API**: Integration of news content related to elections

#### 6.1.3 Analytical Services
- **Google Analytics**: Usage and behavior tracking
- **Hotjar** (or equivalent): Heat maps and session recordings
- **Matomo**: Privacy-friendly alternative for analytics

### 6.2 Public API

The application will expose a public API allowing third parties to integrate certain functionalities:

- **GET /api/questions**: List of questionnaire questions
- **GET /api/parties**: List of parties and basic information
- **GET /api/positions**: Party positions on questions
- **POST /api/calculate**: Positioning calculation based on provided responses
- **GET /api/stats**: Anonymized aggregated statistics

## 7. Constraints and Dependencies

### 7.1 Technical Constraints
- The application must work on supported browsers up to 2 major versions back
- Deployment time for a new version must not exceed 30 minutes
- Total size of frontend resources must not exceed 2 MB for initial loading

### 7.2 Organizational Constraints
- Development must follow an agile methodology with 2-week sprints
- Code must be reviewed by at least one other developer before being merged
- Documentation must be updated at the same time as code
- All user interfaces and content must be available in French and English

### 7.3 External Dependencies
- Availability of official party positions
- Access to provincial electoral data
- Compliance with current electoral rules
- Translation services to maintain linguistic consistency

## 8. Acceptance Criteria

### 8.1 Functional Tests
- All main use cases must be tested and validated
- Questionnaire results must be consistent and reproducible
- Visualizations must faithfully represent the data
- Navigation between languages must work perfectly without loss of context

### 8.2 Performance Tests
- The application must meet performance requirements under simulated load
- Response times must remain stable even with a large number of simultaneous users
- Server resource consumption must remain within defined limits

### 8.3 Accessibility Tests
- The application must pass WCAG 2.1 AA automated accessibility tests
- The application must be tested with common screen readers
- The application must be usable under different conditions (contrast, text size, etc.)

### 8.4 Security Tests
- The application must pass a comprehensive security audit
- No critical or major vulnerabilities must be present
- Sensitive data must be properly protected

### 8.5 Linguistic Tests
- All content must be correctly translated into both official languages
- Terminological consistency must be maintained across all translations
- Interfaces must properly adapt to different text lengths depending on the language

## 9. Deliverables

### 9.1 Documentation
- Detailed API specifications
- Technical architecture guide
- Administration manual
- User guide (in French and English)

### 9.2 Source Code
- Complete Git repository with history
- Deployment and configuration scripts
- Automated tests
- Translation files for all supported languages

### 9.3 Database
- Schema creation scripts
- Migration scripts
- Initial dataset for testing
- Initial translation data

### 9.4 Deployed Application
- Deployed and accessible production version
- Staging version for testing
- Configured development environment

## 10. Planning and Milestones

### 10.1 Project Phases
1. **Design Phase** (4 weeks)
   - Specification finalization
   - Architecture design
   - UI/UX mockups
   - Multilingualism strategy definition

2. **Development Phase** (12 weeks)
   - Backend development (6 weeks)
   - Frontend development (8 weeks, starting after 2 weeks of backend)
   - Translation system implementation (2 weeks)
   - Continuous integration (2 weeks)

3. **Testing Phase** (4 weeks)
   - Functional tests
   - Performance tests
   - Accessibility tests
   - Security tests
   - Linguistic tests

4. **Deployment Phase** (2 weeks)
   - Production deployment
   - Administrator training
   - Final documentation

### 10.2 Key Milestones
- M1: Specification validation (week 4)
- M2: Functional backend API (week 10)
- M3: Complete user interface (week 14)
- M4: Translation system implemented (week 16)
- M5: Successful complete tests (week 18)
- M6: Production deployment (week 20)
- M7: Public launch (week 22)

## 11. Risks and Mitigations

### 11.1 Identified Risks
1. **Change in party positions during development**
   - Impact: Medium
   - Probability: High
   - Mitigation: Flexible architecture allowing rapid position updates

2. **Unexpected traffic spike**
   - Impact: High
   - Probability: Medium
   - Mitigation: Scalable architecture and preventive load tests

3. **Methodology contestation**
   - Impact: High
   - Probability: Medium
   - Mitigation: Transparent documentation and validation by independent experts

4. **Delay in obtaining official party positions**
   - Impact: Medium
   - Probability: High
   - Mitigation: Parallel documentary research process

5. **Undetected accessibility issues**
   - Impact: Medium
   - Probability: Medium
   - Mitigation: Early testing with users having different needs

6. **Inconsistencies in translations**
   - Impact: Medium
   - Probability: High
   - Mitigation: Linguistic review process and terminological glossary

### 11.2 Contingency Plan
- Provide a minimum viable version with reduced functionalities
- Establish rollback procedures in case of major problems
- Provide additional resources for critical periods
- Have a team of translators available for quick corrections

## 12. Appendices

### 12.1 Glossary
- **Electoral compass**: Interactive tool allowing voters to compare their opinions with political party positions
- **Likert scale**: Psychometric scale used in questionnaires to evaluate the degree of agreement or disagreement
- **API**: Application Programming Interface allowing software to communicate with each other
- **PWA**: Progressive Web Application offering a user experience similar to a native application

### 12.2 References
- Reference site: https://boussoleelectorale.com/
- Methodological documentation: https://www.voxpoplabs.com/votecompass/methodology.pdf
- IDEA Manual on Electoral Management: http://www.eods.eu/library/IDEA.Electoral-Management-DesignFR.pdf

### 12.3 Conceptual Mockups
- Home page
- Questionnaire
- Results visualization
- User profile
- Administration interface
- Language selector

---

Document prepared on June 1, 2025
Version 1.1

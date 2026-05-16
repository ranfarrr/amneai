import apilot from './apilot.json';
import toeicLearner from './toeic-learner.json';
import galaxiumTravels from './galaxium-travels.json';

export const repositories = [
  {
    id: 'apilot',
    name: 'APIlot',
    description: 'AI-powered API documentation navigator',
    tags: ['React', 'AI', 'n8n', 'Vite'],
    data: apilot
  },
  {
    id: 'toeic-learner',
    name: 'Interactive TOEIC Learner',
    description: '3-phase progressive TOEIC learning platform',
    tags: ['React', 'Education', 'Interactive'],
    data: toeicLearner
  },
  {
    id: 'galaxium-travels',
    name: 'Galaxium Travels',
    description: 'Interplanetary flight booking system',
    tags: ['FastAPI', 'React', 'TypeScript', 'IBM'],
    data: galaxiumTravels
  }
];

export default repositories;

// Made with Bob

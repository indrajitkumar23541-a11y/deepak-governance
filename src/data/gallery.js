import seminarImg from '../assets/gallery-seminar.png';
import collegeImg from '../assets/gallery-college.png';
import studyImg from '../assets/gallery-study.png';

export const initialGalleryData = [
  {
    id: '1',
    title: 'Paper Presentation at State Seminar',
    category: 'Academic',
    description: 'Presenting a research paper on Mughal Administrative systems.',
    image: seminarImg,
    date: 'March 2025'
  },
  {
    id: '2',
    title: 'University Library Studies',
    category: 'Academic',
    description: 'Reference reading session for BA examinations.',
    image: collegeImg,
    date: 'February 2025'
  },
  {
    id: '3',
    title: 'Geography Map Practice Desk',
    category: 'Study',
    description: 'Analyzing and practicing district map drawings of Bihar.',
    image: studyImg,
    date: 'June 2026'
  }
];

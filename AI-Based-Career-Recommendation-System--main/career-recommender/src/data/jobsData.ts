export interface Job {
  id: string;
  company: string;
  department: string;
  type: 'Full-time' | 'Internship';
  title: string;
  location: string;
  salary: string;
  skills: string[];
  applyBy: string;
}

export const jobsData: Record<string, { jobs: Job[], internships: Job[] }> = {
  "AI Researcher": {
    jobs: [
      {
        id: "ai-res-1",
        company: "Research Cortex AI",
        department: "Artificial Intelligence",
        type: "Full-time",
        title: "AI Research Scientist",
        location: "Bengaluru, Karnataka",
        salary: "₹28L/yr",
        skills: ["PyTorch", "TensorFlow", "Research Publications", "Reinforcement Learning"],
        applyBy: "Aug 30, 2024"
      },
      {
        id: "ai-res-2",
        company: "MetaLogic Labs",
        department: "AI Research",
        type: "Full-time",
        title: "Computer Vision Researcher",
        location: "Hyderabad, Telangana",
        salary: "₹26L/yr",
        skills: ["Computer Vision", "Deep Learning", "Python", "OpenCV"],
        applyBy: "Sep 15, 2024"
      },
      {
        id: "ai-res-3",
        company: "QAI Research Institute",
        department: "Fundamental AI",
        type: "Full-time",
        title: "NLP Research Engineer",
        location: "Pune, Maharashtra",
        salary: "₹24L/yr",
        skills: ["Natural Language Processing", "Transformers", "LLMs", "Python"],
        applyBy: "Aug 20, 2024"
      },
      {
        id: "ai-res-4",
        company: "Axiom Intelligence",
        department: "AI R&D",
        type: "Full-time",
        title: "Reinforcement Learning Scientist",
        location: "Gurgaon, Haryana",
        salary: "₹30L/yr",
        skills: ["Reinforcement Learning", "Simulation Environments", "Python"],
        applyBy: "Sep 05, 2024"
      }
    ],
    internships: [
      {
        id: "ai-res-int-1",
        company: "AI Research Hub",
        department: "AI Safety",
        type: "Internship",
        title: "AI Alignment Research Intern",
        location: "Remote",
        salary: "₹35k/mo",
        skills: ["AI Ethics", "Machine Learning", "Research Methodology"],
        applyBy: "Jul 25, 2024"
      },
      {
        id: "ai-res-int-2",
        company: "Nexus Language Tech",
        department: "NLP Research",
        type: "Internship",
        title: "NLP Research Intern",
        location: "Chennai, Tamil Nadu",
        salary: "₹30k/mo",
        skills: ["Python", "NLP", "Linguistics"],
        applyBy: "Aug 10, 2024"
      },
      {
        id: "ai-res-int-3",
        company: "Computer Vision Works",
        department: "Perception",
        type: "Internship",
        title: "Computer Vision Research Intern",
        location: "Bengaluru, Karnataka",
        salary: "₹32k/mo",
        skills: ["Python", "OpenCV", "Deep Learning"],
        applyBy: "Jul 30, 2024"
      },
      {
        id: "ai-res-int-4",
        company: "Deep Learning Labs",
        department: "AI Theory",
        type: "Internship",
        title: "AI Theory & Methods Intern",
        location: "Hyderabad, Telangana",
        salary: "₹28k/mo",
        skills: ["Mathematics", "Statistics", "Python"],
        applyBy: "Aug 05, 2024"
      }
    ]
  },
  "Data Scientist": {
    jobs: [
      {
        id: "ds-1",
        company: "DataScience Solutions",
        department: "Consulting",
        type: "Full-time",
        title: "Data Scientist",
        location: "Bengaluru, Karnataka",
        salary: "₹14L/yr",
        skills: ["Python", "Machine Learning", "SQL", "Statistics"],
        applyBy: "Aug 30, 2024"
      },
      {
        id: "ds-2",
        company: "ML Science Labs",
        department: "Research & Development",
        type: "Full-time",
        title: "Machine Learning Scientist",
        location: "Hyderabad, Telangana",
        salary: "₹16L/yr",
        skills: ["Deep Learning", "NLP", "Computer Vision"],
        applyBy: "Sep 05, 2024"
      },
      {
        id: "ds-3",
        company: "Product Data Scientists",
        department: "Product",
        type: "Full-time",
        title: "Product Data Scientist",
        location: "Gurgaon, Haryana",
        salary: "₹15L/yr",
        skills: ["A/B Testing", "Statistics", "Product Analytics"],
        applyBy: "Aug 25, 2024"
      },
      {
        id: "ds-4",
        company: "AI Scientists Inc.",
        department: "Advanced ML",
        type: "Full-time",
        title: "Senior Data Scientist",
        location: "Pune, Maharashtra",
        salary: "₹20L/yr",
        skills: ["Python", "MLOps", "Model Deployment"],
        applyBy: "Sep 12, 2024"
      }
    ],
    internships: [
      {
        id: "ds-int-1",
        company: "Data Science Interns",
        department: "Modeling",
        type: "Internship",
        title: "Data Science Intern",
        location: "Mumbai, Maharashtra",
        salary: "₹35k/mo",
        skills: ["Python", "Scikit-learn", "Pandas"],
        applyBy: "Jul 20, 2024"
      },
      {
        id: "ds-int-2",
        company: "Machine Learning Interns",
        department: "ML",
        type: "Internship",
        title: "Machine Learning Intern",
        location: "Remote",
        salary: "₹32k/mo",
        skills: ["Python", "TensorFlow", "Data Preprocessing"],
        applyBy: "Aug 05, 2024"
      },
      {
        id: "ds-int-3",
        company: "NLP Internals",
        department: "NLP",
        type: "Internship",
        title: "NLP Intern",
        location: "Chennai, Tamil Nadu",
        salary: "₹34k/mo",
        skills: ["Python", "NLTK", "spaCy"],
        applyBy: "Jul 28, 2024"
      },
      {
        id: "ds-int-4",
        company: "Product DS Interns",
        department: "Product",
        type: "Internship",
        title: "Product Data Science Intern",
        location: "Bengaluru, Karnataka",
        salary: "₹30k/mo",
        skills: ["SQL", "Statistics", "Experimentation"],
        applyBy: "Aug 15, 2024"
      }
    ]
  },
  "Software Engineer": {
    jobs: [
      {
        id: "se-1",
        company: "Software Engineers Ltd.",
        department: "Engineering",
        type: "Full-time",
        title: "Software Engineer",
        location: "Bengaluru, Karnataka",
        salary: "₹15L/yr",
        skills: ["Java", "Microservices", "SQL", "System Design"],
        applyBy: "Aug 18, 2024"
      },
      {
        id: "se-2",
        company: "Senior Software Engineers",
        department: "Leadership",
        type: "Full-time",
        title: "Senior Software Engineer",
        location: "Hyderabad, Telangana",
        salary: "₹20L/yr",
        skills: ["Java/Python", "Architecture", "Mentoring"],
        applyBy: "Sep 01, 2024"
      },
      {
        id: "se-3",
        company: "Distributed Systems Eng",
        department: "Scalability",
        type: "Full-time",
        title: "Distributed Systems Engineer",
        location: "Pune, Maharashtra",
        salary: "₹22L/yr",
        skills: ["Go/Java", "Distributed Systems", "Databases"],
        applyBy: "Aug 28, 2024"
      },
      {
        id: "se-4",
        company: "Full Stack Engineers",
        department: "Full Stack",
        type: "Full-time",
        title: "Software Engineer - Full Stack",
        location: "Gurgaon, Haryana",
        salary: "₹16L/yr",
        skills: ["JavaScript", "Node.js", "React"],
        applyBy: "Sep 05, 2024"
      }
    ],
    internships: [
      {
        id: "se-int-1",
        company: "Software Engineering Interns",
        department: "Development",
        type: "Internship",
        title: "Software Engineering Intern",
        location: "Mumbai, Maharashtra",
        salary: "₹30k/mo",
        skills: ["Java/Python", "Data Structures", "Algorithms"],
        applyBy: "Jul 22, 2024"
      },
      {
        id: "se-int-2",
        company: "Systems Software Interns",
        department: "Systems",
        type: "Internship",
        title: "Systems Programming Intern",
        location: "Remote",
        salary: "₹28k/mo",
        skills: ["C/C++", "Operating Systems", "Networking"],
        applyBy: "Aug 05, 2024"
      },
      {
        id: "se-int-3",
        company: "Web Software Interns",
        department: "Web",
        type: "Internship",
        title: "Web Software Engineer Intern",
        location: "Bengaluru, Karnataka",
        salary: "₹26k/mo",
        skills: ["JavaScript", "Node.js", "HTML/CSS"],
        applyBy: "Jul 25, 2024"
      },
      {
        id: "se-int-4",
        company: "Distributed Systems Interns",
        department: "Distributed",
        type: "Internship",
        title: "Distributed Systems Intern",
        location: "Hyderabad, Telangana",
        salary: "₹32k/mo",
        skills: ["Java/Go", "Concurrency", "Networking"],
        applyBy: "Aug 12, 2024"
      }
    ]
  },
  "UX Designer": {
    jobs: [
      {
        id: "ux-1",
        company: "UX Design Studio",
        department: "Design",
        type: "Full-time",
        title: "UX Designer",
        location: "Bengaluru, Karnataka",
        salary: "₹13L/yr",
        skills: ["User Research", "Wireframing", "Prototyping", "Figma"],
        applyBy: "Aug 20, 2024"
      },
      {
        id: "ux-2",
        company: "Interaction UX Pros",
        department: "Interaction",
        type: "Full-time",
        title: "Interaction Designer",
        location: "Mumbai, Maharashtra",
        salary: "₹14L/yr",
        skills: ["Interaction Design", "Prototyping", "Design Systems"],
        applyBy: "Sep 01, 2024"
      },
      {
        id: "ux-3",
        company: "Product UX Designers",
        department: "Product",
        type: "Full-time",
        title: "Product Designer",
        location: "Gurgaon, Haryana",
        salary: "₹15L/yr",
        skills: ["End-to-End Design", "User Testing", "Collaboration"],
        applyBy: "Aug 25, 2024"
      },
      {
        id: "ux-4",
        company: "Senior UX Architects",
        department: "Strategy",
        type: "Full-time",
        title: "Senior UX Designer",
        location: "Pune, Maharashtra",
        salary: "₹17L/yr",
        skills: ["Design Strategy", "Mentoring", "Complex Apps"],
        applyBy: "Sep 05, 2024"
      }
    ],
    internships: [
      {
        id: "ux-int-1",
        company: "UX Design Interns",
        department: "Design",
        type: "Internship",
        title: "UX Design Intern",
        location: "Hyderabad, Telangana",
        salary: "₹22k/mo",
        skills: ["Figma", "Wireframing", "User Flows"],
        applyBy: "Jul 18, 2024"
      },
      {
        id: "ux-int-2",
        company: "UI/UX Design Interns",
        department: "UI/UX",
        type: "Internship",
        title: "UI/UX Design Intern",
        location: "Remote",
        salary: "₹20k/mo",
        skills: ["Figma", "Visual Design", "Prototyping"],
        applyBy: "Aug 10, 2024"
      },
      {
        id: "ux-int-3",
        company: "User Research Interns",
        department: "Research",
        type: "Internship",
        title: "User Research Intern",
        location: "Chennai, Tamil Nadu",
        salary: "₹23k/mo",
        skills: ["User Interviews", "Surveys", "Usability Testing"],
        applyBy: "Jul 30, 2024"
      },
      {
        id: "ux-int-4",
        company: "Interaction Design Interns",
        department: "Interaction",
        type: "Internship",
        title: "Interaction Design Intern",
        location: "Delhi, Delhi",
        salary: "₹24k/mo",
        skills: ["Prototyping", "Micro-interactions", "Animation"],
        applyBy: "Aug 05, 2024"
      }
    ]
  },
  "Product Manager": {
    jobs: [
      {
        id: "pm-1",
        company: "Product Managers Co.",
        department: "IT",
        type: "Full-time",
        title: "IT Project Manager",
        location: "Pune, Maharashtra",
        salary: "₹18L/yr",
        skills: ["Agile", "Scrum", "JIRA", "Stakeholder Mgmt"],
        applyBy: "Aug 30, 2024"
      },
      {
        id: "pm-2",
        company: "Technical PM Inc.",
        department: "Technical",
        type: "Full-time",
        title: "Technical Project Manager",
        location: "Bengaluru, Karnataka",
        salary: "₹20L/yr",
        skills: ["Software Development", "Agile", "Risk Management"],
        applyBy: "Sep 05, 2024"
      },
      {
        id: "pm-3",
        company: "PMO Leaders",
        department: "Governance",
        type: "Full-time",
        title: "Project Manager - PMO",
        location: "Hyderabad, Telangana",
        salary: "₹17L/yr",
        skills: ["Project Governance", "Reporting", "Process Improvement"],
        applyBy: "Aug 25, 2024"
      },
      {
        id: "pm-4",
        company: "Construction Project Mgrs",
        department: "Construction",
        type: "Full-time",
        title: "Construction Project Manager",
        location: "Mumbai, Maharashtra",
        salary: "₹15L/yr",
        skills: ["Construction Management", "Budgeting", "Scheduling"],
        applyBy: "Sep 10, 2024"
      }
    ],
    internships: [
      {
        id: "pm-int-1",
        company: "Project Management Interns",
        department: "Support",
        type: "Internship",
        title: "Project Management Intern",
        location: "Gurgaon, Haryana",
        salary: "₹25k/mo",
        skills: ["JIRA", "Excel", "Documentation"],
        applyBy: "Jul 20, 2024"
      },
      {
        id: "pm-int-2",
        company: "Agile Interns",
        department: "Agile",
        type: "Internship",
        title: "Agile Project Management Intern",
        location: "Remote",
        salary: "₹22k/mo",
        skills: ["Agile Principles", "Scrum", "Communication"],
        applyBy: "Aug 01, 2024"
      },
      {
        id: "pm-int-3",
        company: "Technical PM Interns",
        department: "Technical",
        type: "Internship",
        title: "Technical PM Intern",
        location: "Delhi, Delhi",
        salary: "₹28k/mo",
        skills: ["Technical Understanding", "JIRA", "Meeting Facilitation"],
        applyBy: "Jul 28, 2024"
      },
      {
        id: "pm-int-4",
        company: "PMO Interns",
        department: "Governance",
        type: "Internship",
        title: "PMO Intern",
        location: "Chennai, Tamil Nadu",
        salary: "₹24k/mo",
        skills: ["Data Entry", "Reporting", "PPT"],
        applyBy: "Aug 15, 2024"
      }
    ]
  }
};

// Function to get jobs for a specific career
export const getJobsForCareer = (career: string) => {
  // Direct match
  if (jobsData[career]) {
    return jobsData[career];
  }
  
  // Fuzzy matching for similar careers
  const careerLower = career.toLowerCase();
  
  if (careerLower.includes('data scientist') || careerLower.includes('data science')) {
    return jobsData["Data Scientist"];
  }
  
  if (careerLower.includes('software engineer') || careerLower.includes('software developer')) {
    return jobsData["Software Engineer"];
  }
  
  if (careerLower.includes('ai') || careerLower.includes('artificial intelligence')) {
    return jobsData["AI Researcher"];
  }
  
  if (careerLower.includes('ux') || careerLower.includes('user experience') || careerLower.includes('ui/ux')) {
    return jobsData["UX Designer"];
  }
  
  if (careerLower.includes('product manager') || careerLower.includes('project manager')) {
    return jobsData["Product Manager"];
  }
  
  // Default fallback to Data Scientist if no match found
  return jobsData["Data Scientist"];
};
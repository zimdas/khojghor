import { 
  Article, 
  CategoryInfo, 
  EarningStructuredData, 
  ToolItem, 
  VideoItem, 
  AdPlacement, 
  SiteSettings, 
  StaticPage,
  AdCampaign,
  AdFrequencySettings,
  AdApiIntegration 
} from '../types';

export const INITIAL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat_ai',
    slug: 'ai',
    nameBn: 'এআই ও কৃত্রিম বুদ্ধিমত্তা',
    nameEn: 'AI & Intelligence',
    descriptionBn: 'সর্বশেষ AI মডেল, প্রম্পট টেকনিক, ইমেজ/ভিডিও জেনারেশন এবং প্র্যাকটিক্যাল গাইড।',
    subcategories: [
      { slug: 'tools', nameBn: 'এআই টুলস', nameEn: 'AI Tools' },
      { slug: 'models', nameBn: 'লার্জ ল্যাঙ্গুয়েজ মডেল', nameEn: 'LLMs' },
      { slug: 'tutorials', nameBn: 'টিউটোরিয়াল', nameEn: 'Tutorials' },
      { slug: 'image-ai', nameBn: 'ইমেজ এআই', nameEn: 'Image AI' },
      { slug: 'video-ai', nameBn: 'ভিডিও এআই', nameEn: 'Video AI' },
      { slug: 'writing-ai', nameBn: 'রাইটিং এআই', nameEn: 'Writing AI' },
      { slug: 'student-ai', nameBn: 'স্টুডেন্ট এআই', nameEn: 'Student AI' },
      { slug: 'productivity-ai', nameBn: 'প্রোডাক্টিভিটি এআই', nameEn: 'Productivity AI' },
      { slug: 'projects', nameBn: 'এআই প্রজেক্টস', nameEn: 'Projects' }
    ],
    icon: 'Sparkles'
  },
  {
    id: 'cat_tech',
    slug: 'tech',
    nameBn: 'প্রযুক্তি ও টিপস',
    nameEn: 'Technology',
    descriptionBn: 'অ্যান্ড্রয়েড, উইন্ডোজ, দরকারি সফটওয়্যার, সাইবার নিরাপত্তা ও গ্যাজেট টিপস।',
    subcategories: [
      { slug: 'android', nameBn: 'অ্যান্ড্রয়েড', nameEn: 'Android' },
      { slug: 'windows', nameBn: 'উইন্ডোজ', nameEn: 'Windows' },
      { slug: 'apps', nameBn: 'অ্যাপস ও সফটওয়্যার', nameEn: 'Apps & Software' },
      { slug: 'how-to', nameBn: 'কীভাবে করবেন', nameEn: 'How-To' },
      { slug: 'troubleshooting', nameBn: 'সমস্যা সমাধান', nameEn: 'Troubleshooting' },
      { slug: 'security', nameBn: 'নিরাপত্তা ও প্রাইভেসি', nameEn: 'Security' }
    ],
    icon: 'Cpu'
  },
  {
    id: 'cat_earn',
    slug: 'earn',
    nameBn: 'উপার্জন ও ফ্রিল্যান্সিং',
    nameEn: 'Earn & Career',
    descriptionBn: 'বাস্তবধর্মী ফ্রিল্যান্সিং, রিমোট জব, ডিজিটাল স্কিল ও সঠিক গাইডলাইন (কোনো অবাস্তব প্রতিশ্রুতি নেই)।',
    subcategories: [
      { slug: 'freelancing', nameBn: 'ফ্রিল্যান্সিং', nameEn: 'Freelancing' },
      { slug: 'remote-jobs', nameBn: 'রিমোট জবস', nameEn: 'Remote Jobs' },
      { slug: 'digital-skills', nameBn: 'ডিজিটাল স্কিলস', nameEn: 'Digital Skills' },
      { slug: 'affiliate', nameBn: 'অ্যাফিলিয়েট মার্কেটিং', nameEn: 'Affiliate' },
      { slug: 'creator-economy', nameBn: 'ক্রিয়েটর ইকোনমি', nameEn: 'Creator Economy' }
    ],
    icon: 'Briefcase'
  },
  {
    id: 'cat_student',
    slug: 'student',
    nameBn: 'শিক্ষার্থী ও পড়াশোনা',
    nameEn: 'Student & Education',
    descriptionBn: 'ফ্রি কোর্স, স্কলারশিপ, স্টাডি হ্যাকস, প্রেজেন্টেশন ও পরীক্ষার প্রস্তুতি।',
    subcategories: [
      { slug: 'study-tips', nameBn: 'স্টাডি টিপস', nameEn: 'Study Tips' },
      { slug: 'free-courses', nameBn: 'ফ্রি কোর্স', nameEn: 'Free Courses' },
      { slug: 'scholarships', nameBn: 'স্কলারশিপ', nameEn: 'Scholarships' },
      { slug: 'student-tools', nameBn: 'স্টুডেন্ট টুলস', nameEn: 'Student Tools' },
      { slug: 'career', nameBn: 'ক্যারিয়ার প্ল্যানিং', nameEn: 'Career' }
    ],
    icon: 'GraduationCap'
  },
  {
    id: 'cat_make_build',
    slug: 'make-build',
    nameBn: 'মেক ও বিল্ড',
    nameEn: 'Make & Build',
    descriptionBn: 'নিজে তৈরি করো ওয়েবসাইট, অ্যাপ, কোডিং, নো-কোড অটোমেশন ও মিনি প্রজেক্ট।',
    subcategories: [
      { slug: 'websites', nameBn: 'ওয়েবসাইট তৈরি', nameEn: 'Websites' },
      { slug: 'apps', nameBn: 'অ্যাপ ডেভেলপমেন্ট', nameEn: 'Apps' },
      { slug: 'coding', nameBn: 'কোডিং গাইড', nameEn: 'Coding' },
      { slug: 'automation', nameBn: 'নো-কোড অটোমেশন', nameEn: 'Automation' },
      { slug: 'mini-projects', nameBn: 'মিনি প্রজেক্টস', nameEn: 'Mini Projects' }
    ],
    icon: 'Hammer'
  },
  {
    id: 'cat_trading',
    slug: 'trading',
    nameBn: 'ট্রেডিং এডুকেশন',
    nameEn: 'Trading Education',
    descriptionBn: 'টেকনিক্যাল এনালাইসিস, ফান্ডামেন্টাল এবং ঝুঁকি ব্যবস্থাপনার শিক্ষামূলক বিশ্লেষণ।',
    subcategories: [
      { slug: 'basics', nameBn: 'ট্রেডিং মূলনীতি', nameEn: 'Trading Basics' },
      { slug: 'technical-analysis', nameBn: 'টেকনিক্যাল এনালাইসিস', nameEn: 'Technical Analysis' },
      { slug: 'risk-management', nameBn: 'রিস্ক ম্যানেজমেন্ট', nameEn: 'Risk Management' },
      { slug: 'crypto-forex', nameBn: 'মার্কেট পরিচিতি', nameEn: 'Markets' }
    ],
    icon: 'TrendingUp'
  },
  {
    id: 'cat_trends',
    slug: 'trends',
    nameBn: 'ট্রেন্ডস ও ইন্টারনেট কালচার',
    nameEn: 'Trends & Viral Topics',
    descriptionBn: 'বিশ্বব্যাপী ইন্টারনেট ট্রেন্ডস, ভাইরাল টেক মুভমেন্ট এবং সোশ্যাল মিডিয়া প্রযুক্তি।',
    subcategories: [
      { slug: 'viral-topics', nameBn: 'ভাইরাল টেক টপিকস', nameEn: 'Viral Topics' },
      { slug: 'creator-trends', nameBn: 'ক্রিয়েটর ট্রেন্ডস', nameEn: 'Creator Trends' },
      { slug: 'internet-culture', nameBn: 'ইন্টারনেট কালচার', nameEn: 'Internet Culture' }
    ],
    icon: 'Flame'
  },
  {
    id: 'cat_it_news',
    slug: 'it-news',
    nameBn: 'আইটি ও টেক সংবাদ',
    nameEn: 'IT & Tech News',
    descriptionBn: 'বিশ্বসেরা প্রযুক্তি প্রতিষ্ঠানের সর্বশেষ অগ্রগতি, কৃত্রিম বুদ্ধিমত্তার নতুন মডেল এবং বিশ্বমানের আইটি খবরের বাংলা বিশ্লেষণ।',
    subcategories: [
      { slug: 'ai-news', nameBn: 'এআই নিউজ', nameEn: 'AI News' },
      { slug: 'big-tech', nameBn: 'গুগল-মাইক্রোসফট-মেটা', nameEn: 'Big Tech' },
      { slug: 'software-updates', nameBn: 'সফটওয়্যার আপডেট', nameEn: 'Software Updates' },
      { slug: 'device-news', nameBn: 'ডিভাইস ও গ্যাজেটস', nameEn: 'Devices & Gadgets' },
      { slug: 'events', nameBn: 'টেকনোলজি ইভেন্টস', nameEn: 'Tech Events' }
    ],
    icon: 'Radio'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art_1',
    slug: 'deepseek-v3-r1-complete-guide-bangla',
    titleBn: 'ডিপসিক (DeepSeek) V3 ও R1 কী? কীভাবে সম্পূর্ণ ফ্রিতে ব্যবহার করবেন',
    titleEn: 'DeepSeek V3 & R1 Complete Bangla Guide',
    category: 'ai',
    subcategory: 'models',
    tags: ['DeepSeek', 'OpenSource', 'AI Models', 'Free AI'],
    author: {
      name: 'তানভীর হাসান',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'এআই রিসার্চার ও সফটওয়্যার ইঞ্জিনিয়ার'
    },
    featuredImage: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    publishedAt: '2026-03-20',
    updatedAt: '2026-03-25',
    readingTimeMin: 7,
    views: 12450,
    isFeatured: true,
    isTrending: true,
    status: 'published',
    excerptBn: 'ওপেনএআই-এর সমকক্ষ বা অনেক ক্ষেত্রে এগিয়ে থাকা ওপেন-ওয়েটস মডেল ডিপসিক কীভাবে প্রযুক্তি বিশ্বকে বদলে দিচ্ছে এবং বাংলাদেশ থেকে কীভাবে ব্যবহার করবেন।',
    blocks: [
      {
        type: 'paragraph',
        content: '২০২৫-২০২৬ সালে কৃত্রিম বুদ্ধিমত্তার জগতে সবচেয়ে বড় আলোড়ন সৃষ্টি করেছে ডিপসিক (DeepSeek)। মার্কিন টেক জায়ান্টদের হাজার কোটি ডলারের মডেলের বিপরীতে অত্যন্ত কম খরচে তৈরি এই মডেলটি এখন গ্লোবাল ওপেন সোর্স আন্দোলনের মূল চালিকাশক্তি।'
      },
      {
        type: 'heading',
        content: 'ডিপসিক V3 ও R1-এর মূল পার্থক্য কী?'
      },
      {
        type: 'paragraph',
        content: 'ডিপসিক V3 হলো একটি জেনারেল-পারপাস লার্জ ল্যাঙ্গুয়েজ মডেল যা দ্রুত লেখালেখি, সারসংক্ষেপ ও সাধারণ কোডিংয়ের জন্য উপযোগী। অন্যদিকে DeepSeek-R1 হলো একটি রিজনিং (Reasoning) মডেল যা জটিল গণিত, অ্যালগরিদম ও ক্রিয়েটিভ প্রবলেম সলভিংয়ে ধাপে ধাপে চিন্তা করে উত্তর দেয়।'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'ডিপসিক সম্পূর্ণ ফ্রিতে ওয়েব প্ল্যাটফর্ম এবং মোবাইল অ্যাপে ব্যবহার করা যায়। এছাড়া Ollama ব্যবহার করে সম্পূর্ণ অফলাইনে আপনার নিজস্ব কম্পিউটারে রান করতে পারবেন।'
      },
      {
        type: 'heading',
        content: 'বাংলাদেশ থেকে ব্যবহারের সেরা ৩টি উপায়'
      },
      {
        type: 'list',
        items: [
          'অফিসিয়াল ওয়েব চ্যাট: chat.deepseek.com এ কোনো পেমেন্ট ছাড়া সরাসরি ব্যবহার করা যায়।',
          'লোকাল পিসিতে (Ollama): আপনার পিসিতে কমপক্ষে ১৬ জিবি র‍্যাম থাকলে ডিপসিকের ৭ বা ৮ বিলিয়ন মডেল সম্পূর্ণ অফলাইনে চালানো সম্ভব।',
          'API ইন্টিগ্রেশন: অন্যান্য মডেলের চেয়ে প্রায় ৯৫% কম খরচে নিজস্ব ওয়েবসাইট বা অ্যাপে API কানেক্ট করতে পারবেন।'
        ]
      },
      {
        type: 'code',
        language: 'bash',
        content: '# আপনার কম্পিউটারে ডিপসিক চালানোর কমান্ড (Ollama ইন্সটল থাকলে)\nollama run deepseek-r1:8b'
      },
      {
        type: 'heading',
        content: 'প্রাইভেসি এবং নিরাপত্তা সতর্কতা'
      },
      {
        type: 'paragraph',
        content: 'যেকোনো ক্লাউড এআই সার্ভিসে সংবেদনশীল ব্যক্তিগত পাসওয়ার্ড বা ব্যাংকিং তথ্য ইনপুট দেওয়া থেকে বিরত থাকুন। প্রাতিষ্ঠানিক কাজের জন্য লোকাল মডেল চালানোই সর্বোত্তম পন্থা।'
      }
    ],
    faqs: [
      {
        question: 'ডিপসিক কি বাংলা ভাষা ভালোভাবে বোঝে?',
        answer: 'হ্যাঁ, ডিপসিক বাংলা ইউনিকোড প্রম্পটে খুবই স্বাচ্ছন্দ্য এবং ব্যাকরণগতভাবে শুদ্ধ বাংলায় উত্তর তৈরি করতে পারে।'
      },
      {
        question: 'এর জন্য কি কোনো ক্রেডিট কার্ড বা পেমেন্ট লাগে?',
        answer: 'না, বেসিক এবং অ্যাডভান্সড চ্যাট উভয়েই সাধারণ ব্যবহারকারীদের জন্য সম্পূর্ণ ফ্রি।'
      }
    ],
    stepByStepGuide: [
      { step: 1, title: 'অ্যাকাউন্ট তৈরি', desc: 'chat.deepseek.com এ গিয়ে ইমেইল বা গুগল দিয়ে ফ্রি সাইন-আপ করুন।' },
      { step: 2, title: 'মডেল নির্বাচন', desc: 'নিচে "DeepThink (R1)" টগল অন করুন যদি জটিল যুক্তি বা কোডিংয়ের সমাধান চান।' },
      { step: 3, title: 'প্রম্পট দিন', desc: 'স্পষ্ট ও বিস্তারিত নির্দেশাবলী সহ বাংলায় বা ইংরেজিতে প্রশ্ন টাইপ করুন।' }
    ],
    relatedToolIds: ['tool_deepseek', 'tool_chatgpt', 'tool_cursor'],
    relatedVideoIds: ['vid_1', 'vid_4']
  },
  {
    id: 'art_2',
    slug: 'best-free-ai-tools-for-bangladeshi-students-2026',
    titleBn: 'শিক্ষার্থীদের পড়াশোনা ও প্রেজেন্টেশনের জন্য সেরা ১০টি ফ্রি AI টুলস',
    titleEn: 'Best Free AI Tools for Bangladeshi Students',
    category: 'student',
    subcategory: 'student-tools',
    tags: ['Student AI', 'Study Hacks', 'NotebookLM', 'Canva'],
    author: {
      name: 'সাদিয়া তাসনিম',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'এডুকেশন কনসালটেন্ট ও কন্টেন্ট ক্রিয়েটর'
    },
    featuredImage: '/src/assets/images/student_study_tools_1790543937335.jpg',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-24',
    readingTimeMin: 6,
    views: 9820,
    isFeatured: true,
    status: 'published',
    excerptBn: 'পরীক্ষার আগের রাতে শত শত পৃষ্ঠার পিডিএফ রিভিশন দেওয়া থেকে আকর্ষণীয় স্লাইড প্রেজেন্টেশন তৈরি—শিক্ষার্থীদের জন্য প্রয়োজনীয় সেরা টুলস।',
    blocks: [
      {
        type: 'paragraph',
        content: 'বর্তমান যুগে মুখস্থ বিদ্যার চেয়ে কার্যকরভাবে তথ্য খুঁজে নেওয়া এবং প্রক্রিয়াজাত করার দক্ষতা বেশি জরুরি। গুগল নোটবুক এলএম (NotebookLM), গামা (Gamma) এবং ডিপসিকের মতো আধুনিক টুল ব্যবহার করে পড়াশোনার গতি কয়েকগুণ বাড়ানো সম্ভব।'
      },
      {
        type: 'heading',
        content: '১. গুগল নোটবুক এলএম (NotebookLM)'
      },
      {
        type: 'paragraph',
        content: 'আপনার ক্লাসের লেকচার শিট বা বড় পিডিএফ আপলোড করে দিন। এটি আপনাকে তাত্ক্ষণিকভাবে সামারি বানিয়ে দেবে এবং এমনকি দুজন ভার্চুয়াল হোস্টের মাধ্যমে পডকাস্ট অডিও আলোচনা তৈরি করে শোনাবে!'
      },
      {
        type: 'heading',
        content: '২. গামা অ্যাপ (Gamma.app)'
      },
      {
        type: 'paragraph',
        content: 'প্রেজেন্টেশনের বিষয় এবং মূল পয়েন্টগুলো লিখে দিলেই কয়েক সেকেন্ডে নান্দনিক ডিজাইন সহ ফুল স্লাইড ডেকে রূপান্তর করে দেয়।'
      },
      {
        type: 'callout',
        calloutType: 'warning',
        content: 'সতর্কতা: অ্যাসাইনমেন্ট বা থিসিসের ক্ষেত্রে সরাসরি এআই দিয়ে লিখে জমা দেবেন না। এআই-কে সহায়ক শিক্ষক হিসেবে ব্যবহার করে নিজে লিখুন।'
      }
    ],
    faqs: [
      {
        question: 'নোটবুক এলএম কি সম্পূর্ণ ফ্রি?',
        answer: 'হ্যাঁ, যেকোনো সাধারণ জিমেইল অ্যাকাউন্ট দিয়ে লগইন করে সীমাহীন নোটবুক তৈরি করা যায়।'
      }
    ],
    relatedToolIds: ['tool_notebooklm', 'tool_gamma', 'tool_chatgpt'],
    relatedVideoIds: ['vid_2']
  },
  {
    id: 'art_3',
    slug: 'upwork-freelancing-complete-roadmap-bangladesh',
    titleBn: 'আপওয়ার্ক (Upwork) ফ্রিল্যান্সিং গাইডলাইন: অ্যাকাউন্ট ভেরিফিকেশন ও প্রথম কাজ পাওয়ার বাস্তব উপায়',
    titleEn: 'Upwork Freelancing Complete Roadmap Bangladesh',
    category: 'earn',
    subcategory: 'freelancing',
    tags: ['Upwork', 'Freelancing', 'Payment', 'Bangladesh', 'Payoneer'],
    author: {
      name: 'রাশেদুল করিম',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'টপ-রেটেড প্লাস ফ্রিল্যান্সার'
    },
    featuredImage: '/src/assets/images/earn_freelance_desk_1790543914240.jpg',
    publishedAt: '2026-03-15',
    updatedAt: '2026-03-26',
    readingTimeMin: 8,
    views: 18340,
    isFeatured: true,
    isTrending: true,
    status: 'published',
    excerptBn: 'কোনো ভুয়া আয়ের প্রতিশ্রুতি নয়। সঠিক স্কিল তৈরি, প্রপোজাল লেখা এবং পেওনিয়ারের মাধ্যমে বাংলাদেশে নিরাপদে পেমেন্ট আনার বাস্তব রোডম্যাপ।',
    earningDetails: {
      platformName: 'Upwork Global Inc.',
      whoCanUse: '১৮+ বছর বয়সী দক্ষ প্রফেশনাল (ওয়েব, গ্রাফিক্স, কনটেন্ট, ডিজিটাল মার্কেটিং ইত্যাদি)',
      bangladeshAvailability: 'সম্পূর্ণ সক্রিয় (Fully Available)',
      requirements: ['জাতীয় পরিচয়পত্র (NID) অথবা পাসপোর্ট', 'নির্দিষ্ট এক বা একাধিক ডিজিটাল স্কিল', 'কম্পিউটার ও স্থিতিশীল ইন্টারনেট সংযোগ'],
      earningModel: 'ঘণ্টাভিত্তিক (Hourly) অথবা নির্দিষ্ট প্রজেক্ট বাজেট (Fixed-Price Contract)',
      paymentMethods: ['Payoneer (বিকাশ সরাসরি লিঙ্কড)', 'লোকাল ব্যাংক ওয়্যার ট্রান্সফার', 'Direct to Local Bank (BDT)'],
      minimumWithdrawal: '$১ (Payoneer) / $১০০ (Bank Wire)',
      fees: 'প্রতিটি ইনভয়েসে ১০% ফ্ল্যাট প্ল্যাটফর্ম ফি',
      pros: ['গ্লোবাল হাই-ভ্যালু ক্লায়েন্ট নেটওয়ার্ক', 'পেমেন্ট প্রটেকশন এস্ক্রো সিস্টেম', 'দীর্ঘমেয়াদী কন্ট্রাক্টের চমৎকার সুযোগ'],
      cons: ['কানেক্টস (Connects) ক্রয়ের অতিরিক্ত ব্যয়', 'নতুনদের জন্য তীব্র প্রতিযোগিতা', 'কঠোর ভেরিফিকেশন নীতিমালা'],
      officialUrl: 'https://www.upwork.com',
      safetyRating: '৫/৫ (সম্পূর্ণ নিরাপদ ও গ্লোবালি স্বীকৃত)'
    },
    blocks: [
      {
        type: 'paragraph',
        content: 'অনলাইন আর্নিংয়ের নামে কোনো ক্লিক বা রেফারেল স্ক্যামে পা দেবেন না। আন্তর্জাতিক মার্কেটপ্লেসে কাজ করার একমাত্র শর্ত হলো আন্তর্জাতিক মানের কাজ জানা।'
      },
      {
        type: 'heading',
        content: '১. প্রোফাইল তৈরির সময় যা লক্ষ্য রাখবেন'
      },
      {
        type: 'list',
        items: [
          'স্পেসিফিক নিশ (Niche) সিলেক্ট করুন: "সব ধরনের কাজ পারি" না বলে "Shopify Developer" বা "Figma UI Designer" লিখুন।',
          'পোর্টফোলিওতে কমপক্ষে ৩-৪টি সম্পূর্ণ বাস্তবসম্মত স্যাম্পল যুক্ত করুন।',
          'বাংলা ইংরেজি মিশিয়ে নয়, সাবলীল প্রফেশনাল ইংরেজিতে ওভারভিউ সাজান।'
        ]
      },
      {
        type: 'heading',
        content: '২. বাংলাদেশ থেকে পেমেন্ট উইথড্র করার নিরাপদ পদ্ধতি'
      },
      {
        type: 'paragraph',
        content: 'আপওয়ার্ক থেকে টাকা উত্তোলনের জন্য সবচেয়ে জনপ্রিয় ও দ্রুততম মাধ্যম হলো Payoneer। পেওনিয়ারের সাথে সরাসরি আপনার বিকাশ অ্যাকাউন্ট যুক্ত করা যায়, যার ফলে মুহূর্তের মধ্যে ডলার কারেন্সি থেকে টাকায় উইথড্র নেওয়া সম্ভব।'
      }
    ],
    faqs: [
      {
        question: 'কোনো কাজ না পেলে কি কানেক্টসের টাকা নষ্ট হবে?',
        answer: 'হ্যাঁ, বিড করার জন্য কানেক্টস ব্যয় হয়। ক্লায়েন্ট যদি জব পোস্ট বাতিল করে তবে কিছু ক্ষেত্রে কানেক্টস ফেরত পাওয়া যায়।'
      },
      {
        question: 'নতুনদের প্রথম কাজ পেতে গড়ে কতদিন সময় লাগতে পারে?',
        answer: 'যথাযথ স্কিল ও মানসম্মত পোর্টফোলিও থাকলে সাধারণত ২ থেকে ৬ সপ্তাহের মধ্যে প্রথম প্রজেক্ট পাওয়া যায়।'
      }
    ],
    relatedToolIds: ['tool_payoneer', 'tool_figma', 'tool_github'],
    relatedVideoIds: ['vid_3']
  },
  {
    id: 'art_4',
    slug: 'build-modern-website-ai-coding-tools',
    titleBn: 'কোডিং না জেনেও AI দিয়ে প্রফেশনাল ওয়েবসাইট বানানোর পদ্ধতি (Step-by-Step)',
    titleEn: 'Build Modern Website with AI Coding Tools',
    category: 'make-build',
    subcategory: 'websites',
    tags: ['Web Development', 'AI Coding', 'Cursor', 'v0', 'Tailwind'],
    author: {
      name: 'ফারহান আহমেদ',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'ফুল-স্ট্যাক ডেভেলপার ও মেকার'
    },
    featuredImage: '/src/assets/images/make_build_iot_1790543927581.jpg',
    publishedAt: '2026-03-22',
    updatedAt: '2026-03-25',
    readingTimeMin: 9,
    views: 11200,
    isFeatured: true,
    status: 'published',
    excerptBn: 'কার্সর (Cursor), v0 এবং বোল্ট ডট নিউ ব্যবহার করে আধুনিক, রেসপনসিভ ও প্রোডাকশন রেডি ওয়েব অ্যাপ্লিকেশন তৈরি করুন দ্রুততম সময়ে।',
    blocks: [
      {
        type: 'paragraph',
        content: 'বর্তমানে সফটওয়্যার ডেভেলপমেন্টের ধারণা সম্পূর্ণ পাল্টে গেছে। এখন আপনাকে শত শত লাইন সিনট্যাক্স মুখস্থ করতে হয় না, বরং প্রয়োজন সঠিক আর্কিটেকচারাল সেন্স এবং কার্যকর প্রম্পট দেওয়ার ক্ষমতা।'
      },
      {
        type: 'heading',
        content: 'প্রয়োজনীয় টুলস ও টেক স্ট্যাক'
      },
      {
        type: 'list',
        items: [
          'Cursor AI: ভিএস কোড ভিত্তিক সবচেয়ে বুদ্ধিমান এআই কোড এডিটর।',
          'v0.dev: প্রম্পট দিলেই টেলউইন্ড ও রিয়্যাক্ট কম্পোনেন্ট জেনারেট করে দেয়।',
          'Vite & React: অতি দ্রুতগতি সম্পন্ন আধুনিক ওয়েব ফ্রন্টএন্ড।'
        ]
      },
      {
        type: 'code',
        language: 'bash',
        content: '# আপনার প্রজেক্ট শুরু করতে টার্মিনালে রান করুন:\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install @tailwindcss/vite'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'যেকোনো প্রজেক্ট শুরু করার আগে প্রথমে একটি কাগজে বা ফিগমাতে রাফ লেআউট স্কেচ করে নিলে এআইকে ইন্সট্রাকশন দেওয়া অনেক সহজ হয়।'
      }
    ],
    stepByStepGuide: [
      { step: 1, title: 'আইডিয়া নির্ধারণ', desc: 'ওয়েবসাইটটি কী উদ্দেশ্যে তৈরি হচ্ছে এবং কোন কোন ফিচার থাকবে তা পয়েন্ট আকারে লিখুন।' },
      { step: 2, title: 'v0 দিয়ে UI ড্রাফট', desc: 'v0.dev এ আপনার পেজের লেআউট প্রম্পট দিন এবং কোড কপি করুন।' },
      { step: 3, title: 'কার্সরে বিল্ড ও ডিপ্লয়', desc: 'Cursor এ প্রজেক্ট ওপেন করে ফাইল সাজান এবং Vercel বা Netlify-তে ফ্রিতে ডিপ্লয় করুন।' }
    ],
    relatedToolIds: ['tool_cursor', 'tool_v0', 'tool_github'],
    relatedVideoIds: ['vid_4']
  },
  {
    id: 'art_5',
    slug: 'windows-11-clean-fast-privacy-bangla',
    titleBn: 'উইন্ডোজ ১১ সুপার ফাস্ট ও প্রাইভেট রাখার ৫টি গোপন সেটিং',
    titleEn: '5 Hidden Settings to Make Windows 11 Ultra Fast',
    category: 'tech',
    subcategory: 'windows',
    tags: ['Windows 11', 'PC Speed', 'Privacy', 'Optimization'],
    author: {
      name: 'আহমেদ শরীফ',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      role: 'আইটি সিস্টেম অ্যাডমিন'
    },
    featuredImage: '/src/assets/images/hero_khojghor_tech_1790543888032.jpg',
    publishedAt: '2026-03-12',
    updatedAt: '2026-03-20',
    readingTimeMin: 5,
    views: 8900,
    status: 'published',
    excerptBn: 'অপ্রয়োজনীয় ব্লটওয়্যার দূর করা, ব্যাকগ্রাউন্ড ট্র্যাকিং বন্ধ এবং কম ক্ষমতার ল্যাপটপেও মাখনের মতো মসৃণ পারফরম্যান্স পাওয়ার উপায়।',
    blocks: [
      {
        type: 'paragraph',
        content: 'উইন্ডোজ ১১ দেখতে সুন্দর হলেও এতে প্রচুর অপ্রয়োজনীয় ব্যাকগ্রাউন্ড সার্ভিস ও টেলিমেট্রি চালু থাকে যা সাধারণ ল্যাপটপকে ধীরগতির করে তোলে।'
      },
      {
        type: 'heading',
        content: '১. স্টার্টআপ অ্যাপস বন্ধ করুন'
      },
      {
        type: 'paragraph',
        content: 'Ctrl + Shift + Esc চেপে Task Manager ওপেন করুন। Startup Apps ট্যাবে গিয়ে Spotify, Cortana, Teams এর মতো অপ্রয়োজনীয় অ্যাপস Disable করে দিন।'
      },
      {
        type: 'heading',
        content: '২. উইন্ডোজ টেলিমেট্রি ও ডায়াগনস্টিক ডেটা বন্ধ'
      },
      {
        type: 'paragraph',
        content: 'Settings > Privacy & Security > Diagnostics & feedback এ গিয়ে "Send optional diagnostic data" অফ করে দিন।'
      }
    ],
    relatedToolIds: ['tool_photopea', 'tool_obs']
  },
  {
    id: 'art_6',
    slug: 'trading-basics-risk-management-bangla',
    titleBn: 'ট্রেডিংয়ের মূল কথা: কেন ৯০% নতুন ট্রেডার লস করেন এবং কীভাবে ঝুঁকি নিয়ন্ত্রণ করবেন',
    titleEn: 'Trading Basics & Risk Management Guide',
    category: 'trading',
    subcategory: 'basics',
    tags: ['Trading', 'Finance', 'Risk Management', 'Investing'],
    author: {
      name: 'মো. তৌফিক এলাহী',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'ফিন্যান্সিয়াল এনালিস্ট'
    },
    featuredImage: '/src/assets/images/earn_freelance_desk_1790543914240.jpg',
    publishedAt: '2026-03-10',
    updatedAt: '2026-03-19',
    readingTimeMin: 7,
    views: 6400,
    status: 'published',
    excerptBn: 'ট্রেডিং কোনো রাতারাতি বড়লোক হওয়ার স্কিম নয়। এটি একটি কঠোর গাণিতিক ও মানসিক শৃঙ্খলাপূর্ণ পেশা। জানুন আসল সত্য।',
    blocks: [
      {
        type: 'callout',
        calloutType: 'warning',
        content: 'শিক্ষামূলক সতর্কবার্তা: ফরেক্স, ক্রিপ্টোকারেন্সি বা স্টক ট্রেডিংয়ে উচ্চ ঝুঁকি বিদ্যমান। কখনোই ঋণ করা বা দৈনন্দিন খরচের টাকা দিয়ে ট্রেডিং করবেন না। এই নিবন্ধটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে রচিত।'
      },
      {
        type: 'paragraph',
        content: 'সোশ্যাল মিডিয়ায় দামি গাড়ি বা রিলাক্সের ছবি দেখে ট্রেডিংয়ে নামলে নিশ্চিত আর্থিক ক্ষতির সম্মুখীন হতে হবে। সফল ট্রেডারদের মূল শক্তি হলো রিস্ক-টু-রিওয়ার্ড রেশিও এবং ক্যাপিটাল প্রিজার্ভেশন।'
      },
      {
        type: 'heading',
        content: '১% রুল (The 1% Rule)'
      },
      {
        type: 'paragraph',
        content: 'কোনো একক ট্রেডে আপনার মোট মূলধনের ১% এর বেশি ঝুঁকি নেওয়া উচিত নয়। উদাহরণস্বরূপ, যদি আপনার একাউন্টে ১০০০ ডলার থাকে, তবে যেকোনো একটি ট্রেডে স্টপলস হিট করলে সর্বোচ্চ ১০ ডলারের ক্ষতি মেনে নিতে হবে।'
      }
    ],
    faqs: [
      {
        question: 'বাংলাদেশে ট্রেডিং কি আইনিভাবে উন্মুক্ত?',
        answer: 'বাংলাদেশে অনুমোদিত স্টক এক্সচেঞ্জ ব্যতীত অননুমোদিত বৈদেশিক মুদ্রা বা ক্রিপ্টো ট্রেডিং কেন্দ্রীয় ব্যাংকের বিশেষ বিধিমালার আওতায় থাকে। তাই সব সময় স্থানীয় আইন কানুন মেনে চলা বাধ্যতামূলক।'
      }
    ]
  },
  {
    id: 'art_7',
    slug: 'chatgpt-vs-claude-vs-deepseek-comparison',
    titleBn: 'ChatGPT বনাম Claude বনাম DeepSeek: ২০২৬ সালে লেখার ও কাজের জন্য কোনটি সেরা?',
    titleEn: 'ChatGPT vs Claude vs DeepSeek Detailed Comparison',
    category: 'ai',
    subcategory: 'models',
    tags: ['ChatGPT', 'Claude', 'DeepSeek', 'Comparison'],
    author: {
      name: 'তানভীর হাসান',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'এআই রিসার্চার'
    },
    featuredImage: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    publishedAt: '2026-03-21',
    updatedAt: '2026-03-26',
    readingTimeMin: 8,
    views: 14200,
    isTrending: true,
    status: 'published',
    excerptBn: 'কোন মডেলটি বাংলায় ভালো লেখে? কোনটির কোডিং নিখুঁত? ৩টি সেরা মডেলের রিয়েল-ওয়ার্ল্ড টেস্ট ও বিস্তারিত তুলনা।',
    blocks: [
      {
        type: 'paragraph',
        content: 'বর্তমান বাজারে প্রতিটি শীর্ষ AI মডেলের নিজস্ব বিশেষত্ব রয়েছে। Claude 3.5 Sonnet কোডিং ও দীর্ঘ রচনায় এখনও অপ্রতিদ্বন্দ্বী, ChatGPT এর ইকোসিস্টেম সবচেয়ে সমৃদ্ধ, আর DeepSeek বিনামূল্যে বিশ্বমানের রিজনিং দিচ্ছে।'
      },
      {
        type: 'table',
        tableData: {
          headers: ['ফিচার', 'ChatGPT 4o', 'Claude 3.5 Sonnet', 'DeepSeek V3/R1'],
          rows: [
            ['বাংলা বোঝাপড়া', 'খুব ভালো', 'চমৎকার ও সাবলীল', 'ভালো ও দ্রুত'],
            ['কোডিং নির্ভুলতা', '৮৫%', '৯৬%', '৯১%'],
            ['ফ্রি টিয়ার এক্সেস', 'সীমিত', 'খুব সীমিত', 'প্রায় আনলিমিটেড'],
            ['রিজনিং ক্যাপাসিটি', 'o1/o3 (পেইড)', 'ন্যাচারাল যুক্তি', 'R1 (সম্পূর্ণ ফ্রি)']
          ]
        }
      }
    ],
    relatedToolIds: ['tool_chatgpt', 'tool_claude', 'tool_deepseek']
  },
  {
    id: 'art_8',
    slug: 'coursera-edx-100-percent-free-financial-aid',
    titleBn: 'কোর্সসেরা ও এডের এক্স থেকে শতভাগ ফ্রিতে সার্টিফিকেট সহ কোর্স করার নিয়ম',
    titleEn: 'How to Get Coursera and edX Courses 100% Free with Certificate',
    category: 'student',
    subcategory: 'free-courses',
    tags: ['Coursera', 'Free Certificate', 'Financial Aid', 'Students'],
    author: {
      name: 'সাদিয়া তাসনিম',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'এডুকেশন কনসালটেন্ট'
    },
    featuredImage: '/src/assets/images/student_study_tools_1790543937335.jpg',
    publishedAt: '2026-03-14',
    updatedAt: '2026-03-23',
    readingTimeMin: 6,
    views: 15400,
    status: 'published',
    excerptBn: 'গুগল, আইবিএম কিংবা হার্ভার্ডের প্রিমিয়াম কোর্সগুলো বিনা মূল্যে সম্পন্ন করার বৈধ উপায়—ফাইন্যান্সিয়াল এইড আবেদন কৌশল।',
    blocks: [
      {
        type: 'paragraph',
        content: 'বিশ্বের অন্যতম সেরা অনলাইন প্ল্যাটফর্ম কোর্সসেরায় রয়েছে চমৎকার এক সুবিধা—Financial Aid। উন্নয়নশীল দেশের শিক্ষার্থীরা উপযুক্ত কারণ দেখিয়ে আবেদন করলে ১০০% ফি মওকুফ পাওয়া যায়।'
      },
      {
        type: 'heading',
        content: 'আবেদনের ৩টি ধাপ'
      },
      {
        type: 'list',
        items: [
          'কোর্সের পেজে "Financial Aid Available" লিংকে ক্লিক করুন।',
          'আপনার শিক্ষাগত ব্যাকগ্রাউন্ড ও বার্ষিক আয়ের তথ্য দিন (শিক্ষার্থী হলে আয় $0 লিখুন)।',
          '১৫০ শব্দের দুটি প্রশ্নের উত্তর দিন: কেন আপনি এই সাহায্য চান এবং কোর্সটি কীভাবে আপনার ক্যারিয়ারে সহায়তা করবে।'
        ]
      }
    ],
    relatedToolIds: ['tool_khanacademy', 'tool_duolingo']
  },
  {
    id: 'art_9',
    slug: 'build-automated-telegram-bot-nodejs-beginner',
    titleBn: 'নোড জেএস (Node.js) দিয়ে নিজের স্বয়ংক্রিয় টেলিগ্রাম বট বানানোর সম্পূর্ণ প্রজেক্ট',
    titleEn: 'Build Automated Telegram Bot with Node.js',
    category: 'make-build',
    subcategory: 'automation',
    tags: ['Telegram Bot', 'Node.js', 'JavaScript', 'Automation', 'Projects'],
    author: {
      name: 'ফারহান আহমেদ',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'ফুল-স্ট্যাক ডেভেলপার'
    },
    featuredImage: '/src/assets/images/make_build_iot_1790543927581.jpg',
    publishedAt: '2026-03-16',
    updatedAt: '2026-03-24',
    readingTimeMin: 10,
    views: 7600,
    status: 'published',
    excerptBn: 'টেলিগ্রাম বটের মাধ্যমে খবর পাঠানো, আবহাওয়ার আপডেট দেওয়া বা গ্রুপ ম্যানেজমেন্টের জন্য কোডিং শেখার দুর্দান্ত স্টার্টার প্রজেক্ট।',
    blocks: [
      {
        type: 'paragraph',
        content: 'টেলিগ্রামের বট API অত্যন্ত ডেভেলপার ফ্রেন্ডলি এবং সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।'
      },
      {
        type: 'code',
        language: 'javascript',
        content: `const { Telegraf } = require('telegraf');\nconst bot = new Telegraf(process.env.BOT_TOKEN);\n\nbot.start((ctx) => ctx.reply('স্বাগতম! আমি আপনার ব্যক্তিগত টেলিগ্রাম সহকারী।'));\nbot.hears('কেমন আছ', (ctx) => ctx.reply('আমি ভালো আছি, আপনার কী সাহায্য করতে পারি?'));\n\nbot.launch();`
      }
    ],
    relatedToolIds: ['tool_replit', 'tool_github']
  },
  {
    id: 'art_10',
    slug: 'bangladesh-freelancer-tax-banking-rules-2026',
    titleBn: '২০২৬ সালে ফ্রিল্যান্সারদের জন্য ব্যাংকিং ও ট্যাক্স নীতিমালা: সাধারণ ভুলগুলো এড়িয়ে চলুন',
    titleEn: 'Freelancer Banking & Tax Rules Bangladesh',
    category: 'earn',
    subcategory: 'remote-jobs',
    tags: ['Banking', 'Tax', 'Freelance Law', 'Bangladesh'],
    author: {
      name: 'রাশেদুল করিম',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'টপ-রেটেড প্লাস ফ্রিল্যান্সার'
    },
    featuredImage: '/src/assets/images/earn_freelance_desk_1790543914240.jpg',
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-22',
    readingTimeMin: 6,
    views: 12100,
    status: 'published',
    excerptBn: 'ব্যাংক রেমিট্যান্সের ইনসেন্টিভ, পিআরসি ফর্ম এবং বার্ষিক আয়কর রিটার্ন জমা দেওয়ার সঠিক প্রক্রিয়া জানুন সহজে।',
    blocks: [
      {
        type: 'paragraph',
        content: 'আইটি ও ফ্রিল্যান্সিং আয়ে সরকারের বিশেষ সুযোগ-সুবিধা থাকলেও সঠিক নথিপত্র সংরক্ষণ না করলে ব্যাংক অ্যাকাউন্ট ফ্রিজ হওয়া বা ট্যাক্স জটিলতার ঝুঁকি থাকে।'
      }
    ]
  },
  {
    id: 'art_11',
    slug: 'android-battery-saving-essential-guide',
    titleBn: 'অ্যান্ড্রয়েড ফোনের ব্যাটারি দ্রুত শেষ হওয়ার কারণ ও স্থায়ী সমাধান',
    titleEn: 'Android Battery Drain Issues & Solutions',
    category: 'tech',
    subcategory: 'android',
    tags: ['Android', 'Battery', 'Mobile Tips'],
    author: {
      name: 'আহমেদ শরীফ',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      role: 'আইটি সিস্টেম অ্যাডমিন'
    },
    featuredImage: '/src/assets/images/hero_khojghor_tech_1790543888032.jpg',
    publishedAt: '2026-03-08',
    updatedAt: '2026-03-18',
    readingTimeMin: 5,
    views: 9400,
    status: 'published',
    excerptBn: 'ডিসপ্লে রিফ্রেশ রেট, অ্যাপ ব্যাটারি অপটিমাইজেশন এবং অপ্রয়োজনীয় সেন্সর ব্যবহারের ফলে সৃষ্ট ব্যাটারি ড্রেন ঠিক করার পদ্ধতি।',
    blocks: [
      {
        type: 'paragraph',
        content: 'ফোনের বয়স বাড়ার সাথে সাথে ব্যাটারি ব্যাকআপ কমে যাওয়ার অন্যতম বড় কারণ ব্যাকগ্রাউন্ডে অযথা অ্যাপ লোকেশন ও সিনক সচল রাখা।'
      }
    ]
  },
  {
    id: 'art_12',
    slug: 'open-source-ai-bangladesh-impact-trends',
    titleBn: 'ওপেন সোর্স এআই বিপ্লব এবং বাংলাদেশের তরুণদের অপার সম্ভাবনা',
    titleEn: 'Open Source AI Revolution in Bangladesh',
    category: 'trends',
    subcategory: 'ai-news',
    tags: ['AI News', 'Open Source', 'Future Tech', 'Bangladesh'],
    author: {
      name: 'তানভীর হাসান',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'এআই রিসার্চার'
    },
    featuredImage: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    publishedAt: '2026-03-24',
    updatedAt: '2026-03-26',
    readingTimeMin: 6,
    views: 7100,
    isTrending: true,
    status: 'published',
    excerptBn: 'ডিপসিকের উন্মুক্ত মডেল বিশ্বব্যাপী এআই একচেটিয়া নিয়ন্ত্রণ ভেঙে দিয়েছে। এই সুযোগে বাংলাদেশের ডেভেলপাররা কীভাবে কাজ শুরু করতে পারেন?',
    blocks: [
      {
        type: 'paragraph',
        content: 'আগে যেখানে কোটি টাকার জিপিইউ সার্ভার ছাড়া অত্যাধুনিক এআই নিয়ে গবেষণা সম্ভব ছিল না, এখন সাধারণ হার্ডওয়্যারেই ফাইন-টিউনিং করা যাচ্ছে।'
      }
    ]
  },
  {
    id: 'art_13',
    slug: 'openai-gpt-5-o3-deep-reasoning-race-it-news',
    titleBn: 'ওপেনএআই ও গুগলের নতুন এআই মডেলের রেস: ২০২৬-এর প্রযুক্তির ভবিষ্যৎ কোন দিকে?',
    titleEn: 'OpenAI vs Google AI Model Race 2026',
    category: 'it-news',
    subcategory: 'ai-news',
    tags: ['OpenAI', 'Google', 'AI News', 'Big Tech', 'Generative AI'],
    author: {
      name: 'তানভীর হাসান',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'এআই রিসার্চার ও প্রযুক্তি প্রতিবেদক'
    },
    featuredImage: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    publishedAt: '2026-03-25',
    updatedAt: '2026-03-27',
    sourceName: 'The Verge, Reuters & OpenAI Research',
    sourceUrl: 'https://theverge.com',
    readingTimeMin: 6,
    views: 8900,
    isFeatured: true,
    isTrending: true,
    status: 'published',
    excerptBn: 'কৃত্রিম বুদ্ধিমত্তার ডিপ রিজনিং ক্ষমতার লড়াইয়ে বিশ্বসেরা দুই টেক জায়ান্টের লড়াই তুঙ্গে। ওপেনএআই-এর নতুন মডেল এবং গুগলের জেমিনাই আপডেটের তুলনামূলক চিত্র।',
    blocks: [
      {
        type: 'paragraph',
        content: 'সিলিকন ভ্যালিতে এখন চলছে কৃত্রিম সাধারণ বুদ্ধিমত্তা (AGI) অর্জনের তীব্র প্রতিযোগিতা। ওপেনএআই যেখানে চেইন-অব-থট ও সেলফ-রিফ্লেকশনে জোর দিচ্ছে, গুগল সেখানে মাল্টিমোডাল স্পিড ও ডেটা সেন্টার কম্পিউটেশনে নিজেদের অবস্থান পোক্ত করছে।'
      },
      {
        type: 'heading',
        content: 'রিজনিং বেঞ্চমার্কে কার পারফরম্যান্স কেমন?'
      },
      {
        type: 'paragraph',
        content: 'গণিত অলিম্পিয়াড ও পিএইচডি স্তরের বিজ্ঞানের প্রশ্ন সমাধানে উভয় প্রতিষ্ঠানের মডেলগুলো এখন ৯৫ শতাংশের বেশি নির্ভুল স্কোর করছে। তবে ব্যবহারকারীদের কাছে সবচেয়ে বড় বিবেচ্য হচ্ছে রেসপন্স রেট ও প্রতি মিলিয়নে টোকেন খরচ।'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'সরাসরি প্রভাব: এই মডেলগুলোর কারণে বাংলাদেশের প্রোগ্রামার ও গবেষকরা কম খরচে জটিল কোড অপটিমাইজেশন ও অটোমেটেড টেস্টিং টুল তৈরি করতে পারছেন।'
      }
    ],
    relatedArticleIds: ['art_1', 'art_12'],
    relatedToolIds: ['tool_deepseek', 'tool_chatgpt']
  },
  {
    id: 'art_14',
    slug: 'meta-llama-4-multimodal-weights-release-bangla',
    titleBn: 'মেটার লামা ৪ (Llama 4) উন্মোচন: ওপেন সোর্স এআই-তে যুগান্তকারী পরিবর্তন',
    titleEn: 'Meta Llama 4 Open Source AI Release Breakdown',
    category: 'it-news',
    subcategory: 'big-tech',
    tags: ['Meta', 'Llama 4', 'Mark Zuckerberg', 'Open Source', 'Big Tech'],
    author: {
      name: 'রাফসান জামী',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'সফটওয়্যার আর্কিটেক্ট'
    },
    featuredImage: '/src/assets/images/hero_khojghor_tech_1790543888032.jpg',
    publishedAt: '2026-03-24',
    updatedAt: '2026-03-26',
    sourceName: 'Meta AI Engineering Blog & TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    readingTimeMin: 5,
    views: 6540,
    isTrending: false,
    status: 'published',
    excerptBn: 'মাল্টিমোডাল ভয়েস ও কোডিং দক্ষতায় বড় পরিবর্তন নিয়ে এলো মেটা। ডেভেলপাররা কীভাবে নিজস্ব সার্ভারে এটি রান করতে পারবেন?',
    blocks: [
      {
        type: 'paragraph',
        content: 'মার্ক জাকারবার্গ ঘোষণা করেছেন যে মেটা কৃত্রিম বুদ্ধিমত্তার ওপেন সোর্স মডেলগুলোকে সবার জন্য উন্মুক্ত রাখতে প্রতিশ্রুতিবদ্ধ। লামা ৪ মডেলটি টেক্সট, অডিও এবং ইমেজ একই সাথে প্রসেস করতে সক্ষম।'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'প্রাইভেসি সুবিধা: আপনার প্রতিষ্ঠানের সংবেদনশীল গ্রাহক ডেটা বাইরে না পাঠিয়ে নিজস্ব লোকাল ক্লাউডে লামা ৪ স্থাপন করা সম্ভব।'
      }
    ],
    relatedArticleIds: ['art_1', 'art_13'],
    relatedToolIds: ['tool_deepseek', 'tool_cursor']
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid_1',
    titleBn: 'ডিপসিক এআই ব্যবহারের সেরা ৩টি সিক্রেট ট্রিক যা সবাই জানে না!',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    category: 'ai',
    duration: '12:45',
    publishedAt: '2026-03-22',
    views: 45200,
    summaryBn: 'এই ভিডিওতে আমরা দেখিয়েছি কীভাবে ডিপসিকের R1 রিজনিং মডেল দিয়ে জটিল হিসাব, কোডিং প্রবলেম এবং বাংলা প্রম্পট সাজাতে হয়।',
    fullGuideBn: 'ভিডিওটিতে আলোচনা করা হয়েছে:\n১. প্রম্পটের কাঠামো কীভাবে তৈরি করবেন\n২. বাংলা ভাষায় নির্ভুল নির্দেশ দেওয়ার টেকনিক\n৩. লোকাল কম্পিউটারে Ollama সেটআপ গাইড',
    toolsUsed: ['DeepSeek', 'Ollama', 'VS Code'],
    importantLinks: [
      { label: 'DeepSeek Chat', url: 'https://chat.deepseek.com' },
      { label: 'Ollama Download', url: 'https://ollama.com' }
    ],
    relatedArticleIds: ['art_1', 'art_7'],
    status: 'published'
  },
  {
    id: 'vid_2',
    titleBn: 'গুগল নোটবুক এলএম দিয়ে পরীক্ষার প্রস্তুতি নিন মাত্র ২০ মিনিটে (NotebookLM Tutorial)',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnailUrl: '/src/assets/images/student_study_tools_1790543937335.jpg',
    category: 'student',
    duration: '14:20',
    publishedAt: '2026-03-19',
    views: 31000,
    summaryBn: 'ক্লাসের বড় বড় পিডিএফ বই আপলোড করে কীভাবে তাৎক্ষণিক পডকাস্ট সারাংশ তৈরি করবেন এবং এমসিকিউ কুইজ প্র্যাকটিস করবেন।',
    toolsUsed: ['NotebookLM', 'Google Drive'],
    relatedArticleIds: ['art_2'],
    status: 'published'
  },
  {
    id: 'vid_3',
    titleBn: 'আপওয়ার্কে প্রথম কাজের প্রপোজাল লেখার প্রমাণিত স্ট্র্যাটেজি (Live Proposal Breakdown)',
    youtubeId: '3JZ_D3ELwOQ',
    thumbnailUrl: '/src/assets/images/earn_freelance_desk_1790543914240.jpg',
    category: 'earn',
    duration: '18:10',
    publishedAt: '2026-03-17',
    views: 58000,
    summaryBn: 'কপি-পেস্ট প্রপোজাল ক্লায়েন্টরা কেন সাথে সাথে রিজেক্ট করে এবং ক্লায়েন্টের সমস্যা বুঝে প্রথম ২ লাইনে কীভাবে অ্যাটেনশন গ্র্যাব করবেন।',
    toolsUsed: ['Upwork', 'Payoneer', 'Grammarly'],
    relatedArticleIds: ['art_3', 'art_10'],
    status: 'published'
  },
  {
    id: 'vid_4',
    titleBn: 'কার্সর এআই (Cursor AI) দিয়ে ৩০ মিনিটে ফুল-স্ট্যাক ওয়েবসাইট তৈরি ও ফ্রি হোস্টিং',
    youtubeId: 'L_LUpnjgPso',
    thumbnailUrl: '/src/assets/images/make_build_iot_1790543927581.jpg',
    category: 'make-build',
    duration: '26:50',
    publishedAt: '2026-03-24',
    views: 42100,
    summaryBn: 'স্ক্র্যাচ থেকে একটি আকর্ষণীয় রিয়্যাক্ট ওয়েব অ্যাপ্লিকেশন তৈরি, এআই কে কোড দিয়ে ডিবাগ করানো এবং লাইভ সার্ভারে প্রকাশ করার স্টেপ বাই স্টেপ টিউটোরিয়াল।',
    toolsUsed: ['Cursor', 'React', 'Tailwind CSS', 'Vercel'],
    relatedArticleIds: ['art_4'],
    status: 'published'
  },
  {
    id: 'vid_5',
    titleBn: 'উইন্ডোজের গতি দ্বিগুণ করার কার্যকরী কমান্ড ও অপটিমাইজেশন',
    youtubeId: 'fJ9rUzIMcZQ',
    thumbnailUrl: '/src/assets/images/hero_khojghor_tech_1790543888032.jpg',
    category: 'tech',
    duration: '10:15',
    publishedAt: '2026-03-12',
    views: 24000,
    summaryBn: 'পিসি হ্যাং বা ল্যাগ করলে কোন কোন ফাইল ডিলিট করবেন এবং ক্যাশ মেমরি পরিষ্কার করবেন তা লাইভ দেখানো হয়েছে।',
    toolsUsed: ['Windows Terminal', 'Disk Cleanup'],
    relatedArticleIds: ['art_5'],
    status: 'published'
  },
  {
    id: 'vid_6',
    titleBn: 'ট্রেডিং চার্টে আরএসআই (RSI) ও মুভিং এভারেজের সঠিক প্রয়োগ পদ্ধতি',
    youtubeId: 'V-_O7nl0Ii0',
    thumbnailUrl: '/src/assets/images/earn_freelance_desk_1790543914240.jpg',
    category: 'trading',
    duration: '16:40',
    publishedAt: '2026-03-14',
    views: 19800,
    summaryBn: 'ওভারবট এবং ওভারসোল্ড সিগন্যাল দেখে অযথা এন্ট্রি না নিয়ে ট্রেন্ডের সাথে মিলে কীভাবে চার্ট পড়তে হয়।',
    toolsUsed: ['TradingView'],
    relatedArticleIds: ['art_6'],
    status: 'published'
  }
];

export const INITIAL_TOOLS: ToolItem[] = [
  {
    id: 'tool_deepseek',
    name: 'DeepSeek',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'উচ্চমানের ওপেন-ওয়েটস এআই মডেল যা কোডিং, ম্যাথ এবং রিজনিংয়ে অভাবনীয় দ্রুত ও নিখুঁত।',
    category: 'ai',
    pricing: 'Free',
    pricingDetailsBn: 'সাধারণ ওয়েব চ্যাট সম্পূর্ণ ফ্রি। API ব্যবহার অন্য যেকোনো মডেলের চেয়ে প্রায় ৯৫% সাশ্রয়ী।',
    featuresBn: ['ডিপ রিজনিং মোড (R1)', 'বাংলা ভাষায় চমৎকার বোঝাপড়া', 'লোকাল ডিভাইসে অফলাইন রান করার সুবিধা'],
    officialUrl: 'https://deepseek.com',
    rating: 4.9,
    featured: true,
    relatedArticleIds: ['art_1', 'art_7']
  },
  {
    id: 'tool_chatgpt',
    name: 'ChatGPT',
    logo: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'ওপেনএআই-এর বহুল প্রচলিত কথোপকথনমূলক কৃত্রিম বুদ্ধিমত্তা প্ল্যাটফর্ম।',
    category: 'ai',
    pricing: 'Freemium',
    pricingDetailsBn: 'GPT-4o মিনি ও সাধারণ চ্যাট ফ্রি। আনলিমিটেড অ্যাডভান্সড ব্যবহারের জন্য মাসিক $২০।',
    featuresBn: ['ভয়েস মোড কনভারসেশন', 'কাস্টম জিপিটি (GPTs)', 'ওয়েব ব্রাউজিং ও কোড ইন্টারপ্রেটার'],
    officialUrl: 'https://chatgpt.com',
    rating: 4.8,
    featured: true,
    relatedArticleIds: ['art_1', 'art_7']
  },
  {
    id: 'tool_claude',
    name: 'Claude AI',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'অ্যানথ্রপিক-এর তৈরি এআই মডেল যা কোডিং এবং দীর্ঘ প্রাতিষ্ঠানিক রচনায় সবচেয়ে নিখুঁত।',
    category: 'writing',
    pricing: 'Freemium',
    pricingDetailsBn: 'দৈনিক নির্দিষ্ট মেসেজ ফ্রি। প্রো সাবস্ক্রিপশন ২০ ডলার প্রতি মাসে।',
    featuresBn: ['আর্টিফ্যাক্টস (Artifacts) লাইভ প্রিভিউ', 'উচ্চমানের মানবিক লেখা', 'বিশাল কনটেক্সট উইন্ডো'],
    officialUrl: 'https://claude.ai',
    rating: 4.9,
    featured: true,
    relatedArticleIds: ['art_7']
  },
  {
    id: 'tool_cursor',
    name: 'Cursor AI',
    logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'সফটওয়্যার ডেভেলপারদের জন্য সবচেয়ে দ্রুত ও আধুনিক এআই কোড এডিটর।',
    category: 'development',
    pricing: 'Freemium',
    pricingDetailsBn: 'শুরুতে ফ্রি ট্রায়াল ও ৫০টি স্লো প্রিমিয়াম রিকোয়েস্ট ফ্রি। প্রো ২০ ডলার/মাস।',
    featuresBn: ['পুরো কোডবেস বুঝতে পারার ক্ষমতা', 'Ctrl+K ইনলাইন কোড এডিট', 'টার্মিনাল ইরর অটো ফিক্স'],
    officialUrl: 'https://cursor.com',
    rating: 4.9,
    featured: true,
    relatedArticleIds: ['art_4']
  },
  {
    id: 'tool_notebooklm',
    name: 'Google NotebookLM',
    logo: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'গুগলের ব্যক্তিগত রিসার্চ সহকারী যা আপনার দেওয়া ডকুমেন্টস থেকে পডকাস্ট অডিও ও নোট বানায়।',
    category: 'education',
    pricing: 'Free',
    pricingDetailsBn: '১০০% সম্পূর্ণ ফ্রি গুগল অ্যাকাউন্ট থাকলেই।',
    featuresBn: ['অডিও ওভারভিউ পডকাস্ট তৈরি', 'সরাসরি আপলোড করা সোর্স থেকে উত্তর', 'স্টাডি গাইড ও ব্রিফিং ডক'],
    officialUrl: 'https://notebooklm.google.com',
    rating: 4.8,
    featured: true,
    relatedArticleIds: ['art_2']
  },
  {
    id: 'tool_gamma',
    name: 'Gamma.app',
    logo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'এআই দিয়ে মুহূর্তের মধ্যে সুন্দর ও রেডিমেড স্লাইড প্রেজেন্টেশন ও ওয়েব পেজ তৈরি করার টুল।',
    category: 'productivity',
    pricing: 'Freemium',
    pricingDetailsBn: 'সাইন-আপে ৪০০ ফ্রি ক্রেডিট পাওয়া যায়।',
    featuresBn: ['এক ক্লিকে স্লাইড ডিজাইন', 'পিডিএফ ও পিপিটিএক্স এক্সপোর্ট', 'ইন্টারঅ্যাক্টিভ উইজেট'],
    officialUrl: 'https://gamma.app',
    rating: 4.7,
    featured: true,
    relatedArticleIds: ['art_2']
  },
  {
    id: 'tool_v0',
    name: 'v0 by Vercel',
    logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'প্রম্পট লিখে স্বয়ংক্রিয়ভাবে মডার্ন টেলউইন্ড ও রিয়্যাক্ট ইউআই কম্পোনেন্ট তৈরি করুন।',
    category: 'development',
    pricing: 'Freemium',
    pricingDetailsBn: 'ফ্রি প্ল্যানে প্রতি মাসে ২০০ ক্রেডিট প্রদান করা হয়।',
    featuresBn: ['React & Tailwind কোড জেনারেশন', 'লাইভ ইন্টারেক্টিভ প্রিভিউ', 'সহজ কপি-পেস্ট সাপোর্ট'],
    officialUrl: 'https://v0.dev',
    rating: 4.8,
    relatedArticleIds: ['art_4']
  },
  {
    id: 'tool_figma',
    name: 'Figma',
    logo: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'বিশ্বসেরা ক্লাউড ভিত্তিক ইউআই/ইউএক্স ও গ্রাফিক ডিজাইন প্ল্যাটফর্ম।',
    category: 'design',
    pricing: 'Freemium',
    pricingDetailsBn: '৩টি ফাইল পর্যন্ত সম্পূর্ণ ফ্রি, স্টুডেন্টদের জন্য ফ্রি এডুকেশন প্রো প্ল্যান।',
    featuresBn: ['রিয়েল-টাইম কোলাবোরেশন', 'কম্পোনেন্ট ও অটো লেআউট', 'প্রোটোটাইপিং ও ডেভ মোড'],
    officialUrl: 'https://figma.com',
    rating: 4.9,
    relatedArticleIds: ['art_3']
  },
  {
    id: 'tool_canva',
    name: 'Canva',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'সোশ্যাল মিডিয়া ব্যানার, থাম্বনেইল ও সিভি তৈরির সবচেয়ে সহজ ও জনপ্রিয় প্ল্যাটফর্ম।',
    category: 'design',
    pricing: 'Freemium',
    pricingDetailsBn: 'বেসিক ডিজাইনিং শতভাগ ফ্রি। প্রো টুলসে অতিরিক্ত টেমপ্লেট ও ব্যাকগ্রাউন্ড রিমুভার।',
    featuresBn: ['লক্ষাধিক রেডিমেড টেমপ্লেট', 'ম্যাজিক এআই ইমেজ এডিটিং', 'সহজ ড্র্যাগ অ্যান্ড ড্রপ'],
    officialUrl: 'https://canva.com',
    rating: 4.8
  },
  {
    id: 'tool_photopea',
    name: 'Photopea',
    logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'কোনো ইনস্টলেশন ছাড়াই ব্রাউজারে ফটোশপের পিএসডি ফাইল এডিট করার ফ্রি বিকল্প।',
    category: 'design',
    pricing: 'Free',
    pricingDetailsBn: 'কোনো টাকা লাগে না, বিজ্ঞাপন সমর্থিত ফ্রি সফটওয়্যার।',
    featuresBn: ['PSD, AI, XD ফাইল সাপোর্ট', 'লেয়ার ও মাস্কিং সুবিধা', 'সম্পূর্ণ ব্রাউজার নির্ভর'],
    officialUrl: 'https://photopea.com',
    rating: 4.7
  },
  {
    id: 'tool_obs',
    name: 'OBS Studio',
    logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'স্ক্রিন রেকর্ডিং, অনলাইন ক্লাস ও লাইভ স্ট্রিমিংয়ের জন্য বিশ্বমানের ওপেন সোর্স সফটওয়্যার।',
    category: 'video',
    pricing: 'Free',
    pricingDetailsBn: '১০০% ফ্রি ও ওপেন সোর্স, কোনো জলছাপ বা সময়ের সীমা নেই।',
    featuresBn: ['উচ্চ রেজোলিউশন স্ক্রিন রেকর্ড', 'নয়েজ সাপ্রেশন অডিও ফিল্টার', 'মাল্টি-ক্যামেরা সিন সুইচিং'],
    officialUrl: 'https://obsproject.com',
    rating: 4.9
  },
  {
    id: 'tool_payoneer',
    name: 'Payoneer',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'আন্তর্জাতিক ফ্রিল্যান্সারদের টাকা দেশে আনার এবং বিকাশে সরাসরি ক্যাশ করার সেরা গেটওয়ে।',
    category: 'finance',
    pricing: 'Free',
    pricingDetailsBn: 'অ্যাকাউন্ট খোলা ফ্রি। ট্রানজেকশনে ব্যাংক রেট প্রযোজ্য।',
    featuresBn: ['সরাসরি বিকাশ উইথড্র', 'লোকাল কারেন্সি একাউন্ট (USD, EUR, GBP)', 'গ্লোবাল ফ্রিল্যান্স মার্কেটপ্লেস সাপোর্ট'],
    officialUrl: 'https://payoneer.com',
    rating: 4.7,
    relatedArticleIds: ['art_3', 'art_10']
  },
  {
    id: 'tool_github',
    name: 'GitHub',
    logo: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'কোড সংরক্ষণ, ভার্সন কন্ট্রোল এবং বিশ্বব্যাপী কোলাবোরেশনের শীর্ষ প্ল্যাটফর্ম।',
    category: 'development',
    pricing: 'Free',
    pricingDetailsBn: 'আনলিমিটেড পাবলিক ও প্রাইভেট রিপোজিটরি ফ্রি।',
    featuresBn: ['Git ভার্সন কন্ট্রোল', 'GitHub Actions অটোমেশন', 'গিটহাব পেজেস ফ্রি হোস্টিং'],
    officialUrl: 'https://github.com',
    rating: 4.9,
    relatedArticleIds: ['art_4', 'art_9']
  },
  {
    id: 'tool_khanacademy',
    name: 'Khan Academy',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'গণিত, বিজ্ঞান ও কম্পিউটার প্রোগ্রামিংয়ের সম্পূর্ণ বিনামূল্যের বিশ্বমানের শিক্ষা প্ল্যাটফর্ম।',
    category: 'education',
    pricing: 'Free',
    pricingDetailsBn: 'সকলের জন্য আজীবন ১০০% ফ্রি ও অলাভজনক। বাংলা ভাষায় কন্টেন্ট উপলব্ধ।',
    featuresBn: ['পর্যায়ক্রমিক অনুশীলন ও কুইজ', 'বাংলা ডাবিং সহ ভিডিও লেকচার', 'ব্যক্তিগত লার্নিং ড্যাশবোর্ড'],
    officialUrl: 'https://bn.khanacademy.org',
    rating: 4.9,
    relatedArticleIds: ['art_8']
  },
  {
    id: 'tool_replit',
    name: 'Replit',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'পিসিতে কোনো সফটওয়্যার ইন্সটল না করেই ব্রাউজারে ৫০+ ভাষায় কোডিং করার ক্লাউড IDE।',
    category: 'development',
    pricing: 'Freemium',
    pricingDetailsBn: 'বেসিক প্রজেক্ট ফ্রি। AI এজেন্ট ব্যবহারের জন্য ক্রেডিট প্রয়োজন।',
    featuresBn: ['ইনস্ট্যান্ট ক্লাউড এক্সিকিউশন', 'বন্ধু বা টিমের সাথে রিয়েল-টাইম মাল্টিপ্লেয়ার কোডিং', 'এক ক্লিকে ডেপ্লয়মেন্ট'],
    officialUrl: 'https://replit.com',
    rating: 4.6,
    relatedArticleIds: ['art_9']
  },
  {
    id: 'tool_elevenlabs',
    name: 'ElevenLabs',
    logo: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'সবচেয়ে বাস্তবসম্মত এবং প্রাকৃতিক এআই ভয়েস জেনারেটর (টেক্সট-টু-স্পিচ)।',
    category: 'creator',
    pricing: 'Freemium',
    pricingDetailsBn: 'প্রতি মাসে ১০,০০০ ক্যারেক্টার ফ্রিতে অডিও কনভার্ট করা যায়।',
    featuresBn: ['মানবিক আবেগপূর্ণ উচ্চারণ', 'ভয়েস ক্লোনিং প্রযুক্তি', 'বহুভাষিক সাপোর্ট'],
    officialUrl: 'https://elevenlabs.io',
    rating: 4.8
  },
  {
    id: 'tool_runway',
    name: 'RunwayML',
    logo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'টেক্সট এবং ছবি থেকে সিনেমাটিক ভিডিও ক্লিপ তৈরির বিশ্বের শীর্ষস্থানীয় এআই প্ল্যাটফর্ম।',
    category: 'video',
    pricing: 'Freemium',
    pricingDetailsBn: 'ফ্রি একাউন্টে ১২৫ ওয়ান-টাইম ভিডিও জেনারেশন ক্রেডিট।',
    featuresBn: ['Gen-3 Alpha ভিডিও জেনারেশন', 'মোশন ব্রাশ এবং ক্যামেরা কন্ট্রোল', 'গ্রিন স্ক্রিন রিমুভার'],
    officialUrl: 'https://runwayml.com',
    rating: 4.7
  },
  {
    id: 'tool_capcut',
    name: 'CapCut',
    logo: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'টিকটক, রিলস ও ইউটিউব শর্টস বানানোর জন্য স্বয়ংক্রিয় ক্যাপশন সহ সেরা ফ্রি ভিডিও এডিটর।',
    category: 'creator',
    pricing: 'Free',
    pricingDetailsBn: 'মোবাইল ও পিসিতে বেশিরভাগ পাওয়ারফুল ফিচার কোনো ওয়াটারমার্ক ছাড়াই ফ্রি।',
    featuresBn: ['অটো ক্যাপশন জেনারেশন', 'স্মার্ট কাটআউট ও গ্রিন স্ক্রিন', 'ট্রেন্ডিং ইফেক্ট ও ট্রানজিশন'],
    officialUrl: 'https://capcut.com',
    rating: 4.8
  },
  {
    id: 'tool_tradingview',
    name: 'TradingView',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'বিশ্বব্যাপী স্টক, কারেন্সি এবং ক্রিপ্টোকারেন্সির জন্য সেরা আর্থিক চার্ট ও অ্যানালাইসিস প্ল্যাটফর্ম।',
    category: 'finance',
    pricing: 'Freemium',
    pricingDetailsBn: 'প্রতি চার্টে ৩টি ইন্ডিকেটর সহ ফ্রি প্ল্যান রয়েছে।',
    featuresBn: ['১০০+ টেকনিক্যাল ইন্ডিকেটর', 'গ্লোবাল মার্কেট ডেটা', 'পাইন স্ক্রিপ্ট কোডিং ব্যাকটেস্টিং'],
    officialUrl: 'https://tradingview.com',
    rating: 4.9,
    relatedArticleIds: ['art_6']
  },
  {
    id: 'tool_notion',
    name: 'Notion',
    logo: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&auto=format&fit=crop&q=80',
    descriptionBn: 'নোট নেওয়া, পড়ার রুটিন তৈরি এবং প্রজেক্ট ম্যানেজমেন্টের সর্বজনীন ডিজিটাল ওয়ার্কস্পেস।',
    category: 'productivity',
    pricing: 'Free',
    pricingDetailsBn: 'ব্যক্তিগত ব্যবহারের জন্য সম্পূর্ণ ফ্রি। স্টুডেন্টদের জন্য ফ্রি প্লাস প্ল্যান পাওয়া যায়।',
    featuresBn: ['কাস্টম ডাটাবেস ও ক্যালেন্ডার ভিউ', 'নোটস ও উইকি অর্গানাইজেশন', 'সহজ কোলাবোরেশন ও শেয়ারিং'],
    officialUrl: 'https://notion.so',
    rating: 4.9,
    relatedArticleIds: ['art_2']
  }
];

export const INITIAL_ADS: AdPlacement[] = [
  {
    id: 'header_top_banner',
    name: 'টপ ব্যানার (Header Top Banner)',
    location: 'header',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Header Top Container',
    supportedFormats: ['banner', 'code', 'smart_link', 'direct_link'],
    assignedCampaignId: 'camp_code_header',
    enabled: true,
    code: '<!-- Adsterra Header Banner 728x90 / Responsive -->\n<div class="p-3 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-2">\n  <span>বিজ্ঞাপন প্লেসমেন্ট (Header 728x90) · Adsterra / Direct Ad Slot</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'all',
    descriptionBn: 'ওয়েবসাইটের একেবারে শীর্ষে প্রতিটি পেজে প্রদর্শিত ব্যানার।',
    descriptionEn: 'Top banner displayed across all pages.'
  },
  {
    id: 'ad_header',
    name: 'টপ ব্যানার লিগ্যাসি (Header Placement)',
    location: 'header',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Header Top Slot',
    supportedFormats: ['banner', 'code'],
    assignedCampaignId: 'camp_code_header',
    enabled: true,
    code: '<!-- Adsterra Header Banner 728x90 / Responsive -->\n<div class="p-3 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-2">\n  <span>বিজ্ঞাপন প্লেসমেন্ট (Header 728x90) · Adsterra / Direct Ad Slot</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'all'
  },
  {
    id: 'homepage_mid_banner',
    name: 'হোমপেজ মিডল ব্যানার',
    location: 'homepage',
    category: 'banner',
    routePattern: '/',
    componentTarget: 'Homepage Categories Divider',
    supportedFormats: ['banner', 'code', 'direct_link'],
    enabled: true,
    code: '<!-- Adsterra Homepage Native Banner -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-6">\n  <span>বিজ্ঞাপন প্লেসমেন্ট (Homepage Featured) · Adsterra Native Ad</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'homepage',
    descriptionBn: 'হোমপেজের ক্যাটাগরি সেকশনগুলোর মাঝে নেটিভ ব্যানার।',
    descriptionEn: 'Native banner between homepage categories.'
  },
  {
    id: 'ad_homepage',
    name: 'হোমপেজ ব্যানার লিগ্যাসি',
    location: 'homepage',
    category: 'banner',
    routePattern: '/',
    componentTarget: 'Homepage Slot',
    supportedFormats: ['banner', 'code'],
    enabled: true,
    code: '<!-- Adsterra Homepage Native Banner -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-6">\n  <span>বিজ্ঞাপন প্লেসমেন্ট (Homepage Featured) · Adsterra Native Ad</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'homepage'
  },
  {
    id: 'article_detail_top',
    name: 'আর্টিকেল শুরু (Article Top)',
    location: 'article_top',
    category: 'article',
    routePattern: '/article/*',
    componentTarget: 'Article Beginning',
    supportedFormats: ['banner', 'code', 'smart_link', 'direct_link'],
    enabled: true,
    code: '<!-- Adsterra Article Top Responsive -->\n<div class="p-3 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-4">\n  <span>স্পন্সরড কন্টেন্ট / বিজ্ঞাপন · এডমিন প্যানেল থেকে সহজে পরিবর্তনযোগ্য</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'articles',
    descriptionBn: 'প্রতিটি পূর্ণাঙ্গ আর্টিকেলের শীর্ষভাগে প্রদর্শিত ব্যানার।',
    descriptionEn: 'Banner displayed at top of article detail view.'
  },
  {
    id: 'ad_article_top',
    name: 'আর্টিকেল টপ লিগ্যাসি',
    location: 'article_top',
    category: 'article',
    routePattern: '/article/*',
    componentTarget: 'Article Top',
    supportedFormats: ['banner', 'code'],
    enabled: true,
    code: '<!-- Adsterra Article Top Responsive -->\n<div class="p-3 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-4">\n  <span>স্পন্সরড কন্টেন্ট / বিজ্ঞাপন · এডমিন প্যানেল থেকে সহজে পরিবর্তনযোগ্য</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'articles'
  },
  {
    id: 'article_detail_middle',
    name: 'আর্টিকেল মাঝের অনুচ্ছেদ (In-Content Middle)',
    location: 'article_middle',
    category: 'article',
    routePattern: '/article/*',
    componentTarget: 'Article Mid-Content',
    supportedFormats: ['banner', 'code'],
    assignedCampaignId: 'camp_code_article_mid',
    enabled: true,
    code: '<!-- In-Content Middle Native Ad -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-6">\n  <span>ইন-আর্টিকেল নেটিভ বিজ্ঞাপন · Google AdSense / Adsterra Slot</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'articles',
    descriptionBn: 'আর্টিকেলের পড়ার মাঝে স্বাভাবিকভাবে সাজানো বিজ্ঞাপন।',
    descriptionEn: 'In-content mid-article ad unit.'
  },
  {
    id: 'article_detail_bottom',
    name: 'আর্টিকেল শেষ (Article Bottom)',
    location: 'article_bottom',
    category: 'article',
    routePattern: '/article/*',
    componentTarget: 'Article Footer',
    supportedFormats: ['banner', 'code', 'direct_link'],
    enabled: true,
    code: '<!-- Adsterra Article Bottom Banner -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-4">\n  <span>বিজ্ঞাপন · Adsterra Banner Slot</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'articles',
    descriptionBn: 'আর্টিকেলের পড়ার শেষে সম্পর্কিত সেকশনের আগে।',
    descriptionEn: 'Bottom article banner before related content.'
  },
  {
    id: 'ad_article_bottom',
    name: 'আর্টিকেল বটম লিগ্যাসি',
    location: 'article_bottom',
    category: 'article',
    routePattern: '/article/*',
    componentTarget: 'Article Bottom',
    supportedFormats: ['banner', 'code'],
    enabled: true,
    code: '<!-- Adsterra Article Bottom Banner -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-4">\n  <span>বিজ্ঞাপন · Adsterra Banner Slot</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'articles'
  },
  {
    id: 'sidebar_widget',
    name: 'সাইডবার ব্যানার (Sidebar Widget)',
    location: 'sidebar',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Desktop Sidebar',
    supportedFormats: ['banner', 'code'],
    enabled: true,
    code: '<!-- Adsterra 300x250 Medium Rectangle -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-3 min-h-[160px] flex items-center justify-center">\n  <span>বিজ্ঞাপন (Sidebar 300x250)</span>\n</div>',
    deviceTarget: 'desktop',
    pageTarget: 'all'
  },
  {
    id: 'ad_sidebar',
    name: 'সাইডবার লিগ্যাসি',
    location: 'sidebar',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Sidebar',
    supportedFormats: ['banner', 'code'],
    enabled: true,
    code: '<!-- Adsterra 300x250 Medium Rectangle -->\n<div class="p-4 bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500 rounded my-3 min-h-[160px] flex items-center justify-center">\n  <span>বিজ্ঞাপন (Sidebar 300x250)</span>\n</div>',
    deviceTarget: 'desktop',
    pageTarget: 'all'
  },
  {
    id: 'mobile_sticky',
    name: 'মোবাইল বটম ব্যানার (Mobile Sticky / In-feed)',
    location: 'mobile',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Mobile Bottom Screen',
    supportedFormats: ['banner', 'code'],
    enabled: false,
    code: '<!-- Mobile In-feed 320x50 Ad -->\n<div class="p-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500">\n  <span>Mobile Ad Slot</span>\n</div>',
    deviceTarget: 'mobile',
    pageTarget: 'all'
  },
  {
    id: 'ad_mobile',
    name: 'মোবাইল লিগ্যাসি',
    location: 'mobile',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Mobile',
    supportedFormats: ['banner', 'code'],
    enabled: false,
    code: '<!-- Mobile In-feed 320x50 Ad -->\n<div class="p-2 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500">\n  <span>Mobile Ad Slot</span>\n</div>',
    deviceTarget: 'mobile',
    pageTarget: 'all'
  },
  {
    id: 'footer_banner',
    name: 'ফুটার ব্যানার (Footer Placement)',
    location: 'footer',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Footer Top Section',
    supportedFormats: ['banner', 'code', 'direct_link'],
    enabled: true,
    code: '<!-- Adsterra Footer Banner -->\n<div class="py-3 px-4 bg-stone-100 dark:bg-stone-900 border-t border-dashed border-stone-300 dark:border-stone-800 text-center text-xs text-stone-500">\n  <span>স্পন্সরড প্ল্যাটফর্ম ব্যানার</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'all'
  },
  {
    id: 'ad_footer',
    name: 'ফুটার লিগ্যাসি',
    location: 'footer',
    category: 'banner',
    routePattern: '*',
    componentTarget: 'Footer',
    supportedFormats: ['banner', 'code'],
    enabled: true,
    code: '<!-- Adsterra Footer Banner -->\n<div class="py-3 px-4 bg-stone-100 dark:bg-stone-900 border-t border-dashed border-stone-300 dark:border-stone-800 text-center text-xs text-stone-500">\n  <span>স্পন্সরড প্ল্যাটফর্ম ব্যানার</span>\n</div>',
    deviceTarget: 'all',
    pageTarget: 'all'
  },
  // Button-level placements
  {
    id: 'btn_hero_explore_latest',
    name: 'হিরো বাটন: "সর্বশেষ আবিষ্কার করুন"',
    location: 'btn_hero_explore_latest',
    category: 'button',
    routePattern: '/',
    componentTarget: 'Hero Primary CTA Button',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    assignedCampaignId: 'camp_directlink_1',
    enabled: true,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'homepage',
    descriptionBn: 'হোমপেজ হিরো সেকশনের প্রথম মূল বাটনে ক্লিক করলে প্রি-অ্যাকশন বিজ্ঞাপন।',
    descriptionEn: 'Pre-action ad on Hero Explore Latest button click.'
  },
  {
    id: 'btn_hero_explore_tools',
    name: 'হিরো বাটন: "ডিজিটাল টুলস ডিরেক্টরি"',
    location: 'btn_hero_explore_tools',
    category: 'button',
    routePattern: '/',
    componentTarget: 'Hero Secondary CTA Button',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'homepage',
    descriptionBn: 'টুলস ডিরেক্টরি বাটনে ক্লিক করলে প্রি-অ্যাকশন বিজ্ঞাপন।',
    descriptionEn: 'Pre-action ad on Explore Tools button click.'
  },
  {
    id: 'btn_article_card_read_more',
    name: 'আর্টিকেল কার্ড: "বিস্তারিত পড়ুন / Read More"',
    location: 'btn_article_card_read_more',
    category: 'button',
    routePattern: '*',
    componentTarget: 'Article Card Action',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'all',
    descriptionBn: 'আর্টিকেল কার্ডের লিংকে ক্লিক করার সময় প্রি-অ্যাকশন বিজ্ঞাপন।',
    descriptionEn: 'Pre-action ad on clicking article card.'
  },
  {
    id: 'btn_article_earning_visit',
    name: 'আর্টিকেল আর্নিং: "অফিসিয়াল ওয়েবসাইট ভিজিট করুন"',
    location: 'btn_article_earning_visit',
    category: 'article',
    routePattern: '/article/*',
    componentTarget: 'Earning Platform Official Website Link',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    assignedCampaignId: 'camp_smartlink_1',
    enabled: true,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'articles',
    descriptionBn: 'ফ্রিল্যান্সিং আর্টিকেলে অফিসিয়াল সাইটের লিংকে ক্লিক করলে স্পন্সর প্রি-অ্যাকশন।',
    descriptionEn: 'Pre-action ad on visiting earning platform official website.'
  },
  {
    id: 'btn_video_card_play',
    name: 'ভিডিও কার্ড: "প্লে / ভিডিও দেখুন"',
    location: 'btn_video_card_play',
    category: 'video',
    routePattern: '/videos*',
    componentTarget: 'Video Card Play Overlay',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'videos',
    descriptionBn: 'ভিডিও গ্যালারির যেকোনো ভিডিওতে ক্লিক করার সময় বিজ্ঞাপন।',
    descriptionEn: 'Pre-action ad when clicking video play button.'
  },
  {
    id: 'btn_video_detail_play',
    name: 'ভিডিও ডিটেল: প্লেয়ার / ওয়াচ অ্যাকশন',
    location: 'btn_video_detail_play',
    category: 'video',
    routePattern: '/video/*',
    componentTarget: 'Video Player Area',
    supportedFormats: ['pre_action', 'direct_link', 'code'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'videos',
    descriptionBn: 'ভিডিও ডিটেল পেজে ভিডিও দেখার সময় বিজ্ঞাপন।',
    descriptionEn: 'Ad before video detail interaction.'
  },
  {
    id: 'btn_tool_card_launch',
    name: 'এআই টুল কার্ড: "টুলটি ব্যবহার করুন / Launch Tool"',
    location: 'btn_tool_card_launch',
    category: 'tool',
    routePattern: '/tools*',
    componentTarget: 'AI Tool External Link Button',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    assignedCampaignId: 'camp_smartlink_1',
    enabled: true,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'tools',
    descriptionBn: 'টুলস ডিরেক্টরিতে এক্সটার্নাল টুল লিংকে ক্লিক করার সময় স্পন্সর স্মার্ট লিংক।',
    descriptionEn: 'Pre-action Smart Link ad on launching external AI tool.'
  },
  {
    id: 'btn_tool_detail_visit',
    name: 'এআই টুল ডিটেল: "অফিসিয়াল ওয়েবসাইট ভিজিট করুন"',
    location: 'btn_tool_detail_visit',
    category: 'tool',
    routePattern: '/tool/*',
    componentTarget: 'Tool Detail Official Website Button',
    supportedFormats: ['pre_action', 'smart_link', 'direct_link'],
    assignedCampaignId: 'camp_directlink_1',
    enabled: true,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'tools',
    descriptionBn: 'টুল ডিটেল পেজে মূল সাইটে যাওয়ার আগে প্রি-অ্যাকশন বিজ্ঞাপন।',
    descriptionEn: 'Pre-action ad before visiting official tool site.'
  },
  {
    id: 'btn_trending_click',
    name: 'ট্রেন্ডিং বার: আইটেম ক্লিক',
    location: 'btn_trending_click',
    category: 'button',
    routePattern: '/',
    componentTarget: 'Trending Bar Link',
    supportedFormats: ['pre_action', 'smart_link'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'homepage',
    descriptionBn: 'ট্রেন্ডিং বারের যেকোনো খবরে ক্লিক করলে বিজ্ঞাপন।',
    descriptionEn: 'Ad on clicking trending topics.'
  },
  {
    id: 'auto_pageview_interstitial',
    name: 'স্বয়ংক্রিয় পেজভিউ ইন্টারস্টিশিয়াল (Auto Pageview Ad)',
    location: 'auto_pageview_interstitial',
    category: 'automatic',
    routePattern: '*',
    componentTarget: 'Global Automatic Interstitial',
    supportedFormats: ['interstitial', 'code', 'direct_link'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'all',
    descriptionBn: 'প্রতি নির্দিষ্ট সংখ্যক পেজভিজিট পর পর স্বয়ংক্রিয় বিজ্ঞাপন।',
    descriptionEn: 'Automatic interstitial ad after configured page views.'
  },
  {
    id: 'auto_timed_interstitial',
    name: 'স্বয়ংক্রিয় টাইমড ইন্টারস্টিশিয়াল (Auto Periodic Ad)',
    location: 'auto_timed_interstitial',
    category: 'automatic',
    routePattern: '*',
    componentTarget: 'Global Timed Popup',
    supportedFormats: ['interstitial', 'code', 'direct_link'],
    enabled: false,
    code: '',
    deviceTarget: 'all',
    pageTarget: 'all',
    descriptionBn: 'নির্দিষ্ট সময় ব্যবধানে পর পর স্বয়ংক্রিয় পপআপ বিজ্ঞাপন।',
    descriptionEn: 'Automatic periodic interstitial based on timer.'
  }
];

export const INITIAL_AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp_smartlink_1',
    name: 'গ্লোবাল ডিজিটাল স্কিলস স্মার্ট লিংক (Adsterra SmartLink)',
    description: 'Adsterra স্মার্ট লিংক দিয়ে মনিটাইজড রিডাইরেক্ট এবং ভেরিফায়েড স্পন্সর অফার।',
    type: 'smart_link',
    provider: 'adsterra',
    status: 'active',
    placementIds: ['btn_tool_card_launch', 'btn_article_earning_visit'],
    targetRoutes: ['/tools', '/article/*'],
    targetButtons: ['btn_tool_card_launch', 'btn_article_earning_visit'],
    displayMode: 'pre_action',
    smartLinkUrl: 'https://www.highcpmgate.com/sample_smartlink?campaign=khojghor',
    destinationUrl: 'https://coursera.org',
    displayDelay: 3,
    frequencyCap: 2,
    cooldownMinutes: 10,
    priority: 9,
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    deviceTarget: 'all',
    languageTarget: 'all',
    userEligibility: 'all',
    openInNewTab: true,
    fallbackBehavior: 'continue_to_destination',
    impressions: 1420,
    clicks: 185,
    completions: 168,
    errors: 0,
    createdAt: '2026-03-01',
    updatedAt: '2026-03-25'
  },
  {
    id: 'camp_directlink_1',
    name: 'হোস্টিং ও ক্লাউড সার্ভার ডিরেক্ট অফার (Direct Link)',
    description: 'ডেভেলপার ও ফ্রিল্যান্সারদের জন্য সাশ্রয়ী হোস্টিং ও সার্ভার স্পন্সর লিংক।',
    type: 'direct_link',
    provider: 'direct',
    status: 'active',
    placementIds: ['btn_hero_explore_latest', 'btn_tool_detail_visit'],
    targetRoutes: ['/', '/tool/*'],
    targetButtons: ['btn_hero_explore_latest', 'btn_tool_detail_visit'],
    displayMode: 'pre_action',
    destinationUrl: 'https://digitalocean.com',
    bannerTitle: 'ডেভেলপার ক্লাউড সার্ভার ও হোস্টিং স্পেশাল ট্রায়াল',
    bannerSubtitle: 'আপনার এআই এবং ফুল-স্ট্যাক প্রজেক্ট লাইভ সার্ভারে প্রকাশ করতে স্পেশাল ক্লাউড ক্রেডিট ট্রায়াল নিন।',
    ctaText: 'অফারটি দেখুন →',
    displayDelay: 3,
    frequencyCap: 3,
    cooldownMinutes: 15,
    priority: 8,
    startDate: '2026-03-10',
    endDate: '2026-11-30',
    deviceTarget: 'all',
    languageTarget: 'all',
    userEligibility: 'all',
    openInNewTab: true,
    fallbackBehavior: 'continue_to_destination',
    impressions: 980,
    clicks: 92,
    completions: 89,
    errors: 1,
    createdAt: '2026-03-10',
    updatedAt: '2026-03-26'
  },
  {
    id: 'camp_code_header',
    name: 'Adsterra টপ হেডার রেসপন্সিভ ব্যানার',
    description: 'ওয়েবসাইটের টপ বারে রেসপন্সিভ ৭২৮x৯০ স্পন্সর বার্তা।',
    type: 'code',
    provider: 'adsterra',
    status: 'active',
    placementIds: ['header_top_banner', 'ad_header'],
    targetRoutes: ['*'],
    displayMode: 'inline',
    adCode: '<div class="p-3.5 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-center flex items-center justify-between gap-4 flex-wrap max-w-4xl mx-auto"><div class="flex items-center gap-3"><span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded">স্পন্সরড</span><span class="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">বাংলাদেশের তরুণ ফ্রিল্যান্সারদের জন্য আধুনিক টেক স্কিল ও ক্লাউড রিসোর্স</span></div><a href="https://example.com/sponsor" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 text-xs font-semibold rounded bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-emerald-600 transition-colors shrink-0">ভিজিট করুন →</a></div>',
    displayDelay: 0,
    frequencyCap: 0,
    cooldownMinutes: 0,
    priority: 10,
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    deviceTarget: 'all',
    languageTarget: 'all',
    userEligibility: 'all',
    openInNewTab: true,
    fallbackBehavior: 'skip',
    impressions: 3840,
    clicks: 215,
    completions: 215,
    errors: 0,
    createdAt: '2026-03-01',
    updatedAt: '2026-03-24'
  },
  {
    id: 'camp_code_article_mid',
    name: 'Google AdSense ইন-আর্টিকেল নেটিভ স্লট',
    description: 'আর্টিকেলের পড়ার মাঝে নেটিভ স্পন্সর বক্স।',
    type: 'code',
    provider: 'google_adsense',
    status: 'active',
    placementIds: ['article_detail_middle'],
    targetRoutes: ['/article/*'],
    displayMode: 'inline',
    adCode: '<div class="my-6 p-4 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center"><p class="text-[11px] text-stone-400 uppercase tracking-widest font-mono mb-2">বিজ্ঞাপন · Google AdSense Responsive</p><div class="py-4 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300">প্রযুক্তি ও এআই রিলেটেড শীর্ষ সফটওয়্যার টুলস ডিসকাউন্ট অফার</div></div>',
    displayDelay: 0,
    frequencyCap: 0,
    cooldownMinutes: 0,
    priority: 7,
    startDate: '2026-03-15',
    endDate: '2026-10-31',
    deviceTarget: 'all',
    languageTarget: 'all',
    userEligibility: 'all',
    openInNewTab: true,
    fallbackBehavior: 'skip',
    impressions: 2210,
    clicks: 134,
    completions: 134,
    errors: 0,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-26'
  },
  {
    id: 'camp_interstitial_periodic',
    name: 'পিরিয়ডিক ব্রাউজিং স্পনসর ইন্টারস্টিশিয়াল',
    description: 'নির্দিষ্ট সময় বা পেজভিউ ব্যবধানে স্বয়ংক্রিয় বিজ্ঞাপন।',
    type: 'interstitial',
    provider: 'monetag',
    status: 'paused',
    placementIds: ['auto_pageview_interstitial', 'auto_timed_interstitial'],
    targetRoutes: ['*'],
    displayMode: 'periodic',
    bannerTitle: 'খোঁজঘর প্রিমিয়াম ডেভেলপার রিসোর্স ও গাইড',
    bannerSubtitle: 'প্রতি সপ্তাহে সেরা এআই টুলস ও কোডিং প্রজেক্ট আপনার কাছে পৌঁছে দিতে আমাদের সাথে থাকুন।',
    ctaText: 'রিসোর্স পেজ দেখুন',
    destinationUrl: 'https://example.com/resources',
    displayDelay: 4,
    frequencyCap: 1,
    cooldownMinutes: 30,
    priority: 5,
    startDate: '2026-03-20',
    endDate: '2026-12-31',
    deviceTarget: 'all',
    languageTarget: 'all',
    userEligibility: 'all',
    openInNewTab: true,
    fallbackBehavior: 'continue_to_destination',
    impressions: 450,
    clicks: 38,
    completions: 35,
    errors: 0,
    createdAt: '2026-03-20',
    updatedAt: '2026-03-26'
  }
];

export const INITIAL_AD_FREQUENCY_SETTINGS: AdFrequencySettings = {
  masterAdEnabled: true,
  periodicAdEnabled: true,
  periodicIntervalSeconds: 180,
  pageviewFrequency: 4,
  maxAdsPerSession: 4,
  globalCooldownSeconds: 45,
  preActionCountdownSeconds: 3,
  preventDuplicateClicks: true,
  debugMode: false,
  defaultFallbackBehavior: 'continue_to_destination'
};

export const INITIAL_AD_INTEGRATIONS: AdApiIntegration[] = [
  {
    id: 'int_adsterra',
    provider: 'adsterra',
    name: 'Adsterra Network API',
    apiKey: 'adt_pub_live_98471204',
    apiEndpoint: 'https://api3.adsterratools.com/publisher',
    publisherId: 'pub-884920',
    placementId: 'plc-header-728',
    status: 'connected',
    lastSync: '2026-03-27 14:00',
    notes: 'Active banner and smartlink integration'
  },
  {
    id: 'int_adsense',
    provider: 'google_adsense',
    name: 'Google AdSense / Ad Manager',
    apiKey: 'pub-9482019482019482',
    apiEndpoint: 'https://adsense.googleapis.com/v2',
    publisherId: 'ca-pub-9482019482',
    placementId: 'slot-inarticle-responsive',
    status: 'connected',
    lastSync: '2026-03-27 12:30',
    notes: 'In-article native ad units'
  },
  {
    id: 'int_monetag',
    provider: 'monetag',
    name: 'Monetag (PropellerAds) API',
    apiKey: 'mnt_sec_7719203810',
    apiEndpoint: 'https://api.monetag.com/v1',
    publisherId: 'mon-55910',
    placementId: 'zone-interstitial-direct',
    status: 'disconnected',
    lastSync: '2026-03-25 10:15',
    notes: 'Direct link monetization'
  }
];

export const INITIAL_PAGES: StaticPage[] = [
  {
    slug: 'about',
    titleBn: 'আমাদের সম্পর্কে',
    titleEn: 'About KhojGhor',
    contentBn: `## খোঁজঘর (KhojGhor) কী?

"খোঁজঘর" একটি আধুনিক বাংলা ডিজিটাল মিডিয়া ও নলেজ প্ল্যাটফর্ম। এটি কোনো ক্লিকবেইট অনলাইন আর্নিং কিংবা অবাস্তব প্রতিশ্রুতির সাইট নয়।

আমাদের লক্ষ্য বাংলাদেশের তরুণ প্রজন্ম, শিক্ষার্থী, ফ্রিল্যান্সার, ডেভেলপার ও প্রযুক্তি অনুরাগীদের কাছে নির্ভরযোগ্য, যাচাইকৃত ও বাস্তবিক ডিজিটাল জ্ঞান সহজে পৌঁছে দেওয়া।

### আমাদের মূল দর্শন:
**“খুঁজে নাও। শিখে নাও। বানিয়ে ফেলো।” (Discover · Learn · Build · Grow)**

### আমরা কী কভার করি:
১. **কৃত্রিম বুদ্ধিমত্তা (AI):** বাস্তব জীবনে কাজের গতি বাড়ানোর জন্য এআই মডেল, প্রম্পট ও টুলস।
২. **প্রযুক্তি ও টিপস:** দৈনন্দিন গ্যাজেট, সফটওয়্যার ও সাইবার সুরক্ষার সমাধান।
৩. **সত্যিকারের ক্যারিয়ার ও ফ্রিল্যান্সিং:** কোনো ভুয়া ক্লিক নয়; বাস্তব স্কিল ডেভেলপমেন্ট ও সঠিক গাইডলাইন।
৪. **শিক্ষার্থী ও শিক্ষা:** ফ্রি কোর্স, স্কলারশিপ ও স্টাডি হ্যাকস।
৫. **মেক ও বিল্ড:** নিজে কোডিং শেখা, ওয়েবসাইট ও অ্যাপ তৈরির প্র্যাকটিক্যাল প্রজেক্ট।
৬. **ডিজিটাল টুলস ডিরেক্টরি:** দরকারি সব সফটওয়্যার ও ওয়েবসাইটের যাচাইকৃত তালিকা।`,
    updatedAt: '2026-03-25'
  },
  {
    slug: 'contact',
    titleBn: 'যোগাযোগ',
    titleEn: 'Contact Us',
    contentBn: `## আমাদের সাথে যোগাযোগ করুন

আপনার কোনো প্রশ্ন, মতামত, প্রজেক্ট শোকেসিং বা পরামর্শ থাকলে সরাসরি আমাদের সম্পাদকীয় টিমের সাথে যোগাযোগ করতে পারেন।

* **ইমেইল:** editorial@khojghor.com
* **বিজ্ঞাপন ও স্পনসরশিপ:** business@khojghor.com
* **ঠিকানা:** ঢাকা, বাংলাদেশ
* **সোশ্যাল মিডিয়া:** ইউটিউব, ফেসবুক ও টেলিগ্রাম চ্যানেলে আমাদের সাথেই থাকুন।

আমরা সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে প্রতিটি গঠনমূলক বার্তার উত্তর দেওয়ার চেষ্টা করি।`,
    updatedAt: '2026-03-25'
  },
  {
    slug: 'privacy',
    titleBn: 'গোপনীয়তা নীতি (Privacy Policy)',
    titleEn: 'Privacy Policy',
    contentBn: `## ব্যবহারকারীর তথ্যের সুরক্ষা ও গোপনীয়তা নীতি

খোঁজঘর (KhojGhor) পাঠকদের ব্যক্তিগত গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। 

### ১. সংগৃহীত তথ্য:
আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করার জন্য সাধারণ অ্যানালিটিক্স ডেটা (যেমন: ব্রাউজারের ধরন, পেজ ভিউ, দেশ) সংগ্রহ করতে পারি। আমরা কখনই আপনার অনুমতি ব্যতীত কোনো সংবেদনশীল তথ্য সংরক্ষণ করি না।

### ২. কুকিজ ও বিজ্ঞাপন:
আমাদের ওয়েবসাইটে ব্যবহারকারীর পছন্দ মনে রাখতে ও থার্ড-পার্টি বিজ্ঞাপন নেটওয়ার্কের (যেমন: Adsterra) মাধ্যমে বিজ্ঞাপন প্রদর্শনের জন্য কুকিজ ব্যবহার হতে পারে। ব্যবহারকারী চাইলে যেকোনো সময় ব্রাউজার সেটিংস থেকে কুকি নিষ্ক্রিয় করতে পারেন।

### ৩. থার্ড-পার্টি লিঙ্ক:
আমাদের বিভিন্ন আর্টিকেলে সহায়ক অফিশিয়াল ওয়েবসাইট বা টুলের লিঙ্ক দেওয়া থাকে। সেই সকল বাহ্যিক ওয়েবসাইটের গোপনীয়তা নীতি তাদের নিজস্ব শর্তাধীন।`,
    updatedAt: '2026-03-25'
  },
  {
    slug: 'terms',
    titleBn: 'ব্যবহারের শর্তাবলী (Terms & Conditions)',
    titleEn: 'Terms and Conditions',
    contentBn: `## খোঁজঘর ব্যবহারের নিয়মাবলী

১. খোঁজঘরের সকল লেখা, টিউটোরিয়াল ও তথ্য শিক্ষামূলক উদ্দেশ্যে প্রকাশিত।
২. কোনো কন্টেন্ট লেখকের লিখিত অনুমতি ছাড়া অবিকল বাণিজ্যিক উদ্দেশ্যে পুনরুৎপাদন করা নিষেধ। তবে প্রাসঙ্গিক রেফারেন্স ও ক্রেডিট সহ শেয়ার করা যাবে।
৩. কমেন্ট বা প্রতিক্রিয়ায় কোনো ধরনের স্প্যাম, অবমাননাকর বা বেআইনি মন্তব্য প্রকাশ করা সম্পূর্ণ নিষিদ্ধ।`,
    updatedAt: '2026-03-25'
  },
  {
    slug: 'disclaimer',
    titleBn: 'দায়মুক্তি ও আর্থিক সতর্কবার্তা (Disclaimer)',
    titleEn: 'Disclaimer & Financial Notice',
    contentBn: `## গুরুত্বপূর্ণ সতর্কবার্তা ও দায়মুক্তি

### ১. ট্রেডিং ও ফাইন্যান্স:
খোঁজঘরে প্রকাশিত ট্রেডিং বা মার্কেট সম্পর্কিত আলোচনা শুধুই শিক্ষামূলক বিশ্লেষণ। এটি কোনো রেজিস্টার্ড আর্থিক পরামর্শ (Financial Advice) নয়। যেকোনো ধরনের বিনিয়োগের পূর্বে আপনার নিজস্ব বিচারবুদ্ধি ও আর্থিক বিশেষজ্ঞদের পরামর্শ গ্রহণ করুন।

### ২. অনলাইন উপার্জন ও ফ্রিল্যান্সিং:
আমরা কোনো ধরনের "ঘরে বসে গ্যারান্টিযুক্ত আয়" সমর্থন করি না। আপনার আয় সম্পূর্ণরূপে আপনার নিজস্ব দক্ষতা, ক্লায়েন্ট ম্যানেজমেন্ট এবং আন্তর্জাতিক বাজারের চাহিদার ওপর নির্ভর করে।

### ৩. সফটওয়্যার ও টুলস:
আমরা শুধুমাত্র বৈধ ও অফিসিয়াল টুলস ও সার্ভিস শেয়ার করি। কোনো ধরনের পাইরেসি, ক্র্যাক সফটওয়্যার বা ম্যালওয়্যার ছড়ানো আমাদের কঠোর নীতিবিরুদ্ধ।`,
    updatedAt: '2026-03-25'
  },
  {
    slug: 'advertiser-disclosure',
    titleBn: 'বিজ্ঞাপন ও অ্যাফিলিয়েট প্রকাশনা (Advertiser Disclosure)',
    titleEn: 'Advertiser Disclosure',
    contentBn: `## স্বচ্ছতা ও বিজ্ঞাপন নীতিমালা

খোঁজঘর ওয়েবসাইটটি বিনামূল্যে পরিচালন এবং নিয়মিত উচ্চমানের কন্টেন্ট তৈরির জন্য বিজ্ঞাপনী আয় ও নির্দিষ্ট অ্যাফিলিয়েট কমিশনের ওপর নির্ভর করে।

* যখন আপনি আমাদের লিংকের মাধ্যমে কোনো সফটওয়্যার বা কোর্সে যুক্ত হন, তখন আমরা ছোট একটি রেফারেল কমিশন পেতে পারি।
* তবে এটি কোনো অবস্থাতেই আমাদের নিরপেক্ষ পর্যালোচনা বা পণ্যের গুণমান নির্ধারণে প্রভাব ফেলে না। আমরা শুধুমাত্র আমাদের নিজেদের পরীক্ষিত ও মানসম্পন্ন টুলস সুপারিশ করি।`,
    updatedAt: '2026-03-25'
  },
  {
    slug: 'advertise-with-us',
    titleBn: 'বিজ্ঞাপন দিন (Advertise With Us)',
    titleEn: 'Advertise With Us',
    contentBn: `## আপনার ব্র্যান্ডকে পরিচিত করুন বাংলাদেশের সবচেয়ে সক্রিয় ডিজিটাল প্রজন্মের কাছে!

খোঁজঘর প্রতিদিন হাজার হাজার প্রযুক্তিপ্রেমী শিক্ষার্থী, ফ্রিল্যান্সার, ডেভেলপার ও প্রফেশনালদের কাছে পৌঁছায়।

### আমাদের বিজ্ঞাপনী প্যাকেজসমূহ:
১. **ব্যানার বিজ্ঞাপন:** হেডার, সাইডবার ও আর্টিকেল প্লেসমেন্ট।
২. **স্পন্সরড আর্টিকেল ও টুল রিভিউ:** আপনার সফটওয়্যার বা ডিজিটাল পণ্যের বিস্তারিত নিরপেক্ষ গাইড।
৩. **নিউজলেটার ও সোশ্যাল মিডিয়া প্রোমোশন:** আমাদের টেলিগ্রাম এবং ইউটিউব অডিয়েন্সের কাছে সরাসরি প্রচারণা।

বিজ্ঞাপনের জন্য ইমেইল করুন: **business@khojghor.com**`,
    updatedAt: '2026-03-25'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitleBn: 'খোঁজঘর (KhojGhor) – AI, টেক, ফ্রিল্যান্সিং ও স্টুডেন্ট রিসোর্স',
  siteTitleEn: 'KhojGhor - Modern Bangla Digital Media Platform',
  taglineBn: 'খুঁজে নাও। শিখে নাও। বানিয়ে ফেলো।',
  taglineEn: 'Discover. Learn. Build.',
  heroHeadlineBn: 'খুঁজে নাও। শিখে নাও। বানিয়ে ফেলো।',
  heroHeadlineEn: 'Discover. Learn. Build.',
  heroSubheadlineBn: 'কৃত্রিম বুদ্ধিমত্তা, প্রয়োজনীয় প্রযুক্তি, ফ্রিল্যান্সিং ক্যারিয়ার, শিক্ষার্থী রিসোর্স, প্রজেক্ট বিল্ডিং এবং দরকারি ডিজিটাল টুলসের বিশ্বস্ত বাংলা প্ল্যাটফর্ম।',
  heroSubheadlineEn: 'Verified AI, technology, freelancing career paths, student resources, hands-on maker projects, and digital tools in one modern Bangla platform.',
  googleAnalyticsId: 'G-KHOJGHOR2026',
  googleSearchConsoleMeta: '',
  socials: {
    youtube: 'https://youtube.com/@khojghor',
    facebook: 'https://facebook.com/khojghor',
    tiktok: 'https://tiktok.com/@khojghor',
    instagram: 'https://instagram.com/khojghor',
    telegram: 'https://t.me/khojghor',
    x: 'https://x.com/khojghor'
  },
  contactEmail: 'contact@khojghor.com',
  footerDisclaimerBn: 'খোঁজঘর (KhojGhor) বাংলাদেশের শিক্ষার্থী, তরুণ ফ্রিল্যান্সার ও মেকারদের জন্য একটি নিরপেক্ষ জ্ঞান ও প্রযুক্তি প্ল্যাটফর্ম। কোনো মিথ্যা আয়ের প্রলোভন নয়, বাস্তব দক্ষতায় বিশ্বাসী।',
  footerDisclaimerEn: 'KhojGhor is an independent Bangla digital media and knowledge platform for students, freelancers, and makers in Bangladesh. No false promises, only real digital skills.',
  analyticsTimezone: 'Asia/Dhaka (GMT+6)',
  activeSessionTimeoutMinutes: 15
};

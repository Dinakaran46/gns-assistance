// Verified Government Schemes Database for GNS Assistance
export const DEFAULT_SCHEMES = [
  {
    id: "scheme-1",
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    department: "Ministry of Agriculture & Farmers Welfare",
    level: "Central",
    category: "Agriculture",
    beneficiaryTypes: ["Farmers"],
    shortDescription: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    purpose: "To supplement the financial needs of landholding farmers in procuring various inputs related to agriculture and allied activities as well as domestic needs.",
    benefits: [
      "Financial benefit of ₹6,000 per annum payable in three 4-monthly installments of ₹2,000 each.",
      "Direct transfer into bank accounts linked with Aadhaar.",
      "Completely centrally funded scheme."
    ],
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 75,
      maxIncome: 600000,
      occupations: ["Farmer"],
      states: ["All"],
      categories: ["All"],
      minLand: 0.1,
      maxLand: 5.0,
      customRules: ["Must possess cultivable land holding in own name", "Institutional landholders excluded"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Direct Benefit Transfer identity verification", instructions: "Ensure mobile number is linked for OTP verification." },
      { id: "doc-2", name: "Land Ownership Record (Khatauni/Patta)", reason: "Proof of cultivable land holding", instructions: "Must be issued by revenue authorities within last 6 months." },
      { id: "doc-3", name: "Bank Passbook", reason: "Account details for ₹2000 DBT transfer", instructions: "Bank account must be Aadhaar-seeded." }
    ],
    applicationProcess: [
      "Visit official PM-KISAN portal (pmkisan.gov.in) or local Common Service Centre (CSC).",
      "Click on 'Farmers Corner' and select 'New Farmer Registration'.",
      "Enter Aadhaar number, state, and captcha code.",
      "Fill land record details, bank details, and upload document scans.",
      "Submit application and receive ACK tracking number."
    ],
    startDate: "2018-12-01",
    endDate: "2026-12-31",
    officialWebsite: "https://pmkisan.gov.in",
    sourceUrl: "https://pmkisan.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "Is income tax payer eligible?", answer: "No, any family member who paid income tax in the last assessment year is ineligible." },
      { question: "How to check payment status?", answer: "You can track your installment status via Farmers Corner using Aadhaar or Mobile Number." }
    ]
  },
  {
    id: "scheme-2",
    name: "Pradhan Mantri Awas Yojana - Gramin & Urban (PMAY)",
    department: "Ministry of Housing and Urban Affairs",
    level: "Central",
    category: "Housing",
    beneficiaryTypes: ["Economically Weaker Sections", "Senior Citizens", "Women"],
    shortDescription: "Housing for All mission providing financial subsidy up to ₹2.67 Lakh for building or buying first pucca house.",
    purpose: "To provide pucca houses with basic amenities to all homeless households and those living in kutcha and dilapidated houses.",
    benefits: [
      "Interest subsidy up to 6.5% on housing loans up to ₹6 Lakh for EWS/LIG.",
      "Direct financial assistance of ₹1.2 Lakh to ₹1.3 Lakh for rural house construction.",
      "Preference given to female heads of households."
    ],
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 70,
      maxIncome: 300000,
      occupations: ["All"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Applicant or family must NOT own a pucca house anywhere in India", "Family includes husband, wife, and unmarried children"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Identity verification of all family members", instructions: "Aadhaar linking is mandatory." },
      { id: "doc-4", name: "Income Certificate", reason: "Verification of EWS income limit (< ₹3 Lakh)", instructions: "Issued by competent Tehsildar/Revenue Officer." },
      { id: "doc-5", name: "Residence Certificate / Domicile", reason: "Proof of residence in urban/rural municipality", instructions: "Electricity bill, Ration card, or Voter ID." },
      { id: "doc-3", name: "Bank Passbook", reason: "For direct subsidy deposit", instructions: "Must show IFSC code and active account status." }
    ],
    applicationProcess: [
      "Access PMAY official portal pmaymis.gov.in.",
      "Select 'Citizen Assessment' and choose category (In Situ Slum/Credit Linked Subsidy).",
      "Enter Aadhaar details for verification.",
      "Fill personal, income, and bank account details.",
      "Submit and print reference ID for status tracking."
    ],
    startDate: "2015-06-25",
    endDate: "2026-12-31",
    officialWebsite: "https://pmaymis.gov.in",
    sourceUrl: "https://pmaymis.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "Can a single woman apply?", answer: "Yes, unmarried or widowed women are eligible provided they meet income criteria." }
    ]
  },
  {
    id: "scheme-3",
    name: "National Means-cum-Merit Scholarship (NMMSS)",
    department: "Department of School Education & Literacy",
    level: "Central",
    category: "Education",
    beneficiaryTypes: ["Students"],
    shortDescription: "Financial assistance of ₹12,000 per annum for meritorious students of Class 9 to 12 from weaker sections.",
    purpose: "To award scholarships to meritorious students of economically weaker sections to arrest dropouts at Class 8 and encourage education.",
    benefits: [
      "Scholarship amount of ₹12,000 per year (₹1,000 per month).",
      "Paid directly into student bank accounts through National Scholarship Portal (NSP).",
      "Covers Class IX to Class XII studies."
    ],
    eligibilityCriteria: {
      minAge: 12,
      maxAge: 18,
      maxIncome: 350000,
      occupations: ["Student"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Must have scored minimum 55% marks in Class 8 examination", "Studying in State Government, Government-aided, or Local body schools"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Student identity verification", instructions: "Can use parent Aadhaar if student doesn't have one." },
      { id: "doc-6", name: "Class 8 Marksheet", reason: "Academic score qualification proof", instructions: "Must show minimum 55% marks (50% for SC/ST)." },
      { id: "doc-4", name: "Income Certificate", reason: "Parental income below ₹3.5 Lakh validation", instructions: "Current year income certificate." },
      { id: "doc-7", name: "Community Certificate", reason: "Category reservation verification", instructions: "If claiming SC/ST reservation." }
    ],
    applicationProcess: [
      "Register on National Scholarship Portal (scholarships.gov.in).",
      "Select 'Pre-Matric / NMMSS Scheme' option.",
      "Fill student profile and upload Class 8 mark sheet and income certificate.",
      "School verification by Headmaster/Principal.",
      "District officer approval and fund release."
    ],
    startDate: "2024-07-01",
    endDate: "2026-10-31",
    officialWebsite: "https://scholarships.gov.in",
    sourceUrl: "https://scholarships.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "Are Kendriya Vidyalaya students eligible?", answer: "No, students of KVs, JNVs, and private residential schools are NOT eligible." }
    ]
  },
  {
    id: "scheme-4",
    name: "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)",
    department: "National Health Authority",
    level: "Central",
    category: "Healthcare",
    beneficiaryTypes: ["Senior Citizens", "Economically Weaker Sections", "General Citizens"],
    shortDescription: "Health insurance cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.",
    purpose: "To provide cashless healthcare services to poor and vulnerable families at empanelled public and private hospitals.",
    benefits: [
      "Cashless health cover up to ₹5,000,000 per family per year.",
      "Covers up to 3 days of pre-hospitalization and 15 days post-hospitalization costs.",
      "No restriction on family size, age, or gender.",
      "Includes coverage for all senior citizens aged 70+ regardless of income (PM-JAY Senior Addendum)."
    ],
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      maxIncome: 250000,
      occupations: ["All"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Identified through SECC 2011 data or active Ration Card holder", "All senior citizens aged 70 and above automatically eligible under 2024 scheme expansion"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Biometric e-KYC at hospital desk", instructions: "Essential for e-Card generation." },
      { id: "doc-8", name: "Ration Card", reason: "Family mapping and eligibility confirmation", instructions: "PDS Ration Card with family member names listed." }
    ],
    applicationProcess: [
      "Check eligibility at beneficiary.nha.gov.in or Ayushman App.",
      "Visit nearest Empanelled Hospital or CSC centre with Aadhaar.",
      "Complete e-KYC verification with Pradhan Mantri Arogya Mitra (PMAM).",
      "Download Ayushman Card for instant cashless admission."
    ],
    startDate: "2018-09-23",
    endDate: "2028-12-31",
    officialWebsite: "https://pmjay.gov.in",
    sourceUrl: "https://pmjay.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "Is pre-existing illness covered?", answer: "Yes, all pre-existing conditions are covered from Day 1 of card issuance." }
    ]
  },
  {
    id: "scheme-5",
    name: "PM Mudra Yojana (PMMY) - Shishu, Kishore & Tarun",
    department: "Department of Financial Services",
    level: "Central",
    category: "Entrepreneurship",
    beneficiaryTypes: ["Entrepreneurs", "Women", "Job Seekers"],
    shortDescription: "Collateral-free business loans up to ₹20 Lakh for non-corporate, non-farm small and micro enterprises.",
    purpose: "To promote self-employment and micro-enterprises by providing accessible institutional credit.",
    benefits: [
      "Shishu: Loans up to ₹50,000 for early stage ventures.",
      "Kishore: Loans above ₹50,000 up to ₹5 Lakh.",
      "Tarun / Tarun Plus: Loans up to ₹20 Lakh for expanding enterprises.",
      "Zero collateral requirement and low processing fees."
    ],
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 2000000,
      occupations: ["Entrepreneur", "Self Employed", "Job Seeker"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Must have a viable business idea or existing micro-unit in manufacturing, trading, or service sector", "Applicant must not be a defaulter to any financial institution"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "KYC Identity Proof", instructions: "Self-attested copy." },
      { id: "doc-5", name: "Address Proof", reason: "Verification of business location", instructions: "Utility bill or rent agreement." },
      { id: "doc-9", name: "Business Project Proposal / Report", reason: "Assessment of loan viability", instructions: "Detailing equipment, operational costs, revenue projection." },
      { id: "doc-3", name: "Bank Account Statement", reason: "Financial history audit", instructions: "Last 6 months bank statement." }
    ],
    applicationProcess: [
      "Prepare business project report with estimated expenditure.",
      "Apply online via Udyamimitra portal (udyamimitra.in) or visit any commercial/Gramin bank branch.",
      "Fill PMMY application form selecting loan tier (Shishu/Kishore/Tarun).",
      "Submit KYC documents and project report.",
      "Bank sanction & issuance of Mudra Card."
    ],
    startDate: "2015-04-08",
    endDate: "2027-03-31",
    officialWebsite: "https://www.mudra.org.in",
    sourceUrl: "https://www.mudra.org.in",
    verifiedStatus: true,
    faqs: [
      { question: "Is collateral required?", answer: "No collateral security is required for Mudra loans." }
    ]
  },
  {
    id: "scheme-6",
    name: "Puducherry Perunthalaivar Kamarajar Financial Assistance for Higher Education",
    department: "Higher & Technical Education Puducherry",
    level: "State",
    category: "Education",
    beneficiaryTypes: ["Students"],
    shortDescription: "Reimbursement of tuition fees up to ₹50,000 per year for Puducherry domicile students pursuing professional degrees.",
    purpose: "To provide financial grant to deserving students belonging to Puducherry UT pursuing Engineering, Medical, Nursing, and Technical courses.",
    benefits: [
      "Full or partial tuition fee reimbursement up to ₹50,000 per annum.",
      "Covers CENTAC merit quota students.",
      "Direct disbursement into student's Puducherry bank account."
    ],
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 25,
      maxIncome: 500000,
      occupations: ["Student"],
      states: ["Puducherry"],
      categories: ["All"],
      customRules: ["Must be a continuous resident/domicile of Puducherry UT for minimum 5 years", "Admitted through CENTAC counseling"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Student identity verification", instructions: "Must show Puducherry residential address." },
      { id: "doc-10", name: "Puducherry Domicile / Residence Certificate", reason: "Proof of 5-year UT residency", instructions: "Issued by Department of Revenue, Puducherry." },
      { id: "doc-4", name: "Income Certificate", reason: "Parental income verification (< ₹5 Lakh)", instructions: "Issued by Tahsildar, Puducherry." },
      { id: "doc-11", name: "CENTAC Allotment Letter & College Fee Receipt", reason: "Proof of professional admission", instructions: "Official stamped receipt from college cashier." }
    ],
    applicationProcess: [
      "Submit application through Perunthalaivar Kamarajar Higher Education Scheme portal.",
      "Upload CENTAC admission allotment letter, fee receipts, and domicile certificate.",
      "Verification by College Nodal Officer.",
      "Approval by Directorate of Higher & Technical Education, Puducherry."
    ],
    startDate: "2021-01-01",
    endDate: "2026-11-30",
    officialWebsite: "https://dhte.py.gov.in",
    sourceUrl: "https://dhte.py.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "Can private college students apply?", answer: "Yes, provided they were admitted under CENTAC government quota." }
    ]
  },
  {
    id: "scheme-7",
    name: "Stand Up India Scheme for SC/ST and Women Entrepreneurs",
    department: "Department of Financial Services",
    level: "Central",
    category: "Entrepreneurship",
    beneficiaryTypes: ["Women", "Entrepreneurs"],
    shortDescription: "Bank loans between ₹10 Lakh and ₹1 Crore for setting up greenfield enterprises by SC, ST, or Women borrowers.",
    purpose: "To facilitate bank loans to at least one SC or ST borrower and at least one woman borrower per bank branch.",
    benefits: [
      "Loan amount ranging from ₹10 Lakh up to ₹1 Crore.",
      "Composite loan covering capital expenditure and working capital.",
      "Handholding support and credit guarantee scheme coverage."
    ],
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 5000000,
      occupations: ["Entrepreneur"],
      states: ["All"],
      categories: ["SC", "ST", "Women"],
      customRules: ["Borrower must be SC/ST or Woman entrepreneur", "Enterprise must be greenfield (first-time business venture)"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Identity proof", instructions: "Self-attested." },
      { id: "doc-7", name: "Community Certificate (SC/ST)", reason: "Category reservation proof", instructions: "Required if applying under SC/ST quota." },
      { id: "doc-9", name: "Project Report & Business Plan", reason: "Technical and financial viability audit", instructions: "Must outline greenfield operational model." }
    ],
    applicationProcess: [
      "Register on Stand Up India portal (standupmitra.in).",
      "Choose handholding support if required or directly select bank branch.",
      "Fill project proposal details and financial requirement.",
      "Sanction by designated bank branch manager."
    ],
    startDate: "2016-04-05",
    endDate: "2027-03-31",
    officialWebsite: "https://www.standupmitra.in",
    sourceUrl: "https://www.standupmitra.in",
    verifiedStatus: true,
    faqs: [
      { question: "What is greenfield business?", answer: "Greenfield signifies the first-time venture of the beneficiary in manufacturing, services, or trading sector." }
    ]
  },
  {
    id: "scheme-8",
    name: "Sukanya Samriddhi Yojana (SSY)",
    department: "Ministry of Women and Child Development & Department of Posts",
    level: "Central",
    category: "Women and Child Welfare",
    beneficiaryTypes: ["Women"],
    shortDescription: "High-interest government savings scheme for girl child with tax exemption under 80C and guaranteed returns.",
    purpose: "To build a dedicated financial corpus for the education and marriage expenses of girl children.",
    benefits: [
      "Attractive interest rate (currently 8.2% p.a., compounded annually).",
      "Tax deduction under Section 80C up to ₹1.5 Lakh per year.",
      "Completely tax-free interest and maturity amount.",
      "Partial withdrawal allowed after age 18 for higher education."
    ],
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 10,
      maxIncome: 10000000,
      occupations: ["Student", "Child"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Account can be opened by natural or legal guardian for a girl child before she attains 10 years of age", "Maximum 2 accounts per family (except triplets/twins)"]
    },
    requiredDocuments: [
      { id: "doc-12", name: "Girl Child Birth Certificate", reason: "Age proof showing age < 10 years", instructions: "Issued by Municipal Corporation/Gram Panchayat." },
      { id: "doc-1", name: "Guardian Aadhaar & PAN Card", reason: "KYC verification of parent/guardian", instructions: "Aadhaar and PAN copy." },
      { id: "doc-5", name: "Address Proof of Guardian", reason: "Residential location confirmation", instructions: "Passport, Electricity Bill, or Aadhaar." }
    ],
    applicationProcess: [
      "Visit any Post Office or authorized Commercial Bank (SBI, PNB, HDFC, ICICI).",
      "Fill Sukanya Samriddhi account opening form (Form-1).",
      "Submit birth certificate of girl child and guardian KYC documents.",
      "Deposit initial minimum amount of ₹250."
    ],
    startDate: "2015-01-22",
    endDate: "2030-12-31",
    officialWebsite: "https://www.indiapost.gov.in",
    sourceUrl: "https://www.indiapost.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "What is the minimum annual deposit?", answer: "Minimum ₹250 per financial year, maximum ₹1,500,000." }
    ]
  },
  {
    id: "scheme-9",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    department: "Ministry of Women and Child Development",
    level: "Central",
    category: "Women and Child Welfare",
    beneficiaryTypes: ["Women"],
    shortDescription: "Maternity financial benefit of ₹5,000 to ₹6,000 for pregnant women and lactating mothers.",
    purpose: "To provide partial compensation for wage loss in terms of cash incentive so that the woman can take adequate rest before and after delivery.",
    benefits: [
      "Financial incentive of ₹5,000 in two installments for first child.",
      "Additional financial incentive of ₹6,000 for second child if girl child.",
      "Direct benefit transfer (DBT) into mother's bank account."
    ],
    eligibilityCriteria: {
      minAge: 19,
      maxAge: 45,
      maxIncome: 800000,
      occupations: ["All"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Pregnant women and lactating mothers who are NOT regular employees of Central/State Govt or PSUs"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Mother's Aadhaar Card", reason: "Direct benefit transfer verification", instructions: "Must be linked to active bank account." },
      { id: "doc-13", name: "MCP Card (Mother & Child Protection Card)", reason: "Proof of pregnancy registration & ANC checkups", instructions: "Issued by Anganwadi Centre / Health Facility." },
      { id: "doc-3", name: "Bank Passbook", reason: "For DBT cash transfer", instructions: "Single account in mother's name." }
    ],
    applicationProcess: [
      "Register at nearby Anganwadi Centre (AWC) or approved Government Health Facility within 150 days of LMP date.",
      "Fill PMMVY Form 1-A with MCP card details.",
      "Verification by Anganwadi Worker / CDPO.",
      "Direct credit of installments into bank account."
    ],
    startDate: "2017-01-01",
    endDate: "2027-12-31",
    officialWebsite: "https://pmmvy.wcd.gov.in",
    sourceUrl: "https://pmmvy.wcd.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "Is this applicable for third child?", answer: "No, financial benefits are restricted to first two live births." }
    ]
  },
  {
    id: "scheme-10",
    name: "PM National Apprentice Promotion Scheme (NAPS)",
    department: "Ministry of Skill Development & Entrepreneurship",
    level: "Central",
    category: "Employment",
    beneficiaryTypes: ["Job Seekers", "Students"],
    shortDescription: "Apprenticeship training with monthly stipend reimbursement up to ₹1,500 per month for youth.",
    purpose: "To promote apprenticeship training and incentivize employers who engage apprentices.",
    benefits: [
      "Sharing of 25% of prescribed stipend subject to a maximum of ₹1,500 per month per apprentice.",
      "On-the-job industrial training and certification.",
      "Enhanced employability in technical and non-technical fields."
    ],
    eligibilityCriteria: {
      minAge: 14,
      maxAge: 35,
      maxIncome: 1000000,
      occupations: ["Job Seeker", "Student"],
      states: ["All"],
      categories: ["All"],
      customRules: ["Must have completed Class 5/8/10/12/ITI/Diploma or Degree"]
    },
    requiredDocuments: [
      { id: "doc-1", name: "Aadhaar Card", reason: "Identity verification", instructions: "e-KYC on apprenticeship portal." },
      { id: "doc-6", name: "Educational Qualification Marksheet", reason: "Course eligibility check", instructions: "Class 10/12/ITI certificate." },
      { id: "doc-3", name: "Bank Account Passbook", reason: "Stipend direct credit", instructions: "Active Aadhaar seeded account." }
    ],
    applicationProcess: [
      "Register as candidate on Apprenticeship India Portal (apprenticeshipindia.gov.in).",
      "Complete profile with education details and preferred trade.",
      "Apply for active apprenticeship vacancies posted by registered establishments.",
      "Interview selection & contract generation."
    ],
    startDate: "2016-08-19",
    endDate: "2026-12-31",
    officialWebsite: "https://www.apprenticeshipindia.gov.in",
    sourceUrl: "https://www.apprenticeshipindia.gov.in",
    verifiedStatus: true,
    faqs: [
      { question: "What is minimum age?", answer: "Minimum 14 years for general trades and 18 years for hazardous industries." }
    ]
  }
];

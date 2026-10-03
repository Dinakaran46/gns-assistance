// Default Notifications Feed for GNS Assistance
export const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Application Deadline Approaching",
    message: "National Means-cum-Merit Scholarship (NMMSS) applications close on October 31, 2026. Submit your documents soon.",
    timestamp: "2 hours ago",
    type: "deadline",
    read: false,
    schemeId: "scheme-3"
  },
  {
    id: "notif-2",
    title: "New Scheme Added",
    message: "PM-JAY 2024 Expansion added: Senior citizens aged 70+ are now covered under Ayushman Bharat regardless of income.",
    timestamp: "1 day ago",
    type: "scheme",
    read: false,
    schemeId: "scheme-4"
  },
  {
    id: "notif-3",
    title: "Profile Completion Reminder",
    message: "Complete your annual family income and district details to unlock 100% accurate scheme recommendations.",
    timestamp: "3 days ago",
    type: "profile",
    read: true,
    schemeId: null
  },
  {
    id: "notif-4",
    title: "Saved Scheme Status Update",
    message: "PM Kisan Samman Nidhi 18th installment release schedule announced by Ministry of Agriculture.",
    timestamp: "5 days ago",
    type: "update",
    read: true,
    schemeId: "scheme-1"
  }
];

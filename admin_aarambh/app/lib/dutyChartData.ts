// Generated Duty Chart Data (Aarambh 2026)

export interface MasterEvent {
  time: string;
  event: string;
  duties: Record<string, string>;
}

export interface MasterDay {
  label: string;
  events: MasterEvent[];
}

export interface SocialMediaVolunteer {
  role: string;
  name: string;
}

export interface SocialMediaShift {
  shift: string;
  name: string;
  primary: string;
  secondary: string;
}

export interface SocialMediaRotation {
  day: string;
  preLunch: string;
  postLunch: string;
  dcSupport: string;
}

export interface PhotoAssignment {
  slot: string;
  assignments: Record<string, string>;
}

export interface FoodRecord {
  date: string;
  timeSlot: string;
  hostel: string;
  volunteers: string;
}

export interface MediaRecord {
  day: string;
  line: string;
}

export const MASTER_SCHEDULE: Record<string, MasterDay> = {
  "DAY1": {
    "label": "DAY 01  Tuesday 14th July 2026  Open Skies Day",
    "events": [
      {
        "time": "11:00am - 12:30pm",
        "event": "Inaugural Ceremony\nVenue: Sabrang Ground \u2013 Main Stage",
        "duties": {
          "Internal Arrangments": "Full Team - 14",
          "Events & Venue": "FULL TEAM",
          "Hospitality": "Below",
          "Technical": "Full Team"
        }
      },
      {
        "time": "12:30pm - 1:00pm",
        "event": "Aarambh Schedule | Rules & Regulations\nMr. Deepak Sogani, Head - Student Affairs \nVenue: Sabrang Ground \u2013 Main Stage",
        "duties": {
          "Internal Arrangments": "Full Team - 14",
          "Events & Venue": "FULL TEAM",
          "Technical": "Full Team"
        }
      },
      {
        "time": "1:00pm - 2:30pm",
        "event": "Lunch",
        "duties": {
          "Internal Arrangments": "FREE",
          "Events & Venue": "FREE",
          "Feedback & Registration": "FREE"
        }
      },
      {
        "time": "2:30pm -5:30 pm",
        "event": "Ice Breaking Session by Manish Freeman & Team\nVenue: New Tech Block",
        "duties": {
          "Internal Arrangments": "Pari Maloo, Lakshay, Priyanshu, Raghav",
          "Events & Venue": "Navya and Shubhangi , Navya and Shubhangi , Priyanshi and Pari, Manvik and Tanvi",
          "Technical": "Rashi , Heramb, Ashutosh, Pratham , Arihant"
        }
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "High-Tea",
        "duties": {
          "Internal Arrangments": "FREE",
          "Events & Venue": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Treasure Hunt by Manish Freeman & Team\nVenue: New Tech Block",
        "duties": {
          "Internal Arrangments": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
          "Events & Venue": "Aman and Himangi, Parihaan and Priecy, Yatharth and Anvi, Naresh and Navya",
          "Technical": "Aalap, Amrit"
        }
      },
      {
        "time": "9:00 pm - 10:30pm",
        "event": "Dinner",
        "duties": {
          "Internal Arrangments": "FREE",
          "Events & Venue": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "Kingdom Game Night by Manish Freeman & Team \nVenue: New Tech Block",
        "duties": {
          "Internal Arrangments": "Shrestha, Raghuraj, Harshvardhan Singh",
          "Events & Venue": "Subhangi and Yatharth , Siddhi and Priecy ,Tarushi and Aman, Himangi and Parihaan",
          "Technical": "Manant, Udit, Arihant"
        }
      }
    ]
  },
  "DAY2": {
    "label": "DAY 02  Wednesday 15th July 2026  Bollywood Day",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Sports Activities",
        "duties": {
          "Internal Arrangments": "Pari Maloo, Lakshay, Raghav",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik",
          "Hospitality": "Below"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "Breakfast",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Youth UnConference  by Manish Freeman and Team",
        "duties": {
          "Internal Arrangments": "Saanchi, Priyanshu, Jitendra, Hardik Kumawat",
          "Events & Venue": "Himangi and Tarushi , Siddhi and Navya , Pari and Subhangi , Tanvi",
          "Technical": "Full Team"
        }
      },
      {
        "time": "",
        "event": "Venue: New Tech Block",
        "duties": {}
      },
      {
        "time": "1:00pm - 2:30pm",
        "event": "Lunch",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "2:30pm -5:30pm",
        "event": "Auction Arena",
        "duties": {
          "Internal Arrangments": "1st venue(Rahuraj& Shrestha), 2nd Venue(Harshvardhan), 3rd Venue(Pari & Anoushka), 4th Venue(Hardik Sain)",
          "Events & Venue": "Naresh , Yatharth , Aman , Manvik",
          "Technical": "Full Team"
        }
      },
      {
        "time": "",
        "event": "Venue: All four Batches Together in four venues By Team Aarambh",
        "duties": {}
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "High-Tea",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Decode the Drama",
        "duties": {
          "Internal Arrangments": "1st venue(Ghyan & Farhan), 2nd Venue(Saanchi & Priyanshu) 3rd Venue(Jitendra & Hardik Kumawat), 4th Venue(Raghav & Lakshay)",
          "Events & Venue": "Anvi,Parihaan, Priecy, Priyanshi, Tarushi",
          "Technical": "Pratham, Ashutosh , Arihant"
        }
      },
      {
        "time": "",
        "event": "Venue: All four Batches Together in four venues By Team Aarambh",
        "duties": {}
      },
      {
        "time": "9:00 pm - 10:30pm",
        "event": "Dinner",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "Drop The Beat",
        "duties": {
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "",
        "event": "Venue: Sabrang Ground \u2013 Main Stage",
        "duties": {}
      }
    ]
  },
  "DAY3": {
    "label": "DAY 03 Thursday 16th July 2026  Canvas Day",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "",
        "duties": {
          "Event": "Sports Activities",
          "Internal Arrangments": "Saanchi, Priyanshu, Hardik Kumawat",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {
          "Event": "Breakfast",
          "Internal Arrangments": "FREE"
        }
      },
      {
        "time": "Batch 1",
        "event": "",
        "duties": {
          "Internal Arrangments": "1",
          "Events & Venue": "1",
          "Food & Accommodation": "1",
          "Hospitality": "1",
          "Feedback & Registration": "1",
          "Media": "1",
          "Photography": "1",
          "Social Media": "1",
          "Technical": "1"
        }
      },
      {
        "time": "Time",
        "event": "Event",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Hardik Kumawat",
          "Events & Venue": "Pari and Himangi",
          "Hospitality": "Rahul Gorani",
          "Technical": "Ashutosh, Manant"
        }
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "2:00pm \u2013 5:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Pari Maloo,Harshvardhan Singh & Hardik Sain",
          "Events & Venue": "Priecy & Manvik",
          "Hospitality": "Sanskriti",
          "Technical": "Ashutosh, Manant"
        }
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "FULL TEAM",
          "Technical": "FULL TEAM"
        }
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "10:00pm -11:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Raghuraj, Harshvardhan Singh , Jitendra",
          "Events & Venue": "Subhangi & Pari & Manvik & Anvi",
          "Hospitality": "FREE",
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      }
    ]
  },
  "DAY4": {
    "label": "DAY 04 Friday 17th July 2026 Anime & Toons Day",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "",
        "duties": {
          "Event": "Sports Activities",
          "Internal Arrangments": "Pari Maloo,Harshvardhan Singh & Hardik Sain",
          "Events & Venue": "(Navya,Himangi,Subhangi,Tarushi"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {
          "Event": "Breakfast",
          "Internal Arrangments": "FREE",
          "Events & Venue": "FREE"
        }
      },
      {
        "time": "Batch 1",
        "event": "",
        "duties": {
          "Internal Arrangments": "1",
          "Events & Venue": "1",
          "Food & Accommodation": "1",
          "Hospitality": "1",
          "Feedback & Registration": "1",
          "Media": "1",
          "Photography": "1",
          "Social Media": "1",
          "Technical": "1"
        }
      },
      {
        "time": "Time",
        "event": "Event",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Raghuraj, Hardik Sain, Lakshya & Shrestha",
          "Events & Venue": "Naresh and Anvi",
          "Hospitality": "Pawanii Sharma",
          "Technical": "Ashutosh, Manant"
        }
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "2:00pm - 3:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Shrestha & Hardik Kumawat",
          "Events & Venue": "pari & Himangi",
          "Hospitality": "Bhavya Doshi & Aadrika",
          "Technical": "Ashutosh, Manant"
        }
      },
      {
        "time": "3:00pm \u2013 5:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Jitendra & Saanchi",
          "Hospitality": "Abhimanyu Singh & Anubha Sharma"
        }
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Ghyan & Lakshya",
          "Events & Venue": "Pari,Aman,Tanvi , Subhangi,Siddhi",
          "Hospitality": "Bhavya Doshi & Aadrika",
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Shrestha & Hardik Kumawat",
          "Events & Venue": "Naresh,Aman,Anvi,Manvik,Navya,Priecy,Pari",
          "Hospitality": "Free",
          "Technical": "Full team"
        }
      }
    ]
  },
  "DAY5": {
    "label": "DAY 05 Saturday 18th July 2026 Ethnic Day",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "",
        "duties": {
          "Event": "Sports Activities",
          "Internal Arrangments": "Anoushka, Farhan, Ghyan & Lakshya",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik",
          "Hospitality": "FREE"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {
          "Event": "Breakfast",
          "Internal Arrangments": "FREE",
          "Events & Venue": "FREE"
        }
      },
      {
        "time": "Batch 1",
        "event": "",
        "duties": {
          "Internal Arrangments": "1",
          "Events & Venue": "1",
          "Food & Accommodation": "1",
          "Hospitality": "1",
          "Feedback & Registration": "1",
          "Media": "1",
          "Photography": "1",
          "Social Media": "1",
          "Technical": "1"
        }
      },
      {
        "time": "Time",
        "event": "Event",
        "duties": {}
      },
      {
        "time": "9:00am - 11:00am",
        "event": "Mind Hacks: The Hidden Psychology Behind Every Decision",
        "duties": {
          "Internal Arrangments": "Raghuraj & Hardik Sain",
          "Events & Venue": "Himangi & Siddhi",
          "Hospitality": "Aadipoojya Mehra",
          "Technical": "Ashutosh , Arihant"
        }
      },
      {
        "time": "",
        "event": "Mr. Manan Pahwa",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: IM Amphitheater",
        "duties": {}
      },
      {
        "time": "11:00am-12:00pm",
        "event": "",
        "duties": {
          "Event": "TV9 Director Session",
          "Internal Arrangments": "FULL TEAM",
          "Events & Venue": "FULL TEAM",
          "Hospitality": "Anubha Sharma",
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "12:00pm \u2013 1:00pm",
        "event": "Decode Academics by Academic Affairs",
        "duties": {
          "Internal Arrangments": "Ghyan & Raghav",
          "Events & Venue": "Himangi & Siddhi",
          "Hospitality": "Abhimanyu Singh",
          "Technical": "Rashi"
        }
      },
      {
        "time": "",
        "event": "Venue: IM Amphitheater",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {
          "Internal Arrangments": "LUNCH",
          "Events & Venue": "LUNCH",
          "Hospitality": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "1:30pm-3:00pm",
        "event": "Alumni Connect",
        "duties": {
          "Internal Arrangments": "Harshvardhan Singh &Anoushka",
          "Events & Venue": "Aman , Anvi & Pari",
          "Hospitality": "Abhimanyu Singh",
          "Technical": "Rashi"
        }
      },
      {
        "time": "",
        "event": "Venue: 009 New Tech Block",
        "duties": {}
      },
      {
        "time": "3:00pm- 4:30pm",
        "event": "Cyber Security for All",
        "duties": {
          "Hospitality": "Pawanii Sharma"
        }
      },
      {
        "time": "",
        "event": "Mr. Mukesh Choudhary",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: 008 New Tech Block",
        "duties": {}
      },
      {
        "time": "4:30pm- 5:00pm",
        "event": "Anti-Ragging Awareness and Prevention Session",
        "duties": {
          "Hospitality": "Rahul Gorani",
          "Technical": "Udit , Pratham"
        }
      },
      {
        "time": "",
        "event": "Venue: New Tech Block 006 & 001",
        "duties": {}
      },
      {
        "time": "5:00pm - 5:30pm",
        "event": "Hostel 101",
        "duties": {
          "Hospitality": "Bhavya Doshi"
        }
      },
      {
        "time": "",
        "event": "Venue: New Tech Block 006 & 001",
        "duties": {}
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "FULL TEAM",
          "Technical": "FULL TEAM"
        }
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE"
        }
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Events & Venue": "Naresh,Anvi,Manvik,Subhangi,Siddhi,Tanvi,Tarushi,Navya and Pari"
        }
      }
    ]
  },
  "DAY6": {
    "label": "DAY 05 Saturday 18th July 2026 Ethnic Day",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "",
        "duties": {
          "Event": "Sports Activities",
          "Internal Arrangments": "Pari Maloo,Harshvardhan Singh & Hardik Sain",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {
          "Event": "Breakfast",
          "Internal Arrangments": "FREE",
          "Events & Venue": "FREE"
        }
      },
      {
        "time": "Batch 1",
        "event": "",
        "duties": {
          "Internal Arrangments": "1",
          "Events & Venue": "1",
          "Food & Accommodation": "1",
          "Hospitality": "1",
          "Feedback & Registration": "1",
          "Media": "1",
          "Photography": "1",
          "Social Media": "1",
          "Technical": "1"
        }
      },
      {
        "time": "Time",
        "event": "Event",
        "duties": {}
      },
      {
        "time": "9:30am - 10:30am",
        "event": "Creating Your Own Path",
        "duties": {
          "Internal Arrangments": "Raghuraj & Hardik Sain",
          "Events & Venue": "Himangi & Siddhi",
          "Hospitality": "Aadrika",
          "Technical": "Amrit,Manant"
        }
      },
      {
        "time": "",
        "event": "Mr. RamG Vallath",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: IM Amphitheater",
        "duties": {}
      },
      {
        "time": "10:30am-11:00am",
        "event": "Global Learning Opportunities at JKLU",
        "duties": {
          "Hospitality": "Abhimanyu Singh"
        }
      },
      {
        "time": "",
        "event": "Venue: 008 New Tech Block",
        "duties": {}
      },
      {
        "time": "11:00am-11:30am",
        "event": "The Admin Guide",
        "duties": {
          "Hospitality": "Bhavya Doshi"
        }
      },
      {
        "time": "",
        "event": "Venue: 008 New Tech Block",
        "duties": {}
      },
      {
        "time": "11:30am-1:00pm",
        "event": "Session on Mental Health",
        "duties": {
          "Internal Arrangments": "Ghyan & Raghav",
          "Hospitality": "Rahul Gorani"
        }
      },
      {
        "time": "",
        "event": "Venue: IET Amphitheater",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "2:00pm -3:30pm",
        "event": "Student Central by Student Affairs",
        "duties": {
          "Internal Arrangments": "Harshvardhan Singh &  Anoushka",
          "Events & Venue": "Parihaan & Anvi",
          "Hospitality": "Pawanii Sharma",
          "Technical": "Rashi, Heramb"
        }
      },
      {
        "time": "",
        "event": "Venue: IM Amphitheater",
        "duties": {}
      },
      {
        "time": "3:30pm",
        "event": "JKLU Essentials",
        "duties": {
          "Hospitality": "Aadrika"
        }
      },
      {
        "time": "-4:00pm",
        "event": "By IT/LRC/Accounts",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: New Tech Block 006 & 001",
        "duties": {}
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "Innovation and Entrepreneurship at JKLU by AIC",
        "duties": {
          "Hospitality": "Pawanii Sharma"
        }
      },
      {
        "time": "",
        "event": "Venue: IET Amphitheater",
        "duties": {}
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {
          "Internal Arrangments": "FREE",
          "Technical": "FREE"
        }
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {
          "Technical": "FREE"
        }
      },
      {
        "time": "Midnight",
        "event": "",
        "duties": {
          "Technical": "FREE"
        }
      }
    ]
  },
  "DAY7": {
    "label": "DAY 07 Monday 20th July 2026 Fresh and fun day",
    "events": [
      {
        "time": "4:30am - 12:30pm",
        "event": "Outing Activity",
        "duties": {
          "Internal Arrangments": "FULL TEAM",
          "Hospitality": "FULL TEAM",
          "Technical": "FULL TEAM"
        }
      },
      {
        "time": "1:00 pm-2:00 pm",
        "event": "Lunch",
        "duties": {
          "Internal Arrangments": "FREE"
        }
      },
      {
        "time": "2:00pm - 5:30pm",
        "event": "Fold & Design",
        "duties": {
          "Internal Arrangments": "On basis of requirement",
          "Hospitality": "On basis of requirement",
          "Technical": "On basis of requirement"
        }
      },
      {
        "time": "",
        "event": "Design Club",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: IM Amphitheater",
        "duties": {}
      },
      {
        "time": "",
        "event": "& IET Amphitheater",
        "duties": {}
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "High-Tea",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Stories Framed",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: Sabrang Ground \u2013 Main Stage",
        "duties": {}
      },
      {
        "time": "9:00 pm - 10:30pm",
        "event": "Dinner",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "Star Gazing By Astronomy Club & Aarambh Team & Vibe Check",
        "duties": {}
      },
      {
        "time": "",
        "event": "Venue: Sabrang Ground \u2013 Main Stage (Cohort Wise)",
        "duties": {}
      }
    ]
  },
  "DAY8": {
    "label": "DAY 08 Tuesday 21th July 2026    Formal Day",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Rest",
        "duties": {}
      },
      {
        "time": "7:30am-9:00am",
        "event": "Breakfast",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
        "duties": {
          "Internal Arrangments": "FULL TEAM",
          "Hospitality": "FULL TEAM",
          "Technical": "FULL TEAM"
        }
      },
      {
        "time": "1:00pm - 2:30pm",
        "event": "Lunch",
        "duties": {}
      },
      {
        "time": "2.30 pm \u2013 5:30pm",
        "event": "Battle of the Clusters &   Valedictory Ceremony",
        "duties": {
          "Internal Arrangments": "FULL TEAM",
          "Hospitality": "FULL TEAM",
          "Technical": "FULL TEAM"
        }
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "Check-out by Day Scholars.",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Departure of Buses",
        "duties": {}
      },
      {
        "time": "",
        "event": "at 6:30 PM from",
        "duties": {}
      },
      {
        "time": "",
        "event": "JKLU Main Gate",
        "duties": {}
      }
    ]
  }
};

export const SOCIAL_MEDIA_TEAM: SocialMediaVolunteer[] = [
  {
    "role": "Team Leader",
    "name": "Vaibhav Khandelwal"
  },
  {
    "role": "Team Leader",
    "name": "Aditya Nayak"
  },
  {
    "role": "Volunteer",
    "name": "Bhavisha"
  },
  {
    "role": "Volunteer",
    "name": "Nandini"
  },
  {
    "role": "Volunteer",
    "name": "Anukriti"
  },
  {
    "role": "Volunteer",
    "name": "Parth"
  },
  {
    "role": "Volunteer",
    "name": "Vidhaan"
  },
  {
    "role": "Volunteer",
    "name": "Kaushal"
  }
];

export const SOCIAL_MEDIA_SHIFTS: SocialMediaShift[] = [
  {
    "shift": "Pre-Lunch (8 AM-2 PM)",
    "name": "Bhavisha",
    "primary": "Photography & Stories",
    "secondary": "Event Coverage"
  },
  {
    "shift": "Pre-Lunch (8 AM-2 PM)",
    "name": "Parth",
    "primary": "Videography",
    "secondary": "DC Support"
  },
  {
    "shift": "Pre-Lunch (8 AM-2 PM)",
    "name": "Nandini",
    "primary": "Reels & Interviews",
    "secondary": "Content Collection"
  },
  {
    "shift": "Post-Lunch (2 PM-8 PM)",
    "name": "Anukriti",
    "primary": "Photography & Stories",
    "secondary": "Event Coverage"
  },
  {
    "shift": "Post-Lunch (2 PM-8 PM)",
    "name": "Vidhaan",
    "primary": "Videography",
    "secondary": "DC Support"
  },
  {
    "shift": "Post-Lunch (2 PM-8 PM)",
    "name": "Kaushal",
    "primary": "Reels & Interviews",
    "secondary": "Content Collection"
  }
];

export const SOCIAL_MEDIA_ROTATIONS: SocialMediaRotation[] = [
  {
    "day": "Day 1",
    "preLunch": "Bhavisha, Parth, Nandini",
    "postLunch": "Anukriti, Vidhaan, Kaushal",
    "dcSupport": "Parth, Vidhaan"
  },
  {
    "day": "Day 2",
    "preLunch": "Anukriti, Vidhaan, Kaushal",
    "postLunch": "Bhavisha, Parth, Nandini",
    "dcSupport": "Bhavisha, Kaushal"
  },
  {
    "day": "Day 3",
    "preLunch": "Bhavisha, Kaushal, Nandini",
    "postLunch": "Anukriti, Parth, Vidhaan",
    "dcSupport": "Nandini, Vidhaan"
  },
  {
    "day": "Day 4",
    "preLunch": "Anukriti, Parth, Vidhaan",
    "postLunch": "Bhavisha, Kaushal, Nandini",
    "dcSupport": "Anukriti, Parth"
  }
];

export const PHOTO_VOLUNTEERS: string[] = [
  "Aditya",
  "Akshat",
  "Mohit",
  "Niharika",
  "Ridhi",
  "Shambhavi",
  "Sunay",
  "Tarun"
];

export const PHOTO_ASSIGNMENTS: PhotoAssignment[] = [
  {
    "slot": "14 Jul Morning",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Registration",
      "Akshat": "\ud83d\udcf8 Inaugural",
      "Mohit": "Rest",
      "Niharika": "\ud83d\udcf8 Inaugural",
      "Ridhi": "\ud83d\udcf8 Registration",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "14 Jul Afternoon",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "\ud83d\udcf8 Ice Breaking",
      "Tarun": "\ud83d\udcf8 Ice Breaking"
    }
  },
  {
    "slot": "14 Jul Evening",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Kingdom Game",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 Fun Event",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "\ud83d\udcf8 Kingdom Game",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "15 Jul Morning",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "\ud83d\udcf8 Youth UnConf",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "\ud83d\udcf8 Youth UnConf",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "15 Jul Afternoon",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "\ud83d\udcf8 League Room",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "\ud83d\udcf8 League Room",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "15 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 DJ Night",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "\ud83d\udcf8 DJ Night",
      "Sunay": "Rest",
      "Tarun": "\ud83d\udcf8 Dumb Show"
    }
  },
  {
    "slot": "16 Jul Morning",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Workshops",
      "Akshat": "\ud83d\udcf8 Workshops",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "16 Jul Afternoon",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "\ud83d\udcf8 Workshops",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "\ud83d\udcf8 Workshops"
    }
  },
  {
    "slot": "16 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 Brush & Bond",
      "Niharika": "Rest",
      "Ridhi": "\ud83d\udcf8 Brush & Bond",
      "Shambhavi": "Rest",
      "Sunay": "\ud83d\udcf8 Express Yourself",
      "Tarun": "\ud83d\udcf8 Express Yourself"
    }
  },
  {
    "slot": "17 Jul Morning",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 Workshops",
      "Niharika": "\ud83d\udcf8 Workshops",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "17 Jul Afternoon",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Workshops",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "\ud83d\udcf8 Workshops"
    }
  },
  {
    "slot": "17 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "\ud83d\udcf8 DanceVerse",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "\ud83d\udcf8 Movie Night",
      "Shambhavi": "\ud83d\udcf8 DanceVerse",
      "Sunay": "\ud83d\udcf8 Movie Night",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "18 Jul Morning",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Guest Session",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 Guest Session",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "18 Jul Afternoon",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "\ud83d\udcf8 Sessions",
      "Ridhi": "\ud83d\udcf8 Sessions",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "18 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "\ud83d\udcf8 Fashion Show",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "\ud83d\udcf8 Stories Framed",
      "Sunay": "\ud83d\udcf8 Stories Framed",
      "Tarun": "\ud83d\udcf8 Fashion Show"
    }
  },
  {
    "slot": "19 Jul Morning",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 Academic",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "19 Jul Afternoon",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Academic",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "19 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "\ud83d\udcf8 Bands",
      "Shambhavi": "Rest",
      "Sunay": "\ud83d\udcf8 Bands",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "20 Jul Morning",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "\ud83d\udcf8 Outing",
      "Mohit": "Rest",
      "Niharika": "\ud83d\udcf8 Outing",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "\ud83d\udcf8 Outing"
    }
  },
  {
    "slot": "20 Jul Afternoon",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Art Workshop",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 VR Zone",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "20 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "\ud83d\udcf8 Got Latent",
      "Shambhavi": "\ud83d\udcf8 Got Latent",
      "Sunay": "\ud83d\udcf8 Star Gazing",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "21 Jul Morning",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "Rest",
      "Mohit": "\ud83d\udcf8 Placement",
      "Niharika": "Rest",
      "Ridhi": "Rest",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "\ud83d\udcf8 Placement"
    }
  },
  {
    "slot": "21 Jul Afternoon",
    "assignments": {
      "Aditya": "\ud83d\udcf8 Cluster Battle",
      "Akshat": "Rest",
      "Mohit": "Rest",
      "Niharika": "Rest",
      "Ridhi": "\ud83d\udcf8 Cluster Battle",
      "Shambhavi": "Rest",
      "Sunay": "Rest",
      "Tarun": "Rest"
    }
  },
  {
    "slot": "21 Jul Evening",
    "assignments": {
      "Aditya": "Rest",
      "Akshat": "\ud83d\udcf8 Valedictory",
      "Mohit": "Rest",
      "Niharika": "\ud83d\udcf8 Valedictory",
      "Ridhi": "Rest",
      "Shambhavi": "\ud83d\udcf8 Departure",
      "Sunay": "\ud83d\udcf8 Departure",
      "Tarun": "Rest"
    }
  }
];

export const FOOD_RECORDS: FoodRecord[] = [
  {
    "date": "13-07-2026",
    "timeSlot": "8:00 AM - 12:00 PM",
    "hostel": "BH",
    "volunteers": "CHANCHAL , KRISH"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1 , PRATIKI"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "12:00 PM - 4:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL , HARSHUL"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2 , 1 girl volunteer needed"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "4:00 PM - 5:00 PM",
    "hostel": "BH",
    "volunteers": "CHANCHAL , KRISH"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1 , PRATIKI"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "6:00 PM - 7:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL , HARSHUL"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2 , 1 girl volunteer needed"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "8:00 PM - 9:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "9:00 PM - 10:00 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "Attendence",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "13-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "8:00 AM - 12:00 PM",
    "hostel": "BH",
    "volunteers": "CHANCHAL , KRISH"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1 , PRATIKI"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "12:00 PM - 4:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL , HARSHUL"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2 , 1 girl volunteer needed"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "4:00 PM - 5:00 PM",
    "hostel": "BH",
    "volunteers": "CHANCHAL , KRISH"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1 , PRATIKI"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "6:00 PM - 7:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL , HARSHUL"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2 , 1 girl volunteer needed"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "8:00 PM - 9:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "9:00 PM - 10:00 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "Attendence",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "14-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "8:00 AM - 12:00 PM",
    "hostel": "BH",
    "volunteers": "CHANCHAL , KRISH"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1 , PRATIKI"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "12:00 PM - 4:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL , HARSHUL"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2 , 1 girl volunteer needed"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "4:00 PM - 5:00 PM",
    "hostel": "BH",
    "volunteers": "CHANCHAL , KRISH"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1 , PRATIKI"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "6:00 PM - 7:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL , HARSHUL"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2 , 1 girl volunteer needed"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "8:00 PM - 9:00 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "9:00 PM - 10:00 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "Attendence",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "15-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "7:00 AM - 9:00 AM",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "12 :45 PM - 2:30 PM",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "5:15 PM - 6:45 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "8:45 PM - 10:45 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "16-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "7:00 AM - 9:00 AM",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "12 :45 PM - 2:30 PM",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "5:15 PM - 6:45 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "8:45 PM - 10:45 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "17-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "7:00 AM - 9:00 AM",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "12 :45 PM - 2:30 PM",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "5:15 PM - 6:45 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "8:45 PM - 10:45 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "18-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "7:00 AM - 9:00 AM",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "12 :45 PM - 2:30 PM",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "5:15 PM - 6:45 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "8:45 PM - 10:45 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "19-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "7:00 AM - 9:00 AM",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "12 :45 PM - 2:30 PM",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "5:15 PM - 6:45 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "8:45 PM - 10:45 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "20-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "7:00 AM - 9:00 AM",
    "hostel": "BH",
    "volunteers": "CHANCHAL"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDHI 1"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "12 :45 PM - 2:30 PM",
    "hostel": "BH",
    "volunteers": "KRISH"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "5:15 PM - 6:45 PM",
    "hostel": "BH",
    "volunteers": "PRANJAL"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "SAMRIDDHI 2"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "8:45 PM - 10:45 PM",
    "hostel": "BH",
    "volunteers": "HARSHUL"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "",
    "hostel": "GH",
    "volunteers": "PRATIKI"
  },
  {
    "date": "21-07-2026",
    "timeSlot": "MESS",
    "hostel": "ALL 4 Meals",
    "volunteers": "ADITI , BHAVYA"
  }
];

// Raw Media PDF Lines for reference
export const MEDIA_RECORDS: MediaRecord[] = [
  {
    "day": "",
    "line": "Aarambh 2026 \u2014 Volunteer Duty Chart"
  },
  {
    "day": "",
    "line": "14\u201321 July 2026 \u00b7 Max 6 hrs/person/day \u00b7 Each person covers AM or PM batch only, not both \u00b7 Mon 4:30am slot removed"
  },
  {
    "day": "Tue 14 Jul",
    "line": "9:30\u201310:45am"
  },
  {
    "day": "Tue 14 Jul",
    "line": "11:10am\u201312:30pm"
  },
  {
    "day": "Tue 14 Jul",
    "line": "12:30\u20131:00pm"
  },
  {
    "day": "Tue 14 Jul",
    "line": "2:30\u20135:30pm"
  },
  {
    "day": "Tue 14 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Tue 14 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Wed 15 Jul",
    "line": "6:30\u20137:30am"
  },
  {
    "day": "Wed 15 Jul",
    "line": "9:30am\u20131:00pm"
  },
  {
    "day": "Wed 15 Jul",
    "line": "2:30\u20135:30pm"
  },
  {
    "day": "Wed 15 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Wed 15 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Thu 16 Jul",
    "line": "6:30\u20137:30am"
  },
  {
    "day": "Thu 16 Jul",
    "line": "AM 9:30\u20131:00pm"
  },
  {
    "day": "Thu 16 Jul",
    "line": "PM 2:00\u20135:30pm"
  },
  {
    "day": "Thu 16 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Thu 16 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Fri 17 Jul",
    "line": "6:30\u20137:30am"
  },
  {
    "day": "Fri 17 Jul",
    "line": "AM 9:30\u20131:00pm"
  },
  {
    "day": "Fri 17 Jul",
    "line": "PM 2:00\u20135:30pm"
  },
  {
    "day": "Fri 17 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Fri 17 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Sat 18 Jul",
    "line": "6:30\u20137:30am"
  },
  {
    "day": "Sat 18 Jul",
    "line": "AM 9:30\u20131:00pm"
  },
  {
    "day": "Sat 18 Jul",
    "line": "PM 2:00\u20135:30pm"
  },
  {
    "day": "Sat 18 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Sat 18 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Sun 19 Jul",
    "line": "6:30\u20137:30am"
  },
  {
    "day": "Sun 19 Jul",
    "line": "AM 9:30\u20131:00pm"
  },
  {
    "day": "Sun 19 Jul",
    "line": "PM 2:00\u20135:30pm"
  },
  {
    "day": "Sun 19 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Sun 19 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Mon 20 Jul",
    "line": "2:00\u20135:30pm"
  },
  {
    "day": "Mon 20 Jul",
    "line": "6:30\u20139:00pm"
  },
  {
    "day": "Mon 20 Jul",
    "line": "10:30\u201311:30pm"
  },
  {
    "day": "Tue 21 Jul",
    "line": "9:30am\u20131:00pm"
  },
  {
    "day": "Tue 21 Jul",
    "line": "2:30\u20134:00pm"
  }
];

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
  timeSlot: string;
  duration: string;
  volunteers: string;
}

export interface RegistrationRecord {
  day: string;
  timeSlot: string;
  event: string;
  venue: string;
  volunteer: string;
}

export interface DisciplineRecord {
  day: string;
  timeSlot: string;
  event: string;
  venue: string;
  zone: string;
  volunteer: string;
}

export interface TeamMemberDB {
  name: string;
  rollNo: string;
  gender: string;
  position: string;
  mobile: string;
  email: string;
}

export const MASTER_SCHEDULE: Record<string, MasterDay> = {
  "DAY1": {
    "label": "Tue 14 Jul",
    "events": [
      {
        "time": "11:00am - 12:30pm",
        "event": "Full Team - 14",
        "duties": {
          "Internal Arrangments": "Full Team - 14"
        }
      },
      {
        "time": "12:30pm - 1:00pm",
        "event": "Full Team - 14",
        "duties": {
          "Internal Arrangments": "Full Team - 14"
        }
      },
      {
        "time": "1:00pm - 2:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:30pm -5:30 pm",
        "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
        "duties": {
          "Internal Arrangments": "Pari Maloo, Lakshay, Priyanshu, Raghav",
          "Events & Venue": "Navya and Shubhangi , Navya and Shubhangi , Priyanshi and Pari, Manvik and Tanvi",
          "Technical": "Rashi , Heramb, Ashutosh, Pratham , Arihant"
        }
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
        "duties": {
          "Internal Arrangments": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
          "Events & Venue": "Aman and Himangi, Parihaan and Priecy, Yatharth and Anvi, Naresh and Navya",
          "Technical": "Aalap, Amrit"
        }
      },
      {
        "time": "9:00 pm - 10:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Shrestha, Raghuraj, Harshvardhan Singh",
          "Events & Venue": "Subhangi and Yatharth , Siddhi and Priecy ,Tarushi and Aman, Himangi and Parihaan",
          "Technical": "Manant, Udit, Arihant"
        }
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Mr. Manish Freeman",
        "duties": {
          "Hospitality": "Aadi"
        }
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Ashutosh",
        "duties": {
          "Hospitality": "Aadrika"
        }
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Amreen",
        "duties": {
          "Hospitality": "Abhimanyu Singh"
        }
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Chetan",
        "duties": {
          "Hospitality": "Anubha Sharma"
        }
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Vidushi",
        "duties": {
          "Hospitality": "Bhavya Doshi"
        }
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Help Desk",
        "duties": {
          "Hospitality": "Sanskriti & Rahul Gorani"
        }
      },
      {
        "time": "Full Day",
        "event": "Hospitality for Available",
        "duties": {
          "Hospitality": "Pawanii Sharma"
        }
      }
    ]
  },
  "DAY2": {
    "label": "Wed 15 Jul",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Sports Activities",
        "duties": {
          "Internal Arrangments": "Pari Maloo, Lakshay, Raghav",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Saanchi, Priyanshu, Jitendra, Hardik Kumawat",
          "Events & Venue": "Himangi and Tarushi , Siddhi and Navya , Pari and Subhangi , Tanvi"
        }
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "1:00pm - 2:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:30pm -5:30pm",
        "event": "Auction Arena",
        "duties": {
          "Events & Venue": "Naresh , Yatharth , Aman , Manvik"
        }
      },
      {
        "time": "2:30pm -5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Decode the Drama",
        "duties": {
          "Events & Venue": "Anvi,Parihaan, Priecy, Priyanshi, Tarushi",
          "Technical": "Pratham, Ashutosh , Arihant"
        }
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "9:00 pm - 10:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "Drop The Beat",
        "duties": {
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Half Day",
        "event": "Hospitality for Continue with Manish Freeman + Team",
        "duties": {
          "Hospitality": "Aadi , Aadrika  , Abhimanyu Singh  , Anubha Sharma , Bhavya Doshi"
        }
      },
      {
        "time": "Free",
        "event": "Hospitality for Help Desk",
        "duties": {
          "Hospitality": "Rahul Gorani  , Sanskriti"
        }
      },
      {
        "time": "Free",
        "event": "Hospitality for Available",
        "duties": {
          "Hospitality": "Pawanii Sharma"
        }
      }
    ]
  },
  "DAY3": {
    "label": "Thu 16 Jul",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Sports Activities",
        "duties": {
          "Internal Arrangments": "Saanchi, Priyanshu, Hardik Kumawat",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {}
      },
      {
        "time": "Batch 1",
        "event": "",
        "duties": {}
      },
      {
        "time": "Time",
        "event": "Event",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Session on POSH and Digital Well Being",
        "duties": {
          "Internal Arrangments": "Hardik Kumawat / Raghav & Saanchi / Raghuraj, Hardik Sain, Lakshya & Shrestha / Pari Maloo & Ghyan",
          "Events & Venue": "Pari and Himangi / Tarushi and Subhangi / Siddhi and Tanvi / Navya & Yatharth",
          "Hospitality": "Rahul Gorani / Sanskriti / Pawanii Sharma / Abhimanyu Singh & Anubha Sharma",
          "Technical": "Ashutosh, Manant / Heramb, Udit / Arihant, Aalap, Amrit / Rashi, Pratham"
        }
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Mrs. Anjali Suneja",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Anoushka & Farhan",
          "Hospitality": "Bhavya Doshi & Aadrika"
        }
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm \u2013 5:30pm",
        "event": "Craft Appreciation and Art Workshop",
        "duties": {
          "Internal Arrangments": "Pari Maloo,Harshvardhan Singh & Hardik Sain / Shrestha & Hardik Kumawat / Raghav & Priyanshu / Anoushka, Farhan, Ghyan & Lakshya",
          "Events & Venue": "Priecy & Manvik / Priyanshi & Anvi / Parihaan & Tarushi / Naresh & Siddhi",
          "Hospitality": "Sanskriti / Bhavya Doshi & Aadrika / Rahul Gorani / Pawanii Sharma",
          "Technical": "Ashutosh, Manant / Heramb, Udit / Arihant, Aalap, Amrit / Rashi, Pratham"
        }
      },
      {
        "time": "2:00pm \u2013 5:30pm",
        "event": "Mr. Amitanshu Shrivastava",
        "duties": {}
      },
      {
        "time": "2:00pm \u2013 5:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Jitendra & Saanchi",
          "Hospitality": "Abhimanyu Singh & Anubha Sharma"
        }
      },
      {
        "time": "2:00pm \u2013 5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "Canvas Connections",
        "duties": {}
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:00pm -11:30pm",
        "event": "Own the Stage",
        "duties": {
          "Internal Arrangments": "Raghuraj, Harshvardhan Singh , Jitendra",
          "Events & Venue": "Subhangi & Pari & Manvik & Anvi",
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "10:00pm -11:30pm",
        "event": "",
        "duties": {}
      }
    ]
  },
  "DAY4": {
    "label": "Fri 17 Jul",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Sports Activities",
        "duties": {
          "Internal Arrangments": "Pari Maloo,Harshvardhan Singh & Hardik Sain",
          "Events & Venue": "(Navya,Himangi,Subhangi,Tarushi"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {}
      },
      {
        "time": "Batch 1",
        "event": "",
        "duties": {}
      },
      {
        "time": "Time",
        "event": "Event",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Clay All Day",
        "duties": {
          "Internal Arrangments": "Raghuraj, Hardik Sain, Lakshya & Shrestha / Hardik Kumawat / Pari Maloo & Ghyan / Raghav & Saanchi",
          "Events & Venue": "Naresh and Anvi / Priecy and Siddhi / Parihaan & Pari / Priyanshi and Tanvi",
          "Hospitality": "Pawanii Sharma / Rahul Gorani / Abhimanyu Singh & Anubha Sharma / Sanskriti",
          "Technical": "Ashutosh, Manant / Heramb, Udit / Arihant, Aalap, Amrit / Rashi, Pratham"
        }
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Mr. Kunal Agarwal",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Anoushka & Farhan",
          "Hospitality": "Bhavya Doshi & Aadrika"
        }
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm - 3:00pm",
        "event": "Session on Art of Living",
        "duties": {
          "Internal Arrangments": "Shrestha & Hardik Kumawat / Anoushka, Farhan, Ghyan & Lakshya / Pari Maloo,Harshvardhan Singh & Hardik Sain / Raghav & Priyanshu",
          "Events & Venue": "pari & Himangi / Manvik and Yatharth / Parihaan and Priyanshi / Aman and Navya",
          "Hospitality": "Bhavya Doshi & Aadrika / Pawanii Sharma / Sanskriti / Rahul Gorani",
          "Technical": "Ashutosh, Manant / Heramb, Udit / Arihant, Aalap, Amrit / Rashi, Pratham"
        }
      },
      {
        "time": "2:00pm - 3:00pm",
        "event": "",
        "duties": {}
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
        "time": "3:00pm \u2013 5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "Dance-Verse",
        "duties": {
          "Internal Arrangments": "Ghyan & Lakshya",
          "Events & Venue": "Pari,Aman,Tanvi , Subhangi,Siddhi",
          "Hospitality": "Bhavya Doshi & Aadrika",
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "Lights. Camera. Chill.",
        "duties": {
          "Internal Arrangments": "Shrestha & Hardik Kumawat",
          "Events & Venue": "Naresh,Aman,Anvi,Manvik,Navya,Priecy,Pari"
        }
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "",
        "duties": {}
      }
    ]
  },
  "DAY5": {
    "label": "Sat 18 Jul",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Sports Activities",
        "duties": {
          "Internal Arrangments": "Anoushka, Farhan, Ghyan & Lakshya",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {}
      },
      {
        "time": "Batch 1",
        "event": "Batch 2",
        "duties": {}
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
          "Internal Arrangments": "Raghuraj & Hardik Sain / Harshvardhan Singh &Anoushka / Priyanshu & Saanchi / Pari  & Lakshay",
          "Events & Venue": "Himangi & Siddhi / Pari & Tanvi / Tarushi & Navya / Subhangi & Priyanshi",
          "Hospitality": "Aadipoojya Mehra / Bhavya Doshi / Sanskriti / Aadrika",
          "Technical": "Ashutosh , Arihant / Rashi, Heramb / Aalap, Pratham / Amrit,Manant"
        }
      },
      {
        "time": "9:00am - 11:00am",
        "event": "Mr. Manan Pahwa",
        "duties": {}
      },
      {
        "time": "9:00am - 11:00am",
        "event": "",
        "duties": {
          "Hospitality": "Rahul Gorani"
        }
      },
      {
        "time": "9:00am - 11:00am",
        "event": "",
        "duties": {}
      },
      {
        "time": "9:00am - 11:00am",
        "event": "",
        "duties": {
          "Internal Arrangments": "Farhan , Shrestha",
          "Hospitality": "Abhimanyu Singh"
        }
      },
      {
        "time": "9:00am - 11:00am",
        "event": "",
        "duties": {}
      },
      {
        "time": "11:00am-12:00pm",
        "event": "TV9 Director Session",
        "duties": {
          "Hospitality": "Anubha Sharma",
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "11:00am-12:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "12:00pm \u2013 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Ghyan & Raghav / Hardik  &  Jitendra / Priyanshu & Saanchi",
          "Events & Venue": "Himangi & Siddhi / Pari & Tanvi / Manvik,Subhangi / Subhangi & Priyanshi",
          "Hospitality": "Abhimanyu Singh / Pawanii Sharma / Bhavya Doshi",
          "Technical": "Rashi / Udit / Ashutosh"
        }
      },
      {
        "time": "12:00pm \u2013 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "12:00pm \u2013 1:00pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Raghuraj & Hardik Sain",
          "Hospitality": "Aadrika",
          "Technical": "Heramb"
        }
      },
      {
        "time": "12:00pm \u2013 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "12:00pm \u2013 1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {
          "Internal Arrangments": "LUNCH / Farhan , Shrestha / LUNCH",
          "Events & Venue": "LUNCH / Navya , SubhangI / LUNCH",
          "Hospitality": "Pawanii Sharma",
          "Technical": "Pratham"
        }
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {}
      },
      {
        "time": "1:30pm-3:00pm",
        "event": "Alumni Connect",
        "duties": {
          "Internal Arrangments": "Harshvardhan Singh &Anoushka / Ghyan & Raghav / Hardik  &  Jitendra / Pari  & Lakshay",
          "Events & Venue": "Aman , Anvi & Pari / Naresh , Priecy / Manvik,Subhangi / Tanvi and Tarushi",
          "Hospitality": "Abhimanyu Singh / Aadrika / Aadipoojya Mehra",
          "Technical": "Rashi / Aalap,Manant / Ashutosh, Arihant"
        }
      },
      {
        "time": "1:30pm-3:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "1:30pm-3:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "3:00pm- 4:30pm",
        "event": "Cyber Security for All",
        "duties": {
          "Hospitality": "Pawanii Sharma / Sanskriti / Aadrika",
          "Technical": "Amrit, Heramb"
        }
      },
      {
        "time": "3:00pm- 4:30pm",
        "event": "Mr. Mukesh Choudhary",
        "duties": {}
      },
      {
        "time": "3:00pm- 4:30pm",
        "event": "",
        "duties": {
          "Hospitality": "Pawanii Sharma",
          "Technical": "Aalap"
        }
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
        "time": "4:30pm- 5:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "5:00pm - 5:30pm",
        "event": "Hostel 101",
        "duties": {
          "Hospitality": "Bhavya Doshi / Anubha Sharma / Aadrika"
        }
      },
      {
        "time": "5:00pm - 5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "5:00pm - 5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "5:00pm - 5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "The Culture Walk",
        "duties": {}
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "JKLU Unfiltered: No Script Attached",
        "duties": {
          "Events & Venue": "Naresh,Anvi,Manvik,Subhangi,Siddhi,Tanvi,Tarushi,Navya and Pari"
        }
      },
      {
        "time": "10:00pm - 11:30pm",
        "event": "",
        "duties": {}
      }
    ]
  },
  "DAY6": {
    "label": "Sun 19 Jul",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "Sports Activities",
        "duties": {
          "Internal Arrangments": "Pari Maloo,Harshvardhan Singh & Hardik Sain",
          "Events & Venue": "Naresh, Priecy,Yatharth,Aman,Anvi,Priyanshi,Parihaan and Manvik"
        }
      },
      {
        "time": "7:30am - 8:50am",
        "event": "",
        "duties": {}
      },
      {
        "time": "Batch 1",
        "event": "Batch 2",
        "duties": {}
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
          "Internal Arrangments": "Raghuraj & Hardik Sain / Harshvardhan Singh &Anoushka / Priyanshu & Saanchi / Pari  & Lakshay",
          "Events & Venue": "Himangi & Siddhi / Pari & Tanvi / Tarushi & Navya / Subhangi & Manvik",
          "Hospitality": "Aadrika / Aadipoojya Mehra / Pawanii Sharma / Bhavya Doshi",
          "Technical": "Amrit,Manant / Aalap, Pratham / Rashi, Heramb / Ashutosh , Arihant"
        }
      },
      {
        "time": "9:30am - 10:30am",
        "event": "Mr. RamG Vallath",
        "duties": {}
      },
      {
        "time": "9:30am - 10:30am",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30am-11:00am",
        "event": "Global Learning Opportunities at JKLU",
        "duties": {
          "Hospitality": "Abhimanyu Singh / Abhimanyu Singh / Aadrika"
        }
      },
      {
        "time": "10:30am-11:00am",
        "event": "",
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
        "time": "11:00am-11:30am",
        "event": "",
        "duties": {}
      },
      {
        "time": "11:30am-1:00pm",
        "event": "Session on Mental Health",
        "duties": {
          "Internal Arrangments": "Ghyan & Raghav / Farhan , Shrestha / Hardik  &  Jitendra",
          "Hospitality": "Rahul Gorani / Anubha Sharma / Sanskriti / Pawanii Sharma",
          "Technical": "Ashutosh, Udit / Rashi, Heramb"
        }
      },
      {
        "time": "11:30am-1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "11:30am-1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "11:30am-1:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Lunch",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm -3:30pm",
        "event": "",
        "duties": {
          "Internal Arrangments": "Harshvardhan Singh &  Anoushka / Ghyan & Raghav / Hardik  &  Jitendra / Farhan , Shrestha",
          "Events & Venue": "Parihaan & Anvi / Priecy & Tanvi / Yatharth & Tarushi / Naresh &  Siddhi",
          "Hospitality": "Pawanii Sharma / Bhavya Doshi / Aadipoojya Mehra / Sanskriti",
          "Technical": "Rashi, Heramb / Ashutosh , Arihant / Aalap, Pratham / Amrit,Manant,Udit"
        }
      },
      {
        "time": "2:00pm -3:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm -3:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm -3:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "3:30pm",
        "event": "JKLU Essentials",
        "duties": {
          "Hospitality": "Aadrika / Abhimanyu Singh"
        }
      },
      {
        "time": "-4:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "-4:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {
          "Hospitality": "Pawanii Sharma / Abhimanyu Singh / Rahul Gorani / Anubha Sharma"
        }
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {
          "Hospitality": "Sanskriti"
        }
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "4:00pm-5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "High-Tea",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "Loud Enough?",
        "duties": {
          "Technical": "Rashi, Heramb, Ashutosh"
        }
      },
      {
        "time": "6:30 pm - 8:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "Dinner",
        "event": "",
        "duties": {}
      },
      {
        "time": "Midnight",
        "event": "Live telecast of FIFA Final",
        "duties": {}
      },
      {
        "time": "Midnight",
        "event": "",
        "duties": {}
      }
    ]
  },
  "DAY7": {
    "label": "Mon 20 Jul",
    "events": [
      {
        "time": "4:30am - 12:30pm",
        "event": "Outing Activity",
        "duties": {}
      },
      {
        "time": "1:00 pm-2:00 pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm - 5:30pm",
        "event": "Fold & Design",
        "duties": {}
      },
      {
        "time": "2:00pm - 5:30pm",
        "event": "Design Club",
        "duties": {}
      },
      {
        "time": "2:00pm - 5:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2:00pm - 5:30pm",
        "event": "& IET Amphitheater",
        "duties": {}
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Stories Framed",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "9:00 pm - 10:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "10:30pm - 11:30pm",
        "event": "",
        "duties": {}
      }
    ]
  },
  "DAY8": {
    "label": "Tue 21 Jul",
    "events": [
      {
        "time": "6:30am - 7:30am",
        "event": "",
        "duties": {}
      },
      {
        "time": "7:30am-9:00am",
        "event": "",
        "duties": {}
      },
      {
        "time": "9:30am - 1:00pm",
        "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
        "duties": {}
      },
      {
        "time": "1:00pm - 2:30pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "2.30 pm \u2013 5:30pm",
        "event": "Battle of the Clusters &   Valedictory Ceremony",
        "duties": {}
      },
      {
        "time": "5:30 pm - 6:30 pm",
        "event": "",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "Departure of Buses",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
        "event": "at 6:30 PM from",
        "duties": {}
      },
      {
        "time": "6:30 pm - 9:00pm",
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

export const MEDIA_RECORDS: MediaRecord[] = [
  {
    "day": "",
    "timeSlot": "Aarambh 2026 \u2014 Volunteer Duty Chart",
    "duration": "14\u201321 July 2026 \u00b7 Max 6 hrs/person/day \u00b7 Each person covers AM or PM batch only, not both \u00b7 Mon 4:30am slot removed",
    "volunteers": "Day"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "9:30\u201310:45am",
    "duration": "1.2h",
    "volunteers": "Shouryaveer"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:10am\u201312:30pm",
    "duration": "1.3h",
    "volunteers": "Yuvraj Gouranshi Shivia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30\u20131:00pm",
    "duration": "0.5h",
    "volunteers": "Darshita Dhruv"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30\u20135:30pm",
    "duration": "3.0h",
    "volunteers": "Aryan Dhruv Shouryaveer Komal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Shivia Yuvraj Harshita Gouranshi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Shouryaveer Darshita"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30\u20137:30am",
    "duration": "1.0h",
    "volunteers": "Dhruv Komal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "9:30am\u20131:00pm",
    "duration": "3.5h",
    "volunteers": "Aryan Yuvraj Harshita Shivia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30\u20135:30pm",
    "duration": "3.0h",
    "volunteers": "Darshita Dhruv Shouryaveer Gouranshi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Komal Aryan Yuvraj Shivia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Harshita Shouryaveer"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30\u20137:30am",
    "duration": "1.0h",
    "volunteers": "Shivia Gouranshi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "AM 9:30\u20131:00pm",
    "duration": "3.5h",
    "volunteers": "B1: Aryan | B2: Darshita | B3: Komal | B4: Dhruv"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "PM 2:00\u20135:30pm",
    "duration": "3.5h",
    "volunteers": "B1: Gouranshi | B2: Harshita | B3: Shouryaveer | B4: Yuvraj"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Aryan Shivia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Darshita Komal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30\u20137:30am",
    "duration": "1.0h",
    "volunteers": "Shivia Harshita"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "AM 9:30\u20131:00pm",
    "duration": "3.5h",
    "volunteers": "B1: Dhruv | B2: Harshita | B3: Shouryaveer | B4: Yuvraj"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "PM 2:00\u20135:30pm",
    "duration": "3.5h",
    "volunteers": "B1: Aryan | B2: Darshita | B3: Gouranshi | B4: Komal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Dhruv Darshita"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Aryan Komal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30\u20137:30am",
    "duration": "1.0h",
    "volunteers": "Shouryaveer Yuvraj"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "AM 9:30\u20131:00pm",
    "duration": "3.5h",
    "volunteers": "B1: Aryan | B2: Gouranshi | B3: Komal | B4: Shivia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "PM 2:00\u20135:30pm",
    "duration": "3.5h",
    "volunteers": "B1: Darshita | B2: Dhruv | B3: Harshita | B4: Yuvraj"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Dhruv Shouryaveer"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Gouranshi Shivia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30\u20137:30am",
    "duration": "1.0h",
    "volunteers": "Darshita Harshita"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "AM 9:30\u20131:00pm",
    "duration": "3.5h",
    "volunteers": "B1: Shivia | B2: Harshita | B3: Shouryaveer | B4: Komal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "PM 2:00\u20135:30pm",
    "duration": "3.5h",
    "volunteers": "B1: Aryan | B2: Gouranshi | B3: Dhruv | B4: Yuvraj"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Darshita Gouranshi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Shouryaveer Darshita"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00\u20135:30pm",
    "duration": "3.5h",
    "volunteers": "B1: Harshita Darshita | B2: Shouryaveer Gouranshi | B3&4: Shivia Yuvraj"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30\u20139:00pm",
    "duration": "2.5h",
    "volunteers": "Komal Dhruv"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "10:30\u201311:30pm",
    "duration": "1.0h",
    "volunteers": "Aryan Shivia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am\u20131:00pm",
    "duration": "3.5h",
    "volunteers": "Harshita Shivia Shouryaveer Komal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2:30\u20134:00pm",
    "duration": "1.5h",
    "volunteers": "Darshita Gouranshi Yuvraj Aryan"
  }
];

export const REGISTRATION_RECORDS: RegistrationRecord[] = [
  {
    "day": "Tue 14 Jul",
    "timeSlot": "Aarambh  Schedule  | Rules  &",
    "event": "Mr. Deepak  Sogani",
    "venue": "Tech  Lawn",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "Aarambh  Schedule  | Rules  &",
    "event": "Mr. Deepak  Sogani",
    "venue": "Tech  Lawn",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "Aarambh  Schedule  | Rules  &",
    "event": "Ice Breaking  Session  by Manish  Freeman  & Team",
    "venue": "Tech Block",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "Aarambh  Schedule  | Rules  &",
    "event": "Ice Breaking  Session  by Manish  Freeman  & Team",
    "venue": "Tech Block",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "& Team",
    "event": "& Team",
    "venue": "Tech  Block",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "Session Timing",
    "event": "Venue : Tech Block",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "Session Timing",
    "event": "Venue : Tech Block",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "Session Timing",
    "event": "The League  Room:  Peer Connect",
    "venue": "All four Batches  Together  in four venues  By Team  Aarambh",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "Session Timing",
    "event": "The League  Room:  Peer Connect",
    "venue": "All four Batches  Together  in four venues  By Team  Aarambh",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "venues By Team Aarambh",
    "event": "venues By Team Aarambh",
    "venue": "All four Batches  Together  in four",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "venues By Team Aarambh",
    "event": "venues By Team Aarambh",
    "venue": "All four Batches  Together  in four",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "venues By Team Aarambh",
    "event": "DJ Vibe Check",
    "venue": "Tech  Lawn",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "venues By Team Aarambh",
    "event": "DJ Vibe Check",
    "venue": "Tech  Lawn",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Venue:IM  Amphi",
    "event": "By Mrs. Anjali Suneja",
    "venue": "IM  Amphi",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Mr. Amitanshu Shrivastava",
    "venue": "Tech Block Rooms",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Brush & Bond",
    "venue": "Tech  Lawn",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Brush & Bond",
    "venue": "Tech  Lawn",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Session Timing",
    "event": "Venue : Tech Lawn",
    "venue": "Tech  Lawn",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Session Timing",
    "event": "Venue : Tech Lawn",
    "venue": "Tech  Lawn",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Session Timing",
    "event": "Venue : Tech Lawn",
    "venue": "Tech  Lawn",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Mr. Amitanshu Shrivastava",
    "venue": "Tech Block Rooms",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Mr. Amitanshu Shrivastava",
    "venue": "IM",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Mr. Amitanshu Shrivastava",
    "venue": "IM",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Venue: IET Amphi (Vaishali)",
    "event": "Mr. Kunal Agarwal",
    "venue": "Tech  Block  Rooms",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Venue:IM  Amphi",
    "event": "By Mrs. Anjali Suneja",
    "venue": "IM  Amphi",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Venue:IM  Amphi",
    "event": "Batch  4 Goal Setting  Workshop  By CCCT",
    "venue": "IM  Amphi",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Venue:IM  Amphi",
    "event": "Batch  4 Goal Setting  Workshop  By CCCT",
    "venue": "Livin g  IET",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Venue:IM  Amphi",
    "event": "Mr. Kunal Agarwal",
    "venue": "Tech  Block  Rooms",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Mr. Kunal Agarwal",
    "venue": "Tech  Block  Rooms",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Mr. Kunal Agarwal",
    "venue": "IM",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Mr. Kunal Agarwal",
    "venue": "IM",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Venue: IET Amphi (Garvistha)",
    "event": "Night",
    "venue": "Tech  Lawn",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Venue: IET Amphi (Garvistha)",
    "event": "Night",
    "venue": "Tech  Lawn",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "All volunteer",
    "venue": "Batch  Wise",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "By Mrs. Anjali Suneja",
    "venue": "Batch  Wise",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Mr. Kunal Agarwal",
    "venue": "IM  Amphi (Garvishtha)  Pottery  & Clay Art Workshop",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Batch  3 Goal Setting  Workshop  By CCCT",
    "venue": "Tech  Block  Rooms (Kavita)",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Session Timing",
    "event": "Batch  3 Goal Setting  Workshop  By CCCT",
    "venue": "IET",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Mr. Amitanshu Shrivastava",
    "venue": "Tech Block",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "Mr. Amitanshu Shrivastava",
    "venue": "Tech Block",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Mr. Amitanshu Shrivastava",
    "event": "By Mrs. Anjali Suneja",
    "venue": "Tech Block",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Session Timing",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Session Timing",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "IM Amphi (Ishvit)  Mr. Manan  Pahwa  Sessions",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "LUNCH  Examination",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "(1HR) 008",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "LUNCH  Examination",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "(1HR) 008",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "LUNCH  Examination",
    "event": "Fashion  Show",
    "venue": "Tech  Lawn",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "LUNCH  Examination",
    "event": "Fashion  Show",
    "venue": "Tech  Lawn",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch  2 Examination  (1hr)",
    "event": "Batch  2 Examination  (1hr)",
    "venue": "IET",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch  2 Examination  (1hr)",
    "event": "Batch  2 Examination  (1hr)",
    "venue": "IET",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch  2 Examination  (1hr)",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "IET Amphi (Manvi)  Workshop  on Cyber  Security  (*From  11:30am)",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Mr. RamG Vallath",
    "event": "Mr. RamG Vallath",
    "venue": "IM",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Mr. RamG Vallath",
    "event": "Mr. RamG Vallath",
    "venue": "IM",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Mr. RamG Vallath",
    "event": "Batch  3 Student  Affairs (1.5Hr)",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Mr. RamG Vallath",
    "event": "Batch  3 Student  Affairs (1.5Hr)",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Mr. RamG Vallath",
    "event": "Batch  3 Student  Affairs (1.5Hr)",
    "venue": "008TB (Ishvit)  Accounts  + IT + LRC Session(1hr)",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "By Mr. RamG Vallath",
    "event": "By Mr. RamG Vallath",
    "venue": "IET",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "By Mr. RamG Vallath",
    "event": "By Mr. Mukesh  Choudhary",
    "venue": "IET",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Venue:  IM Amphi (Kavita)",
    "event": "Batch  4 Hostel(1hr) | Anti -Ragging(30min)",
    "venue": "006TB &",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Venue:  IM Amphi (Kavita)",
    "event": "Batch  4 Hostel(1hr) | Anti -Ragging(30min)",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Venue:  IM Amphi (Kavita)",
    "event": "Batch  4 Hostel(1hr) | Anti -Ragging(30min)",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Venue:  IM Amphi (Kavita)",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "009TB (Manvi ) Workshop  on Cyber  Security  (till 3:30pm)",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Venue:  IM Amphi (Kavita)",
    "event": "by Mr. Mukesh Choudhary",
    "venue": "IET Amphi (Vaishali)  Mr. Manan  Pahwa  Sessions  (From  3:30pm)",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Yoga",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Mr. RamG Vallath",
    "event": "Mr. RamG Vallath",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Vaishali)",
    "event": "Admin  Session(30min)",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Vaishali)",
    "event": "International studies (30min)",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Vaishali)",
    "event": "Accounts  + IT + LRC Session(1hr)",
    "venue": "008TB (Kavita)",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Introduction  to AIC session(1hr)  | Alumni  of JKLU(1.5hr)",
    "venue": "006TB & 001TB (Ishvit)",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Brief  about  Outing",
    "venue": "Tech  Lawn",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Brief  about  Outing",
    "venue": "Tech  Lawn",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Batch  2 Mr. Manan  Pahwa  Sessions",
    "venue": "Tech  Lawn",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Health(1hr)",
    "venue": "IET Amphi (Kavita)  Introduction  to AIC session(1hr)  | Session  on Mental",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "Health(1hr)",
    "venue": "009TB (Manvi)  Alumni  of JKLU(1.5hr) (*Till  3:30pm)",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Session Timing",
    "event": "studies  (30min)",
    "venue": "IM Amphi (Vaishali)  Student Affairs (1.5Hr) (*from 3:30pm)  | Session  on International",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Manvi)",
    "event": "Batch  3 Session on Mental",
    "venue": "Health(1hr)",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Manvi)",
    "event": "Batch  3 Session on Mental",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Manvi)",
    "event": "Batch  3 Session on Mental",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Manvi)",
    "event": "Batch  3 Session on Mental",
    "venue": "IET Amphi (Vaishali)  Mr. Manan  Pahwa  Sessions  (till 4pm)",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi (Manvi)",
    "event": "Introduction to AIC session(1hr)",
    "venue": "IET Amphi (Garvistha)  Session  on International  studies  (30min)  (*From  4pm)  |",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am)",
    "event": "11:30am)",
    "venue": "tha)  008TB  Creating  Your  Own Path (*Till",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Venue:  IM Amphi",
    "event": "Student  Affairs  (1.5Hr)  (*From  11:30)",
    "venue": "IM Amphi",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Examination  (1HR)",
    "event": "| Session  on Mental  Health(1hr)",
    "venue": "008TB (M",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "Session Timing",
    "event": "Outing  Activity",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Kavita Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "Session Timing",
    "event": "Outing  Activity",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "Session Timing",
    "event": "JKLU Got Latent",
    "venue": "Tech  Lawn",
    "volunteer": "Vaishali Agarwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "Session Timing",
    "event": "JKLU Got Latent",
    "venue": "Tech  Lawn",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "By Art Club & Aarambh Team",
    "event": "By Art Club & Aarambh Team",
    "venue": "Tech  Lawn  (Start  From  8pm*  (Cohort",
    "volunteer": "Manvi Singh"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "By Art Club & Aarambh Team",
    "event": "By Art Club & Aarambh Team",
    "venue": "Tech  Lawn  (Start  From  8pm*  (Cohort",
    "volunteer": "Garvishtha Asnani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "By Art Club & Aarambh Team",
    "event": "Batch  3 VR Zone  By Tech  Club & Aarambh  Team  (Cohort  Wise)",
    "venue": "008TB  (Manvi&Garvishtha)",
    "volunteer": "Ishvit Bhardwaj"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "Session Timing",
    "event": "REST",
    "venue": "Registration Desk / Event Venue",
    "volunteer": "Garvishtha Asnani"
  }
];

export const DISCIPLINE_RECORDS: DisciplineRecord[] = [
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himanshu"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "Lights. Camera. Chill.",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "2:00pm - 3:00pm",
    "event": "Session on Art of Living",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himanshu"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Dance-Verse",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Avika soni"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Himanshu"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Clay All Day / Mr. Kunal Agarwal",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Avika soni"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Fri 17 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Himanshu"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "2:00pm - 5:30pm",
    "event": "Fold & Design / Design Club / & IET Amphitheater",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Avika soni"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "4:30am - 12:30pm",
    "event": "Outing Activity",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Himanshu"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Mon 20 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Stories Framed",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "10:00pm - 11:30pm",
    "event": "JKLU Unfiltered: No Script Attached",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "11:00am-12:00pm",
    "event": "TV9 Director Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "1:30pm-3:00pm",
    "event": "Alumni Connect",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "3:00pm- 4:30pm",
    "event": "Cyber Security for All / Mr. Mukesh Choudhary",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "4:30pm- 5:00pm",
    "event": "Anti-Ragging Awareness and Prevention Session",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "5:00pm - 5:30pm",
    "event": "Hostel 101",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "The Culture Walk",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "9:00am - 11:00am",
    "event": "Mind Hacks: The Hidden Psychology Behind Every Decision / Mr. Manan Pahwa",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Sat 18 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "10:30am-11:00am",
    "event": "Global Learning Opportunities at JKLU",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "IM Amphitheater",
    "zone": "Discipline - Venue duty (IM Amphitheater)",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:00am-11:30am",
    "event": "The Admin Guide",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "11:30am-1:00pm",
    "event": "Session on Mental Health",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "3:30pm",
    "event": "JKLU Essentials",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Loud Enough?",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "9:30am - 10:30am",
    "event": "Creating Your Own Path / Mr. RamG Vallath",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Batch 1",
    "event": "Batch 2",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Midnight",
    "event": "Live telecast of FIFA Final",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Sun 19 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "10:00pm -11:30pm",
    "event": "Own the Stage",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himanshu"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "2:00pm \u2013 5:30pm",
    "event": "Craft Appreciation and Art Workshop / Mr. Amitanshu Shrivastava",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30 pm - 8:30pm",
    "event": "Canvas Connections",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himanshu"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "IET Amphitheater",
    "zone": "Discipline - Venue duty (IET Amphitheater)",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Avika soni"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Session on POSH and Digital Well Being / Mrs. Anjali Suneja",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himanshu"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Thu 16 Jul",
    "timeSlot": "Time",
    "event": "Event",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "11:00am - 12:30pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Avika soni"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himanshu"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "12:30pm - 1:00pm",
    "event": "Full Team - 14",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "2:30pm -5:30 pm",
    "event": "Pari Maloo, Lakshay, Priyanshu, Raghav",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himanshu"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Tue 14 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Saanchi, Jitendra, Farhan, Hardik Kumawat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "2.30 pm \u2013 5:30pm",
    "event": "Battle of the Clusters &   Valedictory Ceremony",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Avika soni"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himanshu"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Departure of Buses / at 6:30 PM from / JKLU Main Gate",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Tue 21 Jul",
    "timeSlot": "9:30am - 1:00pm",
    "event": "Know Your Institution & Placement Cell Orientation (Institute wise)",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Avika soni"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himanshu"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "10:30pm - 11:30pm",
    "event": "Drop The Beat",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "V Tanvi Reddy"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "VARUN TEJA ANKARLA"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "2:30pm -5:30pm",
    "event": "Auction Arena",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Vaishnavi Gajjala"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Vansh Bhatia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Yashsvi Bothra"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "droni sehgal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Aditi Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Akshat Murarka"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Ananya Singh"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Anushri Falor"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Arshiyaa Yadav"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Avika soni"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Charvi Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Chelsytanwar"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Dishika Pancholi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Diya Shah"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Garvit Agrawal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Gauri Singhi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Hansika Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Himani Menghani"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himani Saraf"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Himanshu"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Jainam Jain"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Kajal Agarwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Karnam Hasini"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30 pm - 9:00pm",
    "event": "Decode the Drama",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "Kavya Gupta"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khanak Jain"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - VC BANGLOW",
    "volunteer": "Khushi Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lakshita Tanwar"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Lenkalapally Ravi Teja"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "MANSI SOMANI"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - BEHIND HOSTELS",
    "volunteer": "Naina Dayaramani"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nakkalapally Omruthik"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - PAKING AREA",
    "volunteer": "Nikita bhatia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Pendyala Sri Vaibhav"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Poorna Tejitha"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Prekshya Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - MAIN GATE DUTY",
    "volunteer": "Purvee Dudheria"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Purvi jain"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - HSB STAFF ROOM",
    "volunteer": "Risha Saini"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Ruchi choudhary"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - CRICKET AND FOOTBALL GROUND",
    "volunteer": "Saanchi Vijayvergia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Shreya Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - LAB CLASSES",
    "volunteer": "Siya Sharma"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "Sudhi Chaurasia"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - TECH BLOCK (POST EVENT HOURS)",
    "volunteer": "SuryavanshiSridevi"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Suvarna Keziah Digwal"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - IOD/AIC/CCCT BULDING",
    "volunteer": "Teeda Sri Ramya"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "U Vishnu"
  },
  {
    "day": "Wed 15 Jul",
    "timeSlot": "6:30am - 7:30am",
    "event": "Sports Activities",
    "venue": "Campus Patrolling",
    "zone": "Patrolling - FIRST AND SECOND FLOOR OF IET AND IM",
    "volunteer": "V Tanvi Reddy"
  }
];

export const TEAM_MEMBERS_DB: TeamMemberDB[] = [
  {
    "name": "Vedika Agrawal",
    "rollNo": "2023BTECH096",
    "gender": "Female",
    "position": "Organizing Head",
    "mobile": "9772219303",
    "email": "vedikaagrawal@jklu.edu.in"
  },
  {
    "name": "Aman Pratap Singh",
    "rollNo": "2024BTECH136",
    "gender": "Male",
    "position": "Organizing Head",
    "mobile": "9456608637",
    "email": "amanpratapsingh@jklu.edu.in"
  },
  {
    "name": "Vaishnavi Shukla",
    "rollNo": "2024BTECH143",
    "gender": "Female",
    "position": "Organizing Head",
    "mobile": "8769276288",
    "email": "vaishnavishukla@jklu.edu.in"
  },
  {
    "name": "Tanik Gupta",
    "rollNo": "2024BTECH234",
    "gender": "Male",
    "position": "Organizing Head",
    "mobile": "9929396663",
    "email": "tanikgupta@jklu.edu.in"
  },
  {
    "name": "Ambika Dalmia",
    "rollNo": "2024BDES002",
    "gender": "Female",
    "position": "Organizing Head",
    "mobile": "9679220337",
    "email": "ambikadalmia@jklu.edu.in"
  },
  {
    "name": "Kartik Sharma",
    "rollNo": "2024BTECH092",
    "gender": "Male",
    "position": "Discipline Committee - Team Leader",
    "mobile": "8769329369",
    "email": "kartiksharma2024@jklu.edu.in"
  },
  {
    "name": "Pratigya Bomb",
    "rollNo": "2024BTECH140",
    "gender": "Female",
    "position": "Discipline Committee - Team Leader",
    "mobile": "6264667506",
    "email": "pratigyabomb@jklu.edu.in"
  },
  {
    "name": "Naman Shukla",
    "rollNo": "2024BBA054",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Team Leader",
    "mobile": "9929727849",
    "email": "namanshukla@jklu.edu.in"
  },
  {
    "name": "Mayank Gautam",
    "rollNo": "2024BTECH001",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Team Leader",
    "mobile": "8949349516",
    "email": "mayank@jklu.edu.in"
  },
  {
    "name": "Anoushka Singh",
    "rollNo": "2025BDES006",
    "gender": "Female",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "8949038616",
    "email": "anushka1235.ka@gmail.com"
  },
  {
    "name": "Hardik Sain",
    "rollNo": "2025BTECH256",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "8000554092",
    "email": "hardiksain@jklu.edu.in"
  },
  {
    "name": "Farhan khan",
    "rollNo": "2025BBA042",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "8852080171",
    "email": "farhankhan7861458@gmail.com"
  },
  {
    "name": "Ghyan chechani",
    "rollNo": "2025BTECH304",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "8824600720",
    "email": "ghyanchechani@jklu.edu.in"
  },
  {
    "name": "Hardik kumawat",
    "rollNo": "2025BBA46",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "9001023997",
    "email": "hardikkumawat3997@gmail.com"
  },
  {
    "name": "Harshvardhan Singh",
    "rollNo": "2025BTECH141",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "7568434676",
    "email": "harshvardhansingh@jklu.edu.in"
  },
  {
    "name": "jitendra",
    "rollNo": "2025BBA051",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "9653840559",
    "email": "js7149448@gmail.com"
  },
  {
    "name": "Pari maloo",
    "rollNo": "2025BBA081",
    "gender": "Female",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "9351313345",
    "email": "parimaloo2007@gmail.com"
  },
  {
    "name": "Lakshya Gupta",
    "rollNo": "2025BTECH203",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "7597370438",
    "email": "lakshyagupta1549@gmail.com"
  },
  {
    "name": "Priyanshu kumar",
    "rollNo": "2025BTECH271",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "9891660352",
    "email": "priyanshu333k@gmail.com"
  },
  {
    "name": "Raghav sharma",
    "rollNo": "2025BTECH099",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "7849902293",
    "email": "raghavsharma2025@jklu.edu.in"
  },
  {
    "name": "Raghuraj Jangid",
    "rollNo": "2025BTECH100",
    "gender": "Male",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "8306203348",
    "email": "raghurajjangid@jklu.edu.in"
  },
  {
    "name": "Sanchi Dhoopia",
    "rollNo": "2025BTECH338",
    "gender": "Female",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "9664356901",
    "email": "dhoopiasanchi@gmail.com"
  },
  {
    "name": "Shreshtha sharma",
    "rollNo": "2025BBA106",
    "gender": "Female",
    "position": "Internal Arrangements Committee - Volunteer",
    "mobile": "9660599045",
    "email": "shreshthasharma@jklu.edu.in"
  },
  {
    "name": "Parth Bhardwaj",
    "rollNo": "2024BBA059",
    "gender": "Male",
    "position": "Event &Venue Committee - Team Leader",
    "mobile": "7850993545",
    "email": "parthbhardwaj@jklu.edu.in"
  },
  {
    "name": "Shlok chaturvedi",
    "rollNo": "2024BTECH010",
    "gender": "Male",
    "position": "Event &Venue Committee - Team Leader",
    "mobile": "7737257861",
    "email": "shlokchaturvedi@jklu.edu.in"
  },
  {
    "name": "Aman Anchaliya",
    "rollNo": "2025BBA007",
    "gender": "Male",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "9549696968",
    "email": "amananchaliya7@gmail.com"
  },
  {
    "name": "Anvi Vashist",
    "rollNo": "2025BBA013",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8875513050",
    "email": "anvivashist@jklu.edu.in"
  },
  {
    "name": "Hemangi Sancheti",
    "rollNo": "2025BBA047",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "7357956666",
    "email": "hemangisancheti@jklu.edu.in"
  },
  {
    "name": "Naresh roj",
    "rollNo": "2025BTECH158",
    "gender": "Male",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "9509879995",
    "email": "nareshroj@jklu.edu.in"
  },
  {
    "name": "Nawya dusad",
    "rollNo": "2025BBA075",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8279220922",
    "email": "nawyadusad2007@gmail.com"
  },
  {
    "name": "Pari Nahata",
    "rollNo": "2025BBA082",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8209095137",
    "email": "parinahata@jklu.edu.in"
  },
  {
    "name": "PARIHAAN KABRA",
    "rollNo": "2025BBA083",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "9057123555",
    "email": "parihaankabra@jklu.edu.in"
  },
  {
    "name": "Priecy Gandhi",
    "rollNo": "2025BTECH270",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "7378100524",
    "email": "priecygandhi@jklu.edu.in"
  },
  {
    "name": "Priyanshi Agnani",
    "rollNo": "2025BTECH096",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "9772217788",
    "email": "priyanshiagnani@jklu.edu.in"
  },
  {
    "name": "Shubhangi Bhanawat",
    "rollNo": "2025BTECH357",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "9829015671",
    "email": "shubhangibhanawat@jklu.edu.in"
  },
  {
    "name": "Siddhi khandelwal",
    "rollNo": "2025BBA108",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8852824149",
    "email": "siddhikhandelwal@jklu.edu.in"
  },
  {
    "name": "Tanvi Gupta",
    "rollNo": "2025BBA111",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8302847403",
    "email": "tanvigupta@jklu.edu.in"
  },
  {
    "name": "Tarushi Agarwal",
    "rollNo": "2025BBA112",
    "gender": "Female",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "7588883230",
    "email": "tarushiagarwal@jklu.edu.in"
  },
  {
    "name": "Yatharth Chaturvedi",
    "rollNo": "2025BBA121",
    "gender": "Male",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8529958544",
    "email": "yatharthchaturvedi@jklu.edu.in"
  },
  {
    "name": "Mradul Saxena",
    "rollNo": "2025BTECH087",
    "gender": "Male",
    "position": "Event &Venue Committee - Volunteer",
    "mobile": "8767289743",
    "email": "mradulsaxena@jklu.edu.in"
  },
  {
    "name": "Jheel jain",
    "rollNo": "2024BTECH277",
    "gender": "Female",
    "position": "Hospitality Committee - Team Leader",
    "mobile": "9929001325",
    "email": "jainjheel1406@gmail.com"
  },
  {
    "name": "Gourang Tak",
    "rollNo": "2024BTECH090",
    "gender": "Male",
    "position": "Hospitality Committee - Team Leader",
    "mobile": "8058477540",
    "email": "gaurang@jklu.edu.in"
  },
  {
    "name": "Aadrika Roy",
    "rollNo": "2025BTECH291",
    "gender": "Female",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "9423486807",
    "email": "aadrikaroy@jklu.edu.in"
  },
  {
    "name": "Abhimanyu Singh katiyar",
    "rollNo": "2025BTECH004",
    "gender": "Male",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "9257266461",
    "email": "abhimanyusinghkatiyar@jklu.edu.in"
  },
  {
    "name": "Anubha Sharma",
    "rollNo": "2025BTECH071",
    "gender": "Female",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "9829820425",
    "email": "anubhasharma@jklu.edu.in"
  },
  {
    "name": "Aadipoojya Mehra",
    "rollNo": "2025BTECH061",
    "gender": "Male",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "7742314923",
    "email": "aadipoojyamehra@jklu.edu.in"
  },
  {
    "name": "Pawani sharma",
    "rollNo": "2025BTECH041",
    "gender": "Female",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "8905818323",
    "email": "pawanisharma@jklu.edu.in"
  },
  {
    "name": "Sanskriti gehlot",
    "rollNo": "2025BBA104",
    "gender": "Female",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "8824500776",
    "email": "sanskritigehlot@jklu.edu.in"
  },
  {
    "name": "Rahul Gorani",
    "rollNo": "2025BBA092",
    "gender": "Male",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "6367427790",
    "email": "rahulgorani@jklu.edu.in"
  },
  {
    "name": "Bhavya Doshi",
    "rollNo": "2025BBA024",
    "gender": "Male",
    "position": "Hospitality Committee - Volunteer",
    "mobile": "7014763106",
    "email": "bhavyadoshi@jklu.edu.in"
  },
  {
    "name": "Arjun Singh Tanwar",
    "rollNo": "2024BTECH018",
    "gender": "Male",
    "position": "Food & Accommodation Committee - Team Leader",
    "mobile": "9166130402",
    "email": "arjunsinghtanwar@jklu.edu.in"
  },
  {
    "name": "Smile chhabra",
    "rollNo": "2024BBA084",
    "gender": "Female",
    "position": "Food & Accommodation Committee - Team Leader",
    "mobile": "9571839843",
    "email": "smilechhabra@jklu.edu.in"
  },
  {
    "name": "Kartavya Garhwal",
    "rollNo": "2024BTECH079",
    "gender": "Male",
    "position": "Food & Accommodation Committee - Team Leader",
    "mobile": "8233848184",
    "email": "kartavyagarhwal@jklu.edu.in"
  },
  {
    "name": "Bhavya Gupta",
    "rollNo": "2025BBA025",
    "gender": "Male",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "8302914430",
    "email": "bhavyagupta@jklu.edu.in"
  },
  {
    "name": "Aditi Sharma",
    "rollNo": "2025BBA005",
    "gender": "Female",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "9928456059",
    "email": "aditisharma@jklu.edu.in"
  },
  {
    "name": "Samridhi Singh",
    "rollNo": "2025BTECH225",
    "gender": "Female",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "8851168424",
    "email": "samridhisingh@jklu.edu.in"
  },
  {
    "name": "Samriddhi Singh",
    "rollNo": "2025BBA103",
    "gender": "Female",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "7974779477",
    "email": "samriddhis797@gmail.com"
  },
  {
    "name": "Krish Bhola",
    "rollNo": "2025BBA060",
    "gender": "Male",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "7073517788",
    "email": "krishbhola@jklu.edu.in"
  },
  {
    "name": "Harshul agarwal",
    "rollNo": "2025BTECH258",
    "gender": "Male",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "7742991906",
    "email": "harshulagarwal@jklu.edu.in"
  },
  {
    "name": "pratiki agarwal",
    "rollNo": "2025BBA086",
    "gender": "Female",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "8000021198",
    "email": "pratikiagarwal@jklu.edu.in"
  },
  {
    "name": "Chanchal karanani",
    "rollNo": "2025BTECH019",
    "gender": "Male",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "7297066050",
    "email": "chanchalkaranani@jklu.edu.in"
  },
  {
    "name": "Pranjal jangid",
    "rollNo": "2025BTECH094",
    "gender": "Female",
    "position": "Food & Accommodation Committee - Volunteer",
    "mobile": "9828188830",
    "email": "pranjaljangid@jklu.edu.in"
  },
  {
    "name": "Roshan jangir",
    "rollNo": "2024BTECH147",
    "gender": "Male",
    "position": "Photography Committee - Team Leader",
    "mobile": "7877552810",
    "email": "roshanjangir@jklu.edu.in"
  },
  {
    "name": "Mohit Khurana",
    "rollNo": "2024BTECH155",
    "gender": "Male",
    "position": "Photography Committee - Team Leader",
    "mobile": "8905744728",
    "email": "mohitkhurana@jklu.edu.in"
  },
  {
    "name": "Shambhavi Singh",
    "rollNo": "2025BTECH049",
    "gender": "Female",
    "position": "Photography Committee - Volunteer",
    "mobile": "9452588089",
    "email": "shambhavisingh@jklu.edu.in"
  },
  {
    "name": "Aditya Vyas",
    "rollNo": "2025BTECH293",
    "gender": "Male",
    "position": "Photography Committee - Volunteer",
    "mobile": "8955637102",
    "email": "adityavyas@jklu.edu.in"
  },
  {
    "name": "Sunay kundalwal",
    "rollNo": "2025BTECH175",
    "gender": "Male",
    "position": "Photography Committee - Volunteer",
    "mobile": "8619804776",
    "email": "sunaykundalwal@jklu.edu.in"
  },
  {
    "name": "Riddhi Sharma",
    "rollNo": "2025BTECH166",
    "gender": "Female",
    "position": "Photography Committee - Volunteer",
    "mobile": "7014857867",
    "email": "riddhisharma@jklu.edu.in"
  },
  {
    "name": "akshat bisht",
    "rollNo": "2025BTECH067",
    "gender": "Male",
    "position": "Photography Committee - Volunteer",
    "mobile": "9509693736",
    "email": "akshatbisht@jklu.edu.in"
  },
  {
    "name": "Mohit Suwalka",
    "rollNo": "2025BTECH267",
    "gender": "Male",
    "position": "Photography Committee - Volunteer",
    "mobile": "8005961269",
    "email": "mohitsuwalka@jklu.edu.in"
  },
  {
    "name": "Niharika Chauhan",
    "rollNo": "2025BBA076",
    "gender": "Female",
    "position": "Photography Committee - Volunteer",
    "mobile": "9660622428",
    "email": "niharikachauhan2607@gmail.com"
  },
  {
    "name": "Tarun Kumar",
    "rollNo": "2025BTECH055",
    "gender": "Male",
    "position": "Photography Committee - Volunteer",
    "mobile": "8764191998",
    "email": "tarunkumar2025@jklu.edu.in"
  },
  {
    "name": "Aditya Nayak",
    "rollNo": "2024BTECH032",
    "gender": "Male",
    "position": "Social media -Team Leader",
    "mobile": "9116727168",
    "email": "aadinayak2006@gmail.com"
  },
  {
    "name": "Vaibhav Khandelwal",
    "rollNo": "2024BTECH110",
    "gender": "Male",
    "position": "Social media -Team Leader",
    "mobile": "6376511127",
    "email": "vaibhavkhandelwal@jklu.edu.in"
  },
  {
    "name": "Kaushal Malvi",
    "rollNo": "2025BTECH263",
    "gender": "Male",
    "position": "Social media - Volunteer",
    "mobile": "9644679988",
    "email": "kaushalmalvi@jklu.edu.in"
  },
  {
    "name": "Nandini Shah",
    "rollNo": "2025BBA073",
    "gender": "Female",
    "position": "Social media - Volunteer",
    "mobile": "9358369605",
    "email": "nandinishah@jklu.edu.in"
  },
  {
    "name": "Bhavisha Sabnani",
    "rollNo": "2025BBA023",
    "gender": "Female",
    "position": "Social media - Volunteer",
    "mobile": "7878530529",
    "email": "bhavishasabnani@jklu.edu.in"
  },
  {
    "name": "Anukriti Choudhary",
    "rollNo": "2025BBA011",
    "gender": "Female",
    "position": "Social media - Volunteer",
    "mobile": "7424841969",
    "email": "anukritichoudhary@jklu.edu.in"
  },
  {
    "name": "Vidhaan Shah",
    "rollNo": "2025BTECH059",
    "gender": "Male",
    "position": "Social media - Volunteer",
    "mobile": "7357252112",
    "email": "vidhaanpshah@jkllu.edu.in"
  },
  {
    "name": "Parth Mundra",
    "rollNo": "2025BBA085",
    "gender": "Male",
    "position": "Social media - Volunteer",
    "mobile": "9664098829",
    "email": "parthmundra@jklu.edu.in"
  },
  {
    "name": "Chestha kulshrestha",
    "rollNo": "2024BTECH185",
    "gender": "Female",
    "position": "Media Committee - Team Leader",
    "mobile": "9928883938",
    "email": "chesthakulshrestha@jklu.edu.in"
  },
  {
    "name": "Adityavardhan Singh Chauhan",
    "rollNo": "2024BTECH118",
    "gender": "Male",
    "position": "Media Committee - Team Leader",
    "mobile": "8955738808",
    "email": "adityavardhansinghchauhan@jklu.edu.in"
  },
  {
    "name": "Gouranshi Sharma",
    "rollNo": "2025BBA045",
    "gender": "Female",
    "position": "Media Committee - Volunteer",
    "mobile": "8890174914",
    "email": "gouranshisharma@jklu.edu.in"
  },
  {
    "name": "Aryan Ajay Bhaskat",
    "rollNo": "2025BBA015",
    "gender": "Male",
    "position": "Media Committee - Volunteer",
    "mobile": "9351362479",
    "email": "aryanajaybhaskar@jklu.edu.in"
  },
  {
    "name": "Darshita Jain",
    "rollNo": "2025BBA034",
    "gender": "Female",
    "position": "Media Committee - Volunteer",
    "mobile": "6378803495",
    "email": "darshitajain@jklu.edu.in"
  },
  {
    "name": "Shivia rawat",
    "rollNo": "2025BTECH276",
    "gender": "Female",
    "position": "Media Committee - Volunteer",
    "mobile": "7849833123",
    "email": "shiviarawat@jklu.edu.in"
  },
  {
    "name": "Shouryaveer Bishnoi",
    "rollNo": "2025BTECH111",
    "gender": "Male",
    "position": "Media Committee - Volunteer",
    "mobile": "9828692129",
    "email": "shouryaveerbishnoi@jklu.edu.in"
  },
  {
    "name": "Harshita Harchandani",
    "rollNo": "2025BTECH193",
    "gender": "Female",
    "position": "Media Committee - Volunteer",
    "mobile": "7470808031",
    "email": "harshitaharchandani@jklu.edu.in"
  },
  {
    "name": "Komal verma",
    "rollNo": "2025BBA058",
    "gender": "Female",
    "position": "Media Committee - Volunteer",
    "mobile": "8209421348",
    "email": "komal13072007@gmail.com"
  },
  {
    "name": "Yuvraj Singh Rathore",
    "rollNo": "2025BTECH290",
    "gender": "Male",
    "position": "Media Committee - Volunteer",
    "mobile": "9351912044",
    "email": "yuvrajsinghrathore2025@jklu.edu.in"
  },
  {
    "name": "Dhruv kumar",
    "rollNo": "2025BTECH023",
    "gender": "Male",
    "position": "Media Committee - Volunteer",
    "mobile": "8979809484",
    "email": "dhruvkumar@jklu.edu.in"
  },
  {
    "name": "Medha Gupta",
    "rollNo": "2024BDES013",
    "gender": "Female",
    "position": "Design Committee - Team Leader",
    "mobile": "9116117889",
    "email": "medhagupta@jklu.edu.in"
  },
  {
    "name": "Janapaati Rohith",
    "rollNo": "2025BTECH260",
    "gender": "Male",
    "position": "Design Committee - Volunteer",
    "mobile": "8309571278",
    "email": "janapaatirohith@jklu.edu.in"
  },
  {
    "name": "Raghav Soni",
    "rollNo": "2025BDES032",
    "gender": "Male",
    "position": "Design Committee - Volunteer",
    "mobile": "9140338834",
    "email": "raghavsoni2025@jklu.edu.in"
  },
  {
    "name": "Srijan Sharma",
    "rollNo": "2025BDES037",
    "gender": "Male",
    "position": "Design Committee - Volunteer",
    "mobile": "7007904127",
    "email": "srijansharma@jklu.edu.in"
  },
  {
    "name": "Devam Gupta",
    "rollNo": "2024BTECH014",
    "gender": "Male",
    "position": "Technical Committee - Team Leader",
    "mobile": "7340015201",
    "email": "devamgupta@jklu.edu.in"
  },
  {
    "name": "Yash Bansal",
    "rollNo": "2024BTECH128",
    "gender": "Male",
    "position": "Technical Committee - Team Leader",
    "mobile": "8619011601",
    "email": "yashbansal@jklu.edu.in"
  },
  {
    "name": "Ashutosh Yadav",
    "rollNo": "2025BTECH188",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "9259068512",
    "email": "ashutoshyadav@jklu.edu.in"
  },
  {
    "name": "Manant Srivastava",
    "rollNo": "2025BTECH265",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "9451021467",
    "email": "manantsrivastava@jklu.edu.in"
  },
  {
    "name": "Aalap Goswami",
    "rollNo": "2025BTECH002",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "9783081486",
    "email": "aalapgoswami@jklu.edu.in"
  },
  {
    "name": "Pratham lalwani",
    "rollNo": "2025BTECH095",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "7232857451",
    "email": "prathamlalwani@jklu.edu.in"
  },
  {
    "name": "Rashi Katiyar",
    "rollNo": "2025BTECH042",
    "gender": "Female",
    "position": "Technical Committee - Volunteer",
    "mobile": "7878437857",
    "email": "rashikatiyar@jklu.edu.in"
  },
  {
    "name": "Udit Mishra",
    "rollNo": "2025BTECH056",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "9509908119",
    "email": "uditmishra@jklu.edu.in"
  },
  {
    "name": "Amrit Agrawal",
    "rollNo": "2025BTECH009",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "95889 34442",
    "email": "amritagrawal@jklu.edu.in"
  },
  {
    "name": "Arihant Jain",
    "rollNo": "2025BTECH186",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "63670 45695",
    "email": "arihantjain2025@jklu.edu.in"
  },
  {
    "name": "Heramb Sharma",
    "rollNo": "2025BTECH028",
    "gender": "Male",
    "position": "Technical Committee - Volunteer",
    "mobile": "6377827962",
    "email": "herambsharma@jklu.edu.in"
  },
  {
    "name": "Pulkit Dosi",
    "rollNo": "2024BBA067",
    "gender": "Male",
    "position": "Feedback & Registration Committee - Team Leader",
    "mobile": "9887788899",
    "email": "pulkitdosi16@gmail.com"
  },
  {
    "name": "Kavita Sharma",
    "rollNo": "2025BTECH083",
    "gender": "Female",
    "position": "Feedback & Registration Committee - Volunteer",
    "mobile": "94621 49044",
    "email": "kavitasharma946214@gmail.com"
  },
  {
    "name": "Garvishtha Asnani",
    "rollNo": "2025BBA044",
    "gender": "Female",
    "position": "Feedback & Registration Committee - Volunteer",
    "mobile": "7878504420",
    "email": "garvishthaasnani@jklu.edu.in"
  },
  {
    "name": "Ishvit Bhardwaj",
    "rollNo": "2025BTECH032",
    "gender": "Male",
    "position": "Feedback & Registration Committee - Volunteer",
    "mobile": "6375056015",
    "email": "ishvitbhardwaj@jklu.edu.in"
  },
  {
    "name": "Manvi Singh",
    "rollNo": "2025BTECH154",
    "gender": "Female",
    "position": "Feedback & Registration Committee - Volunteer",
    "mobile": "9024411648",
    "email": "manvisingh@jklu.edu.in"
  },
  {
    "name": "Vaishali agarwal",
    "rollNo": "2025BTECH057",
    "gender": "Female",
    "position": "Feedback & Registration Committee - Volunteer",
    "mobile": "9521273276",
    "email": "vaishaliagarwal@jklu.edu.in"
  },
  {
    "name": "Rishika Singh",
    "rollNo": "2024BTECH168",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "7300118679",
    "email": "rishikasingh2024@jklu.edu.in"
  },
  {
    "name": "Ananya Singh",
    "rollNo": "2025BTECH184",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9509946112",
    "email": "ananyasingh2025@jklu.edu.in"
  },
  {
    "name": "Aditi Agarwal",
    "rollNo": "2025BBA004",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8529341939",
    "email": "aditiagarwal2025@jklu.edu.in"
  },
  {
    "name": "Siya Sharma",
    "rollNo": "2025BTECH051",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9119218502",
    "email": "siyasharma@jklu.edu.in"
  },
  {
    "name": "Himani Menghani",
    "rollNo": "2025BBA048",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9509221101",
    "email": "himanimenghani@jklu.edu.in"
  },
  {
    "name": "Prekshya Sharma",
    "rollNo": "2025BTECH164",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7850984940",
    "email": "prekshasharma277@gmail.com"
  },
  {
    "name": "Swadha Saxena",
    "rollNo": "2024BBA086",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9079707725",
    "email": "swadhasaxena5@gmail.com"
  },
  {
    "name": "Nikita bhatia",
    "rollNo": "2025BTECH161",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7742314923",
    "email": "nikitabhatia@jklu.edu.in"
  },
  {
    "name": "Purvi jain",
    "rollNo": "2025BTECH098",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7877082586",
    "email": "purvijain@jklu.edu.in"
  },
  {
    "name": "Anushri Falor",
    "rollNo": "2025BTECH011",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9314267009",
    "email": "anushrifalor@jklu.edu.in"
  },
  {
    "name": "Dishika Pancholi",
    "rollNo": "2025BBA039",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9588934442",
    "email": "dishikapancholi00@gmail.com"
  },
  {
    "name": "Vidhi Chamaria",
    "rollNo": "2024BDES035",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9829883263",
    "email": "vidhichamaria@jklu.edu.in"
  },
  {
    "name": "Gauri Singhi",
    "rollNo": "2025BDES015",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8305015800",
    "email": "gaurisinghi@jklu.edu.in"
  },
  {
    "name": "Khushi Sharma",
    "rollNo": "2025BTECH197",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8949969152",
    "email": "khushisharma@jklu.edu.in"
  },
  {
    "name": "Purvee Dudheria",
    "rollNo": "2025BBA090",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9352221827",
    "email": "purveedudheria@jklu.edu.in"
  },
  {
    "name": "Himani Saraf",
    "rollNo": "2025BBA049",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7229990039",
    "email": "himanisaraf@jklu.edu.in"
  },
  {
    "name": "Daksh Kumar",
    "rollNo": "2024BTECH031",
    "gender": "Male",
    "position": "Cluster Head",
    "mobile": "8949291337",
    "email": "dakshkumar@jklu.edu.in"
  },
  {
    "name": "Sudhi Chaurasia",
    "rollNo": "2025BTECH053",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8966873111",
    "email": "sudhichaurasia@jklu.edu.in"
  },
  {
    "name": "Chelsytanwar",
    "rollNo": "2025BTECH250",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9119289533",
    "email": "chelsytanwar@gmail.com"
  },
  {
    "name": "Garvit Agrawal",
    "rollNo": "2025BTECH025",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9024079027",
    "email": "garvitagrawal@jklu.edu.in"
  },
  {
    "name": "Vansh Bhatia",
    "rollNo": "2025BBA115",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9413833334",
    "email": "vanshbhatia@jklu.edu.in"
  },
  {
    "name": "MANSI SOMANI",
    "rollNo": "2025BTECH086",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9636866919",
    "email": "mansisomani@jklu.edu.in"
  },
  {
    "name": "Bhavya Bang",
    "rollNo": "2024BDES009",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "7023282838",
    "email": "bhavya@jklu.edu.in"
  },
  {
    "name": "Kavya Gupta",
    "rollNo": "2025BDES018",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "6263137120",
    "email": "kavyagupta1635@gmail.com"
  },
  {
    "name": "Lakshita Tanwar",
    "rollNo": "2025BBA063",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9251016998",
    "email": "lakshitatanwar@jklu.edu.in"
  },
  {
    "name": "Kajal Agarwal",
    "rollNo": "2025BTECH195",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9660595115",
    "email": "kajalagarwal@jklu.edu.in"
  },
  {
    "name": "Hansika Agarwal",
    "rollNo": "2025BTECH027",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8824325776",
    "email": "hansikaagarwal@jklu.edu.in"
  },
  {
    "name": "Yashsvi Bothra",
    "rollNo": "2025BBA120",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9875765696",
    "email": "yashsvibothra@jklu.edu.in"
  },
  {
    "name": "Khushi Soni",
    "rollNo": "2024BTECH054",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9024877641",
    "email": "khushisoni@jklu.edu.in"
  },
  {
    "name": "Ruchi choudhary",
    "rollNo": "2025BBA098",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8905185761",
    "email": "ruchichoudhary@jklu.edu.in"
  },
  {
    "name": "Saanchi Vijayvergia",
    "rollNo": "2025BBA100",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9509481665",
    "email": "saanchivijayvergia@jklu.edu.in"
  },
  {
    "name": "droni sehgal",
    "rollNo": "2025BBA041",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7737984411",
    "email": "dronisehgal@jklu.edu.in"
  },
  {
    "name": "Diya Shah",
    "rollNo": "2025BBA124",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8866560966",
    "email": "shahdiyaankitbhai@jklu.edu.in"
  },
  {
    "name": "Risha Saini",
    "rollNo": "2025BBA095",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7296947096",
    "email": "rishasaini@jklu.edu.in"
  },
  {
    "name": "Aryan Gupta",
    "rollNo": "2024BTECH036",
    "gender": "Male",
    "position": "Cluster Head",
    "mobile": "8302958564",
    "email": "aryangupta2024@jklu.edu.in"
  },
  {
    "name": "Khanak Jain",
    "rollNo": "2025BBA057",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8104805555",
    "email": "khanakjain@jklu.edu.in"
  },
  {
    "name": "Jainam Jain",
    "rollNo": "2025BTECH306",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "8000796223",
    "email": "jainamjain@jklu.edu.in"
  },
  {
    "name": "Arshiyaa Yadav",
    "rollNo": "2025BTECH073",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7976616005",
    "email": "arshiyaayadav@jklu.edu.in"
  },
  {
    "name": "Akshat Murarka",
    "rollNo": "2025BTECH068",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9153498719",
    "email": "akshatmurarka@jklu.edu.in"
  },
  {
    "name": "Himanshu",
    "rollNo": "2025BTECH142",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9251015254",
    "email": "himanshu@jklu.edu.in"
  },
  {
    "name": "Rishika Sharma",
    "rollNo": "2024BBA072",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9929175875",
    "email": "herrishika03@gmail.com"
  },
  {
    "name": "Naina Dayaramani",
    "rollNo": "2025BTECH156",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8982800788",
    "email": "nainadayaramani@gmail.com"
  },
  {
    "name": "Avika soni",
    "rollNo": "2025BBA017",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9828239900",
    "email": "avikasonijain@jklu.edu.in"
  },
  {
    "name": "Aditi Sharma",
    "rollNo": "2025BTECH121",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8769266444",
    "email": "aditisharma2025@jklu.edu.in"
  },
  {
    "name": "Charvi Sharma",
    "rollNo": "2025BBA029",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8847490178",
    "email": "charvisharma@jklu.edu.in"
  },
  {
    "name": "Shreya Sharma",
    "rollNo": "2025BTECH277",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7895887371",
    "email": "shreyasharma@jklu.edu.in"
  },
  {
    "name": "Vankayala Pavani",
    "rollNo": "2024BTECH171",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "7842114595",
    "email": "vankayalapavani@jklu.edu.in"
  },
  {
    "name": "Karnam Hasini",
    "rollNo": "2025BTECH309",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "6303751019",
    "email": "karnamhasini@jklu.edu.in"
  },
  {
    "name": "SuryavanshiSridevi",
    "rollNo": "2025BTECH115",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8639190326",
    "email": "sridevimadhavsuryavanshi@jklu.edu.in"
  },
  {
    "name": "Pendyala Sri Vaibhav",
    "rollNo": "2025BTECH217",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9398897495",
    "email": "pendyalasrivaibhav@jklu.edu.in"
  },
  {
    "name": "Varra srivalli",
    "rollNo": "2024BTECH261",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9502303519",
    "email": "varrasrivalli@jklu.edu.in"
  },
  {
    "name": "Lenkalapally Ravi Teja",
    "rollNo": "2025BTECH221",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "7416090030",
    "email": "raviteja@jklu.edu.in"
  },
  {
    "name": "V Tanvi Reddy",
    "rollNo": "2025BTECH324",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "6301758988",
    "email": "vtanvireddy@jklu.edu.in"
  },
  {
    "name": "Suvarna Keziah Digwal",
    "rollNo": "2025BTECH075",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "7032764515",
    "email": "digwalsuvarnakeziah@jklu.edu.in"
  },
  {
    "name": "Doddapuneni jahanavi",
    "rollNo": "2024BTECH040",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9515934329",
    "email": "doddapunenijahanavi@jklu.edu.in"
  },
  {
    "name": "Vaishnavi Gajjala",
    "rollNo": "2025BTECH303",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8309299039",
    "email": "gajjalavaishnavi@jklu.edu.in"
  },
  {
    "name": "Nakkalapally Omruthik",
    "rollNo": "2025BTECH157",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9014857921",
    "email": "nakkalapallyomruthik@jklu.edu.in"
  },
  {
    "name": "Poorna Tejitha",
    "rollNo": "2025BTECH333",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "8247754198",
    "email": "gaddampoornatejitha@jklu.edu.in"
  },
  {
    "name": "Kandela Nandini",
    "rollNo": "2024BTECH204",
    "gender": "Female",
    "position": "Cluster Head",
    "mobile": "9391774008",
    "email": "kandelanandini5@gmail.com"
  },
  {
    "name": "Teeda Sri Ramya",
    "rollNo": "2025BTECH236",
    "gender": "Female",
    "position": "Cohort Leader",
    "mobile": "9346228928",
    "email": "teedasriramya@jklu.edu.in"
  },
  {
    "name": "U Vishnu",
    "rollNo": "2025BTECH238",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9059814029",
    "email": "vishnuu461@gmail.com"
  },
  {
    "name": "VARUN TEJA ANKARLA",
    "rollNo": "2025BTECH241",
    "gender": "Male",
    "position": "Cohort Leader",
    "mobile": "9573857352",
    "email": "a.varunteja@jklu.edu.in"
  }
];

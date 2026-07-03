import os
import re
import openpyxl
from pymongo import MongoClient

env_path = r"F:\Aarambh 2026\Team_portal\backend\.env"
excel_path = r"C:\Users\MSI1\Downloads\Master List Aarambh (2).xlsx"

def get_mongo_uri():
    with open(env_path, 'r') as f:
        content = f.read()
    match = re.search(r'MONGODB_URI\s*=\s*["\']?(.*?)["\']?$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return None

def normalize_roll(roll):
    if not roll: return ""
    return re.sub(r'[\/\.\s-]', '', str(roll)).upper().strip()

def run():
    uri = get_mongo_uri()
    if not uri:
        print("Error: MONGODB_URI not found.")
        return
        
    client = MongoClient(uri)
    db = client['test']
    team_members_coll = db['teammembers']
    
    if not os.path.exists(excel_path):
        print(f"Error: Excel file not found at {excel_path}")
        return
        
    wb = openpyxl.load_workbook(excel_path, data_only=True)
    sheet = wb['Full List']
    rows = list(sheet.iter_rows(values_only=True))[1:] # skip header
    
    members = []
    seen_keys = set() # Store (roll, name) tuple to prevent duplicate insertions of the same person
    
    for r_idx, r in enumerate(rows):
        if not r or r[0] is None:
            continue
            
        name = r[1]
        roll_no = r[2]
        gender = r[3]
        position = r[4]
        mobile = r[5]
        email = r[6]
        
        if not name or not roll_no:
            continue
            
        norm_roll = normalize_roll(roll_no)
        norm_name = str(name).strip().lower()
        if not norm_roll:
            continue
            
        key = (norm_roll, norm_name)
        if key in seen_keys:
            print(f"Skipping exact duplicate: {norm_roll} ({name})")
            continue
            
        seen_keys.add(key)
        
        # Clean gender
        g = str(gender).strip().lower()
        if 'female' in g or g == 'f':
            clean_gender = 'Female'
        elif 'male' in g or g == 'm':
            clean_gender = 'Male'
        else:
            clean_gender = 'Male' # fallback
            
        members.append({
            'name': str(name).strip(),
            'rollNo': norm_roll,
            'gender': clean_gender,
            'position': str(position).strip() if position else '',
            'mobile': str(mobile).strip() if mobile else '',
            'email': str(email).strip().lower() if email else ''
        })
        
    print(f"Parsed {len(members)} team members from excel.")
    
    # Clear and insert in DB
    team_members_coll.delete_many({})
    if members:
        team_members_coll.insert_many(members)
        print("Successfully seeded teammembers collection!")

if __name__ == '__main__':
    run()

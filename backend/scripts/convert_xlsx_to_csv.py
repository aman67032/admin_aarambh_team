import openpyxl
import csv

xlsx_path = r"C:\Users\MSI1\Downloads\New Student Information Spcimen(30.06.2026).xlsx"
csv_path = r"F:\Aarambh 2026\Team_portal\backend\scripts\temp_students_new.csv"

try:
    wb = openpyxl.load_workbook(xlsx_path, data_only=True)
    sheet = wb.active
    
    rows = list(sheet.iter_rows(values_only=True))
    # Filter out title rows if row 1 is 'AARAMBH - 2026'
    start_row = 0
    if rows[0][0] == 'AARAMBH - 2026':
        start_row = 1 # Skip first row
        
    with open(csv_path, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        for row in rows[start_row:]:
            # Clean up the values (e.g. strip backticks from mobile numbers)
            cleaned_row = []
            for val in row:
                if val is not None:
                    s_val = str(val).strip()
                    if s_val.startswith('`'):
                        s_val = s_val[1:]
                    cleaned_row.append(s_val)
                else:
                    cleaned_row.append('')
            writer.writerow(cleaned_row)
            
    print(f"Successfully converted xlsx to CSV at: {csv_path}")
except Exception as e:
    print("Error:", str(e))

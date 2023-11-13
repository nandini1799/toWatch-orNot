import json
import csv

# Open the json file and load the data
json_file = open('average_data.json', 'r')
data = json.load(json_file)

# Specify the CSV file name
csv_file_name = 'average_data.csv'

# Open the CSV file in write mode
with open(csv_file_name, 'w', newline='') as csv_file:
    # Create a CSV writer
    csv_writer = csv.writer(csv_file)

    # Write the header row
    header = data[0].keys()
    csv_writer.writerow(header)

    # Write the data rows
    for row in data:
        csv_writer.writerow(row.values())

print(f"Conversion completed. CSV file created: {csv_file_name}")

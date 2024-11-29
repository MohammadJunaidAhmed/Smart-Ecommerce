import schedule
import time
import requests
# from model import train_model
from modelTest4 import train_model
import csv

# Replace this with your actual API endpoint
API_URL = 'http://localhost:3000/api/v1/products/seller/info/main'  # Modify the port or URL as needed


def job():
    print("Job started")
    try:
        # Call the API
        response = requests.get(API_URL)
        response.raise_for_status()  # Check if the response has an error
        
        # Get the data from the response
        product_data = response.json()

        # Define the CSV file name
        csv_file = 'seller_info.csv'

        # Convert and store the data in a CSV file
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.writer(file)

            # Write the header
            writer.writerow(['Seller ID', 'Product Name', 'Category', 'Stock', 'Cost Price', 'MRP', 
                             'Seller Rating', 'Total Customers', 'Sale Price', 'Sales Volume'])

            # Write the data
            for product in product_data:
                writer.writerow([
                    product['sellerId'],
                    product['productName'],
                    product['category'],
                    product['stock'],
                    product['costPrice'],
                    product['mrp'],
                    product['sellerRating'],
                    product['totalCustomers'],
                    product['salePrice'],
                    product['salesVolume']
                ])
        
        print(f"CSV file '{csv_file}' created successfully.")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
    
    except Exception as e:
        print(f"An error occurred: {e}")
    
    print("Job Ended")
    train_model()
    print("Job Ended")
    # load_model_and_predict()

# Schedule the job every 30 minutes
# schedule.every(30).minutes.do(job)
schedule.every(30).seconds.do(job)

# Run the scheduler
while True:
    schedule.run_pending()
    time.sleep(1)

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import shap
import matplotlib.pyplot as plt

# Load your dataset (replace this with your actual data path)
df = pd.read_csv('seller_info.csv')

# Step 1: Calculate competitor features for products that already exist in the dataset
df['Avg Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('mean')
df['Min Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('min')
df['Max Competitor Rating'] = df.groupby('Product Name')['Seller Rating'].transform('max')
df['Competitor Price-Rating Ratio'] = df['Min Competitor Price'] / df['Max Competitor Rating']

# Step 2: Features: Remove 'purchasePrice' and only use competitor-related features along with cost-related features
X = df[['Cost Price', 'MRP', 'Seller Rating', 'Total Customers', 
        'Avg Competitor Price', 'Min Competitor Price', 
        'Max Competitor Rating', 'Competitor Price-Rating Ratio']]

# Target: Sale Price (The price you want to predict)
y = df['Sale Price']

# Split the dataset into training and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Apply Polynomial Features (degree 2 for simplicity)
poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

# Step 4: Fit the polynomial regression model
model = LinearRegression()
model.fit(X_train_poly, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test_poly)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Function to predict sale price for a given product and seller
def predict_sale_price(seller_input, product_name, df, model, poly):
    # Check if product exists in the dataset
    if product_name in df['Product Name'].unique():
        # Product exists, extract competitor-based features
        avg_competitor_price = df[df['Product Name'] == product_name]['Avg Competitor Price'].mean()
        min_competitor_price = df[df['Product Name'] == product_name]['Min Competitor Price'].min()
        max_competitor_rating = df[df['Product Name'] == product_name]['Max Competitor Rating'].max()
        price_rating_ratio = min_competitor_price / max_competitor_rating
        
        # Add these competitor features to the seller input
        seller_input = np.append(seller_input, [avg_competitor_price, min_competitor_price, max_competitor_rating, price_rating_ratio])
    else:
        # Product doesn't exist, no competitors, use MRP as the sale price
        print(f"New product {product_name}, no competitors. Setting Sale Price as MRP.")
        return seller_input[1]  # MRP as the predicted sale price
    
    # Ensure that the input is transformed with the same polynomial features
    seller_input_poly = poly.transform([seller_input])
    
    # Predict the best price for the seller
    predicted_price = model.predict(seller_input_poly)[0]
    
    # Step 5: Constrain the predicted price between the cost price and MRP
    cost_price = seller_input[0]  # The cost price from the input
    mrp = seller_input[1]  # The MRP from the input
    constrained_price = np.clip(predicted_price, cost_price, mrp)
    
    return constrained_price

# Example input for a seller
seller_input = [8500, 20999, 4.0, 32]  # [Cost Price, MRP, Seller Rating, Total Customers]

# Step 6: Test the prediction function
product_name = 'SAMSUNG Galaxy A14 5G (Dark Red, 128 GB)  (6 GB RAM)'  # Change this to a product name in your dataset or a new product
predicted_price = predict_sale_price(seller_input, product_name, df, model, poly)
print(f"Predicted Price for Seller: {predicted_price}")

# Step 7: SHAP Explanation for the model
# explainer = shap.Explainer(model, X_train_poly)
# shap_values = explainer(X_test_poly)

# # Step 8: Get feature names after polynomial transformation
# feature_names = poly.get_feature_names_out(X.columns)

# # Step 9: SHAP summary plot with transformed feature names
# shap.summary_plot(shap_values, X_test_poly, feature_names=feature_names, plot_type="bar")



# product_name = 'SAMSUNG Galaxy A14 5G (Dark Red, 128 GB)  (6 GB RAM)'  # Change this to a product name in your dataset or a new product
# predicted_price = predict_sale_price(seller_input, product_name, df, model, poly)
# print(f"Predicted Price for Seller: {predicted_price}")

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam

# Load your dataset
df = pd.read_csv('seller_info.csv')

# Step 1: One-hot encode the product name
encoder = OneHotEncoder(sparse_output=False)
product_name_encoded = encoder.fit_transform(df[['Product Name']])

# Add encoded product names to the dataset
encoded_df = pd.DataFrame(product_name_encoded, columns=encoder.get_feature_names_out(['Product Name']))
df = pd.concat([df, encoded_df], axis=1)

# Step 2: Create competitor-related features
df['Avg Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('mean')
df['Min Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('min')
df['Max Competitor Rating'] = df.groupby('Product Name')['Seller Rating'].transform('max')
# df['Competitor Price-Rating Ratio'] = df['Min Competitor Price'] / df['Max Competitor Rating']

# Step 3: Define the features and target
X = df[['Cost Price', 'MRP', 'Seller Rating', 'Total Customers', 'Avg Competitor Price', 
        'Min Competitor Price', 'Max Competitor Rating']]

# Add the encoded product name columns
X = pd.concat([X, encoded_df], axis=1)

y = df[['Cost Price', 'MRP', 'Sale Price']]  # Keep cost and MRP for final scaling

# Step 4: Split the dataset into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Feature scaling (standardization)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 6: Build the neural network model
def create_model(input_dim):
    model = Sequential()
    model.add(Dense(64, input_dim=input_dim, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(16, activation='relu'))
    
    # Final layer with a sigmoid activation function
    model.add(Dense(1, activation='sigmoid'))
    
    # Compile the model
    model.compile(optimizer=Adam(learning_rate=0.001), loss='mean_squared_error')
    
    return model

# Create the model
model = create_model(X_train_scaled.shape[1])

# Step 7: Train the model
model.fit(X_train_scaled, y_train['Sale Price'], epochs=100, batch_size=32, validation_split=0.2, verbose=1)

# Step 8: Predict the sale price
y_pred_sigmoid = model.predict(X_test_scaled)

# Step 9: Scale predictions to be within the range of Cost Price and MRP
cost_price_test = y_test['Cost Price'].values
mrp_test = y_test['MRP'].values
y_pred_scaled = cost_price_test + (mrp_test - cost_price_test) * y_pred_sigmoid.reshape(-1)

# Step 10: Evaluate the model
mse = np.mean((y_pred_scaled - y_test['Sale Price'].values)**2)
print(f"Mean Squared Error: {mse}")

# Step 11: Test with an example seller input
# Example: Product A, cost=500, MRP=1000, stock=200, rating=4.5, customers=150
seller_input = pd.DataFrame([['SAMSUNG Galaxy A14 5G (Dark Red, 128 GB)  (6 GB RAM)', 7500, 20999, 3, 3, 1]], 
                            columns=['Product Name', 'Cost Price', 'MRP', 'Stock', 'Seller Rating', 'Total Customers'])

# Encode the product name
product_name_encoded_test = encoder.transform(seller_input[['Product Name']])
seller_input_encoded = pd.concat([seller_input.drop('Product Name', axis=1), pd.DataFrame(product_name_encoded_test, columns=encoder.get_feature_names_out(['Product Name']))], axis=1)

# Calculate competitor-related features for the input
# Normally, you would have competitor data to calculate these features
# For the purpose of this example, we'll just assume some values
seller_input_encoded['Avg Competitor Price'] = 10999  # Placeholder
seller_input_encoded['Min Competitor Price'] = 10999  # Placeholder
seller_input_encoded['Max Competitor Rating'] = 1  # Placeholder
# seller_input_encoded['Competitor Price-Rating Ratio'] = seller_input_encoded['Min Competitor Price'] / seller_input_encoded['Max Competitor Rating']
# print(seller_input_encoded['Competitor Price-Rating Ratio'])

# Ensure that all features match the training data columns
expected_columns = X.columns
seller_input_encoded = seller_input_encoded.reindex(columns=expected_columns, fill_value=0)

# Feature scaling for test input
seller_input_scaled = scaler.transform(seller_input_encoded)

# Predict using the model
predicted_sigmoid = model.predict(seller_input_scaled)

# Scale the prediction between the cost price and MRP
cost_price_input = seller_input['Cost Price'].values
mrp_input = seller_input['MRP'].values
predicted_price = cost_price_input + (mrp_input - cost_price_input) * predicted_sigmoid.reshape(-1)
print(f"Predicted Sale Price for Seller: {predicted_price[0]}")

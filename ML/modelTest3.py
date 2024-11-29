from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
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

# Define the features and target
X = df[['Cost Price', 'MRP', 'Seller Rating', 'Total Customers']]
y = df['Sale Price']

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train an XGBoost model
model = XGBRegressor()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate performance
mse = np.mean((y_pred - y_test) ** 2)
print(f"Mean Squared Error: {mse}")

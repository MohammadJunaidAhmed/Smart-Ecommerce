import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
from sklearn.preprocessing import MinMaxScaler

# Step 1: Load data
data = pd.read_csv('seller_info.csv')

# Step 2: Feature preparation
features = ['Stock', 'Cost Price', 'Seller Rating', 'Total Customers', 'Sales Volume']
target = 'Sale Price'

# Scale features
scaler = MinMaxScaler()
X = scaler.fit_transform(data[features])

# Scale target to range [0, 1] based on Cost Price and MRP
y_scaled = (data[target] - data['Cost Price']) / (data['MRP'] - data['Cost Price']+1)
print(y_scaled)

# Step 3: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y_scaled, test_size=0.2, random_state=42)

# Step 4: Train the model
model = Ridge()  # Ridge regression to handle multicollinearity
model.fit(X_train, y_train)

# Step 5: Predict and rescale to original price range
y_pred_scaled = model.predict(X_test)
y_pred = data['Cost Price'].iloc[y_test.index] + y_pred_scaled * (
    data['MRP'].iloc[y_test.index] - data['Cost Price'].iloc[y_test.index]
)

# Step 6: Output evaluation
from sklearn.metrics import mean_squared_error
mse = mean_squared_error(data[target].iloc[y_test.index], y_pred)
print(f"Mean Squared Error: {mse}")

# Save predicted prices
predictions = pd.DataFrame({
    'Product Name': data['Product Name'].iloc[y_test.index],
    'Predicted Price': y_pred
})
predictions.to_csv('predicted_prices.csv', index=False)

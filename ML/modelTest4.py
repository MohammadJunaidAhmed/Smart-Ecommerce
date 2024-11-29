# TODO: MAKE THIS MAIN FILE!
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import shap

model = LinearRegression()
poly = PolynomialFeatures(degree=2)


def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def train_model():
    global poly, model, X_train_poly, X_test_poly, X

    df = pd.read_csv('seller_info.csv')

    # Step 1: Calculate competitor features
    df['Avg Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('mean')
    df['Min Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('min')
    df['Max Competitor Rating'] = df.groupby('Product Name')['Seller Rating'].transform('max')
    df['Competitor Price-Rating Ratio'] = df['Min Competitor Price'] / (df['Max Competitor Rating']+1)

    # Step 2: Features: Add these additional competitor-related features
    X = df[['Seller Rating', 'Total Customers', 'Avg Competitor Price', 'Competitor Price-Rating Ratio']]

    y = df['Sale Price']

    # Scale `y` to be between 0 and 1 using min-max scaling
    y_min, y_max = y.min(), y.max()
    y_scaled = (y - y_min) / (y_max - y_min+1)

    # Split the dataset into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y_scaled, test_size=0.2, random_state=42)

    # Step 3: Apply Polynomial Features (degree 2)
    poly = PolynomialFeatures(degree=2)
    X_train_poly = poly.fit_transform(X_train)
    X_test_poly = poly.transform(X_test)

    # Step 4: Fit the polynomial regression model
    model = LinearRegression()
    model.fit(X_train_poly, y_train)

    # Make predictions on the test set
    y_pred = model.predict(X_test_poly)

    # Apply sigmoid to bring values to 0-1 range
    y_pred_sigmoid = sigmoid(y_pred)

    # Rescale y_pred_sigmoid to original price range
    y_pred_rescaled = y_pred_sigmoid * (y_max - y_min) + y_min

    # Evaluate the model
    mse = mean_squared_error(y_test * (y_max - y_min) + y_min, y_pred_rescaled)
    # print(f"Mean Squared Error: {mse}")

    # Save the trained model and polynomial features to files using pickle
    with open('trained_model.pkl', 'wb') as model_file:
        pickle.dump(model, model_file)
    
    with open('poly_features.pkl', 'wb') as poly_file:
        pickle.dump(poly, poly_file)

# First, train the model and save it
train_model()

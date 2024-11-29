import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import shap

model = LinearRegression()
poly = PolynomialFeatures(degree=2)

def train_model():
    global poly, model, X_train_poly, X_test_poly, X

    # Load your dataset (replace this with your actual data path)
    # df = pd.read_csv('synthetic_ecommerce_dataset.csv')
    df = pd.read_csv('seller_info.csv')

    # Step 1: Calculate competitor features
    df['Avg Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('mean')
    df['Min Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('min')
    df['Max Competitor Rating'] = df.groupby('Product Name')['Seller Rating'].transform('max')
    df['Competitor Price-Rating Ratio'] = df['Min Competitor Price'] / df['Max Competitor Rating']

    # Step 2: Features: Add these additional competitor-related features
    X = df[['MRP', 'Seller Rating', 'Total Customers', 
            'Avg Competitor Price', 'Min Competitor Price', 
            'Max Competitor Rating', 'Competitor Price-Rating Ratio']]

    y = df['Sale Price']

    # Split the dataset into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Step 3: Apply Polynomial Features (degree 2)
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

    # Save the trained model and polynomial features to files using pickle
    with open('trained_model.pkl', 'wb') as model_file:
        pickle.dump(model, model_file)
    
    with open('poly_features.pkl', 'wb') as poly_file:
        pickle.dump(poly, poly_file)

def load_model_and_predict():
    # Load the trained model and polynomial features
    with open('trained_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    
    with open('poly_features.pkl', 'rb') as poly_file:
        poly = pickle.load(poly_file)

    # Step 5: Test with an example seller input
    seller_input = pd.DataFrame([[500, 1000, 4.5, 150, 850, 800, 4.8, 800 / 4.8]], 
                                columns=['Cost Price', 'MRP', 'Seller Rating', 'Total Customers', 
                                        'Avg Competitor Price', 'Min Competitor Price', 
                                        'Max Competitor Rating', 'Competitor Price-Rating Ratio'])

    # Ensure that the input is transformed with the same polynomial features
    seller_input_poly = poly.transform(seller_input)

    # Predict the best price for the seller
    predicted_price = model.predict(seller_input_poly)
    print(f"Predicted Price for Seller: {predicted_price[0]}")

    # Step 6: SHAP Explanation for the model
    explainer = shap.Explainer(model, X_train_poly)
    shap_values = explainer(X_test_poly)

    # Step 7: Get feature names after polynomial transformation
    feature_names = poly.get_feature_names_out(X.columns)

    # Step 8: SHAP summary plot with transformed feature names
    shap.summary_plot(shap_values, X_test_poly, feature_names=feature_names, plot_type="bar")
    shap.summary_plot(shap_values, X_test_poly, feature_names=feature_names)

# First, train the model and save it
train_model()

# Later, you can load the model and make predictions without retraining
# load_model_and_predict()

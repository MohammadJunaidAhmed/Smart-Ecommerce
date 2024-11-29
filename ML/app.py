from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import numpy as np
import pickle
import pandas as pd
import shap
import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend
import matplotlib.pyplot as plt
import io
import base64

import os

app = Flask(__name__)
CORS(app)

# Load the trained model and polynomial features
with open('trained_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('poly_features.pkl', 'rb') as poly_file:
    poly = pickle.load(poly_file)

# Endpoint to generate prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the POST request
        data = request.get_json()
        # Convert the input data into a DataFrame (adjust columns according to your data format)
        seller_input = pd.DataFrame([[
            # data['Cost Price'], 
            # data['MRP'], 
            data['Seller Rating'], 
            data['Total Customers'], 
            data['Avg Competitor Price'], 
            # data['Min Competitor Price'], 
            # data['Max Competitor Rating'], 
            data['Competitor Price-Rating Ratio']
        ]], columns=['Seller Rating', 'Total Customers', 
                     'Avg Competitor Price', 'Competitor Price-Rating Ratio'])

        # Transform the input using polynomial features
        seller_input_poly = poly.transform(seller_input)

        # Predict the best price
        predicted_price = model.predict(seller_input_poly)
        if(predicted_price[0]+0.5 < 1):
            predicted_price[0] = predicted_price[0] + 0.5

        # print(predicted_price)
        predicted_price[0] = int(data['Cost Price'] + predicted_price[0]*(data['MRP']-data['Cost Price']))

        if predicted_price[0] >= data['MRP']:
            predicted_price[0] = data['MRP']
        if predicted_price[0] < data['Cost Price']:
            predicted_price[0] = data['Cost Price']

        # Return the predicted price as JSON
        return jsonify({'predicted_price': predicted_price[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Endpoint to generate and serve SHAP graph
@app.route('/shap_graph', methods=['GET'])
def shap_graph():
    try:
        df = pd.read_csv('seller_info.csv')

        # Ensure the competitor-related features are created properly
        df['Avg Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('mean')
        df['Min Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('min')
        df['Max Competitor Rating'] = df.groupby('Product Name')['Seller Rating'].transform('max')
        df['Competitor Price-Rating Ratio'] = df['Min Competitor Price'] / (df['Max Competitor Rating']+1)

        # Select the required features
        X_train = df[['Seller Rating', 'Total Customers', 
                      'Avg Competitor Price','Competitor Price-Rating Ratio']]

        # Transform the features using polynomial features
        X_train_poly = poly.transform(X_train)

        # Get the feature names after polynomial transformation
        poly_feature_names = poly.get_feature_names_out(input_features=X_train.columns)

        # Create a DataFrame with the transformed polynomial features and correct names
        X_train_poly_df = pd.DataFrame(X_train_poly, columns=poly_feature_names)

        # Generate SHAP values
        explainer = shap.Explainer(model, X_train_poly_df)
        shap_values = explainer(X_train_poly_df)

        # Generate SHAP summary plot with feature names
        ### START HERE
        plt.figure()
        shap.summary_plot(shap_values, X_train_poly_df, show=False)

        # Save SHAP plot as an image
        shap_image_path = 'shap_summary_plot.png'
        plt.savefig(shap_image_path)  # Save the plot using the Agg backend
        plt.close()  # Close the figure to free resources

        # plt.figure()
        # shap.summary_plot(shap_values, X_train_poly_df, show=False)
        # buf = io.BytesIO()  # Use an in-memory buffer to store the plot image
        # plt.savefig(buf, format='png')
        # buf.seek(0)  # Reset buffer to the start
        # plt.close()

        # Encode the image as Base64
        # image_base64 = base64.b64encode(buf.read()).decode('utf-8')

        ### END HERE

        # Derive simple description from SHAP values
        # Rank features by their mean absolute SHAP values
        feature_importance = np.abs(shap_values.values).mean(axis=0)
        feature_names = X_train_poly_df.columns

        # Get top features
        sorted_idx = np.argsort(feature_importance)[::-1]
        top_features = feature_names[sorted_idx][:3]  # Top 3 features

        # Generate a simple description
        description = f"""
        SHAP Analysis Summary:
        1. The most important feature is '{top_features[0]}', contributing the most to the model's predictions.
        2. Other key contributors are '{top_features[1]}' and '{top_features[2]}'.
        3. The plot shows feature importance and their impact on predictions, with red indicating higher feature values and blue indicating lower values.
        """

        print(description)  # Print the description

        # Serve the image to the client
        return send_file(shap_image_path, mimetype='image/png')
        # return jsonify({
        #     "description": description.strip(),
        #     "image": image_base64
        # })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/', methods=['GET'])
def index():
    return jsonify('Hello')


if __name__ == '__main__':
    app.run(port=8000,debug=True)

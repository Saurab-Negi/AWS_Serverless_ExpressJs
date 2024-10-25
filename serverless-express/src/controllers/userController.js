const AWS = require('aws-sdk');
const { userModel } = require('../models/userModel');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USER_TABLE_NAME;

export const createUser= async (req, res) =>{
    const { firstname, lastname, email }= req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !email) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create user object using the user model
    const user = userModel(firstname, lastname, email);

    try {
        // Save user to DynamoDB
        await dynamodb.put({
          TableName: tableName,
          Item: user,
        }).promise();
    
        return res.status(201).json({ success: true, message: "User created successfully", user });
      } catch (error) {
        console.error('Error creating user:', error);
      }
}
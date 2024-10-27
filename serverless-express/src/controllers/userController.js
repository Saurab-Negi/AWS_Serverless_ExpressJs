const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { userModel } = require('../models/userModel');

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION }); // It will directly retrieve the region value from the environment in Lambda
const tableName = process.env.USER_TABLE_NAME;

const createUser= async (req, res) =>{
    const { firstname, lastname, email }= req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !email) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create user object using the user model
    const user = userModel(firstname, lastname, email);

    try {
        // Save user to DynamoDB
        const params = {
          TableName: tableName,
          Item: marshall(user), // Converts user object to DynamoDB format
        };
        await dynamodb.send(new PutItemCommand(params));
    
        return res.status(201).json({ success: true, message: "User created successfully", user });
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}

module.exports = { createUser };
// using node.js package nodemailer
// per square inch = 60$ cad as of march 2021

const nodemailer = require('nodemailer');

function calculateRugCost(height, width, numColors, gradient, cellShading) {
  let squareInches = height * width;
  let costPerSquareInch = 65;
  let totalCost = squareInches * costPerSquareInch;

  if (gradient) {
    totalCost *= 1.35;
  }

  if (cellShading) {
    totalCost *= 1.2;
  }

  let colorMultiplier = Math.pow(numColors, 1.0 / numColors);
  totalCost *= colorMultiplier;

  return totalCost.toFixed(2);
}

// Example usage
let height = 72; // in inches
let width = 48; // in inches
let numColors = 5;
let gradient = true;
let cellShading = false;

let totalCost = calculateRugCost(height, width, numColors, gradient, cellShading);

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'gsscustoms@gmail.com', 
    pass: 'smartcookie123' 
  }
});

let mailOptions = {
  from: 'gsscustoms@gmail.com', 
  to: 'gsscustoms@gmail.com', 
  subject: 'Total cost of the rug',
  text: `The total cost of the rug is $${totalCost} CAD.`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

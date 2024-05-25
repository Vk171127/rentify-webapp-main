"use server"
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface UserDetails {
  firstName: string;
  email: string;
  phoneNo: string;
}

const sendEmail = async (customerDetails: UserDetails[], ownerDetails: UserDetails[]) => {
  try {
    
    const mailOptionForHouseSeller = {
      from: process.env.EMAIL_USER,
      to: customerDetails[0].email,
      subject: 'Rentify - Owner Details',
      html: `
        <html>
          <body>
            <h2>Owner Details</h2>
            <p>Dear User,</p>
            <p>Thank you for showing interest in our property. Here are the details of the owner:</p>
            <table>
              <tr>
                <td><strong>Name:</strong></td>
                <td>${ownerDetails[0].firstName}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${ownerDetails[0].email}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${ownerDetails[0].phoneNo}</td>
              </tr>
            </table>
            <p>If you have any further questions, feel free to reach out to us.</p>
            <p>Best Regards,</p>
            <p>Rentify Team</p>
          </body>
        </html>
      `,
    };

    const mailOptionForHouseBuyer = {
      from: process.env.EMAIL_USER,
      to: ownerDetails[0].email,
      subject: 'Rentify - Customer Details',
      html: `
        <html>
          <body>
            <h2>Customer Details</h2>
            <p>Dear User,</p>
            <p>Someone has shown interest in your property. Here are the details of the customer:</p>
            <table>
              <tr>
                <td><strong>Name:</strong></td>
                <td>${customerDetails[0].firstName}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${customerDetails[0].email}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${customerDetails[0].phoneNo}</td>
              </tr>
            </table>
            <p>If you have any further questions, feel free to reach out to us.</p>
            <p>Best Regards,</p>
            <p>Rentify Team</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptionForHouseSeller);
    await transporter.sendMail(mailOptionForHouseBuyer);

    return NextResponse.json(
      { message: 'Email Sent Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to Send Email' },
      { status: 500 }
    );
  }
};

export default sendEmail;

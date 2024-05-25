// @ts-nocheck
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import sendEmail from './sendemail';

interface InterestedDialogProps {
  session: any;
  userData: { firstname: string; phoneno: string; email: string }[];
  customerData: { firstname: string; phoneno: string; email: string }[];
  creatoremail: string;
}

const EmailDialog: React.FC<InterestedDialogProps> = ({
  session,
  userData,
  customerData,
  creatorEmail,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  console.log("user:",userData)
  console.log("user:",customerData)

  const sendMessage = async (userData: any, customerData: any) => {
    try {
      const res = await sendEmail(userData, customerData);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log('Email Sent');
        return true;
      } else {
        console.log('Email not sent');
        return false;
      }
    } catch (error) {
      console.log('Error sending email: ', error);
      return false;
    }
  };

  const handleButtonClick = () => {
    if (!session) {
      router.push('/auth/login'); // Redirect to login page
    } else {
      setOpen(true);
      sendMessage(userData, customerData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-800"
        >
          <span className="pr-2 text-lg">I am interested</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-check2"
            viewBox="0 0 16 16"
          >
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
        </Button>
      </DialogTrigger>
      {session && (
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              We have sent the contact details to your registered mail.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="flex-1">
              <span>Name: {userData[0].firstName}</span>
            </div>
            <div className="flex-1">
              <span>Mail: {creatorEmail}</span>
            </div>
            <div className="flex-1">
              <span>Number: {userData[0].phoneNo}</span>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EmailDialog;

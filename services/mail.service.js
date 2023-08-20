import nodemailer from "nodemailer";

const mailjetOptions = {
  host: "in-v3.mailjet.com",
  port: 588,
  // secure: false,
  auth: {
    user: "cedbd12ff5f84456a23ae7d16fa454d2",
    pass: "978d88bcffe8c665291d26ab4bd8a072",
  },
};

const transporter = nodemailer.createTransport(mailjetOptions);

const sendMail = async (data) => {
  const mail = await transporter.sendMail({
    from: "saad.h4896@gmail.com",
    ...data,
  });
  return mail;
};

export const mailService = {
  sendMail,
};
export default transporter;

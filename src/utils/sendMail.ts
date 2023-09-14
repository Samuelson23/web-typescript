import nodemailer from "nodemailer";

export const sendMail = (
  email: string,
  content: string,
  res: any,
  next: any
) => {
  const myEmail: string | any = process.env.EMAIL;
  const myPass: string | any = process.env.PASSWORD;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: myPass,
      },
    });

    const mailOptions = {
      from: myEmail,
      to: email,
      subject: "Your new configuration",
      text: `Here its your new login acces: ${content}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(404).json({
          user: email,
          concept: "error enviando nueva password",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          user: email,
          concept: "password enviada correctamente",
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

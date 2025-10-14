import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  fullName: string;
  email: string;
  messageType: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Nothing But The Fruit <noreply@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'nbtfruit@gmail.com'],
      replyTo: data.email, // This allows you to reply directly to the sender
      subject: `New ${data.messageType} from ${data.fullName}`,
      text: `
Nothing But The Fruit - New Contact Form Submission

Contact Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Message Type: ${data.messageType}

Message:
${data.message}

Reply directly to: ${data.email}

This message was sent from the Nothing But The Fruit contact form on ${new Date().toLocaleString()}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nothing But The Fruit - Contact Form</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header with Brand Logo -->
            <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 30px 20px; text-align: center;">
              <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: bold;">
                Nothing But The Fruit
              </h1>
              <p style="color: #000; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
                Gospel Podcast with Pastor Demetria Bass
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Contact Details Section -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #F59E0B;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px; margin-bottom: 20px;">Contact Information</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #F59E0B; font-size: 14px;">NAME:</strong><br>
                  <span style="color: #333; font-size: 16px; font-weight: 500;">${data.fullName}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #F59E0B; font-size: 14px;">EMAIL:</strong><br>
                  <a href="mailto:${data.email}" style="color: #333; font-size: 16px; font-weight: 500; text-decoration: none;">${data.email}</a>
                </div>
                
                <div style="margin-bottom: 0;">
                  <strong style="color: #F59E0B; font-size: 14px;">MESSAGE TYPE:</strong><br>
                  <span style="color: #333; font-size: 16px; font-weight: 500;">${data.messageType}</span>
                </div>
              </div>
              
              <!-- Message Section -->
              <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px; margin-bottom: 20px;">Message Content</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #F59E0B;">
                  <p style="margin: 0; white-space: pre-wrap; line-height: 1.7; color: #333; font-size: 16px; font-weight: 400;">${data.message}</p>
                </div>
              </div>
              
              <!-- Reply Section -->
              <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                <p style="margin: 0; color: #000; font-weight: bold; font-size: 16px;">
                  Reply directly to: ${data.email}
                </p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  This message was sent from the Nothing But The Fruit contact form
                </p>
                <p style="margin: 8px 0 0 0; color: #666; font-size: 12px;">
                  Sent on ${new Date().toLocaleString()}
                </p>
                <div style="margin-top: 15px;">
                  <a href="https://nothingbutthefruit.com" style="color: #F59E0B; text-decoration: none; font-weight: bold;">
                    Visit Our Website
                  </a>
                  <span style="color: #ccc; margin: 0 10px;">|</span>
                  <a href="https://youtube.com/@nothingbutthefruit" style="color: #F59E0B; text-decoration: none; font-weight: bold;">
                    Watch on YouTube
                  </a>
                </div>
              </div>
              
            </div>
            
            <!-- Bottom Branding -->
            <div style="background: #000; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #F59E0B; font-size: 14px; font-weight: bold;">
                Nothing But The Fruit - Pure Gospel. Real Growth.
              </p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                A ministry of Bass Global Ministries
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Resend API error: ${error.message || 'Unknown error'}`);
    }

    console.log('Email sent successfully:', emailData?.id);
    return { success: true, messageId: emailData?.id };
  } catch (error) {
    console.error('Email service error:', error);
    if (error instanceof Error) {
      throw new Error(`Email service error: ${error.message}`);
    }
    throw new Error('Failed to send email');
  }
}

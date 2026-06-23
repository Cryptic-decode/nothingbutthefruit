import { Resend } from 'resend';

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function getResendClient(): Resend {
  const apiKey = getRequiredEnv('RESEND_API_KEY');
  return new Resend(apiKey);
}

function getFromAddress(): string {
  // Prefer a verified domain sender in production.
  // Example: "Nothing But The Fruit <hello@nothingbutthefruit.com>"
  // Fallback works for quick testing.
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Nothing But The Fruit <noreply@resend.dev>'
  );
}

export interface ContactFormData {
  fullName: string;
  email: string;
  messageType: string;
  message: string;
}

export interface BulkBookOrderFormData {
  fullName: string;
  email: string;
  phone: string;
  items: {
    bookTitle: string;
    bookPrice: number;
    quantity: number;
  }[];
}

export interface BookOrderFormData {
  fullName: string;
  email: string;
  phone: string;
  quantity: number;
  bookTitle: string;
  bookPrice: number;
}

export async function sendBulkBookOrderEmail(data: BulkBookOrderFormData) {
  try {
    const resend = getResendClient();
    const totalItems = data.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = data.items.reduce(
      (sum, i) => sum + i.quantity * i.bookPrice,
      0
    );
    const itemsHtml = data.items
      .map(
        (item) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e9ecef; color: #333;">${item.bookTitle}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e9ecef; color: #333; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e9ecef; color: #333; text-align: right;">$${item.bookPrice.toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e9ecef; color: #333; text-align: right;">$${(item.quantity * item.bookPrice).toFixed(2)}</td>
          </tr>`
      )
      .join('');

    const itemsText = data.items
      .map(
        (item) =>
          `- ${item.bookTitle}: ${item.quantity} x $${item.bookPrice.toFixed(2)} = $${(item.quantity * item.bookPrice).toFixed(2)}`
      )
      .join('\n');

    const { data: emailData, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [process.env.CONTACT_EMAIL || 'nbtfruit@gmail.com'],
      replyTo: data.email,
      subject: `New Bulk Book Order - ${data.fullName} - ${totalItems} items`,
      text: `
Nothing But The Fruit - New Bulk Book Order

Customer Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}

Order Items:
${itemsText}

Total Items: ${totalItems}
Total Amount: $${totalAmount.toFixed(2)}

Order submitted on ${new Date().toLocaleString()}

Reply directly to: ${data.email}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nothing But The Fruit - Bulk Book Order</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 30px 20px; text-align: center;">
              <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: bold;">Nothing But The Fruit</h1>
              <p style="color: #000; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">Bulk Book Order Notification</p>
            </div>
            <div style="padding: 30px 20px;">
              <div style="background: linear-gradient(135deg, #6B46C1, #5B21B6); padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
                <h2 style="color: #fff; margin: 0; font-size: 22px; font-weight: bold;">Bulk Order</h2>
                <p style="color: #fff; margin: 8px 0 0 0; opacity: 0.95;">${totalItems} items ordered</p>
              </div>
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #F59E0B;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px; margin-bottom: 20px;">Customer Information</h2>
                <div style="margin-bottom: 10px;"><strong style="color: #F59E0B; font-size: 14px;">NAME:</strong><br><span style="color: #333; font-size: 16px; font-weight: 500;">${data.fullName}</span></div>
                <div style="margin-bottom: 10px;"><strong style="color: #F59E0B; font-size: 14px;">EMAIL:</strong><br><a href="mailto:${data.email}" style="color: #333; font-size: 16px; font-weight: 500; text-decoration: none;">${data.email}</a></div>
                <div style="margin-bottom: 0;"><strong style="color: #F59E0B; font-size: 14px;">PHONE:</strong><br><a href="tel:${data.phone}" style="color: #333; font-size: 16px; font-weight: 500; text-decoration: none;">${data.phone}</a></div>
              </div>
              <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px; margin-bottom: 20px;">Order Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr>
                      <th style="padding: 8px; border-bottom: 2px solid #F59E0B; text-align: left; color: #333;">Book</th>
                      <th style="padding: 8px; border-bottom: 2px solid #F59E0B; text-align: center; color: #333;">Qty</th>
                      <th style="padding: 8px; border-bottom: 2px solid #F59E0B; text-align: right; color: #333;">Unit Price</th>
                      <th style="padding: 8px; border-bottom: 2px solid #F59E0B; text-align: right; color: #333;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                <div style="border-top: 2px solid #F59E0B; padding-top: 15px; margin-top: 15px; display: flex; justify-content: space-between;">
                  <strong style="color: #333; font-size: 18px;">Total:</strong>
                  <span style="color: #F59E0B; font-size: 24px; font-weight: bold;">$${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                <p style="margin: 0; color: #000; font-weight: bold; font-size: 16px;">Reply directly to: ${data.email}</p>
                <p style="margin: 8px 0 0 0; color: #000; font-size: 14px;">Phone: ${data.phone}</p>
              </div>
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0; color: #666; font-size: 14px;">This bulk order was submitted from the Nothing But The Fruit website</p>
                <p style="margin: 8px 0 0 0; color: #666; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
              </div>
            </div>
            <div style="background: #000; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #F59E0B; font-size: 14px; font-weight: bold;">Nothing But The Fruit - Pure Gospel. Real Growth.</p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">A ministry of Bass Global Ministries</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send bulk order email');
    }

    console.log('Bulk book order email sent successfully:', emailData?.id);
    return { success: true, messageId: emailData?.id };
  } catch (error) {
    console.error('Email service error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to send email');
  }
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const resend = getResendClient();
    const { data: emailData, error } = await resend.emails.send({
      from: getFromAddress(),
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

export async function sendBookOrderEmail(data: BookOrderFormData) {
  try {
    const resend = getResendClient();
    const totalAmount = (data.quantity * data.bookPrice).toFixed(2);
    const copyLabel = data.quantity === 1 ? 'copy' : 'copies';
    const { data: emailData, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [process.env.CONTACT_EMAIL || 'nbtfruit@gmail.com'],
      replyTo: data.email,
      subject: `New Book Order: ${data.bookTitle} - ${data.fullName} - ${data.quantity} ${copyLabel}`,
      text: `
Nothing But The Fruit - New Book Order

Book: "${data.bookTitle}"
Price: $${data.bookPrice.toFixed(2)} per copy

Customer Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Quantity: ${data.quantity} ${copyLabel}
- Total Amount: $${totalAmount}

Order submitted on ${new Date().toLocaleString()}

Reply directly to: ${data.email}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nothing But The Fruit - Book Order</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            
            <!-- Header with Brand Logo -->
            <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 30px 20px; text-align: center;">
              <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: bold;">
                Nothing But The Fruit
              </h1>
              <p style="color: #000; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
                New Book Order Notification
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Book Info Section -->
              <div style="background: linear-gradient(135deg, #6B46C1, #5B21B6); padding: 25px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
                <h2 style="color: #fff; margin-top: 0; font-size: 24px; margin-bottom: 10px; font-weight: bold;">
                  &ldquo;${data.bookTitle}&rdquo;
                </h2>
                <p style="color: #fff; margin: 0; font-size: 16px; opacity: 0.95;">
                  $${data.bookPrice.toFixed(2)} per copy
                </p>
              </div>
              
              <!-- Customer Details Section -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #F59E0B;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px; margin-bottom: 20px;">Customer Information</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #F59E0B; font-size: 14px;">NAME:</strong><br>
                  <span style="color: #333; font-size: 16px; font-weight: 500;">${data.fullName}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #F59E0B; font-size: 14px;">EMAIL:</strong><br>
                  <a href="mailto:${data.email}" style="color: #333; font-size: 16px; font-weight: 500; text-decoration: none;">${data.email}</a>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #F59E0B; font-size: 14px;">PHONE:</strong><br>
                  <a href="tel:${data.phone}" style="color: #333; font-size: 16px; font-weight: 500; text-decoration: none;">${data.phone}</a>
                </div>
              </div>
              
              <!-- Order Details Section -->
              <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px; margin-bottom: 20px;">Order Details</h2>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #F59E0B;">
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #333; font-size: 16px;">Quantity:</strong>
                    <span style="color: #333; font-size: 18px; font-weight: bold; margin-left: 10px;">${data.quantity} ${copyLabel}</span>
                  </div>
                  
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #333; font-size: 16px;">Price per copy:</strong>
                    <span style="color: #333; font-size: 18px; font-weight: bold; margin-left: 10px;">$${data.bookPrice.toFixed(2)}</span>
                  </div>
                  
                  <div style="border-top: 2px solid #F59E0B; padding-top: 15px; margin-top: 15px;">
                    <strong style="color: #333; font-size: 18px;">Total Amount:</strong>
                    <span style="color: #F59E0B; font-size: 24px; font-weight: bold; margin-left: 10px;">$${totalAmount}</span>
                  </div>
                </div>
              </div>
              
              <!-- Reply Section -->
              <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                <p style="margin: 0; color: #000; font-weight: bold; font-size: 16px;">
                  Reply directly to: ${data.email}
                </p>
                <p style="margin: 8px 0 0 0; color: #000; font-size: 14px;">
                  Phone: ${data.phone}
                </p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  This order was submitted from the Nothing But The Fruit website
                </p>
                <p style="margin: 8px 0 0 0; color: #666; font-size: 12px;">
                  Submitted on ${new Date().toLocaleString()}
                </p>
                <div style="margin-top: 15px;">
                  <a href="https://nothingbutthefruit.com/books" style="color: #F59E0B; text-decoration: none; font-weight: bold;">
                    View Books
                  </a>
                  <span style="color: #ccc; margin: 0 10px;">|</span>
                  <a href="https://nothingbutthefruit.com" style="color: #F59E0B; text-decoration: none; font-weight: bold;">
                    Visit Our Website
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
      throw new Error('Failed to send order email');
    }

    console.log('Book order email sent successfully:', emailData?.id);
    return { success: true, messageId: emailData?.id };
  } catch (error) {
    console.error('Email service error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to send email');
  }
}


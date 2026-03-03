import { NextRequest, NextResponse } from 'next/server';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
}

const formatBudget = (budget: string): string => {
  const budgetMap: Record<string, string> = {
    'under-25k': 'Under $25,000',
    '25k-50k': '$25,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    '100k-250k': '$100,000 - $250,000',
    'over-250k': '$250,000+',
  };
  return budgetMap[budget] || budget || 'Not specified';
};

const formatTimeline = (timeline: string): string => {
  const timelineMap: Record<string, string> = {
    'asap': 'As soon as possible',
    '1-3-months': '1-3 months',
    '3-6-months': '3-6 months',
    '6-plus-months': '6+ months',
  };
  return timelineMap[timeline] || timeline || 'Not specified';
};

const generateEmailHTML = (data: FormData): string => {
  const projectType = data.projectType ? data.projectType.charAt(0).toUpperCase() + data.projectType.slice(1) : 'Not specified';
  const services = data.services.length > 0 ? data.services.join(', ') : 'None selected';
  const budget = formatBudget(data.budget);
  const timeline = formatTimeline(data.timeline);
  const description = data.description || 'No description provided';
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #faf9f7; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf9f7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="background-color: #292524; padding: 40px 50px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;">
                VLanguret
              </h1>
              <p style="margin: 10px 0 0; color: #a8a29e; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">
                Design Build
              </p>
            </td>
          </tr>

          <!-- Title Section -->
          <tr>
            <td style="padding: 50px 50px 30px; border-bottom: 1px solid #e7e5e4;">
              <p style="margin: 0 0 10px; color: #a8a29e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
                New Project Inquiry
              </p>
              <h2 style="margin: 0; color: #292524; font-size: 28px; font-weight: 400;">
                ${data.fullName}
              </h2>
              <p style="margin: 15px 0 0; color: #78716c; font-size: 14px;">
                ${date}
              </p>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 40px 50px; border-bottom: 1px solid #e7e5e4;">
              <p style="margin: 0 0 20px; color: #a8a29e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
                Contact Information
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding-bottom: 15px; vertical-align: top;">
                    <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Email</p>
                    <a href="mailto:${data.email}" style="color: #292524; font-size: 15px; text-decoration: none;">${data.email}</a>
                  </td>
                  <td width="50%" style="padding-bottom: 15px; vertical-align: top;">
                    <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Phone</p>
                    <a href="tel:${data.phone}" style="color: #292524; font-size: 15px; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Details -->
          <tr>
            <td style="padding: 40px 50px; border-bottom: 1px solid #e7e5e4;">
              <p style="margin: 0 0 20px; color: #a8a29e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
                Project Details
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding-bottom: 20px; vertical-align: top;">
                    <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Project Type</p>
                    <p style="margin: 0; color: #292524; font-size: 15px;">${projectType}</p>
                  </td>
                  <td width="50%" style="padding-bottom: 20px; vertical-align: top;">
                    <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Services</p>
                    <p style="margin: 0; color: #292524; font-size: 15px;">${services}</p>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 10px;">
                <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Project Description</p>
                <p style="margin: 0; color: #57534e; font-size: 15px; line-height: 1.6; font-style: italic;">
                  "${description}"
                </p>
              </div>
            </td>
          </tr>

          <!-- Budget & Timeline -->
          <tr>
            <td style="padding: 40px 50px; border-bottom: 1px solid #e7e5e4;">
              <p style="margin: 0 0 20px; color: #a8a29e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">
                Budget & Timeline
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="vertical-align: top;">
                    <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Estimated Budget</p>
                    <p style="margin: 0; color: #292524; font-size: 18px; font-weight: 400;">${budget}</p>
                  </td>
                  <td width="50%" style="vertical-align: top;">
                    <p style="margin: 0 0 5px; color: #a8a29e; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">Desired Timeline</p>
                    <p style="margin: 0; color: #292524; font-size: 18px; font-weight: 400;">${timeline}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 50px; background-color: #faf9f7;">
              <p style="margin: 0; color: #a8a29e; font-size: 12px; text-align: center; font-family: Arial, sans-serif;">
                This inquiry was submitted via the VLanguret website.<br>
                The client has been directed to schedule a consultation via Calendly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate HTML email
    const emailHTML = generateEmailHTML(data);

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_EMAIL || 'vlanguret.info@gmail.com';

    if (resendApiKey) {
      // Send email using Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'VLanguret Website <onboarding@resend.dev>',
          to: [toEmail],
          subject: `New Project Inquiry: ${data.fullName} - ${data.projectType || 'General'}`,
          html: emailHTML,
          reply_to: data.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
        // Don't fail the request - just log the error
        // The form data is still valuable and Calendly will capture basic info
      }
    } else {
      // Log the inquiry if no email service is configured
      console.log('=== NEW PROJECT INQUIRY ===');
      console.log(`Name: ${data.fullName}, Email: ${data.email}, Phone: ${data.phone}`);
      console.log(`Project: ${data.projectType}, Services: ${data.services.join(', ')}`);
      console.log(`Budget: ${data.budget}, Timeline: ${data.timeline}`);
      console.log(`Description: ${data.description}`);
      console.log('=== END INQUIRY ===');
      console.log('Note: Configure RESEND_API_KEY env var to enable email notifications');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}

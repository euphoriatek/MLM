<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <title>Thank You for Activating Your SKLife Account</title>
    <style>
        body {
            font-family:  "Montserrat", sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            /* display: flex; */
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header img {
            width: 150px;
        }
        .content p {
            color: #333;
            line-height: 1.6;
        }
        .highlight {
            background: #f0f8ff;
            padding: 10px;
            border-left: 4px solid #007bff;
            margin: 15px 0;
            font-style: italic;
        }
        .cta-button {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 15px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
            border-top: 2px solid #eee;
            padding-top: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div>
                <p style="font-size: 18px; font-weight: bold; color: #333;">Dear {{ $name }},</p>
            </div>
            <img style="float: right;margin-top: -60px;" src="https://sklife.in/sk-portal/assets/images/logo.png" alt="SKLife Logo">
        </div>
        <div class="content">
            <p>Thank you for choosing SKLife! We are thrilled to inform you that your account has been successfully activated.</p>
            <p>Please find the attached invoice for your reference. If you have any questions or need assistance, feel free to reach out, and our team will be happy to support you.</p>
            <p>We truly appreciate your business and are here to ensure you have a smooth and enjoyable experience with SKLife.</p>
        </div>
        <div class="footer">
            <p>Best regards,</p>
            <p><strong>SK Life</strong></p>
            <p>📞 +91 9893143443 | ✉️ <a href="mailto:shyampatidar2986@gmail.com">shyampatidar2986@gmail.com</a></p>
            <p>🏠 Block B 08 Flat 906, Gulmarg Parisar, Badiya Kima, Bicholi Mardana, Indore 452016</p>
            <p>🌐 <a href="https://sklife.in" style="color: #007bff; text-decoration: none;">Visit Our Website</a></p>
        </div>
    </div>
</body>
</html>
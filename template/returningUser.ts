export const returninUserTemplate = ({url,email,token}: Record<"url" | "email"|"token", string>) => {

    const espacedEmail = `${email.replace(/\./g, "&#8203;.")}`; 

    return `<div><head>
      <style>
        table, td, div, h1, p {
          font-family: Arial, sans-serif;
        }
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #555555;
            text-decoration: none !important;
            font-weight: bold;
          }
          .col-lge {
            max-width: 100% !important;
          }
        }
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;word-spacing:normal;background-color:#fff;">
      <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#fff;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
          <tr>
            <td align="center" style="padding:20px;">
              <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                <tr>
                  <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                    <a href="https://www.robotdorm.com/" style="text-decoration:none;"><img src="https://chimp-tracker-images.s3.eu-west-3.amazonaws.com/logo2.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                  </td>
                </tr>
 
                <tr>
                    <td style="background-color:#ffffff;padding: 20px">
                      <p style="margin:0;">A request to login was made to: <span style="font-weight:600;">${espacedEmail}</span>  </p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color:#ffffff;padding:10px 20px">
                      <p style="margin:0;">Login with your confirmation code</p>
                    </td>
                </tr>
                <tr >
                    <td height="60px" style="height:60px; padding:0 20px">
                      <p style="margin:0; color:#307BD1;padding:14px 12px;text-decoration:none">${token.toUpperCase()}</p>
                    </td>
                    
                </tr>
                
                <tr>
                    <td style="background-color:#ffffff;padding: 20px;">
                      <p style="margin:0;">Thanks</p>
                      <p style="margin:0;">Team robotdorm</p>
                    </td>
                </tr>
               
                <tr>
                   <td style="padding:30px;text-align:center;font-size:12px;background-color:#f4f6fae0;color:#307BD1;">
                     <p style="margin:0 0 8px 0;"><a href="https://www.instagram.com/robotdorm" style="text-decoration:none;margin:0 8px;"><img src="https://chimp-tracker-images.s3.eu-west-3.amazonaws.com/instagram_logo.png" width="30" height="30" alt="f" style="display:inline-block;color:#307BD1;"></a> <a href="https://www.facebook.com/robotdorm" style="text-decoration:none;"><img src="https://chimp-tracker-images.s3.eu-west-3.amazonaws.com/facebook_logo.png" width="30" height="30" alt="t" style="display:inline-block;color:#307BD1;"></a></p>
                     <p style="margin:0;font-size:14px;line-height:20px;">&reg; 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ<br><a class="unsub" href="https://api.whatsapp.com/send?phone=447546979379&text=Hi%20I%20want%20to%20unsubscribe%20from%20you%20newsletter%20thanks" style="color:#307BD1;text-decoration:underline;">Unsubscribe instantly</a></p>
                   </td>
                 </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    
    </div>`
 }
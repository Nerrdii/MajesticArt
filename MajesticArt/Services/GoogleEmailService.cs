using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace MajesticArt.Services
{
    public class GoogleEmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public GoogleEmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void Send(string toEmail, string toName, string subject, string htmlContent)
        {
            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress("Majestic Art", configuration["Gmail:Username"]));
            mailMessage.To.Add(new MailboxAddress(toName, toEmail));
            mailMessage.Subject = subject;
            mailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = htmlContent
            };

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Connect(configuration["Gmail:Host"], int.Parse(configuration["Gmail:Port"]), false);
                smtpClient.Authenticate(configuration["Gmail:Username"], configuration["Gmail:Password"]);
                smtpClient.Send(mailMessage);
                smtpClient.Disconnect(true);
            }
        }
    }
}

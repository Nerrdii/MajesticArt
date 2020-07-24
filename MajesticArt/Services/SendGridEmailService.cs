using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public class SendGridEmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public SendGridEmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task Send(string from, string to, string subject, string textContent, string htmlContent)
        {
            var apiKey = configuration["SendGrid:ApiKey"];
            var client = new SendGridClient(apiKey);
            var fromEmail = new EmailAddress(from);
            var toEmail = new EmailAddress(to);
            var msg = MailHelper.CreateSingleEmail(fromEmail, toEmail, subject, textContent, htmlContent);
            await client.SendEmailAsync(msg);
        }
    }
}

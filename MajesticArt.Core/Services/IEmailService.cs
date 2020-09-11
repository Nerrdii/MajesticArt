namespace MajesticArt.Core.Services
{
    public interface IEmailService
    {
        public void Send(string toEmail, string toName, string subject, string htmlContent);
    }
}

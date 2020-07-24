using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MajesticArt.Services
{
    public interface IEmailService
    {
        public Task Send(string from, string to, string subject, string textContent, string htmlContent);
    }
}

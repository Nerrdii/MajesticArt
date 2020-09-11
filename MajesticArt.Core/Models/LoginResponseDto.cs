using System.Collections.Generic;

namespace MajesticArt.Core.Models
{
    public class LoginResponseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public ICollection<string> Roles { get; set; }
        public string Token { get; set; }
        public Address Address { get; set; }

    }
}

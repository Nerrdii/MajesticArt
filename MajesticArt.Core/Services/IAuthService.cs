using MajesticArt.Core.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MajesticArt.Core.Services
{
    public interface IAuthService
    {
        public Task<ClaimsIdentity> GetClaimsIdentity(ApplicationUser user);
        public string GenerateToken(ClaimsIdentity identity);
    }
}

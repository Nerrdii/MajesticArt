using System.Security.Claims;
using System.Threading.Tasks;
using MajesticArt.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        /// <summary>
        /// Updates the email for an existing user
        /// </summary>
        /// <param name="updateEmailDto"></param>
        /// <returns></returns>
        [Route("email")]
        [HttpPut]
        public async Task<IActionResult> UpdateEmail(UpdateEmailDto updateEmailDto)
        {
            var user = await userManager.FindByEmailAsync(updateEmailDto.Email);
            var newUser = await userManager.FindByEmailAsync(updateEmailDto.NewEmail);

            if (user == null)
            {
                return NotFound();
            }

            if (newUser != null)
            {
                return BadRequest("New email already exists");
            }

            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            if (email != updateEmailDto.Email)
            {
                return Unauthorized();
            }

            user.Email = updateEmailDto.NewEmail;
            user.UserName = updateEmailDto.NewEmail;

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }

        /// <summary>
        /// Updates the password for an existing user
        /// </summary>
        /// <param name="updatePasswordDto"></param>
        /// <returns></returns>
        [Route("password")]
        [HttpPut]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordDto updatePasswordDto)
        {
            var user = await userManager.FindByEmailAsync(updatePasswordDto.Email);
            if (user == null)
            {
                return NotFound();
            }

            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            if (email != updatePasswordDto.Email)
            {
                return Unauthorized();
            }

            var result = await userManager.ChangePasswordAsync(user, updatePasswordDto.Password, updatePasswordDto.NewPassword);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Current password incorrect");
        }

        /// <summary>
        /// Updates the address for an existing user
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [Route("address")]
        [HttpPut]
        public async Task<IActionResult> UpdateAddress(Address address)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);

            user.Address = address;

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }

        /// <summary>
        /// Checks whether the given password is correct for the current user
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        [Route("password")]
        [HttpGet]
        public async Task<bool> CheckPassword([FromQuery] string password)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);
            var result = await userManager.CheckPasswordAsync(user, password);

            return result;
        }

        /// <summary>
        /// Checks whether a user exists with the given user
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [Route("email")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<bool> CheckEmail([FromQuery] string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            return user != null;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MajesticArt.Models;
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

        [Route("password")]
        [HttpGet]
        public async Task<bool> CheckPassword([FromQuery] string password)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email);
            var result = await userManager.CheckPasswordAsync(user, password);

            return result;
        }

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

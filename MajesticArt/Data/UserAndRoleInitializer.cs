using MajesticArt.Models;
using Microsoft.AspNetCore.Identity;

namespace MajesticArt.Data
{
    public static class UserAndRoleInitializer
    {
        public static void SeedData(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<ApplicationUser> userManager)
        {
            if (userManager.FindByEmailAsync("john.doe@gmail.com").Result == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "john.doe@gmail.com",
                    Email = "john.doe@gmail.com",
                    FirstName = "John",
                    LastName = "Doe",
                    Address = new Address
                    {
                        Line1 = "123 Main St",
                        Line2 = "",
                        City = "Kansas City",
                        State = "MO",
                        ZipCode = "64105"
                    }
                };

                var result = userManager.CreateAsync(user, "Passwd@1").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }

            if (userManager.FindByEmailAsync("will.smith@gmail.com").Result == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "will.smith@gmail.com",
                    Email = "will.smith@gmail.com",
                    FirstName = "Will",
                    LastName = "Smith",
                    Address = new Address
                    {
                        Line1 = "1101 Innovation Parkway",
                        Line2 = "",
                        City = "Lee's Summit",
                        State = "MO",
                        ZipCode = "64086"
                    }
                };

                var result = userManager.CreateAsync(user, "Passwd@1").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                var role = new IdentityRole
                {
                    Name = "Admin"
                };
                roleManager.CreateAsync(role).Wait();
            }

            if (!roleManager.RoleExistsAsync("User").Result)
            {
                var role = new IdentityRole
                {
                    Name = "User"
                };
                roleManager.CreateAsync(role).Wait();
            }
        }
    }
}

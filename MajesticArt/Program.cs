using System;
using System.Diagnostics;
using MajesticArt.Data;
using MajesticArt.Core.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MajesticArt
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                try
                {
                    var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                    UserAndRoleInitializer.SeedData(userManager, roleManager);
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex);
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

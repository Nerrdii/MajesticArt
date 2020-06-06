using System.Collections.Generic;
using System.Threading.Tasks;
using MajesticArt.Models;
using MajesticArt.Services;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        public Task<IEnumerable<Category>> GetAll()
        {
            return categoryService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var category = await categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public Task<Category> Add([FromBody]Category category)
        {
            return categoryService.Add(category);
        }

        [HttpPut]
        public Task<Category> Update([FromBody]Category category)
        {
            return categoryService.Update(category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            await categoryService.Delete(id);

            return NoContent();
        }
    }
}
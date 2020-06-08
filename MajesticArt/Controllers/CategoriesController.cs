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
        public async Task<IActionResult> GetAll()
        {
            var categories = await categoryService.GetAll();
            return Ok(categories);
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
        public async Task<IActionResult> Add([FromBody]Category category)
        {
            await categoryService.Add(category);

            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]Category category)
        {
            await categoryService.Update(category);

            return Ok(category);
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

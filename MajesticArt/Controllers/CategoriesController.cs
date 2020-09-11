using System.Threading.Tasks;
using MajesticArt.Core.Models;
using MajesticArt.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        /// <summary>
        /// Get all categories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var categories = await categoryService.GetAll();
            return Ok(categories);
        }

        /// <summary>
        /// Get a single category by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            var category = await categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        /// <summary>
        /// Add a new category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add([FromBody]Category category)
        {
            await categoryService.Add(category);

            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        /// <summary>
        /// Update an existing category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]Category category)
        {
            await categoryService.Update(category);

            return Ok(category);
        }

        /// <summary>
        /// Delete a category by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

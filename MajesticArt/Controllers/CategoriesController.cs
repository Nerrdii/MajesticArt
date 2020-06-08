using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MajesticArt.Data.DataTransferObjects;
using MajesticArt.Models;
using MajesticArt.Services;
using MajesticArt.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ICategoryService categoryService;

        public CategoriesController(IMapper mapper, ICategoryService categoryService)
        {
            this.mapper = mapper;
            this.categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await categoryService.GetAll();
            var categoryViewModels = mapper.Map<CategoryViewModel[]>(categories);
            return Ok(categoryViewModels);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var category = await categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            var categoryViewModel = mapper.Map<CategoryViewModel>(category);

            return Ok(categoryViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]CategoryDTO categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            var created = await categoryService.Add(category);

            var categoryViewModel = mapper.Map<CategoryViewModel>(created);

            return CreatedAtAction(nameof(Get), new { id = categoryViewModel.Id }, categoryViewModel);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]CategoryDTO categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            var updated = await categoryService.Update(category);

            var categoryViewModel = mapper.Map<CategoryViewModel>(updated);

            return Ok(categoryViewModel);
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
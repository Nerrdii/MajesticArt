using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MajesticArt.Data.DataTransferObjects;
using MajesticArt.Models;
using MajesticArt.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MajesticArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IProductService productService;

        public ProductsController(IMapper mapper, IProductService productService)
        {
            this.mapper = mapper;
            this.productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await productService.GetAll();
            var productViewModels = mapper.Map<ProductDTO[]>(products);
            return Ok(productViewModels);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            var productViewModel = mapper.Map<ProductDTO>(product);

            return Ok(productViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]ProductDTO productDto)
        {
            var created = await productService.Add(productDto);

            var productViewModel = mapper.Map<ProductDTO>(created);

            return CreatedAtAction(nameof(Get), new { id = productViewModel.Id }, productViewModel);
        }
    }
}
﻿using Microsoft.AspNetCore.Mvc;
using MultiShop.DtoLayer.CatalogDtos.ProductDtos;
using Newtonsoft.Json;

namespace MultiShop.WebUI.ViewComponents.ProductListViewComponents
{
    public class _ProductListComponentPartial : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public _ProductListComponentPartial(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync(string id)
        {
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync("https://localhost:7070/api/Products/ProductListWithCategoryByCategoryId/" + id);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = await responseMessage.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<List<ResultProductWithCategoryDto>>(responseData);
                return View(values);
            }
            return View();
        }
    }
}
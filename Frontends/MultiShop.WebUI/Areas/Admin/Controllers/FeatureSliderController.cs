﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MultiShop.DtoLayer.CatalogDtos.FeatureSliderDtos;
using Newtonsoft.Json;
using System.Text;

namespace MultiShop.WebUI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Admin/[controller]/[action]")]
    public class FeatureSliderController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public FeatureSliderController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            ViewBag.v1 = "Ana Sayfa";
            ViewBag.v2 = "Öne Çıkan Görseller";
            ViewBag.v3 = "Slider Öne Çıkan Görsel Listesi";
            ViewBag.v0 = "Öne Çıkan Slider Görsel İşlemleri";

            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync("https://localhost:7070/api/FeatureSliders");
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = await responseMessage.Content.ReadAsStringAsync();
                var categories = JsonConvert.DeserializeObject<List<ResultFeatureSliderDto>>(responseData);
                return View(categories);
            }
            return View();
        }

        [HttpGet]
        public IActionResult CreateFeatureSlider()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateFeatureSlider(CreateFeatureSliderDto createFeatureSliderDto)
        {
            createFeatureSliderDto.Status = true;
            ViewBag.v1 = "Ana Sayfa";
            ViewBag.v2 = "Öne Çıkan Görseller";
            ViewBag.v3 = "Slider Öne Çıkan Görsel Listesi";
            ViewBag.v0 = "Öne Çıkan Slider Görsel İşlemleri";

            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createFeatureSliderDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PostAsync("https://localhost:7070/api/FeatureSliders", stringContent);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "FeatureSlider", new { area = "Admin" });
            }
            return View();
        }

        [Route("{id}")]
        public async Task<IActionResult> DeleteFeatureSlider(string id)
        {
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.DeleteAsync("https://localhost:7070/api/FeatureSliders/?id=" + id);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "FeatureSlider", new { area = "Admin" });
            }
            return View();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> UpdateFeatureSlider(string id)
        {

            ViewBag.v1 = "Ana Sayfa";
            ViewBag.v2 = "Öne Çıkan Görseller";
            ViewBag.v3 = "Slider Öne Çıkan Görsel Listesi";
            ViewBag.v0 = "Öne Çıkan Slider Görsel İşlemleri";

            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync("https://localhost:7070/api/FeatureSliders/" + id);
            if (responseMessage.IsSuccessStatusCode)
            {
                var responseData = await responseMessage.Content.ReadAsStringAsync();
                var FeatureSlider = JsonConvert.DeserializeObject<UpdateFeatureSliderDto>(responseData);
                return View(FeatureSlider);
            }
            return View();
        }

        [Route("{id}")]
        [HttpPost]
        public async Task<IActionResult> UpdateFeatureSlider(UpdateFeatureSliderDto updateFeatureSliderDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(updateFeatureSliderDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PutAsync("https://localhost:7070/api/FeatureSliders", stringContent);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index", "FeatureSlider", new { area = "Admin" });
            }
            return View();
        }
    }
}

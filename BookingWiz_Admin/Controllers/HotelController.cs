using BookingWiz_Admin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingWiz_Admin.Controllers
{
    [Route("/api/admin/")]
    [ApiController]
    public class HotelController : ControllerBase
    { 
        [HttpGet("hotel/list")]
        public IActionResult GetProducts()
        {
            var Hotels = new List<Hotels>
            { 
                new Hotels { Id = 1, Name = "Hotel Royal", Location = "India", Image = $"{Request.Scheme}://{Request.Host}/images/hotels/Royal.jpg" },
                new Hotels { Id = 2, Name = "Hotel Palm", Location = "UAE", Image = $"{Request.Scheme}://{Request.Host}/images/hotels/Palm.jpg" },
                new Hotels { Id = 2, Name = "Hotel Jacks", Location = "USA", Image = $"{Request.Scheme}://{Request.Host}/images/hotels/Jack.jpg" },
            };
            return Ok(Hotels);
        }
    }
}
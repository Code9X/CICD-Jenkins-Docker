using BookingWiz_Admin.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingWiz_Admin.Controllers
{
    [Route("/api/admin/")]
    [ApiController]
    public class FlightController : ControllerBase
    { 
        [HttpGet("flight/list")]
        public IActionResult GetProducts()
        { 
            var Flights = new List<Flights>
            { 
                new Flights { Id = 1, Name = "Air India", Location = "India", Price = 200.54, Image = $"{Request.Scheme}://{Request.Host}/images/flights/AirIndia.jpg" },
                new Flights { Id = 2, Name = "Air Canada", Location = "Canada", Price = 250.23, Image = $"{Request.Scheme}://{Request.Host}/images/flights/AirCanada.jpg"},
                new Flights { Id = 2, Name = "Indigo", Location = "India", Price = 150.04, Image = $"{Request.Scheme}://{Request.Host}/images/flights/Indigo.jpg"}
            };
            return Ok(Flights);
        }
    }
}
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreApi.Controllers
{
    [Route("api/planets")]
    [EnableCors("AllowLocalhost")]
    public class PlanetsController : Controller
    {
        ILogger<PlanetsController> _logger;

        public PlanetsController(ILogger<PlanetsController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Get the star charts.
        /// </summary>
        /// <returns>List of all planets in the star charts.</returns>
        [HttpGet()]
        public IActionResult GetPlanets()
        {
            _logger.LogInformation("Returning all planets...");
            AddAccessHeader();
            return Ok(PlanetsDataStore.Current.Planets);
        }

        /// <summary>
        /// Get a single planet from the star charts.
        /// </summary>
        /// <param name="planetId">Identifier for the requested planet.</param>
        /// <returns>The requested planetary record.</returns>
        [HttpGet("{planetId}", Name = "GetPlanet")]
        public IActionResult GetPlanet(int planetId)
        {
            // Find the planet
            var planet = PlanetsDataStore.Current.Planets.FirstOrDefault(p => p.Id == planetId);
            if (planet == null)
            {
                _logger.LogError($"Planet with id {planetId} was not found.");
                return NotFound($"Planet with id {planetId} was not found.");
            }
            _logger.LogInformation($"Planet {planet.Name} with id {planet.Id} has been located.");

            AddAccessHeader();
            return Ok(planet);
        }

        /// <summary>
        /// Add a new planet to the star charts.
        /// </summary>
        /// <param name="planetToAdd">Planet to add.</param>
        /// <returns>Route to the new planet, and the planet that was added.</returns>
        [HttpPost()]
        public IActionResult AddPlanet([FromBody] PlanetInfo planetToAdd)
        {
            // Error checking
            if (planetToAdd == null)
            {
                _logger.LogError("No planet information was received.");
                return BadRequest("No planet information was received.");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid PlanetInfo model.");
                return BadRequest(ModelState);
            }

            // Create new planet
            // In a system backed by a database, the id increment would be handled by the db
            var lastId = PlanetsDataStore.Current.Planets.Select(p => p.Id).Max();
            var newPlanet = new PlanetInfo()
            {
                Id = ++lastId, 
                Name = planetToAdd.Name,
                Description = planetToAdd.Description
            };
            PlanetsDataStore.Current.Planets.Add(newPlanet);
            _logger.LogInformation($"Planet {planetToAdd.Name} sucessfully added.");

            AddAccessHeader();
            return CreatedAtRoute("GetPlanet", new
            { planetId = newPlanet.Id }, newPlanet);
        }

        /// <summary>
        /// Update the star charts with the planet specified.
        /// </summary>
        /// <param name="planetId">Identifier for the planet to be updated.</param>
        /// <param name="planetToUpdate">Updated planetary information.</param>
        /// <returns>Confirmation status that the star charts have been updated.</returns>
        [HttpPut("{planetId}")]
        public IActionResult UpdatePlanet(int planetId,
            [FromBody] PlanetInfo planetToUpdate)
        {
            // Error checking
            if (planetToUpdate == null)
            {
                _logger.LogError("No planet information was received.");
                return BadRequest("No planet information was received.");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid PlanetInfo model.");
                return BadRequest(ModelState);
            }

            // Update the specified planet
            var planet = PlanetsDataStore.Current.Planets.FirstOrDefault(p => p.Id == planetId);
            if (planet == null)
            {
                _logger.LogError($"Unable to locate planet with id {planetId}.");
                return NotFound($"Unable to locate planet with id {planetId}.");
            }
            planet.Name = planetToUpdate.Name;
            planet.Description = planetToUpdate.Description;
            _logger.LogInformation($"The star chart entry for {planet.Name} has been update.");

            AddAccessHeader();
            return NoContent();
        }

        /// <summary>
        /// Delete the specified planet from the star charts.
        /// </summary>
        /// <param name="planetId">Identifier for the planet to be removed.</param>
        /// <returns>Confirmation status that the star charts have been updated.</returns>
        [HttpDelete("{planetId}")]
        public IActionResult DeletePlanet(int planetId)
        {
            // Find the planet
            var planet = PlanetsDataStore.Current.Planets.FirstOrDefault(p => p.Id == planetId);
            if (planet == null)
            {
                _logger.LogError($"Planet with id {planetId} was not found.");
                return NotFound($"Planet with id {planetId} was not found.");
            }

            PlanetsDataStore.Current.Planets.Remove(planet);
            _logger.LogInformation($"{planet.Name} has been deleted from the star charts.");

            AddAccessHeader();
            return NoContent();
        }

        /// <summary>
        /// Add the needed access header to make the response palatable to the client.
        /// </summary>
        private void AddAccessHeader()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}

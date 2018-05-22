using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreApi
{
    public class PlanetsDataStore
    {
        public static PlanetsDataStore Current { get; } = new PlanetsDataStore();
        public ICollection<PlanetInfo> Planets { get; set; }

        public PlanetsDataStore()
        {
            Planets = new List<PlanetInfo>()
            {
                new PlanetInfo()
                {
                    Id = 1,
                    Name = "Coruscant",
                    Description = "Galactic Capital"
                },
                new PlanetInfo()
                {
                    Id = 2,
                    Name = "Corellia",
                    Description = "Imperial Capital Ship Construction"
                },
                new PlanetInfo()
                {
                    Id = 3,
                    Name = "Mandalore",
                    Description = "Homeworld of the Mandalorian Culture"
                },
                new PlanetInfo()
                {
                    Id = 4,
                    Name = "Cantonica",
                    Description = "Home of Canto Bite"
                },
                new PlanetInfo()
                {
                    Id = 5,
                    Name = "Yavin 4",
                    Description = "Rebel Base"
                }
            };
        }

        /// <summary>
        /// Reorder the ids after a Remove() is called.
        /// </summary>
        public void ReorderIds()
        {
            // For this operation, I need access to the list functionality.
            // For optimization purposes, only cast as a List once and perform
            //  all needed operations before assigning it back to the property.
            var planetaryList = Planets.ToList();

            // Adjust any planet ids that are not in linear order
            planetaryList.ForEach(planet =>
            {
                var index = planetaryList.FindIndex(p => p.Id == planet.Id);
                if (!(planet.Id == index + 1))
                {
                    planet.Id = index + 1;
                }
            });
            Planets = planetaryList;
        }
    }
}

var roleRepair = {
    /** @param {Creep} creep **/
    run: function (creep) {

        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        for (var name in repairers) {
            var TarToRep = 0;
            if (creep == repairers[name]) {
                TarToRep = name;
            }
        }
        var roads = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_ROAD
        });

        var ramparts = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_RAMPART
        });

        var targets = roads.concat(ramparts);

        roads.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));
        ramparts.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));
        targets.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));

        if (creep.memory.status == 0) {



            var sources = creep.room.find(FIND_STRUCTURES,
                {
                    filter: { structureType: STRUCTURE_STORAGE }
                });

//            sources.sort((b, a) => (a.store.getUsedCapacity(RESOURCE_ENERGY)) - (b.store.getUsedCapacity(RESOURCE_ENERGY)));
            if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }




//            var sources = creep.room.find(FIND_SOURCES);
//            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(sources[0]);
//            }
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 1;
            }
        } else {
            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }
            else if (roads.length) {
                if (creep.repair(roads[TarToRep]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roads[TarToRep], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}

module.exports = roleRepair;
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.status == 0) {
//            var sources = creep.room.find(FIND_SOURCES);
//            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(sources[0]);
//            }

            var sources = creep.room.find(FIND_STRUCTURES,
                {
                    filter: { structureType: STRUCTURE_STORAGE }
                });

            if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }

            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 1;
            }
        } else {
            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}

module.exports = roleUpgrader;
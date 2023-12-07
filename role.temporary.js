var roleTemporary = {
    /** @param {Creep} creep **/
    run: function (creep) {

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
        }
        else {

//            var Targets = creep.room.find(FIND_STRUCTURES,
//                {
//                    filter: { structureType: STRUCTURE_TERMINAL }
//                });

            var Targets = Game.getObjectById('649c5e7bef4e16d605c36500');


            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }
            else {
                if (creep.transfer(Targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Targets, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}

module.exports = roleTemporary;